const Comment = require('../models/Comment');
const Recipe = require('../models/Recipe');
const { translateText } = require('../config/translate');
const COMMENT_TRANSLATABLE_LANGUAGES = new Set(['en', 'de', 'es', 'zh']);
const COMMENT_TRANSLATION_CACHE_TTL_MS = 1000 * 60 * 60 * 12;
const commentTranslationCache = new Map();

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

    const body = typeof req.body.body === 'string' ? req.body.body.trim() : '';
    if (!body) {
      return res.redirect(`/recipes/${recipe.slug}`);
    }

    const parentId = typeof req.body.parentId === 'string' ? req.body.parentId.trim() : '';

    if (parentId) {
      const parentComment = await Comment.findById(parentId).populate('author');
      if (!parentComment || parentComment.recipe.toString() !== recipe._id.toString()) {
        return res.redirect(`/recipes/${recipe.slug}`);
      }

      await Comment.create({
        body,
        author: req.user._id,
        recipe: recipe._id,
        parent: parentComment._id,
        replyTo: parentComment.author._id || parentComment.author
      });

      return res.redirect(`/recipes/${recipe.slug}#comments`);
    }

    const rating = parseInt(req.body.rating, 10);
    if (!rating || rating < 1 || rating > 5) {
      return res.redirect(`/recipes/${recipe.slug}`);
    }

    await Comment.create({
      body,
      rating,
      author: req.user._id,
      recipe: recipe._id,
      parent: null,
      replyTo: null
    });

    res.redirect(`/recipes/${recipe.slug}#comments`);
  } catch (err) {
    console.error(err);
    res.redirect('/recipes');
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId).populate('recipe');
    if (!comment) return res.status(404).render('404');

    if (!req.user.isAdmin && comment.author.toString() !== req.user._id.toString()) {
      return res.redirect(`/recipes/${comment.recipe.slug}`);
    }

    comment.isDeleted = true;
    comment.body = '[deleted]';
    await comment.save();

    res.redirect(`/recipes/${comment.recipe.slug}#comments`);
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
    const alreadyLiked = recipe.likes.some(id => id.toString() === userId);

    if (alreadyLiked) {
      recipe.likes = recipe.likes.filter(id => id.toString() !== userId);
    } else {
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
    const comment = await Comment.findById(req.params.commentId).select('body isDeleted updatedAt');
    if (!comment || comment.isDeleted) {
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

function buildCommentTree(flatComments) {
  const byId = new Map();
  const roots = [];

  flatComments.forEach((comment) => {
    const node = comment.toObject ? comment.toObject({ virtuals: true }) : { ...comment };
    node.replies = [];
    byId.set(node._id.toString(), node);
  });

  byId.forEach((node) => {
    const parentId = node.parent ? node.parent.toString() : null;
    if (parentId && byId.has(parentId)) {
      byId.get(parentId).replies.push(node);
    } else {
      roots.push(node);
    }
  });

  const sortRecursive = (nodes) => {
    nodes.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    nodes.forEach((node) => {
      sortRecursive(node.replies);
      node.replyCount = node.replies.reduce(
        (sum, child) => sum + 1 + (child.replyCount || 0),
        0
      );
    });
  };

  // Root comments keep newest first to match previous behavior
  roots.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  roots.forEach((node) => {
    sortRecursive(node.replies);
    node.replyCount = node.replies.reduce(
      (sum, child) => sum + 1 + (child.replyCount || 0),
      0
    );
  });

  return roots;
}

exports.buildCommentTree = buildCommentTree;
