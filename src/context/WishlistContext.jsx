// Wishlist state and operations context

import { createContext, useContext, useCallback } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const WishlistContext = createContext(null);

/**
 * WishlistProvider wraps the app and provides wishlist state + actions
 */
export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useLocalStorage('edumart_wishlist', []);

  /**
   * Add a product to wishlist (if not already added)
   */
  const addToWishlist = useCallback((product) => {
    setWishlistItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) return prev;
      return [...prev, product];
    });
  }, [setWishlistItems]);

  /**
   * Remove a product from wishlist
   */
  const removeFromWishlist = useCallback((productId) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== productId));
  }, [setWishlistItems]);

  /**
   * Toggle wishlist: add if absent, remove if present
   */
  const toggleWishlist = useCallback((product) => {
    setWishlistItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) return prev.filter((item) => item.id !== product.id);
      return [...prev, product];
    });
  }, [setWishlistItems]);

  /**
   * Check if a product is in the wishlist
   */
  const isInWishlist = useCallback(
    (productId) => wishlistItems.some((item) => item.id === productId),
    [wishlistItems]
  );

  /**
   * Clear all wishlist items
   */
  const clearWishlist = useCallback(() => {
    setWishlistItems([]);
  }, [setWishlistItems]);

  const wishlistCount = wishlistItems.length;

  const value = {
    wishlistItems,
    wishlistCount,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    clearWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
};

/**
 * Custom hook to consume WishlistContext
 */
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export default WishlistContext;
