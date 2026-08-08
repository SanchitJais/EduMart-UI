// Product filter sidebar component

import { FiX, FiFilter } from 'react-icons/fi';
import { categories } from '../../data/categories';
import CategoryIcon from '../icons/CategoryIcon';
import styles from './ProductFilter.module.scss';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'discount', label: 'Biggest Discount' },
];

const RATINGS = [4, 3, 2, 1];

/**
 * @param {Object} filters - current filter state
 * @param {Function} onFilterChange - called with {field, value}
 * @param {Function} onReset - reset all filters
 * @param {boolean} mobileOpen
 * @param {Function} onMobileClose
 */
const ProductFilter = ({ filters, onFilterChange, onReset, mobileOpen, onMobileClose }) => {
  const activeCount = [
    filters.category !== '',
    filters.minPrice !== 0,
    filters.maxPrice !== 10000,
    filters.rating !== 0,
  ].filter(Boolean).length;

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className={styles.overlay} onClick={onMobileClose} aria-hidden="true" />
      )}

      <aside className={`${styles.sidebar} ${mobileOpen ? styles.open : ''}`}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <FiFilter />
            <h2 className={styles.title}>Filters</h2>
            {activeCount > 0 && (
              <span className={styles.activeCount}>{activeCount}</span>
            )}
          </div>
          <div className={styles.headerRight}>
            {activeCount > 0 && (
              <button className={styles.resetBtn} onClick={onReset}>
                Reset All
              </button>
            )}
            <button className={styles.closeBtn} onClick={onMobileClose} aria-label="Close filters">
              <FiX />
            </button>
          </div>
        </div>

        {/* Sort By */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Sort By</h3>
          <select
            className={styles.select}
            value={filters.sort}
            onChange={(e) => onFilterChange('sort', e.target.value)}
            aria-label="Sort products"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {/* Category */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Category</h3>
          <div className={styles.categoryList}>
            <label className={styles.radioItem}>
              <input
                type="radio"
                name="category"
                value=""
                checked={filters.category === ''}
                onChange={(e) => onFilterChange('category', e.target.value)}
              />
              <span>All Categories</span>
            </label>
            {categories.map((cat) => (
              <label key={cat.id} className={styles.radioItem}>
                <input
                  type="radio"
                  name="category"
                  value={cat.slug}
                  checked={filters.category === cat.slug}
                  onChange={(e) => onFilterChange('category', e.target.value)}
                />
                <CategoryIcon name={cat.icon} size={15} color={cat.color} className={styles.categoryIcon} />
                <span>{cat.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Price Range</h3>
          <div className={styles.priceInputs}>
            <div className={styles.priceInput}>
              <label htmlFor="min-price">Min ₹</label>
              <input
                id="min-price"
                type="number"
                min="0"
                max={filters.maxPrice}
                value={filters.minPrice}
                onChange={(e) => onFilterChange('minPrice', Number(e.target.value))}
                className={styles.numberInput}
              />
            </div>
            <span className={styles.priceDash}>—</span>
            <div className={styles.priceInput}>
              <label htmlFor="max-price">Max ₹</label>
              <input
                id="max-price"
                type="number"
                min={filters.minPrice}
                max="50000"
                value={filters.maxPrice}
                onChange={(e) => onFilterChange('maxPrice', Number(e.target.value))}
                className={styles.numberInput}
              />
            </div>
          </div>
          <input
            type="range"
            min="0"
            max="10000"
            value={filters.maxPrice}
            onChange={(e) => onFilterChange('maxPrice', Number(e.target.value))}
            className={styles.rangeSlider}
            aria-label="Maximum price slider"
          />
          <div className={styles.rangeLabels}>
            <span>₹0</span>
            <span>₹10,000</span>
          </div>
        </div>

        {/* Rating Filter */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Minimum Rating</h3>
          <div className={styles.ratingList}>
            <label className={styles.radioItem}>
              <input
                type="radio"
                name="rating"
                value={0}
                checked={filters.rating === 0}
                onChange={() => onFilterChange('rating', 0)}
              />
              <span>All Ratings</span>
            </label>
            {RATINGS.map((r) => (
              <label key={r} className={styles.radioItem}>
                <input
                  type="radio"
                  name="rating"
                  value={r}
                  checked={filters.rating === r}
                  onChange={() => onFilterChange('rating', r)}
                />
                <span>
                  {'⭐'.repeat(r)} {r}+ Stars
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Availability */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Availability</h3>
          <label className={styles.checkItem}>
            <input
              type="checkbox"
              checked={filters.inStock}
              onChange={(e) => onFilterChange('inStock', e.target.checked)}
            />
            <span>In Stock Only</span>
          </label>
        </div>
      </aside>
    </>
  );
};

export default ProductFilter;
