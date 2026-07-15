const { INGREDIENT_ALIASES, simplifyIngredientList } = require('./ingredientSimplify');

const EXTRA_CANONICAL_INGREDIENTS = [
  '猪肉', '牛肉', '牛腩', '鸡胸', '鸡腿', '鸡', '鱼', '虾', '鸡蛋', '豆腐',
  '番茄', '土豆', '洋葱', '姜', '葱', '蒜', '辣椒', '西兰花', '油菜', '萝卜',
  '白萝卜', '香菇', '金针菇', '节瓜', '芋头', '粉丝', '河粉', '乌冬面', '面条',
  '米', '豆芽', '韭黄', '柠檬', '枸杞', '红枣', '党参', '黄芪', '陈皮', '红豆',
  '腊肠', '腊肉', '五花肉', '排骨', '三文鱼', '海带', '虾米', '无花果', '香菜',
  '盐', '糖', '油', '生抽', '老抽', '蚝油', '料酒', '醋', '淀粉', '胡椒', '水',
  '鸡汤', '海鲜酱', '南乳', '五香粉', '沙姜', '沙姜粉', '米酒', '鸡精', '白芝麻',
  '韩式辣酱', '辣酱', '辣白菜', '姜黄', '香叶', '八角', '小苏打', '蜂蜜',
  'chicken', 'beef', 'pork', 'egg', 'tomato', 'onion', 'garlic', 'ginger',
  'salmon', 'broccoli', 'rice', 'noodle', 'tofu', 'salt', 'sugar', 'oil',
  'soy sauce', 'vinegar', 'pepper', 'water'
];

function buildSearchTerms() {
  const terms = new Set(EXTRA_CANONICAL_INGREDIENTS);

  Object.entries(INGREDIENT_ALIASES).forEach(([alias, canonical]) => {
    terms.add(alias);
    terms.add(canonical);
  });

  return [...terms].sort((a, b) => b.length - a.length);
}

const SEARCH_TERMS = buildSearchTerms();

function extractIngredientsFromDescription(description) {
  const text = String(description || '').trim();
  if (!text) return [];

  const usedRanges = [];
  const found = [];

  SEARCH_TERMS.forEach((term) => {
    if (!term) return;

    let startIndex = 0;
    while (startIndex < text.length) {
      const index = text.indexOf(term, startIndex);
      if (index === -1) break;

      const endIndex = index + term.length;
      const overlaps = usedRanges.some(([start, end]) => index < end && endIndex > start);
      if (!overlaps) {
        usedRanges.push([index, endIndex]);
        found.push({ term, index });
      }

      startIndex = index + 1;
    }
  });

  found.sort((a, b) => a.index - b.index);
  return simplifyIngredientList(found.map((entry) => entry.term));
}

module.exports = {
  extractIngredientsFromDescription
};
