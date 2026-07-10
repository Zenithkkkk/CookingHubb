require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');
const User = require('../models/User');
const { buildTagsSearchTerms } = require('../config/tagSearch');

const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URI;

const AUTHOR_PHONE = '+491623072027';

const chefRecipes = [
  {
    title: '广东药膳原盅炖鸡汤',
    description: `1、备料：洗净半只散养土鸡，斩成大块，冷水下锅加入姜片和料酒焯水，大火烧开撇去浮沫后捞出，用温水洗净备用。
2、准备药膳：准备党参、黄芪、红枣（去核以免上火）、枸杞和无花果干，用清水冲洗掉表面灰尘。
3、原盅入汤：将焯好的鸡块和药膳一同放入陶瓷炖盅，加入足量纯净水（水量刚好没过食材即可，不要加太满）。
4、隔水慢炖：将炖盅放入大锅中，大锅内加水，盖上锅盖。隔水用小火慢炖 2 到 3 小时，锁住鸡肉和药膳的全部精华。
5、调味：出锅前 5 分钟加入适量盐调味即可。汤色金黄清澈，原汁原味，极具滋补功效。`,
    category: 'Dinner',
    tags: ['广东菜', '药膳', '鸡汤', '滋补', '高蛋白'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6-qEACiYmbUblpFL8RgcEED6ArPP74Tkk0-ZuVQ_jJQ&s=10'
  },
  {
    title: '照烧汁香煎三文鱼',
    description: `1、处理鱼肉：将三文鱼柳洗净，用厨房纸彻底吸干表面的水分，撒上少许海盐和现磨黑胡椒，抹匀后静置腌制 10 分钟。
2、调制照烧汁：准备一个小碗，加入 2 勺生抽、1 勺料酒、1 勺蜂蜜（或零卡糖）和半勺清水，搅拌均匀备用。
3、小火慢煎：平底锅喷少许橄榄油，中大火烧热后转中小火，将三文鱼“皮朝下”放入，慢煎 3 分钟直到鱼皮焦脆。轻轻翻面，继续煎 2 分钟至八分熟。
4、挂汁出锅：将调好的照烧汁倒入锅中，转大火收汁。用勺子将冒泡的汤汁不断浇在鱼肉表面，直到酱汁变得浓稠并完美包裹住鱼肉，撒上少许白芝麻即可装盘。`,
    category: 'Lunch',
    tags: ['三文鱼', '高蛋白', '减脂餐', '快手菜', '煎烤'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVgts9hOxk6jTqwPBx8AHRbA-at2eWx691ibM23lVAgg&s=10'
  },
  {
    title: '浓郁番茄土豆炖牛腩',
    description: `1、牛腩焯水：将 500g 牛腩切成麻将大小的块，冷水下锅，加葱段、姜片、料酒煮沸，撇出灰褐色浮沫后捞出，用温水洗净（切忌用冷水洗，肉质会紧缩发柴）。
2、炒制番茄底料：3 个大番茄去皮切小丁。热锅凉油下蒜末爆香，加入番茄丁中火翻炒出浓郁的红油，可加入一勺番茄膏（Tomato Paste）大幅提升风味。
3、炖煮牛腩：将牛腩块倒入番茄汤中翻炒均匀，加入没过食材的热水、2 片香叶和 1 个八角。大火烧开后，转小火加盖炖煮 60 分钟。
4、加入配菜：将 2 个土豆去皮切滚刀块，放入锅中，继续加盖小火炖煮 20 分钟直到土豆软烂入味。
5、大火收汁：挑出香料，加入适量盐和少许生抽调味，开大火收浓汤汁，出锅前撒上一把香菜。`,
    category: 'Dinner',
    tags: ['牛肉', '炖菜', '番茄', '浓郁', '高热量'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNOp5_jL2Dp8-y8UwYZQ4bl85LMyppAdFz1x-h6npBrQ&s=10'
  },
  {
    title: '广式芋头蒸排骨',
    description: `1、处理排骨：将新鲜肋排斩成小块，在清水中浸泡 30 分钟泡出多余血水，捞出后用厨房纸彻底挤干水分。
2、灵魂腌制：排骨中加入一勺蒜蓉、少许姜丝、1 勺生抽、半勺蚝油、少许白糖、适量盐和 1 勺生粉，抓拌至发粘。最后加入 1 勺花生油锁住表面水分，静置腌制 20 分钟。
3、准备芋头：将荔浦芋头去皮，切成约 2 厘米见方的小方块，平铺在深口蒸盘的底部垫底。
4、上锅蒸制：将腌制好的排骨平铺在芋头上，尽量铺开不要重叠。蒸锅水开后，放上蒸盘，大火蒸 15 到 20 分钟（视排骨大小而定）。
5、出锅点缀：取出后撒上少许葱花点缀。底部的芋头吸满了排骨流下的鲜甜肉汁，排骨鲜嫩爽滑、轻松脱骨。`,
    category: 'Lunch',
    tags: ['广东菜', '排骨', '蒸菜', '鲜嫩', '早茶'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-EEqbSAe3uPpG7ApIst_MfNwXq_X5z9d15pPBzXyhIw&s=10'
  },
  {
    title: '经典广式滑蛋虾仁',
    description: `1、处理虾仁：新鲜基围虾去壳去虾线洗净，用少许盐、白胡椒粉和半勺淀粉抓匀腌制 10 分钟。热锅倒一点温油，将虾仁快速滑熟至变色，立刻捞出备用。
2、调制蛋液：碗中打入 4 个新鲜鸡蛋，加入少许盐、葱花，以及 2 勺水淀粉（淀粉与水的比例为 1:2），加入水淀粉是鸡蛋滑嫩的秘诀。用筷子彻底打散。
3、混合食材：将放凉的虾仁倒入打好的蛋液中，轻轻拌匀。
4、滑炒出锅：重新起锅烧热，倒入稍微多一点的食用油。油温 4 成热（手放锅上方感觉到微热）时倒入虾仁蛋液。不要立刻翻动，等底部微微凝固后，用锅铲从边缘向中心慢慢推炒。蛋液七八分熟时即可关火，利用锅的余温焖熟，口感最佳。`,
    category: 'Breakfast',
    tags: ['鸡蛋', '海鲜', '广东菜', '高蛋白', '快手菜'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKArx7h0gnGUzY1rPWk8wyounTlRwg1SvtKkaz39DmUw&s=10'
  },
  {
    title: '蒜蓉西蓝花炒鸡胸肉丁',
    description: `1、鸡胸肉切丁：将 200g 鸡胸肉切成 1.5 厘米见方的肉丁，加入 1 勺生抽、半勺料酒、少许盐、黑胡椒和 1 勺水淀粉抓匀，腌制 15 分钟使其滑嫩。
2、西蓝花焯水：西蓝花切小朵，在淡盐水中浸泡 10 分钟洗净。锅中水烧开，滴入几滴食用油和一点盐，放入西蓝花焯水 1 分钟后捞出过凉水，这样能保持颜色翠绿且口感脆爽。
3、滑炒鸡丁：热锅少油，下入腌好的鸡丁，大火快速滑炒至表面变白，盛出备用。
4、蒜香混炒：锅中留底油，放入大量蒜蓉爆出香味。倒入焯好的西蓝花和鸡丁一起翻炒，加入 1 勺蚝油提鲜，大火翻炒 30 秒使味道融合即可出锅。`,
    category: 'Lunch',
    tags: ['鸡肉', '减脂餐', '蔬菜', '高蛋白', '健身饮食'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzTRqLJEmkR8zcaPC4M8uRGo88Q6A1KtIoMwNA0GUAkg&s'
  },
  {
    title: '经典广式肉沫蒸水蛋',
    description: `1、打蛋液：将 3 个鸡蛋打入碗中，加入少许盐彻底打散。准备温水（蛋液与水的体积比例约为 1:1.5），将温水边倒入蛋液边快速搅拌。
2、过滤上锅：将混合好的蛋液用细滤网过滤到蒸碗中撇去浮沫，盖上耐高温保鲜膜并在表面扎几个小孔透气。蒸锅水烧开后放入蒸碗，中火蒸 10 到 12 分钟直到表面完全凝固。
3、炒制肉沫：蒸蛋期间，热锅少油下入 100g 猪肉沫煸炒出油脂，加入蒜末、1 勺生抽、半勺老抽炒香上色。加入少许清水煮沸，淋入水淀粉勾薄芡，让汤汁变得粘稠浓郁。
4、完美组合：将蒸好的水蛋取出，撕掉保鲜膜，将炒好的酱汁肉沫均匀地平铺在水蛋表面，最后撒上少许葱花点缀。`,
    category: 'Dinner',
    tags: ['鸡蛋', '猪肉', '广东菜', '蒸菜', '传统'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0oGzFHFLUjgNvhGkOng5Yd1O5FyP5uje9B4X8hCw5ZQ&s=10'
  },
  {
    title: '黑椒牛肉炒鲜乌冬',
    description: `1、牛肉处理：牛里脊切薄片，加入 1 勺生抽、半勺老抽、少许白糖、一小勺淀粉和大量现磨黑胡椒碎，抓匀后加一小勺食用油封层，腌制 15 分钟。
2、乌冬焯水：将鲜乌冬面放入开水锅中烫 1 分钟，用筷子轻轻拨散后立刻捞出，过冷水冲凉并沥干水分备用。
3、准备配菜：将半个洋葱切细丝，半个青椒和半个红椒切丝备用。
4、猛火快炒：热锅凉油，下入牛肉片大火滑炒至表面刚变色盛出。利用底油炒香洋葱丝和青红椒丝，接着倒入沥干的乌冬面和滑好的牛肉。
5、调味收汁：加入 1 勺生抽、1 勺蚝油，再补入多一点的黑胡椒碎。全程开大火快速翻炒均匀，让乌冬面充分吸满黑椒肉汁，出锅前淋入少许芝麻香油。`,
    category: 'Lunch',
    tags: ['乌冬面', '牛肉', '炒面', '快手菜', '浓郁'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuC4sUUFETBfzPx4Iu_OGVE1b0RGMdtIPeFzeNeOJwKQ&s=10'
  },
  {
    title: '懒人版空气炸锅脆皮烧肉',
    description: `1、五花肉焯水：挑选一块带皮的精良五花肉（约 500g），冷水下锅加入葱、姜、料酒，中小火煮 15 分钟至七分熟，捞出后用厨房纸彻底擦干表面的水分。
2、扎孔去腥：用专用松肉针（或一把牙签）在猪皮表面密密麻麻地扎孔（孔越密，烤出来的皮越脆）。在瘦肉部分横竖切几刀以便入味，但千万不要切断猪皮。
3、秘制腌料：用五香粉、盐、糖、少许生抽混合成酱，抹在瘦肉和侧面（千万不要抹到猪皮上）。在猪皮表面刷一层白醋，并铺上厚厚一层粗盐。将肉放在冰箱冷藏风干 2 小时。
4、初次烤制：用锡纸将瘦肉部分包裹起来，只露出铺满盐的猪皮。放入空气炸锅，200 度烤 20 分钟。取出后，将猪皮表面结块的粗盐整块刮掉。
5、二次爆皮：再次放入空气炸锅（保持锡纸包裹），200 度继续烤 15 到 20 分钟，直到猪皮表面完全爆开，呈现金黄焦脆的蜂窝状。取出放凉 10 分钟后切块，蘸白糖或黄芥末酱食用。`,
    category: 'Dinner',
    tags: ['猪肉', '广东菜', '空气炸锅', '烧腊', '脆皮'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmy_E8vhewfpqZdbr9kItbxiBamVDzr5bogGX15LY6Ag&s=10'
  },
  {
    title: '豆腐鲜虾海带清汤',
    description: `1、食材准备：鲜虾 10 只去壳去虾线，保留虾头备用。一盒嫩豆腐（内酯豆腐）切成小方块，干海带结提前用清水泡发洗净。
2、炼制虾油：热锅加少许底油，放入姜丝和留用的虾头，小火慢煎。用锅铲用力按压虾头，挤出红色的虾脑。煎出红亮鲜香的虾油后，将虾头捞出丢弃。
3、煮制底汤：在红亮的虾油中直接加入一大碗刚烧开的开水（必须是开水，汤色才会浓白鲜亮），下入泡发好的海带结中火煮 5 分钟。
4、下豆腐和虾仁：将嫩豆腐块轻轻滑入锅中，接着放入处理好的虾仁，保持中火继续煮 3 分钟，直到虾仁变红卷曲。
5、清淡调味：出锅前加入适量食盐，撒上一点白胡椒粉增香，最后点缀少许香菜或葱花。整碗汤极具饱腹感，清甜鲜美。`,
    category: 'Drink',
    tags: ['海鲜', '汤品', '豆腐', '高蛋白', '减脂'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGqaRC9_SuAXXm6iU0wgOm0lGulW7wUFIi8pWl21Vg_Q&s=10'
  }
];

async function seed() {
  if (!MONGODB_URI) {
    throw new Error('Missing MONGODB_URI or MONGO_URI in environment variables.');
  }

  await mongoose.connect(MONGODB_URI);

  const author = await User.findOne({ phone: AUTHOR_PHONE });
  if (!author) {
    throw new Error(`Author not found for phone ${AUTHOR_PHONE}`);
  }

  console.log(`Author: ${author.username} (${author._id})`);

  const existingTitles = new Set(
    (await Recipe.find({ title: { $in: chefRecipes.map((r) => r.title) } }, 'title')).map((r) => r.title)
  );

  let added = 0;
  for (const data of chefRecipes) {
    if (existingTitles.has(data.title)) {
      console.log(`Skip (exists): ${data.title}`);
      continue;
    }

    const tagsSearchTerms = await buildTagsSearchTerms(data.tags);
    const recipe = await Recipe.create({
      title: data.title,
      description: data.description,
      category: data.category,
      tags: data.tags,
      tagsSearchTerms,
      author: author._id,
      image: data.image,
      imageThumb: data.image
    });

    console.log(`Added: ${recipe.title} -> /recipes/${recipe.slug}`);
    added++;
  }

  console.log(`Done! Added ${added} recipe(s).`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
