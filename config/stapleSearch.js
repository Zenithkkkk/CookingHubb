const STAPLE_OPTIONS = ['Rice', 'Noodle', 'Pasta', 'Bread', 'Potato', 'Quinoa', 'Couscous'];

// Search terms per staple across en / de / es / zh (plus common variants)
const STAPLE_SEARCH_TERMS = {
  Rice: [
    'rice', 'reis', 'arroz', '米饭', '大米', '白米', '糯米', '饭'
  ],
  Noodle: [
    'noodle', 'noodles', 'nudel', 'nudeln', 'fideo', 'fideos', 'tallarín', 'tallarines',
    '面条', '面', '拉面', '米粉', '河粉', '乌冬'
  ],
  Pasta: [
    'pasta', 'spaghetti', 'macaroni', 'penne', '意面', '意大利面', '通心粉', '意粉'
  ],
  Bread: [
    'bread', 'brot', 'pan', '面包', '吐司', '馒头', '饼'
  ],
  Potato: [
    'potato', 'potatoes', 'kartoffel', 'kartoffeln', 'patata', 'patatas', 'papa', 'papas',
    '土豆', '马铃薯', '洋芋'
  ],
  Quinoa: [
    'quinoa', 'quinua', '藜麦'
  ],
  Couscous: [
    'couscous', 'cuscús', 'cuscus', 'kuskus', '库斯库斯', '古斯古斯'
  ]
};

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getStapleSearchTerms(staple) {
  const key = staple.trim();
  return STAPLE_SEARCH_TERMS[key] || [key];
}

function buildStapleRegex(staple) {
  const terms = getStapleSearchTerms(staple);
  const pattern = terms.map(escapeRegex).join('|');
  return new RegExp(pattern, 'i');
}

function buildStapleFilterCondition(staple) {
  const regex = buildStapleRegex(staple);
  return {
    $or: [
      { title: regex },
      { description: regex },
      { tags: regex }
    ]
  };
}

function stapleMatchesTitle(recipe, staple) {
  const regex = buildStapleRegex(staple);
  return regex.test(recipe.title || '');
}

module.exports = {
  STAPLE_OPTIONS,
  getStapleSearchTerms,
  buildStapleFilterCondition,
  stapleMatchesTitle
};
