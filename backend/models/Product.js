// Product Model — Mongoose Schema (placeholder)
/*
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name:    { type: String, required: true },
  rating:  { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
}, { timestamps: true });

const productSchema = new mongoose.Schema({
  title:         { type: String, required: true, trim: true },
  description:   { type: String, required: true },
  price:         { type: Number, required: true },
  discountPrice: { type: Number },
  category:      { type: String, required: true },
  brand:         { type: String },
  images:        [{ type: String }],
  stock:         { type: Number, default: 0 },
  rating:        { type: Number, default: 0 },
  tags:          [{ type: String }],
  specifications:{ type: Map, of: String },
  isFeatured:    { type: Boolean, default: false },
  isBestSeller:  { type: Boolean, default: false },
  isTrending:    { type: Boolean, default: false },
  isNewArrival:  { type: Boolean, default: false },
  reviews:       [reviewSchema],
  isActive:      { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
*/
module.exports = {};
