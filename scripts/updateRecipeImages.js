require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');

const MONGODB_URI =
  process.env.MONGODB_URI ||
  process.env.MONGO_URI ||
  'mongodb://127.0.0.1:27017/recipeapp';

const imageUpdates = [
  {
    title: 'Crispy Potato Wedges',
    image: '/images/recipes/crispy-potato-wedges.jpg'
  },
  {
    title: 'Fresh Mango Smoothie',
    image: '/images/recipes/fresh-mango-smoothie.jpg'
  }
];

async function updateImages() {
  await mongoose.connect(MONGODB_URI);

  for (const update of imageUpdates) {
    const result = await Recipe.updateOne(
      { title: update.title },
      { $set: { image: update.image, updatedAt: Date.now() } }
    );

    if (result.matchedCount === 0) {
      console.log(`Not found: ${update.title}`);
    } else {
      console.log(`Updated image: ${update.title}`);
    }
  }

  await mongoose.disconnect();
}

updateImages().catch(err => {
  console.error(err);
  process.exit(1);
});
