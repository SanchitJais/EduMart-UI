// ============================================================
// EduMart – Loader (Skeleton) Component
// Shows skeleton placeholders while content is loading
// ============================================================

import styles from './Loader.module.scss';

/**
 * @param {'card'|'list'|'spinner'|'page'} type
 * @param {number} count - number of skeleton cards to show
 */
const Loader = ({ type = 'card', count = 8 }) => {
  if (type === 'spinner') {
    return (
      <div className={styles.spinnerWrapper} role="status" aria-label="Loading...">
        <div className={styles.spinner}></div>
        <p className={styles.spinnerText}>Loading...</p>
      </div>
    );
  }

  if (type === 'page') {
    return (
      <div className={styles.pageLoader} role="status" aria-label="Loading page...">
        <div className={styles.spinner}></div>
      </div>
    );
  }

  if (type === 'list') {
    return (
      <div className={styles.listSkeletons} role="status" aria-label="Loading products...">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className={styles.listSkeleton}>
            <div className={`${styles.shimmer} ${styles.listImg}`}></div>
            <div className={styles.listSkeletonInfo}>
              <div className={`${styles.shimmer} ${styles.skeletonLine} ${styles.wide}`}></div>
              <div className={`${styles.shimmer} ${styles.skeletonLine} ${styles.medium}`}></div>
              <div className={`${styles.shimmer} ${styles.skeletonLine} ${styles.short}`}></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Default: grid card skeletons
  return (
    <div className={styles.grid} role="status" aria-label="Loading products...">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={styles.cardSkeleton}>
          <div className={`${styles.shimmer} ${styles.skeletonImg}`}></div>
          <div className={styles.skeletonBody}>
            <div className={`${styles.shimmer} ${styles.skeletonBadge}`}></div>
            <div className={`${styles.shimmer} ${styles.skeletonLine} ${styles.wide}`}></div>
            <div className={`${styles.shimmer} ${styles.skeletonLine} ${styles.medium}`}></div>
            <div className={`${styles.shimmer} ${styles.skeletonLine} ${styles.short}`}></div>
            <div className={`${styles.shimmer} ${styles.skeletonBtn}`}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loader;
