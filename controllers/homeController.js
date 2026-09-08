const Recipe = require('../models/Recipe');

exports.getHome = async (req, res) => {
  try {
    const featuredRecipes = await Recipe.aggregate([
      {
        $addFields: {
          likeCount: { $size: { $ifNull: ['$likes', []] } }
        }
      },
      { $sort: { likeCount: -1, createdAt: -1 } },
      { $limit: 6 },
      {
        $lookup: {
          from: 'users',
          localField: 'author',
          foreignField: '_id',
          as: 'author'
        }
      },
      { $unwind: { path: '$author', preserveNullAndEmptyArrays: true } }
    ]);

    res.locals.isHomePage = true;
    res.render('home', { featuredRecipes });
  } catch (err) {
    console.error(err);
    res.locals.isHomePage = true;
    res.render('home', { featuredRecipes: [] });
  }
};
