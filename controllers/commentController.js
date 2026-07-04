const Comment = require('../models/Comment');
const Recipe = require('../models/Recipe');

exports.createComment = async (req, res) => {
    try {
      const recipe = await Recipe.findOne({ slug: req.params.slug }); // find recipe by slug from URL
      if (!recipe) return res.status(404).render('404');
        
      // comment linked to recipe and logged-in user
      await Comment.create({
        body: req.body.body,
        author: req.user._id,
        recipe: recipe._id
      });
      // immediately after, return to login to display comment
      res.redirect(`/recipes/${recipe.slug}`);
    } catch (err) {
      console.error(err);
      res.redirect('/recipes');
    }
  };

  exports.deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId).populate('recipe');
      if (!comment) return res.status(404).render('404');
        
      // verify ownership
      if (comment.author.toString() !== req.user._id.toString()) {
        return res.redirect(`/recipes/${comment.recipe.slug}`);
      }

      // redirect back to user's previous page
      await Comment.deleteOne({ _id: comment._id });
      res.redirect(`/recipes/${comment.recipe.slug}`);
    } catch (err) {
      console.error(err);
      res.redirect('/recipes');
    }
  };

  exports.toggleLike = async (req, res) => {
    try {
      const recipe = await Recipe.findOne({ slug: req.params.slug });
      if (!recipe) return res.status(404).render('404');
  
      const userId = req.user._id.toString();
      const alreadyLiked = recipe.likes.some(id => id.toString() === userId); // array of user IDs who liked this recipe (check if user has already liked it with .some())
  
      if (alreadyLiked) {
        // if already liked and clicked --> remove like
        recipe.likes = recipe.likes.filter(id => id.toString() !== userId); 
      } else {
        // if not liked yet, add their ID (like)
        recipe.likes.push(req.user._id);
      }
  
      await recipe.save();
      res.redirect(`/recipes/${recipe.slug}`);
    } catch (err) {
      console.error(err);
      res.redirect('/recipes');
    }
  };