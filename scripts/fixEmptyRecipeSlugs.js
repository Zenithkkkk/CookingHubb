require('dotenv').config();
const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');

async function main() {
  await mongoose.connect(process.env.MONGO_URI);

  const broken = await Recipe.find({
    $or: [{ slug: '' }, { slug: null }, { slug: { $exists: false } }]
  });

  console.log(`Found ${broken.length} recipe(s) with missing slug.`);

  for (const recipe of broken) {
    recipe.markModified('title');
    await recipe.save();
    console.log(`Fixed: "${recipe.title}" -> ${recipe.slug}`);
  }

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
