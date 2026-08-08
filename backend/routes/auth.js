// Auth Routes
const express = require('express');
const router = express.Router();
const {
  register, login, googleAuth, verifyEmail, resendVerification, getMe, logout,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register',            register);
router.post('/login',               login);
router.post('/google',              googleAuth);
router.get('/verify-email',         verifyEmail);
router.post('/resend-verification', protect, resendVerification);
router.get('/me',                   protect, getMe);
router.post('/logout',              protect, logout);

module.exports = router;
