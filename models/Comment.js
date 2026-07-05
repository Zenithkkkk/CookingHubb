const mongoose = require('mongoose');
const CommentSchema = new mongoose.Schema({

    body: {
      type: String,
      required: true,
      trim: true
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },

    author: {
        type: mongoose.Schema.Types.ObjectId, // store ID, not copy of user's data
        ref: 'User',
        required: true
      },

      recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe',
        required: true
      },

      createdAt: {
        type: Date,
        default: Date.now
      }
    });

module.exports = mongoose.model('Comment', CommentSchema); // create mongoose collection

