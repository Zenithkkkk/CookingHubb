const User = require('../models/User'); // profile data
const Recipe = require('../models/Recipe'); // recipes created by user

exports.getProfile = async (req, res) => {
    try {
        // find user by username from URL
      const user = await User.findOne({ username: req.params.username });
      if (!user) return res.status(404).render('404');
      // find recipes where author matches user's ID
      const recipes = await Recipe.find({ author: user._id }).sort({ createdAt: -1 });

      const isOwnProfile = req.user && req.user._id.toString() === user._id.toString();
      const likedRecipes = await Recipe.find({ likes: user._id })
        .populate('author')
        .sort({ createdAt: -1 });
      const likedRecipesHidden = !isOwnProfile && !user.showLikedRecipesOnProfile;

      res.render('profile/show', {
        profileUser: user,
        recipes,
        likedRecipes,
        isOwnProfile,
        likedRecipesHidden
      });
    } catch (err) {
      console.error(err);
      res.redirect('/');
    }
  };

 // show edit profile form 
exports.getEditProfile = async (req, res) => {
    try {
        // find user by (logged in) user id 
      const user = await User.findById(req.user._id);
      res.render('profile/edit', { profileUser: user });
    } catch (err) {
      console.error(err);
      res.redirect('/');
    }
  };

  // lets users update bio and profile picture, searching by ID
exports.updateProfile = async (req, res) => {
    try {
      const { bio } = req.body;
  
      const updateData = { bio };
        
      // only upload if new one was uploaded
      if (req.body.croppedImage && req.body.croppedImage.startsWith('data:image')) {
        const cloudinary = require('cloudinary').v2;
        const result = await cloudinary.uploader.upload(req.body.croppedImage, {
          folder: 'recipe-blog/profiles',
          transformation: [{ width: 400, height: 400, crop: 'fill', gravity: 'face' }]
        });
        updateData.profilePicture = result.secure_url;
      } else if (req.file) {
        updateData.profilePicture = req.file.path;
      }
  
      await User.findByIdAndUpdate(req.user._id, updateData);
      res.redirect(`/profile/${req.user.username}`);
    } catch (err) {
      console.error(err);
      res.redirect('/profile/edit');
    }
  };