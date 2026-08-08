// Product card component

import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiEye, FiCheck } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import { calcDiscount, formatCurrency } from '../../utils/currency';
import Rating from '../Rating/Rating';
import ProductImage from '../ProductImage/ProductImage';
import styles from './ProductCard.module.scss';

/**
 * @param {Object} product - product data object
 * @param {'grid'|'list'} view - layout mode
 */
const ProductCard = ({ product, view = 'grid' }) => {
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();

  const inCart = isInCart(product.id);
  const inWishlist = isInWishlist(product.id);
  const discount = calcDiscount(product.price, product.discountPrice);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!inCart) {
      addToCart(product);
      addToast(`${product.title} added to cart!`, 'success');
    }
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    addToast(
      inWishlist ? 'Removed from wishlist' : `${product.title} added to wishlist!`,
      inWishlist ? 'info' : 'success'
    );
  };

  if (view === 'list') {
    return (
      <div className={styles.listCard}>
        <Link to={`/products/${product.id}`} className={styles.listImageLink}>
          <ProductImage
            product={product}
            className={styles.listImage}
            loading="lazy"
          />
          {discount > 0 && (
            <span className={styles.discountBadge}>-{discount}%</span>
          )}
        </Link>

        <div className={styles.listInfo}>
          <div>
            <span className={styles.categoryBadge}>{product.category}</span>
            <Link to={`/products/${product.id}`} className={styles.listTitle}>
              {product.title}
            </Link>
            <p className={styles.listDescription}>{product.description}</p>
            <div className="mt-2">
              <Rating rating={product.rating} count={product.reviews?.length} size="sm" />
            </div>
          </div>

          <div className={styles.listMeta}>
            <span className={styles.brand}>{product.brand}</span>
            {product.stock < 10 && product.stock > 0 && (
              <span className={styles.lowStock}>Only {product.stock} left!</span>
            )}
            {product.stock === 0 && (
              <span className={styles.outOfStock}>Out of Stock</span>
            )}
          </div>
        </div>

        <div className={styles.listPriceSection}>
          <div className={styles.priceBlock}>
            <span className={styles.currentPrice}>{formatCurrency(product.discountPrice)}</span>
            {discount > 0 && (
              <span className={styles.originalPrice}>{formatCurrency(product.price)}</span>
            )}
            {discount > 0 && (
              <span className={styles.saveBadge}>Save {discount}%</span>
            )}
          </div>

          <div className={styles.listActions}>
            <button
              className={`${styles.cartBtn} ${inCart ? styles.inCart : ''}`}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              aria-label={inCart ? 'Already in cart' : 'Add to cart'}
            >
              <FiShoppingCart />
              {inCart ? 'In Cart' : 'Add to Cart'}
            </button>
            <button
              className={`${styles.wishlistBtnList} ${inWishlist ? styles.wishlisted : ''}`}
              onClick={handleWishlist}
              aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              {inWishlist ? <FaHeart /> : <FiHeart />}
            </button>
            <Link
              to={`/products/${product.id}`}
              className={styles.viewBtn}
              aria-label="View details"
            >
              <FiEye />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Grid View ──────────────────────────────────────────────
  return (
    <div className={styles.card}>
      {/* Badges */}
      <div className={styles.badges}>
        {product.isBestSeller && <span className={styles.badge + ' ' + styles.bestSeller}>Best Seller</span>}
        {product.isNewArrival && <span className={styles.badge + ' ' + styles.newArrival}>New</span>}
        {product.isTrending && !product.isBestSeller && !product.isNewArrival && (
          <span className={styles.badge + ' ' + styles.trending}>Trending</span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        className={`${styles.wishlistBtn} ${inWishlist ? styles.wishlisted : ''}`}
        onClick={handleWishlist}
        aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        {inWishlist ? <FaHeart /> : <FiHeart />}
      </button>

      {/* Product Image */}
      <Link to={`/products/${product.id}`} className={styles.imageLink}>
        <div className={styles.imageWrapper}>
          <ProductImage
            product={product}
            className={styles.image}
            loading="lazy"
          />
          {discount > 0 && (
            <div className={styles.discountBadge}>-{discount}%</div>
          )}
          {/* Hover overlay */}
          <div className={styles.overlay}>
            <span className={styles.quickView}>
              <FiEye /> Quick View
            </span>
          </div>
        </div>
      </Link>

      {/* Card Body */}
      <div className={styles.body}>
        <span className={styles.category}>{product.category.replace('-', ' ')}</span>
        <Link to={`/products/${product.id}`} className={styles.titleLink}>
          <h3 className={styles.title}>{product.title}</h3>
        </Link>
        <span className={styles.brand}>{product.brand}</span>

        <div className={styles.ratingRow}>
          <Rating rating={product.rating} count={product.reviews?.length} size="sm" />
        </div>

        {/* Price */}
        <div className={styles.priceRow}>
          <span className={styles.currentPrice}>{formatCurrency(product.discountPrice)}</span>
          {discount > 0 && (
            <span className={styles.originalPrice}>{formatCurrency(product.price)}</span>
          )}
        </div>

        {/* Stock Warning */}
        {product.stock > 0 && product.stock < 10 && (
          <p className={styles.lowStock}>Only {product.stock} left!</p>
        )}
        {product.stock === 0 && (
          <p className={styles.outOfStock}>Out of Stock</p>
        )}

        {/* Add to Cart */}
        <button
          className={`${styles.addToCart} ${inCart ? styles.inCart : ''}`}
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          id={`add-to-cart-${product.id}`}
        >
          <FiShoppingCart />
          {inCart ? <><FiCheck /> Added to Cart</> : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
