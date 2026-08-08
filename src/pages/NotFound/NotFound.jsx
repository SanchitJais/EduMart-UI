// 404 page

import { Link } from 'react-router-dom';
import { FiHome, FiSearch } from 'react-icons/fi';
import styles from './NotFound.module.scss';

const NotFound = () => {
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.illustration}>
          <span className={styles.errorCode}>404</span>
          <span className={styles.emoji} role="img" aria-label="lost">🎒</span>
        </div>

        <h1 className={styles.title}>Oops! Page Not Found</h1>
        <p className={styles.description}>
          The page you're looking for seems to have gone on a school trip and hasn't come back yet!
          Let's get you back on track.
        </p>

        <div className={styles.actions}>
          <Link to="/" className={styles.homeBtn}>
            <FiHome /> Go Home
          </Link>
          <Link to="/products" className={styles.shopBtn}>
            <FiSearch /> Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
