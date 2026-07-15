const { translateText } = require('./translate');
const { getIngredientVariants } = require('./ingredientBilingual');

const translationCache = new Map();
const TARGET_LANGS = ['en', 'zh', 'de', 'es'];

async function translateIngredientCached(name, targetLang) {
  const trimmed = String(name || '').trim();
  if (!trimmed) return '';

  const cacheKey = `${trimmed.toLowerCase()}::${targetLang}`;
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey);
  }

  try {
    const translated = await translateText(trimmed, targetLang);
    const result = typeof translated === 'string' ? translated.trim() : '';
    translationCache.set(cacheKey, result);
    return result;
  } catch (err) {
    translationCache.set(cacheKey, '');
    return '';
  }
}

async function expandIngredientsForMatching(items) {
  const expanded = new Set();

  for (const item of items) {
    getIngredientVariants(item).forEach((variant) => expanded.add(variant));

    for (const lang of TARGET_LANGS) {
      const translated = await translateIngredientCached(item, lang);
      if (translated) {
        getIngredientVariants(translated).forEach((variant) => expanded.add(variant));
      }
    }
  }

  return [...expanded];
}

module.exports = {
  expandIngredientsForMatching
};
