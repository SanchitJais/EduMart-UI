// ============================================================
// EduMart – Order Context
// Fetches and places orders against the real backend (persisted
// in backend/data/db.json) — a Resend confirmation email fires
// server-side whenever an order is placed.
// ============================================================

import { createContext, useContext, useCallback, useEffect, useState } from 'react';
import { orderApi, ApiError } from '../utils/api';
import { useUser } from './UserContext';

const OrderContext = createContext(null);

/**
 * OrderProvider wraps the app and provides order history + placement
 */
export const OrderProvider = ({ children }) => {
  const { authToken } = useUser();
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  /**
   * (Re)fetch the current user's order history from the backend
   */
  const refreshOrders = useCallback(async () => {
    if (!authToken) {
      setOrders([]);
      return;
    }
    setOrdersLoading(true);
    try {
      setOrders(await orderApi.list(authToken));
    } catch {
      setOrders([]);
    } finally {
      setOrdersLoading(false);
    }
  }, [authToken]);

  // Load orders whenever the logged-in user changes (including on logout)
  useEffect(() => {
    refreshOrders();
  }, [refreshOrders]);

  /**
   * Place a new order. Returns { success, order } or { success: false, message }
   */
  const placeOrder = useCallback(async (payload) => {
    try {
      const { message: _msg, ...order } = await orderApi.place(payload, authToken);
      setOrders((prev) => [order, ...prev]);
      return { success: true, order };
    } catch (err) {
      return {
        success: false,
        message: err instanceof ApiError ? err.message : 'Could not place your order. Please try again.',
      };
    }
  }, [authToken]);

  /**
   * Cancel an order the current user owns
   */
  const cancelOrder = useCallback(async (orderId) => {
    try {
      const { message: _msg, ...updated } = await orderApi.cancel(orderId, authToken);
      setOrders((prev) => prev.map((o) => (o.id === orderId ? updated : o)));
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err instanceof ApiError ? err.message : 'Could not cancel this order.',
      };
    }
  }, [authToken]);

  const value = { orders, ordersLoading, placeOrder, cancelOrder, refreshOrders };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};

/**
 * Custom hook to consume OrderContext
 */
export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};

export default OrderContext;
