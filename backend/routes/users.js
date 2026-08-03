// User Routes
const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile, changePassword, deleteAccount } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.get('/profile',           protect, getUserProfile);
router.put('/profile',           protect, updateUserProfile);
router.put('/change-password',   protect, changePassword);
router.delete('/account',        protect, deleteAccount);

module.exports = router;
