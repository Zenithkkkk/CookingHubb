// recipe model
const Recipe = require('../models/Recipe');
const Comment = require('../models/Comment');
const User = require('../models/User');
const QRCode = require('qrcode');
const {
  STAPLE_OPTIONS,
  buildStapleFilterCondition,
  stapleMatchesTitle
} = require('../config/stapleSearch');

const MEAL_CATEGORIES = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack', 'Drink'];
const TRANSLATABLE_LANGUAGES = new Set(['en', 'de', 'es', 'zh']);
const TRANSLATION_CACHE_TTL_MS = 1000 * 60 * 60 * 12;
const translationCache = new Map();

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function isValidHttpUrl(value) {
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch (_) {
    return false;
  }
}

function stripHtml(value) {
  return String(value || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

async function translateText(text, targetLang) {
  const azureKey = process.env.AZURE_TRANSLATOR_KEY;
  if (azureKey) {
    const endpoint = process.env.AZURE_TRANSLATOR_ENDPOINT || 'https://api.cognitive.microsofttranslator.com';
    const region = process.env.AZURE_TRANSLATOR_REGION;
    const azureTarget = targetLang === 'zh' ? 'zh-Hans' : targetLang;
    const translateUrl = `${endpoint.replace(/\/$/, '')}/translate?api-version=3.0&to=${encodeURIComponent(azureTarget)}`;
    const headers = {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': azureKey
    };
    if (region) {
      headers['Ocp-Apim-Subscription-Region'] = region;
    }

    const response = await fetch(translateUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify([{ text }])
    });

    if (!response.ok) {
      throw new Error(`Azure translation API failed with status ${response.status}`);
    }

    const data = await response.json();
    return data?.[0]?.translations?.[0]?.text || '';
  }

  const endpoint = process.env.LIBRETRANSLATE_URL || 'https://libretranslate.com/translate';
  const apiKey = process.env.LIBRETRANSLATE_API_KEY;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      q: text,
      source: 'auto',
      target: targetLang,
      format: 'text',
      ...(apiKey ? { api_key: apiKey } : {})
    })
  });

  if (!response.ok) {
    throw new Error(`Translation API failed with status ${response.status}`);
  }

  const data = await response.json();
  return data.translatedText || '';
}

function getCachedTranslation(cacheKey) {
  const cached = translationCache.get(cacheKey);
  if (!cached) return null;
  if (Date.now() - cached.createdAt > TRANSLATION_CACHE_TTL_MS) {
    translationCache.delete(cacheKey);
    return null;
  }
  return cached.value;
}

function setCachedTranslation(cacheKey, value) {
  translationCache.set(cacheKey, {
    createdAt: Date.now(),
    value
  });
}

async function resolveRecipeImage({ croppedImage, file, externalImageUrl }) {
  const trimmedImageUrl = externalImageUrl ? externalImageUrl.trim() : '';

  if (croppedImage && croppedImage.startsWith('data:image')) {
    const cloudinary = require('cloudinary').v2;
    const result = await cloudinary.uploader.upload(croppedImage, {
      folder: 'recipe-blog/recipes'
    });
    return { imageUrl: result.secure_url };
  }

  if (file) {
    return { imageUrl: file.path };
  }

  if (trimmedImageUrl) {
    if (!isValidHttpUrl(trimmedImageUrl)) {
      return { error: 'Image link must start with http:// or https://.' };
    }
    return { imageUrl: trimmedImageUrl };
  }

  return { imageUrl: null };
}

// create recipe form
exports.getNewRecipeForm = (req, res) => {
    res.render('recipes/new');
  };

// pull text fields out of the submitted form data
exports.createRecipe = async (req, res) => {
  try {
    const { title, description, category, tags, croppedImage, imageUrl: externalImageUrl } = req.body;
    const tagsArray = tags ? tags.split(',').map(tag => tag.trim()) : [];
    const imageResult = await resolveRecipeImage({
      croppedImage,
      file: req.file,
      externalImageUrl
    });

    if (imageResult.error) {
      return res.render('recipes/new', {
        error: imageResult.error,
        useImageUrlChecked: !!req.body.useImageUrl,
        imageUrlValue: externalImageUrl || ''
      });
    }

    const recipe = new Recipe({
      title,
      description,
      category,
      tags: tagsArray,
      author: req.user._id,
      image: imageResult.imageUrl || 'default-recipe.png'
    });

    await recipe.save();
    res.redirect(`/recipes/${recipe.slug}`);
  } catch (err) {
    console.error(err);
    res.render('recipes/new', { error: err.message });
  }
};
   

exports.getAllRecipes = async (req, res) => {
    try {
      const { q, staple, category, tag } = req.query;
      const conditions = [];

      if (q && q.trim()) {
        const regex = new RegExp(escapeRegex(q.trim()), 'i');
        conditions.push({
          $or: [
            { title: regex },
            { description: regex },
            { tags: regex }
          ]
        });
      }

      if (staple && staple.trim()) {
        conditions.push(buildStapleFilterCondition(staple));
      }

      if (category && category.trim()) {
        conditions.push({ category: category.trim() });
      }

      if (tag && tag.trim()) {
        conditions.push({
          tags: { $regex: escapeRegex(tag.trim()), $options: 'i' }
        });
      }

      const filter = conditions.length ? { $and: conditions } : {};
      let recipes = await Recipe.find(filter).populate('author').sort({ createdAt: -1 });

      if (staple && staple.trim()) {
        recipes.sort((a, b) => {
          const aTitleMatch = stapleMatchesTitle(a, staple);
          const bTitleMatch = stapleMatchesTitle(b, staple);
          if (aTitleMatch !== bTitleMatch) return aTitleMatch ? -1 : 1;
          return b.createdAt - a.createdAt;
        });
      }

      const searchQuery = {
        q: q || '',
        staple: staple || '',
        category: category || '',
        tag: tag || ''
      };
      const hasActiveSearch = Object.values(searchQuery).some(value => value.trim());

      res.render('recipes/index', {
        recipes,
        searchQuery,
        hasActiveSearch,
        stapleOptions: STAPLE_OPTIONS,
        mealCategories: MEAL_CATEGORIES
      });
    } catch (err) {
      console.error(err);
      res.redirect('/');
    }
  };

exports.getLikedRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ likes: req.user._id })
      .populate('author')
      .sort({ createdAt: -1 });

    res.render('recipes/liked', {
      recipes,
      showLikedRecipesOnProfile: !!req.user.showLikedRecipesOnProfile
    });
  } catch (err) {
    console.error(err);
    res.redirect('/recipes');
  }
};

exports.updateLikedRecipesVisibility = async (req, res) => {
  try {
    const showOnProfile = req.body.showOnProfile === 'true';
    await User.findByIdAndUpdate(req.user._id, {
      showLikedRecipesOnProfile: showOnProfile
    });
    req.user.showLikedRecipesOnProfile = showOnProfile;
    res.redirect('/recipes/liked');
  } catch (err) {
    console.error(err);
    res.redirect('/recipes/liked');
  }
};

function buildRecipeShareUrl(req, slug) {
  const baseUrl = (process.env.APP_BASE_URL || `${req.protocol}://${req.get('host')}`).replace(/\/$/, '');
  return `${baseUrl}/recipes/${slug}`;
}

exports.getRecipeShareQr = async (req, res) => {
  try {
    const recipe = await Recipe.findOne({ slug: req.params.slug }).select('slug');
    if (!recipe) {
      return res.status(404).end();
    }

    const shareUrl = buildRecipeShareUrl(req, recipe.slug);
    const pngBuffer = await QRCode.toBuffer(shareUrl, {
      type: 'png',
      width: 280,
      margin: 2,
      color: {
        dark: '#1a1a1a',
        light: '#ffffff'
      }
    });

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.send(pngBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};

exports.getRecipeBySlug = async (req, res) => {
    try {
        // req.params.slug comes from URL itself, if no matched recipes, render a 404
      const recipe = await Recipe.findOne({ slug: req.params.slug }).populate('author');
      if (!recipe) {
        return res.status(404).render('404');
      }

      const comments = await Comment.find({ recipe: recipe._id })
      .populate('author')
      .sort({ createdAt: -1 });

      const ratedComments = comments.filter(comment => comment.rating);
      const averageRating = ratedComments.length
        ? (ratedComments.reduce((sum, comment) => sum + comment.rating, 0) / ratedComments.length)
        : null;

      const recipeShareUrl = buildRecipeShareUrl(req, recipe.slug);

      res.render('recipes/show', {
        recipe,
        comments,
        averageRating,
        reviewCount: ratedComments.length,
        recipeShareUrl
      });
    } catch (err) {
      console.error(err);
      res.redirect('/recipes');
    }
  };

exports.translateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findOne({ slug: req.params.slug }).select('title description updatedAt');
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    const targetLang = String(req.query.targetLang || '').trim().toLowerCase();
    if (!TRANSLATABLE_LANGUAGES.has(targetLang)) {
      return res.status(400).json({ error: 'Unsupported language' });
    }

    const sourceDescription = stripHtml(recipe.description);
    const revision = (recipe.updatedAt || '').toString();
    const cacheKey = `${req.params.slug}:${targetLang}:${revision}`;
    const cached = getCachedTranslation(cacheKey);

    if (cached) {
      return res.json({
        targetLang,
        translatedTitle: cached.translatedTitle,
        translatedDescription: cached.translatedDescription,
        cached: true
      });
    }

    const [translatedTitle, translatedDescription] = await Promise.all([
      translateText(recipe.title, targetLang),
      translateText(sourceDescription, targetLang)
    ]);

    setCachedTranslation(cacheKey, {
      translatedTitle,
      translatedDescription
    });

    res.json({
      targetLang,
      translatedTitle,
      translatedDescription,
      cached: false
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'Translation failed',
      hint: 'Check AZURE_TRANSLATOR_KEY / AZURE_TRANSLATOR_REGION, or fallback LibreTranslate settings.'
    });
  }
};

exports.getEditRecipeForm = async (req, res) => {
    try {
      const recipe = await Recipe.findOne({ slug: req.params.slug });
      if (!recipe) return res.status(404).render('404');
        
      // authorship or admin check
      if (!req.user.isAdmin && recipe.author.toString() !== req.user._id.toString()) {
        return res.redirect('/recipes');
      }
  
      res.render('recipes/edit', { recipe });
    } catch (err) {
      console.error(err);
      res.redirect('/recipes');
    }
  };

  // ownership check
  exports.updateRecipe = async (req, res) => {
    try {
      const recipe = await Recipe.findOne({ slug: req.params.slug });
      if (!recipe) return res.status(404).render('404');
  
      if (!req.user.isAdmin && recipe.author.toString() !== req.user._id.toString()) {
        return res.redirect('/recipes');
      }
  
      const { title, description, category, tags, croppedImage, imageUrl: externalImageUrl } = req.body;
      const tagsArray = tags ? tags.split(',').map(tag => tag.trim()) : [];
      const imageResult = await resolveRecipeImage({
        croppedImage,
        file: req.file,
        externalImageUrl
      });

      if (imageResult.error) {
        return res.render('recipes/edit', {
          recipe,
          error: imageResult.error,
          useImageUrlChecked: true,
          imageUrlValue: externalImageUrl || ''
        });
      }

      recipe.title = title;
      recipe.description = description;
      recipe.category = category;
      recipe.tags = tagsArray;
      recipe.updatedAt = Date.now();

      if (imageResult.imageUrl) {
        recipe.image = imageResult.imageUrl;
      }
  
      await recipe.save();
      res.redirect(`/recipes/${recipe.slug}`);
    } catch (err) {
      console.error(err);
      res.redirect('/recipes');
    }
  };

  // ownsership, then delete permanently from database
  exports.deleteRecipe = async (req, res) => {
    try {
      const recipe = await Recipe.findOne({ slug: req.params.slug });
      if (!recipe) return res.status(404).render('404');
  
      if (!req.user.isAdmin && recipe.author.toString() !== req.user._id.toString()) {
        return res.redirect('/recipes');
      }
  
      await Recipe.deleteOne({ _id: recipe._id });
      res.redirect('/recipes');
    } catch (err) {
      console.error(err);
      res.render('recipes/new', { error: err.message });
    }
/*     } catch (err) {
      console.error(err);
      res.redirect('/recipes');
    } */
  };