// Order controller (fetch orders, place order, cancel order)

const { successResponse, errorResponse } = require('../utils/responseHelper');
const Order = require('../models/Order');
const { sendOrderConfirmationEmail } = require('../services/emailService');

// Get user orders
const getOrders = async (req, res) => {
  try {
    successResponse(res, 200, 'Orders fetched', Order.findByUserId(req.user.id));
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};

// Get single order by ID
const getOrderById = async (req, res) => {
  try {
    const order = Order.findById(req.params.id);
    if (!order || order.userId !== req.user.id) {
      return errorResponse(res, 404, 'Order not found');
    }
    successResponse(res, 200, 'Order fetched', order);
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};

// Place new order
const placeOrder = async (req, res) => {
  try {
    const { items, subtotal, shipping, tax, total, address, paymentMethod } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return errorResponse(res, 400, 'Order must include at least one item');
    }
    if (!address?.street || !address?.city || !address?.state || !address?.pin) {
      return errorResponse(res, 400, 'A complete shipping address is required');
    }

    const order = Order.createOrder({
      userId: req.user.id,
      items,
      subtotal,
      shipping,
      tax,
      total,
      address,
      paymentMethod,
    });

    sendOrderConfirmationEmail(req.user.email, req.user.name, order).catch((err) =>
      console.error('[orderController] Failed to send order confirmation email:', err.message)
    );

    successResponse(res, 201, 'Order placed successfully', order);
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};

// Cancel an existing order
const cancelOrder = async (req, res) => {
  try {
    const order = Order.findById(req.params.id);
    if (!order || order.userId !== req.user.id) {
      return errorResponse(res, 404, 'Order not found');
    }
    if (order.status === 'Delivered' || order.status === 'Cancelled') {
      return errorResponse(res, 400, `Order already ${order.status.toLowerCase()} — cannot cancel`);
    }
    const updated = Order.updateStatus(order.id, 'Cancelled');
    successResponse(res, 200, 'Order cancelled', updated);
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};

module.exports = { getOrders, getOrderById, placeOrder, cancelOrder };
