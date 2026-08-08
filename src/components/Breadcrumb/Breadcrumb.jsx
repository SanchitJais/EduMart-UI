// Breadcrumb navigation component

import { Link } from 'react-router-dom';
import { FiChevronRight, FiHome } from 'react-icons/fi';
import styles from './Breadcrumb.module.scss';

/**
 * @param {Array} items - [{label, path}] — last item is current page (no path needed)
 */
const Breadcrumb = ({ items = [] }) => {
  return (
    <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
      <ol className={styles.list}>
        <li className={styles.item}>
          <Link to="/" className={styles.link}>
            <FiHome className={styles.homeIcon} />
            Home
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className={styles.item}>
              <FiChevronRight className={styles.separator} aria-hidden="true" />
              {isLast ? (
                <span className={styles.current} aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link to={item.path} className={styles.link}>
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
