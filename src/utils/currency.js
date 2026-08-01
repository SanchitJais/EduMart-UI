// ============================================================
// EduMart – Currency Utilities
// ============================================================

/**
 * Format a number as Indian Rupees (₹)
 * @param {number} amount
 * @returns {string}
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Calculate discount percentage
 * @param {number} original
 * @param {number} discounted
 * @returns {number}
 */
export const calcDiscount = (original, discounted) => {
  if (!original || !discounted) return 0;
  return Math.round(((original - discounted) / original) * 100);
};

/**
 * Calculate cart subtotal from items array
 * @param {Array} items - [{discountPrice, quantity}]
 * @returns {number}
 */
export const calcSubtotal = (items) => {
  return items.reduce((sum, item) => sum + item.discountPrice * item.quantity, 0);
};

/**
 * Calculate shipping cost
 * @param {number} subtotal
 * @returns {number}
 */
export const calcShipping = (subtotal) => {
  return subtotal >= 999 ? 0 : 49;
};

/**
 * Calculate GST (18%)
 * @param {number} subtotal
 * @returns {number}
 */
export const calcTax = (subtotal) => {
  return Math.round(subtotal * 0.09);
};
