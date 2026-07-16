const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { isAdmin } = require('../middleware/auth');

router.get('/users', isAdmin, adminController.getAllUsers);
router.post('/users/:userId/toggle-admin', isAdmin, adminController.toggleAdmin);

module.exports = router;
