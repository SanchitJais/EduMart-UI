// Products listing page

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiGrid, FiList, FiFilter } from 'react-icons/fi';
import ProductFilter from '../../components/ProductFilter/ProductFilter';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import Pagination from '../../components/Pagination/Pagination';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import { products as allProducts } from '../../data/products';
import styles from './Products.module.scss';

const ITEMS_PER_PAGE = 12;

const DEFAULT_FILTERS = {
  category: '',
  minPrice: 0,
  maxPrice: 10000,
  rating: 0,
  sort: 'newest',
  inStock: false,
};

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    ...DEFAULT_FILTERS,
    category: searchParams.get('category') || '',
  });
  const [view, setView] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [search, setSearch] = useState(searchParams.get('search') || '');

  // Sync URL params to filters on mount
  useEffect(() => {
    const cat = searchParams.get('category') || '';
    const q = searchParams.get('search') || '';
    setFilters((prev) => ({ ...prev, category: cat }));
    setSearch(q);
    setCurrentPage(1);
  }, [searchParams]);

  const handleFilterChange = useCallback((field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    setCurrentPage(1);
  }, []);

  const handleReset = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setCurrentPage(1);
    setSearchParams({});
    setSearch('');
  }, [setSearchParams]);

  // Apply all filters + search
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Category
    if (filters.category) {
      result = result.filter((p) => p.category === filters.category);
    }

    // Price
    result = result.filter(
      (p) => p.discountPrice >= filters.minPrice && p.discountPrice <= filters.maxPrice
    );

    // Rating
    if (filters.rating) {
      result = result.filter((p) => p.rating >= filters.rating);
    }

    // In Stock
    if (filters.inStock) {
      result = result.filter((p) => p.stock > 0);
    }

    // Sort
    switch (filters.sort) {
      case 'price-asc':
        result.sort((a, b) => a.discountPrice - b.discountPrice);
        break;
      case 'price-desc':
        result.sort((a, b) => b.discountPrice - a.discountPrice);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'discount':
        result.sort((a, b) => (b.price - b.discountPrice) - (a.price - a.discountPrice));
        break;
      default: // newest — use id as proxy
        result.sort((a, b) => b.id - a.id);
    }

    return result;
  }, [filters, search]);

  // Paginate
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.page}>
      <div className="container-xl">
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: 'Products' }]} />

        {/* Page Header */}
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.pageTitle}>
              {filters.category
                ? filters.category.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase())
                : search
                ? `Search: "${search}"`
                : 'All Products'}
            </h1>
            <p className={styles.resultCount}>
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
            </p>
          </div>

          <div className={styles.headerActions}>
            {/* Mobile Filter Button */}
            <button
              className={styles.filterToggle}
              onClick={() => setMobileFilterOpen(true)}
              aria-label="Open filters"
              id="open-filters-btn"
            >
              <FiFilter />
              Filters
            </button>

            {/* View Toggle */}
            <div className={styles.viewToggle}>
              <button
                className={`${styles.viewBtn} ${view === 'grid' ? styles.activeView : ''}`}
                onClick={() => setView('grid')}
                aria-label="Grid view"
                aria-pressed={view === 'grid'}
                id="grid-view-btn"
              >
                <FiGrid />
              </button>
              <button
                className={`${styles.viewBtn} ${view === 'list' ? styles.activeView : ''}`}
                onClick={() => setView('list')}
                aria-label="List view"
                aria-pressed={view === 'list'}
                id="list-view-btn"
              >
                <FiList />
              </button>
            </div>
          </div>
        </div>

        <div className={styles.layout}>
          {/* Sidebar Filter */}
          <aside className={styles.filterCol}>
            <ProductFilter
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleReset}
              mobileOpen={mobileFilterOpen}
              onMobileClose={() => setMobileFilterOpen(false)}
            />
          </aside>

          {/* Product Results */}
          <main className={styles.resultsCol}>
            <ProductGrid products={paginatedProducts} view={view} loading={false} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Products;
