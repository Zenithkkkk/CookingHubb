const Recipe = require('../models/Recipe');
const User = require('../models/User');
const { normalizeLang, t } = require('../config/i18n');
const {
  DEFAULT_IGNORE,
  getIgnoreList,
  groupMatchedRecipes
} = require('../config/fridgeMatch');
const { expandIngredientsForMatching } = require('../config/ingredientMatchExpand');

const INVALID_IGNORE_TEXT = 'fridge.ignorePlaceholder';
const LEGACY_DEFAULT_IGNORE_TEXTS = new Set([
  INVALID_IGNORE_TEXT,
  DEFAULT_IGNORE.join('，'),
  DEFAULT_IGNORE.join(','),
  '油，盐，糖，生抽，醋',
  '油,盐,糖,生抽,醋'
]);

function getIgnorePlaceholder(req) {
  return t(normalizeLang(req.session.lang), 'fridge.ignorePlaceholder');
}

function sanitizeIgnoreText(ignoreText) {
  const trimmed = typeof ignoreText === 'string' ? ignoreText.trim() : '';
  if (!trimmed || LEGACY_DEFAULT_IGNORE_TEXTS.has(trimmed)) return '';
  return trimmed;
}

async function loadFridgeData(req) {
  const user = await User.findById(req.user._id).select('fridgeIngredients fridgeIgnoreText');
  const rawIgnoreText = typeof user.fridgeIgnoreText === 'string' ? user.fridgeIgnoreText : '';
  const ignoreText = sanitizeIgnoreText(rawIgnoreText);

  if (ignoreText !== rawIgnoreText) {
    await User.findByIdAndUpdate(req.user._id, { fridgeIgnoreText: ignoreText });
  }

  return {
    ingredients: Array.isArray(user.fridgeIngredients) ? user.fridgeIngredients : [],
    ignoreText
  };
}

async function saveFridgeData(req, { ingredients, ignoreText }) {
  await User.findByIdAndUpdate(req.user._id, {
    fridgeIngredients: ingredients,
    fridgeIgnoreText: ignoreText
  });
}

exports.getFridge = async (req, res) => {
  try {
    const { ingredients, ignoreText } = await loadFridgeData(req);

    res.render('fridge/index', {
      fridgeIngredients: ingredients,
      ignoreText,
      ignorePlaceholder: getIgnorePlaceholder(req),
      matchResults: null,
      hasMatched: false
    });
  } catch (err) {
    console.error(err);
    res.redirect('/recipes');
  }
};

exports.addIngredient = async (req, res) => {
  try {
    const { ingredients, ignoreText } = await loadFridgeData(req);

    const ingredient = typeof req.body.ingredient === 'string' ? req.body.ingredient.trim() : '';
    if (ingredient) {
      const exists = ingredients.some(
        (item) => item.toLowerCase() === ingredient.toLowerCase()
      );
      if (!exists) {
        ingredients.push(ingredient);
        await saveFridgeData(req, { ingredients, ignoreText });
      }
    }

    res.redirect('/fridge');
  } catch (err) {
    console.error(err);
    res.redirect('/fridge');
  }
};

exports.removeIngredient = async (req, res) => {
  try {
    const { ingredients, ignoreText } = await loadFridgeData(req);

    const ingredient = typeof req.params.name === 'string' ? decodeURIComponent(req.params.name).trim() : '';
    const nextIngredients = ingredients.filter((item) => item !== ingredient);
    await saveFridgeData(req, { ingredients: nextIngredients, ignoreText });

    res.redirect('/fridge');
  } catch (err) {
    console.error(err);
    res.redirect('/fridge');
  }
};

exports.matchRecipes = async (req, res) => {
  try {
    const { ingredients } = await loadFridgeData(req);

    const ignoreText = sanitizeIgnoreText(
      typeof req.body.ignoreText === 'string' ? req.body.ignoreText.trim() : ''
    );

    const ingredient = typeof req.body.ingredient === 'string' ? req.body.ingredient.trim() : '';
    if (ingredient) {
      const exists = ingredients.some(
        (item) => item.toLowerCase() === ingredient.toLowerCase()
      );
      if (!exists) {
        ingredients.push(ingredient);
      }
    }

    await saveFridgeData(req, { ingredients, ignoreText });

    const ignoreList = getIgnoreList(ignoreText);
    const expandedFridgeList = await expandIngredientsForMatching(ingredients);
    const expandedIgnoreList = await expandIngredientsForMatching(ignoreList);
    const recipes = await Recipe.find({ ingredients: { $exists: true, $ne: [] } })
      .populate('author')
      .sort({ createdAt: -1 });

    const matchResults = groupMatchedRecipes(recipes, expandedFridgeList, expandedIgnoreList);

    res.render('fridge/index', {
      fridgeIngredients: ingredients,
      ignoreText,
      ignorePlaceholder: getIgnorePlaceholder(req),
      matchResults,
      hasMatched: true
    });
  } catch (err) {
    console.error(err);
    res.redirect('/fridge');
  }
};
