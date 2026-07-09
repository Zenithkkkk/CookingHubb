const Comment = require('../models/Comment');
const Recipe = require('../models/Recipe');
const COMMENT_TRANSLATABLE_LANGUAGES = new Set(['en', 'de', 'es', 'zh']);
const COMMENT_TRANSLATION_CACHE_TTL_MS = 1000 * 60 * 60 * 12;
const commentTranslationCache = new Map();

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
    if (region) headers['Ocp-Apim-Subscription-Region'] = region;

    const response = await fetch(translateUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify([{ text }])
    });
    if (!response.ok) throw new Error(`Azure translation API failed with status ${response.status}`);
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
  if (!response.ok) throw new Error(`Translation API failed with status ${response.status}`);
  const data = await response.json();
  return data.translatedText || '';
}

function getCachedCommentTranslation(cacheKey) {
  const cached = commentTranslationCache.get(cacheKey);
  if (!cached) return null;
  if (Date.now() - cached.createdAt > COMMENT_TRANSLATION_CACHE_TTL_MS) {
    commentTranslationCache.delete(cacheKey);
    return null;
  }
  return cached.value;
}

function setCachedCommentTranslation(cacheKey, value) {
  commentTranslationCache.set(cacheKey, {
    createdAt: Date.now(),
    value
  });
}

exports.createComment = async (req, res) => {
    try {
      const recipe = await Recipe.findOne({ slug: req.params.slug });
      if (!recipe) return res.status(404).render('404');

      const rating = parseInt(req.body.rating, 10);
      if (!rating || rating < 1 || rating > 5) {
        return res.redirect(`/recipes/${recipe.slug}`);
      }

      await Comment.create({
        body: req.body.body,
        rating,
        author: req.user._id,
        recipe: recipe._id
      });

      res.redirect(`/recipes/${recipe.slug}`);
    } catch (err) {
      console.error(err);
      res.redirect('/recipes');
    }
  };

  exports.deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId).populate('recipe');
      if (!comment) return res.status(404).render('404');
        
      // verify ownership
      if (comment.author.toString() !== req.user._id.toString()) {
        return res.redirect(`/recipes/${comment.recipe.slug}`);
      }

      // redirect back to user's previous page
      await Comment.deleteOne({ _id: comment._id });
      res.redirect(`/recipes/${comment.recipe.slug}`);
    } catch (err) {
      console.error(err);
      res.redirect('/recipes');
    }
  };

  exports.toggleLike = async (req, res) => {
    try {
      const recipe = await Recipe.findOne({ slug: req.params.slug });
      if (!recipe) return res.status(404).render('404');
  
      const userId = req.user._id.toString();
      const alreadyLiked = recipe.likes.some(id => id.toString() === userId); // array of user IDs who liked this recipe (check if user has already liked it with .some())
  
      if (alreadyLiked) {
        // if already liked and clicked --> remove like
        recipe.likes = recipe.likes.filter(id => id.toString() !== userId); 
      } else {
        // if not liked yet, add their ID (like)
        recipe.likes.push(req.user._id);
      }
  
      await recipe.save();
      res.redirect(`/recipes/${recipe.slug}`);
    } catch (err) {
      console.error(err);
      res.redirect('/recipes');
    }
  };

  exports.translateComment = async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.commentId).select('body updatedAt');
      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }

      const targetLang = String(req.query.targetLang || '').trim().toLowerCase();
      if (!COMMENT_TRANSLATABLE_LANGUAGES.has(targetLang)) {
        return res.status(400).json({ error: 'Unsupported language' });
      }

      const revision = (comment.updatedAt || comment._id || '').toString();
      const cacheKey = `${comment._id}:${targetLang}:${revision}`;
      const cached = getCachedCommentTranslation(cacheKey);
      if (cached) {
        return res.json({ translatedBody: cached, cached: true });
      }

      const translatedBody = await translateText(comment.body, targetLang);
      setCachedCommentTranslation(cacheKey, translatedBody);
      return res.json({ translatedBody, cached: false });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        error: 'Comment translation failed',
        hint: 'Check AZURE_TRANSLATOR_KEY / AZURE_TRANSLATOR_REGION, or fallback LibreTranslate settings.'
      });
    }
  };