// Order Routes
const express = require('express');
const router = express.Router();
const { getOrders, getOrderById, placeOrder, cancelOrder } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.get('/',             protect, getOrders);
router.get('/:id',          protect, getOrderById);
router.post('/',            protect, placeOrder);
router.put('/:id/cancel',   protect, cancelOrder);

module.exports = router;
