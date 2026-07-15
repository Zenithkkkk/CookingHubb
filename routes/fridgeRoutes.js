const express = require('express');
const router = express.Router();
const fridgeController = require('../controllers/fridgeController');
const { isAuthenticated } = require('../middleware/auth');

router.get('/', isAuthenticated, fridgeController.getFridge);
router.post('/ingredients', isAuthenticated, fridgeController.addIngredient);
router.post('/ingredients/remove/:name', isAuthenticated, fridgeController.removeIngredient);
router.post('/match', isAuthenticated, fridgeController.matchRecipes);

module.exports = router;
