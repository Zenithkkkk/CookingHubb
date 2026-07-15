const { simplifyIngredient } = require('./ingredientSimplify');

const INGREDIENT_GROUPS = [
  ['油', 'oil', 'olive oil', 'vegetable oil', 'cooking oil', 'sesame oil', 'butter'],
  ['盐', 'salt', 'sea salt'],
  ['糖', 'sugar', 'honey', 'rock sugar'],
  ['生抽', 'soy sauce', 'light soy sauce', 'shoyu'],
  ['醋', 'vinegar', 'rice vinegar'],
  ['鸡蛋', 'egg', 'eggs'],
  ['鸡腿', 'chicken leg', 'chicken drumstick', 'drumstick'],
  ['鸡胸', 'chicken breast'],
  ['鸡', 'chicken', 'whole chicken'],
  ['牛肉', 'beef'],
  ['牛腩', 'beef brisket', 'brisket'],
  ['猪肉', 'pork', 'minced pork', 'ground pork'],
  ['排骨', 'pork ribs', 'ribs', 'spare ribs'],
  ['五花肉', 'pork belly'],
  ['三文鱼', 'salmon', 'salmon fillet'],
  ['虾', 'shrimp', 'prawn', 'prawns'],
  ['鱼', 'fish', 'white fish', 'sea bass'],
  ['豆腐', 'tofu', 'bean curd'],
  ['番茄', 'tomato', 'tomatoes'],
  ['土豆', 'potato', 'potatoes'],
  ['姜', 'ginger'],
  ['葱', 'scallion', 'green onion', 'spring onion'],
  ['蒜', 'garlic'],
  ['辣椒', 'chili', 'chilli', 'hot pepper'],
  ['西兰花', 'broccoli'],
  ['米', 'rice'],
  ['乌冬面', 'udon', 'udon noodles'],
  ['河粉', 'rice noodles', 'ho fun'],
  ['面条', 'noodles', 'pasta'],
  ['粉丝', 'vermicelli', 'glass noodles'],
  ['淀粉', 'starch', 'cornstarch', 'corn starch'],
  ['胡椒', 'pepper', 'black pepper', 'white pepper'],
  ['料酒', 'cooking wine', 'shaoxing wine'],
  ['米酒', 'rice wine', 'mirin'],
  ['老抽', 'dark soy sauce'],
  ['蚝油', 'oyster sauce'],
  ['水', 'water'],
  ['鸡汤', 'chicken broth', 'chicken stock'],
  ['香菇', 'mushroom', 'shiitake', 'dried mushroom'],
  ['枸杞', 'goji', 'goji berry'],
  ['柠檬', 'lemon'],
  ['油菜', 'bok choy', 'choy sum'],
  ['豆芽', 'bean sprouts'],
  ['洋葱', 'onion', 'onions'],
  ['芋头', 'taro'],
  ['海带', 'kelp', 'seaweed'],
  ['腊肠', 'chinese sausage', 'lap cheong'],
  ['腊肉', 'cured pork', 'cured meat'],
  ['香菜', 'cilantro', 'coriander'],
  ['八角', 'star anise'],
  ['香叶', 'bay leaf'],
  ['五香粉', 'five spice', 'five-spice powder'],
  ['陈皮', 'dried tangerine peel'],
  ['党参', 'codonopsis'],
  ['黄芪', 'astragalus'],
  ['红枣', 'red dates', 'jujube'],
  ['红豆', 'red bean', 'adzuki bean'],
  ['节瓜', 'hairy gourd', 'fuzzy melon'],
  ['金针菇', 'enoki', 'enoki mushroom'],
  ['辣白菜', 'kimchi'],
  ['虾米', 'dried shrimp'],
  ['无花果', 'fig', 'dried fig'],
  ['白芝麻', 'sesame seeds', 'white sesame'],
  ['鸡精', 'chicken powder', 'chicken bouillon'],
  ['小苏打', 'baking soda'],
  ['姜黄', 'turmeric'],
  ['沙姜', 'sand ginger'],
  ['沙姜粉', 'sand ginger powder'],
  ['海鲜酱', 'hoisin sauce'],
  ['南乳', 'fermented tofu'],
  ['辣酱', 'chili sauce', 'hot sauce', 'gochujang'],
  ['韩式辣酱', 'korean chili paste'],
  ['韭黄', 'yellow chives'],
  ['白萝卜', 'daikon', 'white radish'],
  ['萝卜', 'radish']
];

const normalizedIndex = new Map();

function normalize(value) {
  return String(value || '').trim().toLowerCase();
}

INGREDIENT_GROUPS.forEach((group) => {
  const variantSet = new Set();

  group.forEach((item) => {
    const simplified = simplifyIngredient(item);
    [item, simplified].forEach((variant) => {
      const trimmed = String(variant || '').trim();
      if (trimmed) variantSet.add(trimmed);
    });
  });

  variantSet.forEach((variant) => {
    normalizedIndex.set(normalize(variant), variantSet);
  });
});

function getIngredientVariants(name) {
  const variants = new Set();
  const simplified = simplifyIngredient(name);

  [name, simplified].forEach((item) => {
    const trimmed = String(item || '').trim();
    if (!trimmed) return;
    variants.add(trimmed);

    const groupSet = normalizedIndex.get(normalize(trimmed));
    if (groupSet) {
      groupSet.forEach((variant) => variants.add(variant));
    }
  });

  return [...variants].filter(Boolean);
}

function ingredientMatches(a, b) {
  const variantsA = getIngredientVariants(a);
  const variantsB = getIngredientVariants(b);

  for (const left of variantsA) {
    const leftNorm = normalize(left);
    if (!leftNorm) continue;

    for (const right of variantsB) {
      const rightNorm = normalize(right);
      if (!rightNorm) continue;

      if (
        leftNorm === rightNorm ||
        leftNorm.includes(rightNorm) ||
        rightNorm.includes(leftNorm)
      ) {
        return true;
      }
    }
  }

  return false;
}

module.exports = {
  getIngredientVariants,
  ingredientMatches
};
