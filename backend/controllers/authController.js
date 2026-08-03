// ============================================================
// Auth Controller — Register, Login, Logout, Profile
// ============================================================

const { successResponse, errorResponse } = require('../utils/responseHelper');

// @desc  Register new user
// @route POST /api/auth/register
const register = async (req, res) => {
  try {
    const { name, email, _password } = req.body;
    // TODO: Validate input, hash password, save to DB
    successResponse(res, 201, 'User registered successfully', { name, email });
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};

// @desc  Login user & get token
// @route POST /api/auth/login
const login = async (req, res) => {
  try {
    const { email, _password } = req.body;
    // TODO: Find user, compare password, generate JWT
    successResponse(res, 200, 'Login successful', {
      token: 'placeholder_jwt_token',
      user: { id: '1', name: 'Demo User', email },
    });
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};

// @desc  Get current logged-in user
// @route GET /api/auth/me
const getMe = async (req, res) => {
  try {
    // TODO: Get user from token (req.user populated by authMiddleware)
    successResponse(res, 200, 'User profile fetched', req.user || { id: '1', name: 'Demo User' });
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};

// @desc  Logout user
// @route POST /api/auth/logout
const logout = async (req, res) => {
  try {
    // TODO: Blacklist token or clear cookie
    successResponse(res, 200, 'Logged out successfully');
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};

module.exports = { register, login, getMe, logout };
