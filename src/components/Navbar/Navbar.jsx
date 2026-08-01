// ============================================================
// EduMart – Navbar Component
// Responsive sticky navbar with cart/wishlist badges, search,
// dark mode toggle, and mobile hamburger menu
// ============================================================

import { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  FiShoppingCart, FiHeart, FiUser, FiMenu, FiX,
  FiSun, FiMoon, FiLogOut, FiHome, FiGrid
} from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useUser } from '../../context/UserContext';
import SearchBar from '../SearchBar/SearchBar';
import styles from './Navbar.module.scss';

const Navbar = () => {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { currentUser, darkMode, toggleDarkMode, logout, isLoggedIn } = useUser();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  // Detect scroll for elevated shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    navigate('/');
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className="container-xl">
        <nav className={styles.navInner}>

          {/* ── Logo ── */}
          <Link to="/" className={styles.logo} onClick={closeMobile}>
            <div className={styles.logoIcon}>🎓</div>
            <div>
              <div className={styles.logoText}>
                <span className={styles.edu}>Edu</span>
                <span className={styles.mart}>Mart</span>
              </div>
              <span className={styles.logoTagline}>Learn. Grow. Succeed.</span>
            </div>
          </Link>

          {/* ── Search (desktop) ── */}
          <div className={styles.searchWrapper}>
            <SearchBar />
          </div>

          {/* ── Nav Links (desktop) ── */}
          <ul className={styles.navLinks}>
            <li>
              <NavLink to="/" end className={({ isActive }) => isActive ? styles.active : ''}>
                <FiHome /> Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/products" className={({ isActive }) => isActive ? styles.active : ''}>
                <FiGrid /> Products
              </NavLink>
            </li>
          </ul>

          {/* ── Right Actions ── */}
          <div className={styles.navActions}>

            {/* Dark Mode Toggle */}
            <button
              className={styles.darkToggle}
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <FiSun /> : <FiMoon />}
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className={styles.iconBtn}
              aria-label={`Wishlist (${wishlistCount} items)`}
              title="Wishlist"
            >
              <FiHeart />
              {wishlistCount > 0 && (
                <span className={`${styles.badge} ${styles.wishlistBadge}`}>
                  {wishlistCount > 9 ? '9+' : wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className={styles.iconBtn}
              aria-label={`Cart (${cartCount} items)`}
              title="Cart"
            >
              <FiShoppingCart />
              {cartCount > 0 && (
                <span className={`${styles.badge} ${styles.cartBadge}`}>
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Link>

            {/* User / Login */}
            {isLoggedIn ? (
              <>
                <Link
                  to="/account"
                  className={styles.iconBtn}
                  title={currentUser?.name}
                  aria-label="My Account"
                >
                  {currentUser?.avatar ? (
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      style={{
                        width: 28, height: 28, borderRadius: '50%', objectFit: 'cover'
                      }}
                    />
                  ) : (
                    <FiUser />
                  )}
                </Link>
              </>
            ) : (
              <Link to="/login" className={styles.loginBtn}>
                <FiUser />
                <span className="d-none d-md-inline">Login</span>
              </Link>
            )}

            {/* Hamburger */}
            <button
              className={styles.hamburger}
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </nav>
      </div>

      {/* ── Mobile Menu ── */}
      {mobileOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileSearch}>
            <SearchBar onSearch={closeMobile} />
          </div>

          <ul className={styles.mobileLinks}>
            <li>
              <NavLink to="/" end onClick={closeMobile} className={({ isActive }) => isActive ? styles.active : ''}>
                <FiHome /> Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/products" onClick={closeMobile} className={({ isActive }) => isActive ? styles.active : ''}>
                <FiGrid /> Products
              </NavLink>
            </li>
            <li>
              <NavLink to="/wishlist" onClick={closeMobile} className={({ isActive }) => isActive ? styles.active : ''}>
                <FiHeart /> Wishlist
                {wishlistCount > 0 && (
                  <span className="badge bg-danger ms-auto">{wishlistCount}</span>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink to="/cart" onClick={closeMobile} className={({ isActive }) => isActive ? styles.active : ''}>
                <FiShoppingCart /> Cart
                {cartCount > 0 && (
                  <span className="badge bg-primary ms-auto">{cartCount}</span>
                )}
              </NavLink>
            </li>

            <hr className={styles.mobileDivider} />

            {isLoggedIn ? (
              <>
                <li>
                  <NavLink to="/account" onClick={closeMobile}>
                    <FiUser /> My Account
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/orders" onClick={closeMobile}>
                    🛍️ My Orders
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    style={{
                      background: 'none', border: 'none', width: '100%',
                      display: 'flex', alignItems: 'center', gap: '0.75rem',
                      padding: '0.75rem 1rem', borderRadius: '0.5rem',
                      color: 'var(--text-secondary)', cursor: 'pointer',
                      fontSize: '0.9rem', fontWeight: '500'
                    }}
                  >
                    <FiLogOut /> Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/login" onClick={closeMobile}>
                    <FiUser /> Login
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/register" onClick={closeMobile}>
                    ✨ Create Account
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
