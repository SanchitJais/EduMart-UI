// Order Model — Mongoose Schema (placeholder)
/*
const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product:  { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  title:    { type: String, required: true },
  image:    { type: String },
  price:    { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
});

const orderSchema = new mongoose.Schema({
  user:             { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderId:          { type: String, unique: true },
  items:            [orderItemSchema],
  shippingAddress:  {
    name: String, street: String, city: String, state: String, pincode: String, phone: String,
  },
  paymentMethod:    { type: String, enum: ['cod', 'upi', 'card', 'netbanking'] },
  paymentStatus:    { type: String, enum: ['pending', 'paid', 'failed', 'refunded'], default: 'pending' },
  orderStatus:      { type: String, enum: ['placed', 'confirmed', 'shipped', 'delivered', 'cancelled'], default: 'placed' },
  subtotal:         { type: Number, required: true },
  shippingCharge:   { type: Number, default: 0 },
  discount:         { type: Number, default: 0 },
  total:            { type: Number, required: true },
  estimatedDelivery:{ type: Date },
  deliveredAt:      { type: Date },
}, { timestamps: true });

orderSchema.pre('save', function (next) {
  if (!this.orderId) this.orderId = `EDU${Date.now()}`;
  next();
});

module.exports = mongoose.model('Order', orderSchema);
*/
module.exports = {};
