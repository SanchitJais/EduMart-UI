// User Controller
const { successResponse, errorResponse } = require('../utils/responseHelper');

const getUserProfile = async (req, res) => {
  try {
    successResponse(res, 200, 'Profile fetched', req.user || { id: '1', name: 'Demo User' });
  } catch (err) { errorResponse(res, 500, err.message); }
};

const updateUserProfile = async (req, res) => {
  try {
    const { name, phone, address } = req.body;
    successResponse(res, 200, 'Profile updated', { name, phone, address });
  } catch (err) { errorResponse(res, 500, err.message); }
};

const changePassword = async (req, res) => {
  try {
    successResponse(res, 200, 'Password changed successfully');
  } catch (err) { errorResponse(res, 500, err.message); }
};

const deleteAccount = async (req, res) => {
  try {
    successResponse(res, 200, 'Account deleted');
  } catch (err) { errorResponse(res, 500, err.message); }
};

module.exports = { getUserProfile, updateUserProfile, changePassword, deleteAccount };
