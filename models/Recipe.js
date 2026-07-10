const mongoose = require('mongoose');
const slugify = require('slugify');

function buildSlugBase(title) {
  const trimmed = String(title || '').trim();
  const slug = slugify(trimmed, { lower: true, strict: false, trim: true });
  if (slug) return slug;
  return `recipe-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

const RecipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
      },

      slug: {
        // URL friendly version of title
        type: String,
        unique: true
      },

      description: {
        type: String,
        required: true
      },

      category: {
        type: String,
        required: true,
        enum: ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack', 'Drink'] //enum because no other options accepted
      },

      tags: {
        type: [String],
        default: []
      },

      tagsSearchTerms: {
        type: [String],
        default: []
      },

      image: {
        type: String,
        default: 'default-recipe.png'
      },

      imageThumb: {
        type: String,
        default: ''
      },

      author: {
        type: mongoose.Schema.Types.ObjectId, // reference to User document
        ref: 'User',
        required: true
      },

      likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }],

      createdAt: {
        type: Date,
        default: Date.now
      },

      updatedAt: {
        type: Date,
        default: Date.now
      }

});

RecipeSchema.pre('save', async function() {
  const hasValidSlug = typeof this.slug === 'string' && this.slug.trim().length > 0;
  if (!this.isModified('title') && hasValidSlug) return;

  const base = buildSlugBase(this.title);
  let slug = base;
  let suffix = 1;
  const Recipe = this.constructor;

  while (await Recipe.exists({ slug, _id: { $ne: this._id } })) {
    suffix += 1;
    slug = `${base}-${suffix}`;
  }

  this.slug = slug;
});

module.exports = mongoose.model('Recipe', RecipeSchema);

