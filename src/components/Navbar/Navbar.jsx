// Navbar component

import { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  FiShoppingCart, FiHeart, FiUser, FiMenu, FiX,
  FiSun, FiMoon, FiLogOut, FiHome, FiGrid, FiPackage
} from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useUser } from '../../context/UserContext';
import SearchBar from '../SearchBar/SearchBar';
import EduMartLogo from '../Logo/EduMartLogo';
import styles from './Navbar.module.scss';

const Navbar = () => {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { currentUser, darkMode, toggleDarkMode, logout, isLoggedIn } = useUser();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

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
            <EduMartLogo size={34} showTagline />
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
                  <span className={styles.mobileBadge}>{wishlistCount}</span>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink to="/cart" onClick={closeMobile} className={({ isActive }) => isActive ? styles.active : ''}>
                <FiShoppingCart /> Cart
                {cartCount > 0 && (
                  <span className={styles.mobileBadge}>{cartCount}</span>
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
                    <FiPackage /> My Orders
                  </NavLink>
                </li>
                <li>
                  <button className={styles.mobileLogoutBtn} onClick={handleLogout}>
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
                    <FiGrid /> Create Account
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
