// recipe model
const Recipe = require('../models/Recipe');
const Comment = require('../models/Comment');

// create recipe form
exports.getNewRecipeForm = (req, res) => {
    res.render('recipes/new');
  };

// pull text fields out of the submitted form data
exports.createRecipe = async (req, res) => {
  try {
    const { title, description, category, tags, croppedImage } = req.body;
    const tagsArray = tags ? tags.split(',').map(tag => tag.trim()) : [];

    let imageUrl = 'default-recipe.png';

    if (croppedImage && croppedImage.startsWith('data:image')) {
      const cloudinary = require('cloudinary').v2;
      const result = await cloudinary.uploader.upload(croppedImage, {
        folder: 'recipe-blog/recipes'
      });
      imageUrl = result.secure_url;
    } else if (req.file) {
      imageUrl = req.file.path;
    }

    const recipe = new Recipe({
      title,
      description,
      category,
      tags: tagsArray,
      author: req.user._id,
      image: imageUrl
    });

    await recipe.save();
    res.redirect(`/recipes/${recipe.slug}`);
  } catch (err) {
    console.error(err);
    res.render('recipes/new', { error: err.message });
  }
};
   

exports.getAllRecipes = async (req, res) => {
    try {
        // fetch every recipe in the collection, populate fetches actual username instead of ID
      const recipes = await Recipe.find().populate('author').sort({ createdAt: -1 });
      res.render('recipes/index', { recipes });
    } catch (err) {
      console.error(err);
      res.redirect('/');
    }
  };

exports.getRecipeBySlug = async (req, res) => {
    try {
        // req.params.slug comes from URL itself, if no matched recipes, render a 404
      const recipe = await Recipe.findOne({ slug: req.params.slug }).populate('author');
      if (!recipe) {
        return res.status(404).render('404');
      }

      const comments = await Comment.find({ recipe: recipe._id }) // fetch all comments that belong to this recipe
      .populate('author') // replace Id for user object (username)
      .sort({ createdAt: -1 }); 

      res.render('recipes/show', { recipe, comments });
    } catch (err) {
      console.error(err);
      res.redirect('/recipes');
    }
  };

exports.getEditRecipeForm = async (req, res) => {
    try {
      const recipe = await Recipe.findOne({ slug: req.params.slug });
      if (!recipe) return res.status(404).render('404');
        
      // authorship check
      if (recipe.author.toString() !== req.user._id.toString()) {
        return res.redirect('/recipes');
      }
  
      res.render('recipes/edit', { recipe });
    } catch (err) {
      console.error(err);
      res.redirect('/recipes');
    }
  };

  // ownership check
  exports.updateRecipe = async (req, res) => {
    try {
      const recipe = await Recipe.findOne({ slug: req.params.slug });
      if (!recipe) return res.status(404).render('404');
  
      if (recipe.author.toString() !== req.user._id.toString()) {
        return res.redirect('/recipes');
      }
  
      const { title, description, category, tags } = req.body;
      const tagsArray = tags ? tags.split(',').map(tag => tag.trim()) : [];
  
      recipe.title = title;
      recipe.description = description;
      recipe.category = category;
      recipe.tags = tagsArray;
      recipe.updatedAt = Date.now(); // update, not create
  
      if (req.body.croppedImage && req.body.croppedImage.startsWith('data:image')) {
        const cloudinary = require('cloudinary').v2;
        const result = await cloudinary.uploader.upload(req.body.croppedImage, {
          folder: 'recipe-blog/recipes'
        });
        recipe.image = result.secure_url;
      } else if (req.file) {
        recipe.image = req.file.path;
      }
  
      await recipe.save();
      res.redirect(`/recipes/${recipe.slug}`);
    } catch (err) {
      console.error(err);
      res.redirect('/recipes');
    }
  };

  // ownsership, then delete permanently from database
  exports.deleteRecipe = async (req, res) => {
    try {
      const recipe = await Recipe.findOne({ slug: req.params.slug });
      if (!recipe) return res.status(404).render('404');
  
      if (recipe.author.toString() !== req.user._id.toString()) {
        return res.redirect('/recipes');
      }
  
      await Recipe.deleteOne({ _id: recipe._id });
      res.redirect('/recipes');
    } catch (err) {
      console.error(err);
      res.render('recipes/new', { error: err.message });
    }
/*     } catch (err) {
      console.error(err);
      res.redirect('/recipes');
    } */
  };