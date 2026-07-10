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

// Only enforce uniqueness when email/phone are actually set (allows multiple phone-only users).
UserSchema.index({ email: 1 }, { unique: true, sparse: true });
UserSchema.index({ phone: 1 }, { unique: true, sparse: true });

// compile schema into a user model (mongo creates a collection called users)
module.exports = mongoose.model('User', UserSchema);
