// ============================================================
// EduMart – WishlistCard Component
// ============================================================

import { Link } from 'react-router-dom';
import { FiTrash2, FiShoppingCart } from 'react-icons/fi';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { formatCurrency, calcDiscount } from '../../utils/currency';
import Rating from '../Rating/Rating';
import styles from './WishlistCard.module.scss';

const WishlistCard = ({ product }) => {
  const { removeFromWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();
  const { addToast } = useToast();

  const inCart = isInCart(product.id);
  const discount = calcDiscount(product.price, product.discountPrice);

  const handleMoveToCart = () => {
    addToCart(product);
    removeFromWishlist(product.id);
    addToast(`${product.title} moved to cart!`, 'success');
  };

  const handleRemove = () => {
    removeFromWishlist(product.id);
    addToast('Removed from wishlist', 'info');
  };

  return (
    <div className={styles.card}>
      {discount > 0 && (
        <span className={styles.discountBadge}>-{discount}%</span>
      )}

      <button
        className={styles.removeBtn}
        onClick={handleRemove}
        aria-label={`Remove ${product.title} from wishlist`}
      >
        <FiTrash2 />
      </button>

      <Link to={`/products/${product.id}`} className={styles.imageLink}>
        <img
          src={product.images[0]}
          alt={product.title}
          className={styles.image}
          loading="lazy"
        />
      </Link>

      <div className={styles.body}>
        <span className={styles.category}>{product.category.replace('-', ' ')}</span>
        <Link to={`/products/${product.id}`} className={styles.titleLink}>
          <h3 className={styles.title}>{product.title}</h3>
        </Link>

        <Rating rating={product.rating} count={product.reviews?.length} size="sm" />

        <div className={styles.priceRow}>
          <span className={styles.price}>{formatCurrency(product.discountPrice)}</span>
          {discount > 0 && (
            <span className={styles.originalPrice}>{formatCurrency(product.price)}</span>
          )}
        </div>

        <button
          className={`${styles.moveToCart} ${inCart ? styles.inCart : ''}`}
          onClick={handleMoveToCart}
          disabled={product.stock === 0}
          aria-label={inCart ? 'Already in cart' : 'Move to cart'}
        >
          <FiShoppingCart />
          {inCart ? 'In Cart' : 'Move to Cart'}
        </button>
      </div>
    </div>
  );
};

export default WishlistCard;
