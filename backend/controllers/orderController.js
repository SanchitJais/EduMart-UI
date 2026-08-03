// ============================================================
// Order Controller — Place, Track, Cancel Orders
// ============================================================

const { successResponse, errorResponse } = require('../utils/responseHelper');

// @desc  Get user orders
// @route GET /api/orders
const getOrders = async (req, res) => {
  try {
    // TODO: Get from DB by req.user.id
    successResponse(res, 200, 'Orders fetched', []);
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};

// @desc  Get single order
// @route GET /api/orders/:id
const getOrderById = async (req, res) => {
  try {
    successResponse(res, 200, 'Order fetched', { id: req.params.id, status: 'pending' });
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};

// @desc  Place new order
// @route POST /api/orders
const placeOrder = async (req, res) => {
  try {
    const { items, _shippingAddress, _paymentMethod } = req.body;
    // TODO: Validate stock, calculate total, save order, trigger email
    successResponse(res, 201, 'Order placed successfully', {
      orderId: `EDU${Date.now()}`,
      status: 'confirmed',
      items,
    });
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};

// @desc  Cancel order
// @route PUT /api/orders/:id/cancel
const cancelOrder = async (req, res) => {
  try {
    // TODO: Check order status, allow cancellation if not shipped
    successResponse(res, 200, 'Order cancelled');
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};

module.exports = { getOrders, getOrderById, placeOrder, cancelOrder };
