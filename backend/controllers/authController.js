// Auth routes controller (register, login, google auth, email verification, logout)

const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { successResponse, errorResponse } = require('../utils/responseHelper');
const config = require('../config/config');
const User = require('../models/User');
const { sendVerificationEmail } = require('../services/emailService');
const { verifyGoogleToken } = require('../services/googleAuthService');

const signToken = (user) =>
  jwt.sign(
    { id: user.id, name: user.name, email: user.email, role: user.role || 'user' },
    config.jwtSecret,
    { expiresIn: config.jwtExpiresIn }
  );

const buildVerifyUrl = (token) => `${config.clientUrl}/verify-email?token=${token}`;

// Register user
const register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password) {
      return errorResponse(res, 400, 'Name, email and password are required');
    }
    if (password.length < 6) {
      return errorResponse(res, 400, 'Password must be at least 6 characters');
    }
    if (User.findByEmail(email)) {
      return errorResponse(res, 409, 'An account with this email already exists');
    }

    const user = await User.createUser({ name, email, password, phone, provider: 'local', verified: false });

    if (user.verificationToken) {
      sendVerificationEmail(user.email, user.name, buildVerifyUrl(user.verificationToken)).catch((err) =>
        console.error('[authController] Failed to send verification email:', err.message)
      );
    }

    // Log the user in right away
    const token = signToken(user);
    successResponse(res, 201, 'Account created. Check your email to verify your address.', {
      token,
      user: User.toSafeUser(user),
    });
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};

// Login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = User.findByEmail(email || '');
    if (!user || !(await User.comparePassword(user, password || ''))) {
      return errorResponse(res, 401, 'Invalid email or password');
    }
    const token = signToken(user);
    successResponse(res, 200, 'Login successful', { token, user: User.toSafeUser(user) });
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};

// Google OAuth login / signup
const googleAuth = async (req, res) => {
  try {
    if (!config.googleClientId) {
      return errorResponse(res, 501, 'Google Sign-In is not configured on this server yet.');
    }
    const { credential } = req.body;
    if (!credential) return errorResponse(res, 400, 'Missing Google credential');

    const payload = await verifyGoogleToken(credential);
    if (!payload?.email) return errorResponse(res, 401, 'Invalid Google credential');

    let user = User.findByEmail(payload.email);
    if (!user) {
      user = await User.createUser({
        name: payload.name || payload.email.split('@')[0],
        email: payload.email,
        password: null,
        avatar: payload.picture,
        provider: 'google',
        verified: true, // Google already verified this email
      });
    } else if (!user.verified) {
      user = User.setVerified(user.id);
    }

    const token = signToken(user);
    successResponse(res, 200, 'Signed in with Google', { token, user: User.toSafeUser(user) });
  } catch (err) {
    errorResponse(res, 401, 'Google sign-in failed: ' + err.message);
  }
};

// Verify email address from token link
const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    const user = token ? User.findByVerificationToken(token) : null;
    if (!user) return errorResponse(res, 400, 'Invalid or expired verification link');

    User.setVerified(user.id);
    successResponse(res, 200, 'Email verified successfully');
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};

// Resend verification email
const resendVerification = async (req, res) => {
  try {
    const user = User.findById(req.user.id);
    if (!user) return errorResponse(res, 404, 'User not found');
    if (user.verified) return successResponse(res, 200, 'Your email is already verified');

    const verificationToken = crypto.randomBytes(32).toString('hex');
    User.updateUser(user.id, { verificationToken });
    await sendVerificationEmail(user.email, user.name, buildVerifyUrl(verificationToken));

    successResponse(res, 200, 'Verification email sent');
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};

// Get profile of current user
const getMe = async (req, res) => {
  try {
    const user = User.findById(req.user.id);
    if (!user) return errorResponse(res, 404, 'User not found');
    successResponse(res, 200, 'User profile fetched', User.toSafeUser(user));
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};

// Logout user
const logout = async (_req, res) => {
  successResponse(res, 200, 'Logged out successfully');
};

module.exports = { register, login, googleAuth, verifyEmail, resendVerification, getMe, logout };
