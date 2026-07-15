const INGREDIENT_ALIASES = {
  '三文鱼柳': '三文鱼',
  '三黄鸡': '鸡',
  '减盐生抽': '生抽',
  '去骨鸡腿肉': '鸡腿',
  '可生食鸡蛋': '鸡蛋',
  '基围虾': '虾',
  '大虾': '虾',
  '鲜虾': '虾',
  '姜丝': '姜',
  '嫩油菜': '油菜',
  '小油菜': '油菜',
  '带皮五花肉': '五花肉',
  '干海带结': '海带',
  '干粉丝': '粉丝',
  '广式生面/碱水面': '面条',
  '散养土鸡': '鸡',
  '整尾白鱼（如鲈鱼）': '鱼',
  '整鸡': '鸡',
  '新会陈皮': '陈皮',
  '新鲜沙姜': '沙姜',
  '无花果干': '无花果',
  '杭椒': '辣椒',
  '橄榄油': '油',
  '水淀粉': '淀粉',
  '海盐': '盐',
  '清鸡汤': '鸡汤',
  '温水': '水',
  '清水': '水',
  '纯净水': '水',
  '牛里脊': '牛肉',
  '瘦牛肉': '牛肉',
  '猪肉沫': '猪肉',
  '猪肋排': '排骨',
  '猪肩肉': '猪肉',
  '玉子豆腐': '豆腐',
  '嫩豆腐': '豆腐',
  '玉米淀粉': '淀粉',
  '生粉': '淀粉',
  '马铃薯淀粉': '淀粉',
  '番茄膏': '番茄',
  '瘦肉丝': '猪肉',
  '白糖': '糖',
  '老冰糖': '糖',
  '蜂蜜': '糖',
  '蜂蜜/麦芽糖': '糖',
  '白胡椒粉': '胡椒',
  '白胡椒粒': '胡椒',
  '黑胡椒': '胡椒',
  '黑胡椒碎': '胡椒',
  '白醋': '醋',
  '粗盐': '盐',
  '红椒': '辣椒',
  '青椒': '辣椒',
  '小米辣': '辣椒',
  '红葱头': '葱',
  '葱段': '葱',
  '葱结': '葱',
  '葱花': '葱',
  '蒜蓉': '蒜',
  '芝麻油': '油',
  '芝麻香油': '油',
  '花生油': '油',
  '食用油': '油',
  '鸡油': '油',
  '黄油': '油',
  '香油': '油',
  '茉莉香米': '米',
  '大米': '米',
  '荔浦芋头': '芋头',
  '干虾米': '虾米',
  '广式腊肠': '腊肠',
  '韩式辣酱': '辣酱',
  '姜黄粉': '姜黄',
  '鲜香菇': '香菇',
  '鲜乌冬面': '乌冬面',
  '绿豆粉丝': '粉丝',
  '绿豆芽': '豆芽',
  '西蓝花': '西兰花',
  '走地鸡': '鸡',
  '韩式辣白菜': '辣白菜',
  '香水柠檬': '柠檬',
  '鸡胸肉丝': '鸡胸',
  '鸡胸肉': '鸡胸',
  '鸡腿肉': '鸡腿',
  '去骨鸡腿': '鸡腿'
};

function simplifyIngredient(name) {
  const trimmed = String(name || '').trim();
  if (!trimmed) return trimmed;
  return INGREDIENT_ALIASES[trimmed] || trimmed;
}

function simplifyIngredientList(ingredients) {
  if (!Array.isArray(ingredients)) return [];

  const seen = new Set();
  const result = [];

  ingredients.forEach((item) => {
    const simplified = simplifyIngredient(item);
    if (!simplified) return;

    const key = simplified.toLowerCase();
    if (seen.has(key)) return;

    seen.add(key);
    result.push(simplified);
  });

  return result;
}

module.exports = {
  INGREDIENT_ALIASES,
  simplifyIngredient,
  simplifyIngredientList
};
