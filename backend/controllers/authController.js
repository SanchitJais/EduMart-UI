// ============================================================
// Auth Controller — Register, Login, Google Sign-In, Email
// Verification (Resend), Logout
// ============================================================

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

// @desc  Register new user
// @route POST /api/auth/register
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

    // Log the user in immediately — verification is a reminder, not a gate.
    const token = signToken(user);
    successResponse(res, 201, 'Account created. Check your email to verify your address.', {
      token,
      user: User.toSafeUser(user),
    });
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};

// @desc  Login user & get token
// @route POST /api/auth/login
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

// @desc  Sign in (or sign up) with a Google ID token — one click, no form
// @route POST /api/auth/google
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
        verified: true, // Google already confirmed ownership of this address
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

// @desc  Verify an email address via the link sent by Resend
// @route GET /api/auth/verify-email?token=...
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

// @desc  Re-send the verification email
// @route POST /api/auth/resend-verification
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

// @desc  Get current logged-in user
// @route GET /api/auth/me
const getMe = async (req, res) => {
  try {
    const user = User.findById(req.user.id);
    if (!user) return errorResponse(res, 404, 'User not found');
    successResponse(res, 200, 'User profile fetched', User.toSafeUser(user));
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};

// @desc  Logout user (stateless JWT — client discards the token)
// @route POST /api/auth/logout
const logout = async (_req, res) => {
  successResponse(res, 200, 'Logged out successfully');
};

module.exports = { register, login, googleAuth, verifyEmail, resendVerification, getMe, logout };
