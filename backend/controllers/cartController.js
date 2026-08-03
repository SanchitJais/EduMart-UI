// Cart Controller
const { successResponse, errorResponse } = require('../utils/responseHelper');

const getCart = async (req, res) => {
  try {
    successResponse(res, 200, 'Cart fetched', { items: [], total: 0 });
  } catch (err) { errorResponse(res, 500, err.message); }
};

const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    // TODO: Add item to user cart in DB
    successResponse(res, 200, 'Item added to cart', { productId, quantity });
  } catch (err) { errorResponse(res, 500, err.message); }
};

const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    successResponse(res, 200, 'Cart item updated', { productId: req.params.productId, quantity });
  } catch (err) { errorResponse(res, 500, err.message); }
};

const removeFromCart = async (req, res) => {
  try {
    successResponse(res, 200, 'Item removed from cart');
  } catch (err) { errorResponse(res, 500, err.message); }
};

const clearCart = async (req, res) => {
  try {
    successResponse(res, 200, 'Cart cleared');
  } catch (err) { errorResponse(res, 500, err.message); }
};

module.exports = { getCart, addToCart, updateCartItem, removeFromCart, clearCart };
