const { translateText } = require('./translate');

const TAG_LANGUAGES = ['en', 'de', 'es', 'zh'];

// Synonym groups: searching any term matches recipes tagged with any other term in the group
const TAG_SYNONYM_GROUPS = [
  ['cantonese', '广式', 'cantonesisch', 'cantonés', '粤菜', 'guangdong', '广东'],
  ['chinese', '中式', '中国菜', 'chinesisch', 'chino', 'china'],
  ['traditional', '传统', 'traditionell', 'tradicional'],
  ['chicken', '鸡', '鸡肉', 'hähnchen', 'pollo'],
  ['seafood', '海鲜', 'meeresfrüchte', 'mariscos', 'sea food'],
  ['vegetarian', '素食', 'vegetarisch', 'vegetariano'],
  ['vegan', '纯素', 'vegano'],
  ['quick', '快速', '快手', 'schnell', 'rápido', 'quick meal'],
  ['healthy', '健康', 'gesund', 'saludable'],
  ['spicy', '辣', '辛辣', 'scharf', 'picante', 'hot'],
  ['cold', '冷', '冷盘', 'kalt', 'frío'],
  ['japanese', '日式', '日本', 'japanisch', 'japonés'],
  ['italian', '意式', '意大利', 'italienisch', 'italiano'],
  ['asian', '亚洲', 'asiatisch', 'asiático'],
  ['mediterranean', '地中海', 'mediterran', 'mediterráneo'],
  ['comfort-food', 'comfort food', '暖心', '家常菜', 'comfortfood', 'comida reconfortante'],
  ['baking', '烘焙', 'backen', 'horneado'],
  ['homemade', '自制', '手工', 'hausgemacht', 'casero'],
  ['sweet', '甜', '甜品', 'süß', 'dulce'],
  ['delicious', '美味', '好吃', 'lecker', 'delicioso'],
  ['refreshing', '清爽', 'erfrischend', 'refrescante'],
  ['easy', '简单', '简易', 'einfach', 'fácil'],
  ['party', '聚会', '派对', 'fiesta'],
  ['garlic', '蒜', '大蒜', 'knoblauch', 'ajo'],
  ['grill', '烤', '烧烤', 'parrilla'],
  ['dinner', '晚餐', 'abendessen', 'cena'],
  ['lunch', '午餐', 'mittagessen', 'almuerzo'],
  ['breakfast', '早餐', 'frühstück', 'desayuno'],
  ['dessert', '甜点', 'nachspeise', 'postre'],
  ['snack', '小吃', 'aperitivo'],
  ['drink', '饮品', '饮料', 'getränk', 'bebida'],
  ['soup', '汤', 'suppe', 'sopa'],
  ['noodle', '面', '面条', 'nudel', 'fideo'],
  ['rice', '饭', '米饭', 'reis', 'arroz']
];

const tagLookup = new Map();
TAG_SYNONYM_GROUPS.forEach((group) => {
  group.forEach((term) => {
    tagLookup.set(term.toLowerCase(), group);
  });
});

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getTagSearchTerms(tag) {
  const trimmed = tag.trim();
  if (!trimmed) return [];

  const group = tagLookup.get(trimmed.toLowerCase());
  const terms = new Set([trimmed]);

  if (group) {
    group.forEach((term) => terms.add(term));
  }

  return Array.from(terms);
}

async function addTranslatedTerms(terms, text) {
  const trimmed = String(text || '').trim();
  if (!trimmed) return;

  terms.add(trimmed);

  await Promise.all(TAG_LANGUAGES.map(async (lang) => {
    try {
      const translated = await translateText(trimmed, lang);
      if (translated && translated.trim()) {
        terms.add(translated.trim());
      }
    } catch (_) {
      // Skip failed translation and keep other terms.
    }
  }));
}

async function expandTagSearchTerms(tag) {
  const trimmed = tag.trim();
  if (!trimmed) return [];

  const terms = new Set(getTagSearchTerms(trimmed));
  await addTranslatedTerms(terms, trimmed);
  return Array.from(terms).filter(Boolean);
}

async function buildTagsSearchTerms(tags) {
  const terms = new Set();

  for (const tag of tags) {
    const trimmed = String(tag || '').trim();
    if (!trimmed) continue;

    getTagSearchTerms(trimmed).forEach((term) => terms.add(term));
    await addTranslatedTerms(terms, trimmed);
  }

  return Array.from(terms).filter(Boolean);
}

function buildTagFilterConditionFromTerms(terms) {
  if (!terms.length) return null;

  const matchers = terms.flatMap((term) => [
    { tags: { $regex: escapeRegex(term), $options: 'i' } },
    { tagsSearchTerms: { $regex: escapeRegex(term), $options: 'i' } }
  ]);

  return matchers.length === 1 ? matchers[0] : { $or: matchers };
}

function buildTagFilterCondition(tag) {
  return buildTagFilterConditionFromTerms(getTagSearchTerms(tag));
}

async function buildTagFilterConditionAsync(tag) {
  const terms = await expandTagSearchTerms(tag);
  return buildTagFilterConditionFromTerms(terms);
}

module.exports = {
  TAG_SYNONYM_GROUPS,
  getTagSearchTerms,
  buildTagsSearchTerms,
  expandTagSearchTerms,
  buildTagFilterCondition,
  buildTagFilterConditionAsync
};
