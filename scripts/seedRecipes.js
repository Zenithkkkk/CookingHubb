require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');
const User = require('../models/User');

const MONGODB_URI =
  process.env.MONGODB_URI ||
  process.env.MONGO_URI ||
  'mongodb://127.0.0.1:27017/recipeapp';

const sampleRecipes = [
  {
    title: 'Tuna Rice Bowl',
    description: 'A quick lunch bowl with steamed rice, seared tuna, avocado, and soy dressing. Perfect for meal prep.',
    category: 'Lunch',
    tags: ['seafood', 'quick', 'healthy'],
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop'
  },
  {
    title: 'Spicy Tuna Noodle Salad',
    description: 'Cold noodle salad with chili tuna, cucumber, and sesame. Great for summer lunches.',
    category: 'Lunch',
    tags: ['seafood', 'spicy', 'cold'],
    image: 'https://images.unsplash.com/photo-1569718212665-3a8278f14579?w=800&auto=format&fit=crop'
  },
  {
    title: 'Classic Pasta Carbonara',
    description: 'Creamy pasta with pancetta, egg yolk, and parmesan. A timeless Italian dinner.',
    category: 'Dinner',
    tags: ['italian', 'comfort-food'],
    image: 'https://images.unsplash.com/photo-1612874742237-652622158547?w=800&auto=format&fit=crop'
  },
  {
    title: 'Garlic Butter Shrimp Pasta',
    description: 'Pasta tossed with garlic butter sauce and juicy shrimp. Ready in under 30 minutes.',
    category: 'Dinner',
    tags: ['seafood', 'quick', 'garlic'],
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&auto=format&fit=crop'
  },
  {
    title: 'Japanese Breakfast Rice Bowl',
    description: 'Morning rice bowl with grilled salmon, pickled vegetables, and soft egg.',
    category: 'Breakfast',
    tags: ['japanese', 'healthy'],
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop'
  },
  {
    title: 'Creamy Mushroom Noodle Soup',
    description: 'Warm noodle soup with mushrooms, thyme, and a splash of cream. Cozy and filling.',
    category: 'Lunch',
    tags: ['vegetarian', 'comfort-food'],
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&auto=format&fit=crop'
  },
  {
    title: 'Mediterranean Quinoa Salad',
    description: 'Quinoa mixed with tomatoes, olives, feta, and lemon herb dressing.',
    category: 'Lunch',
    tags: ['healthy', 'vegetarian', 'mediterranean'],
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop'
  },
  {
    title: 'Couscous Veggie Bowl',
    description: 'Fluffy couscous topped with roasted vegetables and tahini sauce.',
    category: 'Dinner',
    tags: ['vegetarian', 'healthy'],
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&auto=format&fit=crop'
  },
  {
    title: 'Crispy Potato Wedges',
    description: 'Oven-baked potato wedges with paprika and herb dip. A crowd favorite snack.',
    category: 'Snack',
    tags: ['easy', 'party'],
    image: 'https://images.unsplash.com/photo-1573080496216-b178042f94f7?w=800&auto=format&fit=crop'
  },
  {
    title: 'Homemade Bread Rolls',
    description: 'Soft bread rolls fresh from the oven. Serve with soup or make mini sandwiches.',
    category: 'Snack',
    tags: ['baking', 'homemade'],
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop'
  },
  {
    title: 'Chocolate Lava Cake',
    description: 'Rich chocolate dessert with a molten center. Best served warm with berries.',
    category: 'Dessert',
    tags: ['sweet', 'baking'],
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800&auto=format&fit=crop'
  },
  {
    title: 'Fresh Mango Smoothie',
    description: 'Blended mango, yogurt, and honey. Refreshing drink for any time of day.',
    category: 'Drink',
    tags: ['refreshing', 'quick', 'vegan'],
    image: 'https://images.unsplash.com/photo-1505252585467-126954a327d9?w=800&auto=format&fit=crop'
  },
  {
    title: 'Avocado Toast Deluxe',
    description: 'Sourdough bread topped with smashed avocado, chili flakes, and poached egg.',
    category: 'Breakfast',
    tags: ['quick', 'healthy'],
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&auto=format&fit=crop'
  },
  {
    title: 'Beef Noodle Stir Fry',
    description: 'Stir-fried noodles with beef strips, bell peppers, and savory sauce.',
    category: 'Dinner',
    tags: ['asian', 'quick'],
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop'
  },
  {
    title: 'Lemon Herb Grilled Tuna',
    description: 'Grilled tuna steak with lemon herb marinade. Serve with rice or salad.',
    category: 'Dinner',
    tags: ['seafood', 'healthy', 'grill'],
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop'
  }
];

async function seed() {
  await mongoose.connect(MONGODB_URI);

  const users = await User.find();
  if (users.length === 0) {
    console.error('No users found. Please register at least one account first.');
    process.exit(1);
  }

  const existingTitles = new Set(
    (await Recipe.find({}, 'title')).map(recipe => recipe.title)
  );

  let added = 0;
  for (let i = 0; i < sampleRecipes.length; i++) {
    const data = sampleRecipes[i];
    if (existingTitles.has(data.title)) continue;

    const author = users[i % users.length];
    await Recipe.create({
      ...data,
      author: author._id
    });
    added++;
  }

  console.log(`Done! Added ${added} recipes (${sampleRecipes.length - added} already existed).`);
  await mongoose.disconnect();
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
