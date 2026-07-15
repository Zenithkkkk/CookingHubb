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
const { buildTagFilterConditionAsync, buildTagsSearchTerms } = require('../config/tagSearch');
const { translateText } = require('../config/translate');
const { extractIngredientsFromDescription } = require('../config/extractIngredients');
const { buildCommentTree } = require('./commentController');

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

function parseIngredients(raw) {
  if (!raw || typeof raw !== 'string') return [];
  return raw
    .split(/[\n,，]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

async function uploadToCloudinary(source, folder = 'recipe-blog/recipes') {
  const cloudinary = require('cloudinary').v2;
  const result = await cloudinary.uploader.upload(source, { folder });
  return result.secure_url;
}

async function resolveRecipeImage({ croppedImage, originalImage, file, externalImageUrl }) {
  const trimmedImageUrl = externalImageUrl ? externalImageUrl.trim() : '';
  const trimmedOriginal = originalImage ? originalImage.trim() : '';

  if (croppedImage && croppedImage.startsWith('data:image')) {
    const imageThumbUrl = await uploadToCloudinary(croppedImage);
    let imageUrl = null;

    if (trimmedOriginal.startsWith('http://') || trimmedOriginal.startsWith('https://')) {
      imageUrl = trimmedOriginal;
    } else if (trimmedOriginal.startsWith('data:image')) {
      imageUrl = await uploadToCloudinary(trimmedOriginal);
    } else if (file) {
      imageUrl = file.path;
    } else if (trimmedImageUrl && isValidHttpUrl(trimmedImageUrl)) {
      imageUrl = trimmedImageUrl;
    } else {
      imageUrl = imageThumbUrl;
    }

    return { imageUrl, imageThumbUrl };
  }

  if (file) {
    return { imageUrl: file.path, imageThumbUrl: file.path };
  }

  if (trimmedImageUrl) {
    if (!isValidHttpUrl(trimmedImageUrl)) {
      return { error: 'Image link must start with http:// or https://.' };
    }
    return { imageUrl: trimmedImageUrl, imageThumbUrl: trimmedImageUrl };
  }

  return { imageUrl: null, imageThumbUrl: null };
}

// create recipe form
exports.getNewRecipeForm = (req, res) => {
    res.render('recipes/new');
  };

exports.extractIngredientsFromDescription = (req, res) => {
  try {
    const description = typeof req.body.description === 'string' ? req.body.description : '';
    const ingredients = extractIngredientsFromDescription(description);
    res.json({ ingredients });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ingredients: [] });
  }
};

// pull text fields out of the submitted form data
exports.createRecipe = async (req, res) => {
  try {
    const { title, description, ingredients, category, tags, croppedImage, originalImage, imageUrl: externalImageUrl } = req.body;
    const tagsArray = tags ? tags.split(',').map(tag => tag.trim()) : [];
    const ingredientsArray = parseIngredients(ingredients);
    const imageResult = await resolveRecipeImage({
      croppedImage,
      originalImage,
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

    const tagsSearchTerms = await buildTagsSearchTerms(tagsArray);

    const recipe = new Recipe({
      title,
      description,
      ingredients: ingredientsArray,
      category,
      tags: tagsArray,
      tagsSearchTerms,
      author: req.user._id,
      image: imageResult.imageUrl || 'default-recipe.png',
      imageThumb: imageResult.imageThumbUrl || imageResult.imageUrl || 'default-recipe.png'
    });

    await recipe.save();
    res.redirect(`/recipes/${recipe.slug}`);
  } catch (err) {
    console.error(err);
    res.render('recipes/new', { error: err.message });
  }
};
   

exports.getLeaderboard = async (req, res) => {
  try {
    const tab = req.query.tab === 'contributors' ? 'contributors' : 'recipes';

    if (tab === 'contributors') {
      const grouped = await Recipe.aggregate([
        { $group: { _id: '$author', count: { $sum: 1 } } },
        { $sort: { count: -1, _id: 1 } }
      ]);

      const authorIds = grouped.map((entry) => entry._id);
      const [authors, authorRecipes] = await Promise.all([
        User.find({ _id: { $in: authorIds } }),
        Recipe.find({ author: { $in: authorIds } })
          .sort({ createdAt: -1 })
          .select('title slug author')
      ]);

      const authorMap = new Map(authors.map((author) => [author._id.toString(), author]));
      const recipesMap = new Map();

      authorRecipes.forEach((recipe) => {
        const key = recipe.author.toString();
        if (!recipesMap.has(key)) {
          recipesMap.set(key, []);
        }
        recipesMap.get(key).push(recipe);
      });

      const contributors = grouped
        .map((entry, index) => {
          const author = authorMap.get(entry._id.toString());
          if (!author) return null;

          return {
            rank: index + 1,
            author,
            count: entry.count,
            recipes: (recipesMap.get(entry._id.toString()) || []).slice(0, 3)
          };
        })
        .filter(Boolean);

      return res.render('recipes/leaderboard', {
        tab,
        recipes: [],
        contributors
      });
    }

    const recipes = await Recipe.find()
      .populate('author')
      .sort({ createdAt: -1 });

    recipes.sort((a, b) => {
      const likeDiff = (b.likes?.length || 0) - (a.likes?.length || 0);
      if (likeDiff !== 0) return likeDiff;
      return b.createdAt - a.createdAt;
    });

    res.render('recipes/leaderboard', {
      tab,
      recipes,
      contributors: []
    });
  } catch (err) {
    console.error(err);
    res.redirect('/recipes');
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
        const tagCondition = await buildTagFilterConditionAsync(tag);
        if (tagCondition) conditions.push(tagCondition);
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

      const flatComments = await Comment.find({ recipe: recipe._id })
        .populate('author')
        .populate('replyTo', 'username')
        .sort({ createdAt: -1 });

      const comments = buildCommentTree(flatComments);
      const totalCommentCount = flatComments.length;

      const ratedComments = flatComments.filter(
        (comment) => !comment.parent && !comment.isDeleted && comment.rating
      );
      const averageRating = ratedComments.length
        ? (ratedComments.reduce((sum, comment) => sum + comment.rating, 0) / ratedComments.length)
        : null;

      const recipeShareUrl = buildRecipeShareUrl(req, recipe.slug);

      res.render('recipes/show', {
        recipe,
        comments,
        totalCommentCount,
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
    const recipe = await Recipe.findOne({ slug: req.params.slug }).select('title description ingredients updatedAt');
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    const targetLang = String(req.query.targetLang || '').trim().toLowerCase();
    if (!TRANSLATABLE_LANGUAGES.has(targetLang)) {
      return res.status(400).json({ error: 'Unsupported language' });
    }

    const sourceDescription = stripHtml(recipe.description);
    const sourceIngredients = (recipe.ingredients || []).join('，');
    const revision = (recipe.updatedAt || '').toString();
    const cacheKey = `${req.params.slug}:${targetLang}:${revision}`;
    const cached = getCachedTranslation(cacheKey);

    if (cached) {
      return res.json({
        targetLang,
        translatedTitle: cached.translatedTitle,
        translatedDescription: cached.translatedDescription,
        translatedIngredients: cached.translatedIngredients || '',
        cached: true
      });
    }

    const translationTasks = [
      translateText(recipe.title, targetLang),
      translateText(sourceDescription, targetLang)
    ];

    if (sourceIngredients) {
      translationTasks.push(translateText(sourceIngredients, targetLang));
    }

    const [translatedTitle, translatedDescription, translatedIngredients = ''] = await Promise.all(translationTasks);

    setCachedTranslation(cacheKey, {
      translatedTitle,
      translatedDescription,
      translatedIngredients
    });

    res.json({
      targetLang,
      translatedTitle,
      translatedDescription,
      translatedIngredients,
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
  
      const { title, description, ingredients, category, tags, croppedImage, originalImage, imageUrl: externalImageUrl } = req.body;
      const tagsArray = tags ? tags.split(',').map(tag => tag.trim()) : [];
      const ingredientsArray = parseIngredients(ingredients);
      const imageResult = await resolveRecipeImage({
        croppedImage,
        originalImage,
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
      recipe.ingredients = ingredientsArray;
      recipe.category = category;
      recipe.tags = tagsArray;
      recipe.tagsSearchTerms = await buildTagsSearchTerms(tagsArray);
      recipe.updatedAt = Date.now();

      if (imageResult.imageUrl) {
        recipe.image = imageResult.imageUrl;
      }
      if (imageResult.imageThumbUrl) {
        recipe.imageThumb = imageResult.imageThumbUrl;
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