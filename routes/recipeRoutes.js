const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const commentController = require('../controllers/commentController');
const { isAuthenticated } = require('../middleware/auth'); // import middleware
const upload = require('../config/multer'); // multer

// main recipes page (public)
router.get('/', recipeController.getAllRecipes);
router.get('/liked', isAuthenticated, recipeController.getLikedRecipes);

// create form if user is logged id
router.get('/new', isAuthenticated, recipeController.getNewRecipeForm);

// form submission for logged-in users
router.post('/', isAuthenticated, upload.single('image'), recipeController.createRecipe);

// detail page for sinle recipes (public)
router.get('/:slug', recipeController.getRecipeBySlug);

// edit, update, & delete (authenticated users)
router.get('/:slug/edit', isAuthenticated, recipeController.getEditRecipeForm);
router.put('/:slug', isAuthenticated, upload.single('image'), recipeController.updateRecipe);
router.delete('/:slug', isAuthenticated, recipeController.deleteRecipe);

router.post('/:slug/comments', isAuthenticated, commentController.createComment); // comments
router.delete('/:slug/comments/:commentId', isAuthenticated, commentController.deleteComment); // delete comment by its ID
router.post('/:slug/like', isAuthenticated, commentController.toggleLike); // toggle like on that recipe

module.exports = router;