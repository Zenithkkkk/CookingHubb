const mongoose = require('mongoose'); // import mongoose
const UserSchema = new mongoose.Schema({ // blueprint to define what a user doc looks like in the database
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
      },

      email: {
        type: String,
        unique: true,
        sparse: true,
        lowercase: true,
        trim: true
      },

      phoneCountryCode: {
        type: String,
        trim: true
      },

      phoneNumber: {
        type: String,
        trim: true
      },

      phone: {
        type: String,
        unique: true,
        sparse: true,
        trim: true
      },

      password: {
        // this is hashed
        type: String,
        required: true
      },

      bio: {
        //optional text for user's profile
        type: String,
        default: ''
      },

      profilePicture: {
        type: String,
        default: 'default-avatar.png'
      },

      isAdmin: {
        type: Boolean,
        default: false
      },

      showLikedRecipesOnProfile: {
        type: Boolean,
        default: false
      },

      createdAt: {
        type: Date,
        default: Date.now
      }
});

// compile schema into a user model (mongo creates a collection called users)
module.exports = mongoose.model('User', UserSchema);
