// ============================================================
// EduMart – Cart Context
// Manages cart state with full CRUD and localStorage persistence
// ============================================================

import { createContext, useContext, useCallback } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { calcSubtotal, calcShipping, calcTax } from '../utils/currency';

// Create the context
const CartContext = createContext(null);

/**
 * CartProvider wraps the app and provides cart state + actions
 */
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage('edumart_cart', []);

  /**
   * Add a product to the cart.
   * If already in cart, increase quantity.
   */
  const addToCart = useCallback((product, qty = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + qty, item.stock) }
            : item
        );
      }
      return [...prev, { ...product, quantity: Math.min(qty, product.stock) }];
    });
  }, [setCartItems]);

  /**
   * Remove a product from the cart entirely
   */
  const removeFromCart = useCallback((productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  }, [setCartItems]);

  /**
   * Increase the quantity of an item (capped at stock)
   */
  const increaseQuantity = useCallback((productId) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId && item.quantity < item.stock
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }, [setCartItems]);

  /**
   * Decrease the quantity of an item (remove if it reaches 0)
   */
  const decreaseQuantity = useCallback((productId) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, [setCartItems]);

  /**
   * Clear all items from the cart
   */
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, [setCartItems]);

  /**
   * Check if a product is in the cart
   */
  const isInCart = useCallback(
    (productId) => cartItems.some((item) => item.id === productId),
    [cartItems]
  );

  /**
   * Calculate totals
   */
  const calculateTotal = useCallback(() => {
    const subtotal = calcSubtotal(cartItems);
    const shipping = calcShipping(subtotal);
    const tax = calcTax(subtotal);
    const total = subtotal + shipping + tax;
    return { subtotal, shipping, tax, total };
  }, [cartItems]);

  // Total item count (sum of all quantities)
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const value = {
    cartItems,
    cartCount,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    isInCart,
    calculateTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

/**
 * Custom hook to consume CartContext
 */
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
