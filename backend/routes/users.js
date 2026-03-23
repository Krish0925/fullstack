var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// GET USER PROFILE
router.get('/profile', authMiddleware, userController.getProfile);

// UPDATE USER PROFILE
router.put('/profile', authMiddleware, userController.updateProfile);

// CHANGE PASSWORD
router.post('/change-password', authMiddleware, userController.changePassword);

// GET USER STATS
router.get('/stats', authMiddleware, userController.getUserStats);

module.exports = router;
