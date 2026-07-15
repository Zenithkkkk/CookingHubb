require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');
const { simplifyIngredientList } = require('../config/ingredientSimplify');

const INGREDIENTS_BY_TITLE = {
  'Glazed Char Siu': [
    '猪肩肉', '海鲜酱', '生抽', '蚝油', '南乳', '五香粉', '白糖', '蜂蜜/麦芽糖'
  ],
  'Authentic Hainanese Chicken Rice': [
    '整鸡', '姜', '葱', '茉莉香米', '大蒜', '姜黄粉', '鸡油', '盐'
  ],
  'Pan-Seared Garlic Butter Salmon': [
    '三文鱼柳', '盐', '黑胡椒', '橄榄油', '黄油', '大蒜'
  ],
  'Classic Stir-Fried Beef and Broccoli': [
    '牛肉', '生抽', '玉米淀粉', '芝麻油', '西兰花', '蚝油'
  ],
  'Steamed Fish': [
    '整尾白鱼（如鲈鱼）', '姜', '葱', '生抽', '食用油'
  ],
  'Beef Chow Fun': [
    '牛肉', '生抽', '玉米淀粉', '河粉', '绿豆芽', '葱', '蚝油'
  ],
  'Cantonese White Cut Chicken with Ginger Scallion Oil': [
    '走地鸡', '姜', '葱', '盐', '花生油'
  ],
  'Claypot Rice with Chinese Sausage (Lap Mei Fan)': [
    '茉莉香米', '广式腊肠', '腊肉', '生抽', '葱', '姜'
  ],
  'Dim Sum Style Garlic Steamed Ribs': [
    '猪肋排', '蒜蓉', '盐', '白糖', '白胡椒粉', '马铃薯淀粉', '食用油'
  ],
  '减脂番茄牛肉乌冬面': [
    '瘦牛肉', '番茄', '乌冬面', '大蒜', '橄榄油', '小油菜', '生抽', '玉米淀粉', '黑胡椒', '盐', '白胡椒粉'
  ],
  '网红公瑾爆蛋': [
    '鸡蛋', '生抽', '老抽', '蚝油', '白糖', '大蒜', '葱花', '小米辣', '清水'
  ],
  '香水柠檬炒鸡腿肉': [
    '去骨鸡腿肉', '香水柠檬', '大蒜', '小米辣', '生抽', '料酒', '黑胡椒', '蚝油', '白糖'
  ],
  '微波炉 5 分钟无油酱油鸡腿': [
    '鸡腿', '减盐生抽', '老抽', '料酒', '姜', '葱'
  ],
  '鸡汤乌冬面': [
    '清鸡汤', '鲜香菇', '枸杞', '乌冬面', '鸡胸肉丝', '嫩油菜', '盐', '葱花', '芝麻香油'
  ],
  '盐葱鸡腿饭': [
    '去骨鸡腿', '大米', '葱', '姜', '盐', '鸡精', '白胡椒粉', '食用油'
  ],
  '韩式泡菜金针菇炒乌冬': [
    '乌冬面', '瘦肉丝', '大蒜', '金针菇', '韩式辣白菜', '生抽', '韩式辣酱', '白芝麻'
  ],
  '广东药膳原盅炖鸡汤': [
    '散养土鸡', '党参', '黄芪', '红枣', '枸杞', '无花果干', '姜', '料酒', '盐', '纯净水'
  ],
  '照烧汁香煎三文鱼': [
    '三文鱼柳', '海盐', '黑胡椒', '橄榄油', '生抽', '料酒', '蜂蜜', '白芝麻'
  ],
  '浓郁番茄土豆炖牛腩': [
    '牛腩', '番茄', '土豆', '大蒜', '葱段', '姜', '料酒', '番茄膏', '香叶', '八角', '生抽', '盐', '香菜'
  ],
  '广式芋头蒸排骨': [
    '猪肋排', '荔浦芋头', '蒜蓉', '姜丝', '生抽', '蚝油', '白糖', '盐', '生粉', '花生油', '葱花'
  ],
  '经典广式滑蛋虾仁': [
    '基围虾', '鸡蛋', '盐', '白胡椒粉', '淀粉', '葱花', '水淀粉', '食用油'
  ],
  '蒜蓉西蓝花炒鸡胸肉丁': [
    '鸡胸肉', '西蓝花', '大蒜', '生抽', '料酒', '盐', '黑胡椒', '水淀粉', '蚝油'
  ],
  '经典广式肉沫蒸水蛋': [
    '鸡蛋', '温水', '盐', '猪肉沫', '大蒜', '生抽', '老抽', '水淀粉', '葱花'
  ],
  '黑椒牛肉炒鲜乌冬': [
    '牛里脊', '鲜乌冬面', '洋葱', '青椒', '红椒', '生抽', '老抽', '白糖', '淀粉', '黑胡椒碎', '蚝油', '芝麻香油'
  ],
  '豆腐鲜虾海带清汤': [
    '鲜虾', '嫩豆腐', '干海带结', '姜', '盐', '白胡椒粉', '香菜'
  ],
  '懒人版空气炸锅脆皮烧肉': [
    '带皮五花肉', '葱', '姜', '料酒', '五香粉', '盐', '白糖', '生抽', '白醋', '粗盐'
  ],
  '传统广式沙姜焗鸡': [
    '三黄鸡', '生抽', '老抽', '盐', '淀粉', '沙姜粉', '新鲜沙姜', '红葱头', '大蒜', '花生油', '米酒', '葱花'
  ],
  '经典蒜蓉粉丝蒸大虾': [
    '大虾', '绿豆粉丝', '大蒜', '生抽', '蚝油', '白糖', '食用油', '葱花'
  ],
  '鲜辣杭椒炒牛柳': [
    '牛里脊', '杭椒', '生抽', '老抽', '料酒', '小苏打', '水淀粉', '大蒜', '姜', '蚝油', '盐', '黑胡椒'
  ],
  '广式萝卜清汤牛腩': [
    '牛腩', '白萝卜', '姜', '料酒', '葱结', '八角', '白胡椒粒', '盐', '香菜', '葱花'
  ],
  '鲜滑虾仁玉子豆腐': [
    '玉子豆腐', '鲜虾', '大蒜', '生抽', '蚝油', '白糖', '玉米淀粉', '盐', '料酒', '白胡椒粉', '葱花'
  ],
  '广式豉油皇炒面': [
    '广式生面/碱水面', '生抽', '老抽', '蚝油', '白糖', '香油', '绿豆芽', '韭黄', '洋葱'
  ],
  '嫩滑香菇滑鸡煲': [
    '鸡腿肉', '干香菇', '生抽', '蚝油', '老抽', '白糖', '姜', '生粉', '大蒜', '红葱头'
  ],
  '老广陈皮红豆沙': [
    '红豆', '新会陈皮', '老冰糖', '清水'
  ],
  '虾米粉丝节瓜煲': [
    '节瓜', '干粉丝', '干虾米', '姜', '大蒜', '鸡汤', '盐', '白胡椒粉', '葱花'
  ],
  '广式生滚窝蛋牛肉粥': [
    '大米', '牛里脊', '可生食鸡蛋', '姜', '生抽', '盐', '白胡椒粉', '生粉', '食用油', '葱花', '香菜'
  ]
};

async function main() {
  await mongoose.connect(process.env.MONGO_URI);

  const recipes = await Recipe.find({});
  let updated = 0;
  let skipped = 0;
  let missing = 0;

  for (const recipe of recipes) {
    const ingredients = INGREDIENTS_BY_TITLE[recipe.title];
    if (!ingredients) {
      console.log(`Missing mapping: ${recipe.title}`);
      missing++;
      continue;
    }

    if (recipe.ingredients && recipe.ingredients.length > 0) {
      console.log(`Skip (already has ingredients): ${recipe.title}`);
      skipped++;
      continue;
    }

    recipe.ingredients = simplifyIngredientList(ingredients);
    await recipe.save();
    console.log(`Updated: ${recipe.title} (${ingredients.length} items)`);
    updated++;
  }

  console.log(`Done! Updated ${updated}, skipped ${skipped}, missing ${missing}.`);
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
