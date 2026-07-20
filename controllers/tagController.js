const { buildTagFilterConditionAsync } = require('../config/tagSearch');
const { getAllTagsWithCounts, syncAllTagsFromRecipes } = require('../config/tagSync');
const Recipe = require('../models/Recipe');

function serializeRecipe(recipe) {
  const image = recipe.imageThumb || recipe.image || 'default-recipe.png';
  const imageSrc = (image.startsWith('http') || image.startsWith('/'))
    ? image
    : '/images/default-recipe.png';

  return {
    slug: recipe.slug,
    title: recipe.title,
    category: recipe.category,
    tags: recipe.tags || [],
    image: imageSrc,
    author: recipe.author
      ? { username: recipe.author.username }
      : { username: '' }
  };
}

exports.getTagsPage = (req, res) => {
  res.render('tags/index');
};

exports.getTagsList = async (req, res) => {
  try {
    const tags = await getAllTagsWithCounts();

    res.json({
      tags,
      totalTags: tags.length
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load tags' });
  }
};

exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({})
      .populate('author')
      .sort({ createdAt: -1 });

    res.json({
      recipes: recipes.map(serializeRecipe),
      count: recipes.length
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load recipes' });
  }
};

exports.searchByTags = async (req, res) => {
  try {
    const raw = req.query.tags || '';
    const selectedTags = String(raw)
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);

    if (!selectedTags.length) {
      return res.status(400).json({ error: 'No tags selected' });
    }

    const tagConditions = await Promise.all(
      selectedTags.map((tag) => buildTagFilterConditionAsync(tag))
    );
    const validConditions = tagConditions.filter(Boolean);

    if (!validConditions.length) {
      return res.json({ recipes: [], count: 0, tags: selectedTags });
    }

    const filter = validConditions.length === 1
      ? validConditions[0]
      : { $and: validConditions };

    const recipes = await Recipe.find(filter)
      .populate('author')
      .sort({ createdAt: -1 });

    res.json({
      recipes: recipes.map(serializeRecipe),
      count: recipes.length,
      tags: selectedTags
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to search recipes' });
  }
};

exports.syncTags = syncAllTagsFromRecipes;
