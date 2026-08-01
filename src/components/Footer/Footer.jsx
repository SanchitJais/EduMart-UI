// ============================================================
// EduMart – Footer Component
// ============================================================

import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiArrowRight } from 'react-icons/fi';
import {
  FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaLinkedin
} from 'react-icons/fa';
import styles from './Footer.module.scss';

const QUICK_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'Wishlist', to: '/wishlist' },
  { label: 'Cart', to: '/cart' },
  { label: 'My Orders', to: '/orders' },
  { label: 'My Account', to: '/account' },
];

const CATEGORIES = [
  { label: 'Books', slug: 'books' },
  { label: 'Stationery', slug: 'stationery' },
  { label: 'School Bags', slug: 'school-bags' },
  { label: 'Educational Toys', slug: 'educational-toys' },
  { label: 'Healthy Snacks', slug: 'healthy-snacks' },
  { label: 'Notebooks', slug: 'notebooks' },
];

const SOCIAL = [
  { icon: <FaFacebook />, label: 'Facebook', href: '#' },
  { icon: <FaTwitter />, label: 'Twitter', href: '#' },
  { icon: <FaInstagram />, label: 'Instagram', href: '#' },
  { icon: <FaYoutube />, label: 'YouTube', href: '#' },
  { icon: <FaLinkedin />, label: 'LinkedIn', href: '#' },
];

const Footer = () => {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    alert('Thanks for subscribing! 🎉');
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.topWave} aria-hidden="true">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,0 L0,0 Z" fill="var(--bg-secondary)" />
        </svg>
      </div>

      <div className="container-xl">
        <div className={styles.grid}>
          {/* Brand Column */}
          <div className={styles.brandCol}>
            <Link to="/" className={styles.logo}>
              <span className={styles.logoIcon}>🎓</span>
              <div>
                <div className={styles.logoText}>
                  <span className={styles.edu}>Edu</span>
                  <span className={styles.mart}>Mart</span>
                </div>
                <span className={styles.tagline}>Learn. Grow. Succeed.</span>
              </div>
            </Link>

            <p className={styles.about}>
              India's favourite educational e-commerce platform. We help parents and students
              find the best school essentials, books, and learning tools.
            </p>

            <div className={styles.contactList}>
              <div className={styles.contactItem}>
                <FiMapPin className={styles.contactIcon} />
                <span>123, Knowledge Park, Mumbai 400001</span>
              </div>
              <div className={styles.contactItem}>
                <FiPhone className={styles.contactIcon} />
                <span>+91 98765 43210</span>
              </div>
              <div className={styles.contactItem}>
                <FiMail className={styles.contactIcon} />
                <span>hello@edumart.in</span>
              </div>
            </div>

            <div className={styles.social}>
              {SOCIAL.map((s) => (
                <a key={s.label} href={s.href} className={styles.socialBtn} aria-label={s.label} target="_blank" rel="noopener noreferrer">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={styles.colTitle}>Quick Links</h3>
            <ul className={styles.linkList}>
              {QUICK_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className={styles.footerLink}>
                    <FiArrowRight className={styles.linkArrow} />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className={styles.colTitle}>Categories</h3>
            <ul className={styles.linkList}>
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link to={`/products?category=${cat.slug}`} className={styles.footerLink}>
                    <FiArrowRight className={styles.linkArrow} />
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className={styles.colTitle}>Newsletter</h3>
            <p className={styles.newsletterText}>
              Get exclusive deals, new arrivals, and school tips delivered to your inbox.
            </p>
            <form className={styles.newsletter} onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                placeholder="Your email address"
                className={styles.newsletterInput}
                required
                aria-label="Email for newsletter"
              />
              <button type="submit" className={styles.newsletterBtn} aria-label="Subscribe">
                <FiArrowRight />
              </button>
            </form>
            <div className={styles.badges}>
              <span className={styles.badge}>🔒 Secure Payments</span>
              <span className={styles.badge}>🚚 Free Shipping</span>
              <span className={styles.badge}>⭐ 4.8 Rated</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottom}>
        <div className="container-xl">
          <div className={styles.bottomInner}>
            <p className={styles.copyright}>
              © {new Date().getFullYear()} EduMart. All rights reserved. Built with ❤️ for education.
            </p>
            <div className={styles.legal}>
              <Link to="#" className={styles.legalLink}>Privacy Policy</Link>
              <Link to="#" className={styles.legalLink}>Terms of Service</Link>
              <Link to="#" className={styles.legalLink}>Refund Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
