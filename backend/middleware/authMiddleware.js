// ============================================================
// Auth Middleware — JWT Verification
// ============================================================

const jwt = require('jsonwebtoken');
const { errorResponse } = require('../utils/responseHelper');

const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return errorResponse(res, 401, 'Not authorized — no token provided');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');
    // TODO: Fetch user from DB: req.user = await User.findById(decoded.id).select('-password');
    req.user = { id: decoded.id, name: decoded.name, email: decoded.email };
    next();
  } catch {
    return errorResponse(res, 401, 'Not authorized — invalid token');
  }
};

// Admin-only access
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return errorResponse(res, 403, 'Access denied — admin only');
};

module.exports = { protect, adminOnly };
