// Wishlist Routes
const express = require('express');
const router = express.Router();
const { getWishlist, addToWishlist, removeFromWishlist, clearWishlist } = require('../controllers/wishlistController');
const { protect } = require('../middleware/authMiddleware');

router.get('/',            protect, getWishlist);
router.post('/',           protect, addToWishlist);
router.delete('/:id',      protect, removeFromWishlist);
router.delete('/',         protect, clearWishlist);

module.exports = router;
