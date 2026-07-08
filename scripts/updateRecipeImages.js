require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');

const MONGODB_URI =
  process.env.MONGODB_URI ||
  process.env.MONGO_URI ||
  'mongodb://127.0.0.1:27017/recipeapp';

const imageUpdates = [
  {
    title: 'Tuna Rice',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgvLz7fhMGW_5G3TI2IGnqrM1w396FiP4NESOzp_2nXw&s=10'
  },
  {
    title: 'Tuna Rice Bowl',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgvLz7fhMGW_5G3TI2IGnqrM1w396FiP4NESOzp_2nXw&s=10'
  },
  {
    title: 'Crispy Potato Wedges',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg55wgOHJGp0Rqd_ufd741p1lfsEGIQrHjxycHumDmdw&s=10'
  },
  {
    title: 'Fresh Mango Smoothie',
    image: '/images/recipes/fresh-mango-smoothie.jpg'
  },
  {
    title: 'Classic Pasta Carbonara',
    image: '/images/recipes/classic-pasta-carbonara.jpg'
  },
  {
    title: 'Spicy Tuna Noodle Salad',
    image: '/images/recipes/spicy-tuna-noodle-salad.jpg'
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
