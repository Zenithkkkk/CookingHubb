require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');
const { simplifyIngredientList } = require('../config/ingredientSimplify');

async function main() {
  await mongoose.connect(process.env.MONGO_URI);

  const recipes = await Recipe.find({ ingredients: { $exists: true, $ne: [] } });
  let updated = 0;

  for (const recipe of recipes) {
    const simplified = simplifyIngredientList(recipe.ingredients);
    const changed = JSON.stringify(simplified) !== JSON.stringify(recipe.ingredients);

    if (!changed) {
      console.log(`Skip: ${recipe.title}`);
      continue;
    }

    console.log(`Updated: ${recipe.title}`);
    console.log(`  before: ${recipe.ingredients.join('，')}`);
    console.log(`  after:  ${simplified.join('，')}`);
    recipe.ingredients = simplified;
    await recipe.save();
    updated++;
  }

  console.log(`Done! Updated ${updated} of ${recipes.length} recipes.`);
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
