const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  lang: {
    type: String,
    enum: ['zh', 'en', 'other'],
    default: 'other'
  },
  recipeCount: {
    type: Number,
    default: 0
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

TagSchema.index({ lang: 1, name: 1 });

module.exports = mongoose.model('Tag', TagSchema);
