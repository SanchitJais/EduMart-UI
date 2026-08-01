// ============================================================
// EduMart – App.jsx
// Root router and layout with all providers
// ============================================================

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

// Providers
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { UserProvider } from './context/UserContext';
import { ToastProvider } from './context/ToastContext';

// Layout Components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

// Pages
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import Wishlist from './pages/Wishlist/Wishlist';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Account from './pages/Account/Account';
import Orders from './pages/Orders/Orders';
import NotFound from './pages/NotFound/NotFound';

// Protected Route
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

// Global styles
import './styles/global.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

// ── ScrollToTop: resets scroll position on route change ──────
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
};

// ── AppRoutes: actual page routes ────────────────────────────
const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};

// ── App: wraps everything in providers ────────────────────────
const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <CartProvider>
          <WishlistProvider>
            <ToastProvider>
              <AppRoutes />
            </ToastProvider>
          </WishlistProvider>
        </CartProvider>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
