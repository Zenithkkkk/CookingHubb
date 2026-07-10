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

function renderEditProfile(res, { profileUser, errorKey }) {
  res.render('profile/edit', { profileUser, errorKey });
}

 // show edit profile form 
exports.getEditProfile = async (req, res) => {
    try {
        // find user by (logged in) user id 
      const user = await User.findById(req.user._id);
      renderEditProfile(res, { profileUser: user });
    } catch (err) {
      console.error(err);
      res.redirect('/');
    }
  };

  // lets users update username, bio and profile picture, searching by ID
exports.updateProfile = async (req, res) => {
    const { bio, username } = req.body;
    const trimmedUsername = typeof username === 'string' ? username.trim() : '';

    try {
      const user = await User.findById(req.user._id);
      if (!user) {
        return res.redirect('/');
      }

      if (!trimmedUsername) {
        return renderEditProfile(res, {
          profileUser: { ...user.toObject(), bio },
          errorKey: 'profile.usernameRequired'
        });
      }

      if (trimmedUsername !== user.username) {
        const existingUser = await User.findOne({
          username: trimmedUsername,
          _id: { $ne: user._id }
        });

        if (existingUser) {
          return renderEditProfile(res, {
            profileUser: { ...user.toObject(), username: trimmedUsername, bio },
            errorKey: 'auth.emailOrUsernameInUse'
          });
        }
      }

      const updateData = {
        username: trimmedUsername,
        bio
      };
        
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
      res.redirect(`/profile/${trimmedUsername}`);
    } catch (err) {
      console.error(err);

      if (err && err.code === 11000) {
        const user = await User.findById(req.user._id);
        return renderEditProfile(res, {
          profileUser: { ...user.toObject(), username: trimmedUsername, bio },
          errorKey: 'auth.emailOrUsernameInUse'
        });
      }

      res.redirect('/profile/edit/me');
    }
  };