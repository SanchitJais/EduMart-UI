// ============================================================
// EduMart – EmptyState Component
// Shows a friendly empty state with illustration and CTA
// ============================================================

import { Link } from 'react-router-dom';
import styles from './EmptyState.module.scss';

/**
 * @param {string} icon - emoji icon
 * @param {string} title
 * @param {string} description
 * @param {string} actionLabel - CTA button text
 * @param {string} actionLink - CTA link
 */
const EmptyState = ({
  icon = '📦',
  title = 'Nothing here yet',
  description = "It's a bit empty here.",
  actionLabel,
  actionLink,
}) => {
  return (
    <div className={styles.emptyState}>
      <div className={styles.illustration}>
        <span className={styles.icon} role="img" aria-label={title}>{icon}</span>
      </div>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
      {actionLabel && actionLink && (
        <Link to={actionLink} className={styles.cta}>
          {actionLabel}
        </Link>
      )}
    </div>
  );
};

export default EmptyState;
