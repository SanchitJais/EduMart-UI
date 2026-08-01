// ============================================================
// EduMart – Toast Context
// Global notification system
// ============================================================

import { createContext, useContext, useState, useCallback, lazy, Suspense } from 'react';

// Lazy-load to avoid circular imports (Toast → useToast → ToastContext)
const ToastRenderer = lazy(() => import('../components/Toast/Toast'));

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  /**
   * Add a toast notification
   * @param {string} message
   * @param {'success'|'error'|'warning'|'info'} type
   * @param {number} duration - milliseconds
   */
  const addToast = useCallback((message, type = 'success', duration = 3000) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <Suspense fallback={null}>
        <ToastRenderer />
      </Suspense>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
};

export default ToastContext;
