require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');
const User = require('../models/User');
const { buildTagsSearchTerms } = require('../config/tagSearch');

const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URI;
const AUTHOR_USERNAME = 'kkkk_wx';

const recipes = [
  {
    title: '传统广式沙姜焗鸡',
    description: `1、鸡肉处理：选取半只三黄鸡或走地鸡，斩成小块。加入 1 勺生抽、半勺老抽、少许盐、1 勺淀粉和 1 勺沙姜粉，抓拌均匀腌制 20 分钟。
2、准备辅料：新鲜沙姜（这是灵魂，不可用生姜代替）洗净切碎，红葱头去皮切半，大蒜整粒剥好备用。
3、砂锅爆香：在砂锅底部倒入稍微多一点的花生油，放入大蒜、红葱头和新鲜沙姜碎，中火煸炒出浓烈的香气。
4、铺肉慢焗：将腌制好的鸡块平铺在爆香的底料上，尽量不要重叠。盖上砂锅盖，顺着锅盖边缘淋入一圈米酒或广东米酒。
5、中火焖熟：转中小火焖焗 12 到 15 分钟（中途不要开盖），利用砂锅的热力和米酒的蒸汽将鸡肉焗熟。开盖后香气四溢，撒上少许葱段即可连锅端上桌。`,
    category: 'Dinner',
    tags: ['鸡肉', '广东菜', '沙姜', '砂锅', '高蛋白'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9MrioLma2_CPoQ3N_VdhjN-0X0l8VdNuE4fhAxqNoSw&s=10'
  },
  {
    title: '经典蒜蓉粉丝蒸大虾',
    description: `1、泡发粉丝：取一把绿豆粉丝，用温水浸泡 20 分钟至彻底变软，剪成小段后平铺在平底深盘中垫底。
2、处理大虾：新鲜大虾剪去虾须，从背部剖开（不要切断），挑去虾线，用刀背在虾肉上轻轻剁几下防止蒸熟后卷曲。将处理好的大虾平铺在粉丝上。
3、熬制金银蒜酱：大蒜剁成极其细碎的蒜蓉。锅中倒油，先下一半蒜蓉小火炸至金黄色（金蒜），关火后倒入另一半生蒜蓉（银蒜），加入 2 勺生抽、半勺蚝油、少许白糖拌匀。
4、上锅蒸制：将熬好的蒜蓉酱均匀地铺在每一只开背的虾肉上。蒸锅水烧开，放入虾盘，大火蒸 6 到 8 分钟。
5、泼油激香：出锅后在虾表面撒上细碎的葱花，烧两勺滚烫的热油，迅速泼在葱花和蒜蓉上激发出香味即可。`,
    category: 'Dinner',
    tags: ['海鲜', '蒸菜', '蒜蓉', '高蛋白', '宴客菜'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZkpaT4Y4ZMY4yEeiUQ0aImKph5RgAIp-3EWfbMjCSDQ&s=10'
  },
  {
    title: '鲜辣杭椒炒牛柳',
    description: `1、牛柳切条：选取牛里脊（牛柳），逆着纹理切成粗条。加入 1 勺生抽、少许老抽、半勺料酒、少许小苏打（让牛肉滑嫩的关键）和 1 勺水淀粉，抓匀后倒一勺油锁水，腌制 15 分钟。
2、处理杭椒：杭椒洗净，去蒂切成斜长段。如果怕辣，可以将辣椒籽去掉。
3、滑炒牛肉：热锅凉油（油量比平时炒菜多一点），大火下入牛柳迅速滑散，炒至变色（约七分熟）立刻盛出备用，防止肉质变老。
4、干煸杭椒：锅中留底油，下蒜末姜丝爆香，倒入杭椒段，用中火干煸至杭椒表面微微起虎皮皱褶。
5、混合调味：将牛柳重新倒回锅中，加入 1 勺蚝油、少许盐和黑胡椒粉，大火快速翻炒 30 秒使味道融合，立刻出锅。`,
    category: 'Lunch',
    tags: ['牛肉', '炒菜', '高蛋白', '鲜辣', '快手菜'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI-vUoamNZDWMs3CYvlT6URj4_tcs-Po5yhNjGymHdUw&s=10'
  },
  {
    title: '广式萝卜清汤牛腩',
    description: `1、牛腩焯水：将 500g 牛腩切成大块，冷水下锅加入姜片和料酒，大火煮沸后撇去浮沫，捞出用温水冲洗干净。
2、清汤慢炖：将牛腩放入炖锅（最好是砂锅或铸铁锅），加入足量开水，放入姜片、葱结、1 颗八角和 1 小撮白胡椒粒（装在料包里），大火烧开后转小火慢炖 1.5 小时。
3、处理白萝卜：将白萝卜去皮，切成大块（太小容易煮化）。
4、炖煮入味：将萝卜块放入牛腩汤中，继续小火慢炖 40 分钟，直到萝卜变得半透明、筷子能轻松扎透，牛腩也软烂化渣。
5、清淡调味：出锅前挑去葱姜和香料包，只加盐调味。汤头清澈鲜甜，撒上少许香菜和葱花即可。吃的时候可以另外配一碟沙茶酱或酱油辣椒圈蘸牛腩。`,
    category: 'Dinner',
    tags: ['牛肉', '汤品', '萝卜', '广东菜', '滋补'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYrGn-PtYVi1QUJ-VBr4a4oxl7vLIk5OLZLXGeAwJPyA&s=10'
  },
  {
    title: '鲜滑虾仁玉子豆腐',
    description: `1、处理玉子豆腐：将 3 管玉子豆腐（日本豆腐）连包装从中间切开，挤出后切成厚片。平底锅倒油，将豆腐两面煎至金黄微焦，盛出备用。（这一步能防止豆腐在炒的时候碎掉）。
2、腌制虾仁：鲜虾去壳挑虾线，用少许盐、料酒和白胡椒粉腌制 10 分钟。
3、调灵魂料汁：碗中加入 1 勺生抽、1 勺蚝油、半勺白糖、1 勺玉米淀粉和半碗清水，搅匀备用。
4、滑炒虾仁：锅中底油烧热，下入蒜末爆香，倒入虾仁滑炒至变色弯曲。
5、收汁出锅：将煎好的玉子豆腐倒入锅中与虾仁混合，倒入调好的料汁，盖上锅盖中火焖煮 2 分钟让豆腐吸满鲜汤。汤汁浓稠后撒葱花出锅。`,
    category: 'Lunch',
    tags: ['豆腐', '虾仁', '高蛋白', '鲜嫩', '老少皆宜'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfMOVrFIg5AjiXmMqigfKKCgPwfiQqcqxvuhKSvydg6Q&s=10'
  },
  {
    title: '广式豉油皇炒面',
    description: `1、准备面条：选用广式生面或碱水面。锅中水烧开，下入面条煮至 8 分熟（中间还有一点硬芯），捞出立刻过冷水，彻底沥干水分，拌入少许食用油防粘。
2、调制豉油汁：碗中加入 2 勺生抽、1 勺老抽（用于上色）、1 勺蚝油、半勺白糖和少许香油，搅拌至糖融化。
3、准备配菜：绿豆芽洗净沥干，韭黄（或小葱）切成长段，半个洋葱切丝。
4、大火快炒：热锅倒油，先下洋葱丝和绿豆芽大火翻炒断生。
5、加入面条：放入面条，改用筷子和锅铲配合，不断将面条挑起翻炒打散。倒入调好的豉油汁和韭黄段，开最大火快速翻炒，直到面条干香、颜色均匀且有“镬气”，立刻关火盛出。`,
    category: 'Breakfast',
    tags: ['面条', '炒面', '广东菜', '经典', '早餐'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7t_1wdDTihAVLED2KoNrR-a5yoQ8Gqh_RdyvHJQmPIA&s=10'
  },
  {
    title: '嫩滑香菇滑鸡煲',
    description: `1、泡发干香菇：选用优质干香菇（比鲜香菇香味更浓），用温水泡发 1 小时。泡软后洗净切半，保留半碗过滤后的泡香菇水备用。
2、腌制鸡肉：鸡腿去骨切块，加入 1 勺生抽、1 勺蚝油、半勺老抽、少许白糖、姜丝和 1 勺生粉，抓匀后腌制 20 分钟。
3、砂锅爆香：砂锅加热，倒油爆香蒜粒、姜片和红葱头，放入处理好的香菇煸炒出香味。
4、下锅焖煮：将腌好的鸡块倒入砂锅中翻炒至表面变色。倒入那半碗泡香菇的水（水量刚好到食材一半即可）。
5、收汁：盖上砂锅盖，中大火烧开后转小火焖煮 15 分钟。开盖大火稍微收汁，撒上青红椒圈和葱段点缀即可。`,
    category: 'Lunch',
    tags: ['鸡肉', '砂锅', '广东菜', '鲜嫩', '下饭'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJuuTiWm7EDVV9WPhz701_eB9oPkdeixEjcN8h3l2nvQ&s=10'
  },
  {
    title: '老广陈皮红豆沙',
    description: `1、处理红豆：取 200g 红豆，洗净后用清水浸泡过夜，让红豆充分吸水膨胀，更容易煮出沙。
2、处理陈皮：取一小块正宗新会陈皮，用温水浸泡 20 分钟至变软。用刀轻轻刮去陈皮内侧的白色橘络（这部分会发苦），切成细丝。
3、大火沸煮：将泡好的红豆和陈皮丝放入汤锅中，加入约红豆体积 5 倍的清水。大火煮沸后，保持沸腾煮 15 分钟。
4、转小火熬沙：转小火，盖上锅盖慢慢熬煮 1.5 到 2 小时。中途如果水太少可以加开水。煮至红豆完全开裂、汤汁变得浓稠起沙。
5、加糖调味：出锅前 10 分钟加入适量老冰糖（不要早加糖，否则红豆不容易煮烂），搅拌至冰糖融化即可。口感绵密，带有陈皮特有的清香。`,
    category: 'Dessert',
    tags: ['甜品', '广东菜', '红豆', '陈皮', '传统'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZy1XXp3Q1z5cVxbmySekDvZudNTL9O1HfFNuXT3Lo8g&s'
  },
  {
    title: '虾米粉丝节瓜煲',
    description: `1、备料准备：节瓜（毛瓜）去皮洗净，切成粗条或滚刀块。一把干粉丝用冷水泡软。干虾米（海米）用温水洗净浸泡 10 分钟沥干。
2、煸香海味：砂锅中倒少许油，下入切好的姜末、蒜末和泡好的虾米，小火慢煸，直到虾米散发出浓郁的海鲜香气。
3、炒制节瓜：将节瓜块倒入砂锅中，翻炒 1 分钟使其裹上底油。
4、加汤焖煮：倒入一大碗鸡汤或清水（没过节瓜大半即可），大火烧开后转中火焖煮 10 分钟，直到节瓜变软半透明。
5、粉丝收汁：将泡软的粉丝放在节瓜上面，加入少许盐和白胡椒粉调味。盖上锅盖继续焖煮 3 分钟，让粉丝吸满虾米和节瓜的鲜甜汤汁，撒葱花出锅。`,
    category: 'Dinner',
    tags: ['蔬菜', '砂锅', '广东菜', '清淡', '减脂'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlER57ojzqamTFKCOe76Vrac0GVfQTzkGj_wpMOJnLUQ&s=10'
  },
  {
    title: '广式生滚窝蛋牛肉粥',
    description: `1、煮粥底：大米洗净，用少许油和盐腌制 30 分钟（煮出的粥更绵滑）。砂锅水烧开，下入大米，大火煮沸后转小火熬 40 分钟，直到粥底浓稠绵密，米粒开花。
2、腌制牛肉：牛里脊切极薄的片，加入姜丝、1 勺生抽、少许盐、白胡椒粉和 1 勺生粉抓匀，最后加一点油封住水分。
3、生滚牛肉：将熬好的白粥开大火，保持剧烈沸腾状态。用筷子将腌好的牛肉片迅速滑入滚粥中，快速搅散。
4、打窝蛋：牛肉只要稍微变色（约 15 秒），立刻在粥中央打入一个新鲜的可生食生鸡蛋（窝蛋），马上关火。
5、出锅享用：撒上一把葱花和切碎的香菜。吃的时候用勺子将半熟的窝蛋与滚烫的粥和牛肉拌匀，蛋液会让粥的口感变得极度顺滑鲜美。`,
    category: 'Breakfast',
    tags: ['粥品', '牛肉', '广东菜', '早餐', '暖胃'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQERytLJ_BOAuA1hg4ZLWR0i6rcKrQfedv_oxpGxJM-Pg&s=10'
  }
];

async function seed() {
  if (!MONGODB_URI) {
    throw new Error('Missing MONGODB_URI or MONGO_URI in environment variables.');
  }

  await mongoose.connect(MONGODB_URI);

  const author = await User.findOne({ username: AUTHOR_USERNAME });
  if (!author) {
    throw new Error(`Author not found: ${AUTHOR_USERNAME}`);
  }

  console.log(`Author: ${author.username} (${author._id})`);

  const existingTitles = new Set(
    (await Recipe.find({ title: { $in: recipes.map((r) => r.title) } }, 'title')).map((r) => r.title)
  );

  let added = 0;
  for (const data of recipes) {
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
