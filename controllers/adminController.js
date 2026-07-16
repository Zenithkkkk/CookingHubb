const User = require('../models/User');
const Recipe = require('../models/Recipe');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({})
      .select('username profilePicture createdAt isAdmin')
      .sort({ createdAt: -1 });

    const recipeCounts = await Recipe.aggregate([
      { $group: { _id: '$author', count: { $sum: 1 } } }
    ]);
    const countMap = new Map(
      recipeCounts.map((entry) => [entry._id.toString(), entry.count])
    );

    const usersWithStats = users.map((user) => ({
      ...user.toObject(),
      recipeCount: countMap.get(user._id.toString()) || 0
    }));

    res.render('admin/users', { users: usersWithStats });
  } catch (err) {
    console.error(err);
    res.redirect('/recipes');
  }
};

exports.toggleAdmin = async (req, res) => {
  try {
    const targetUser = await User.findById(req.params.userId);
    if (!targetUser) {
      return res.redirect('/admin/users');
    }

    // Prevent admin from demoting themselves
    if (targetUser._id.toString() === req.user._id.toString()) {
      return res.redirect('/admin/users');
    }

    targetUser.isAdmin = !targetUser.isAdmin;
    await targetUser.save();

    res.redirect('/admin/users');
  } catch (err) {
    console.error(err);
    res.redirect('/admin/users');
  }
};
