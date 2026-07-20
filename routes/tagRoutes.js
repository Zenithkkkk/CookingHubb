const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');

router.get('/', tagController.getTagsPage);
router.get('/api/list', tagController.getTagsList);
router.get('/api/recipes', tagController.getAllRecipes);
router.get('/api/search', tagController.searchByTags);

module.exports = router;
