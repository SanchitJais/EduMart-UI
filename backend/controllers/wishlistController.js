// Wishlist Controller
const { successResponse, errorResponse } = require('../utils/responseHelper');

const getWishlist = async (req, res) => {
  try {
    successResponse(res, 200, 'Wishlist fetched', { items: [] });
  } catch (err) { errorResponse(res, 500, err.message); }
};

const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    successResponse(res, 200, 'Added to wishlist', { productId });
  } catch (err) { errorResponse(res, 500, err.message); }
};

const removeFromWishlist = async (req, res) => {
  try {
    successResponse(res, 200, 'Removed from wishlist');
  } catch (err) { errorResponse(res, 500, err.message); }
};

const clearWishlist = async (req, res) => {
  try {
    successResponse(res, 200, 'Wishlist cleared');
  } catch (err) { errorResponse(res, 500, err.message); }
};

module.exports = { getWishlist, addToWishlist, removeFromWishlist, clearWishlist };
