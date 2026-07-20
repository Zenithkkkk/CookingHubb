require('dotenv').config();

const mongoose = require('mongoose');
const { syncAllTagsFromRecipes } = require('../config/tagSync');

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  const count = await syncAllTagsFromRecipes();
  console.log(`Synced ${count} tags from recipes.`);
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
