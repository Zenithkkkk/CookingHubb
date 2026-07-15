const DEFAULT_IGNORE = ['油', '盐', '糖', '生抽', '醋'];
const { ingredientMatches } = require('./ingredientBilingual');

function normalize(value) {
  return String(value || '').trim().toLowerCase();
}

function parseIngredientList(raw) {
  if (!raw || typeof raw !== 'string') return [];
  return raw
    .split(/[,，、\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function getIgnoreList(ignoreText) {
  const parsed = parseIngredientList(ignoreText);
  const merged = DEFAULT_IGNORE.slice();

  parsed.forEach((item) => {
    const normalized = normalize(item);
    if (!normalized) return;

    const alreadyIncluded = merged.some((existing) => normalize(existing) === normalized);
    if (!alreadyIncluded) {
      merged.push(item);
    }
  });

  return merged;
}

function isIgnored(ingredient, ignoreList) {
  const normalized = normalize(ingredient);
  if (!normalized) return true;

  return ignoreList.some((ignoreItem) => ingredientMatches(ingredient, ignoreItem));
}

function fridgeHasIngredient(recipeIngredient, fridgeList) {
  const recipeNormalized = normalize(recipeIngredient);
  if (!recipeNormalized) return false;

  return fridgeList.some((fridgeItem) => ingredientMatches(recipeIngredient, fridgeItem));
}

function scoreRecipe(recipe, fridgeList, ignoreList) {
  const requiredIngredients = (recipe.ingredients || []).filter(
    (ingredient) => !isIgnored(ingredient, ignoreList)
  );

  if (requiredIngredients.length === 0) {
    return null;
  }

  const ownedCount = requiredIngredients.filter((ingredient) =>
    fridgeHasIngredient(ingredient, fridgeList)
  ).length;

  const score = Math.round((ownedCount / requiredIngredients.length) * 100);
  const missing = requiredIngredients.filter(
    (ingredient) => !fridgeHasIngredient(ingredient, fridgeList)
  );

  return {
    score,
    ownedCount,
    totalCount: requiredIngredients.length,
    missing
  };
}

function groupMatchedRecipes(recipes, fridgeList, ignoreList) {
  const grouped = {
    perfect: [],
    almost: [],
    inspiration: []
  };

  recipes.forEach((recipe) => {
    const result = scoreRecipe(recipe, fridgeList, ignoreList);
    if (!result || result.score < 30) return;

    const entry = {
      recipe,
      score: result.score,
      missing: result.missing
    };

    if (result.score === 100) {
      grouped.perfect.push(entry);
    } else if (result.score >= 60) {
      grouped.almost.push(entry);
    } else {
      grouped.inspiration.push(entry);
    }
  });

  const byScoreDesc = (a, b) => b.score - a.score;
  grouped.perfect.sort(byScoreDesc);
  grouped.almost.sort(byScoreDesc);
  grouped.inspiration.sort(byScoreDesc);

  return grouped;
}

module.exports = {
  DEFAULT_IGNORE,
  parseIngredientList,
  getIgnoreList,
  groupMatchedRecipes
};
