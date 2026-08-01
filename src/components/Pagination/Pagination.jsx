// ============================================================
// EduMart – Pagination Component
// ============================================================

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import styles from './Pagination.module.scss';

/**
 * @param {number} currentPage
 * @param {number} totalPages
 * @param {Function} onPageChange
 */
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  // Show max 5 page buttons
  const getVisiblePages = () => {
    if (totalPages <= 5) return pages;
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + 4);
    return pages.slice(start - 1, end);
  };

  const visiblePages = getVisiblePages();

  return (
    <nav className={styles.pagination} aria-label="Products pagination">
      {/* Prev */}
      <button
        className={styles.navBtn}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <FiChevronLeft />
      </button>

      {/* First page if not visible */}
      {visiblePages[0] > 1 && (
        <>
          <button className={styles.pageBtn} onClick={() => onPageChange(1)}>1</button>
          {visiblePages[0] > 2 && <span className={styles.ellipsis}>…</span>}
        </>
      )}

      {/* Page buttons */}
      {visiblePages.map((page) => (
        <button
          key={page}
          className={`${styles.pageBtn} ${page === currentPage ? styles.active : ''}`}
          onClick={() => onPageChange(page)}
          aria-label={`Page ${page}`}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </button>
      ))}

      {/* Last page if not visible */}
      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
            <span className={styles.ellipsis}>…</span>
          )}
          <button className={styles.pageBtn} onClick={() => onPageChange(totalPages)}>
            {totalPages}
          </button>
        </>
      )}

      {/* Next */}
      <button
        className={styles.navBtn}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <FiChevronRight />
      </button>
    </nav>
  );
};

export default Pagination;
