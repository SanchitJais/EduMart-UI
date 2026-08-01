// ============================================================
// EduMart – ProductGrid Component
// Renders a responsive grid or list of ProductCards
// ============================================================

import ProductCard from '../ProductCard/ProductCard';
import Loader from '../Loader/Loader';
import EmptyState from '../EmptyState/EmptyState';
import styles from './ProductGrid.module.scss';

/**
 * @param {Array} products - filtered products to display
 * @param {'grid'|'list'} view
 * @param {boolean} loading
 */
const ProductGrid = ({ products, view = 'grid', loading = false }) => {
  if (loading) {
    return view === 'list'
      ? <Loader type="list" count={6} />
      : <Loader type="card" count={8} />;
  }

  if (!products || products.length === 0) {
    return (
      <EmptyState
        icon="🔍"
        title="No products found"
        description="Try adjusting your filters or search term to find what you're looking for."
        actionLabel="Browse All Products"
        actionLink="/products"
      />
    );
  }

  return (
    <div className={view === 'grid' ? styles.grid : styles.list}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} view={view} />
      ))}
    </div>
  );
};

export default ProductGrid;
