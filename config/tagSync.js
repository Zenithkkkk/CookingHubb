const Recipe = require('../models/Recipe');
const Tag = require('../models/Tag');

const LANG_ORDER = { zh: 0, en: 1, other: 2 };

let cachedSortedTags = null;
let cacheTimestamp = 0;
const TAG_CACHE_TTL_MS = 1000 * 60 * 2;

function detectTagLang(name) {
  const trimmed = String(name || '').trim();
  if (!trimmed) return 'other';
  if (/[\u4e00-\u9fff]/.test(trimmed)) return 'zh';
  if (/^[a-zA-Z0-9\s\-]+$/.test(trimmed)) return 'en';
  return 'other';
}

function sortTagDocs(tags) {
  return tags.slice().sort((a, b) => {
    const langA = LANG_ORDER[a.lang] ?? 2;
    const langB = LANG_ORDER[b.lang] ?? 2;
    if (langA !== langB) return langA - langB;

    const locale = langA === 0 ? 'zh' : 'en';
    return a.name.localeCompare(b.name, locale, { sensitivity: 'base' });
  });
}

function invalidateTagCache() {
  cachedSortedTags = null;
  cacheTimestamp = 0;
}

async function syncAllTagsFromRecipes() {
  const rows = await Recipe.aggregate([
    { $match: { tags: { $exists: true, $ne: [] } } },
    { $unwind: '$tags' },
    {
      $group: {
        _id: '$tags',
        recipeCount: { $sum: 1 }
      }
    }
  ]);

  const activeNames = new Set();
  const now = new Date();

  for (const row of rows) {
    const name = String(row._id || '').trim();
    if (!name) continue;

    activeNames.add(name);
    await Tag.findOneAndUpdate(
      { name },
      {
        name,
        lang: detectTagLang(name),
        recipeCount: row.recipeCount,
        updatedAt: now
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  }

  if (activeNames.size) {
    await Tag.deleteMany({ name: { $nin: Array.from(activeNames) } });
  } else {
    await Tag.deleteMany({});
  }

  invalidateTagCache();
  return activeNames.size;
}

async function getAllTagsWithCounts({ forceRefresh = false } = {}) {
  const count = await Tag.countDocuments();
  if (count === 0) {
    await syncAllTagsFromRecipes();
  }

  const docs = await Tag.find({}).lean();
  return docs.map((doc) => ({
    name: doc.name,
    recipeCount: doc.recipeCount || 0
  }));
}

async function getSortedTagNames({ forceRefresh = false } = {}) {
  const now = Date.now();
  if (!forceRefresh && cachedSortedTags && now - cacheTimestamp < TAG_CACHE_TTL_MS) {
    return cachedSortedTags;
  }

  const count = await Tag.countDocuments();
  if (count === 0) {
    await syncAllTagsFromRecipes();
  }

  const docs = await Tag.find({}).lean();
  const sorted = sortTagDocs(docs).map((doc) => doc.name);

  cachedSortedTags = sorted;
  cacheTimestamp = now;
  return sorted;
}

module.exports = {
  detectTagLang,
  sortTagDocs,
  invalidateTagCache,
  syncAllTagsFromRecipes,
  getAllTagsWithCounts,
  getSortedTagNames
};
