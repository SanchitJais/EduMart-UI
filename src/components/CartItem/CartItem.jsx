// ============================================================
// EduMart – CartItem Component
// Displays a single cart item row with quantity controls
// ============================================================

import { Link } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { formatCurrency } from '../../utils/currency';
import QuantitySelector from '../QuantitySelector/QuantitySelector';
import ProductImage from '../ProductImage/ProductImage';
import styles from './CartItem.module.scss';

const CartItem = ({ item }) => {
  const { removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
  const { addToast } = useToast();

  const handleRemove = () => {
    removeFromCart(item.id);
    addToast(`${item.title} removed from cart`, 'info');
  };

  return (
    <div className={styles.item}>
      {/* Product Image */}
      <Link to={`/products/${item.id}`} className={styles.imageLink}>
        <ProductImage
          product={item}
          className={styles.image}
          loading="lazy"
        />
      </Link>

      {/* Product Info */}
      <div className={styles.info}>
        <span className={styles.category}>{item.category.replace('-', ' ')}</span>
        <Link to={`/products/${item.id}`} className={styles.titleLink}>
          <h3 className={styles.title}>{item.title}</h3>
        </Link>
        <span className={styles.brand}>{item.brand}</span>

        {/* Mobile price */}
        <div className={styles.mobilePrice}>
          <span className={styles.price}>{formatCurrency(item.discountPrice)}</span>
          <span className={styles.qty}>× {item.quantity}</span>
        </div>
      </div>

      {/* Quantity */}
      <div className={styles.quantityWrapper}>
        <QuantitySelector
          quantity={item.quantity}
          onIncrease={() => increaseQuantity(item.id)}
          onDecrease={() => decreaseQuantity(item.id)}
          max={item.stock}
        />
      </div>

      {/* Price */}
      <div className={styles.priceCol}>
        <span className={styles.price}>{formatCurrency(item.discountPrice * item.quantity)}</span>
        {item.quantity > 1 && (
          <span className={styles.unitPrice}>{formatCurrency(item.discountPrice)} each</span>
        )}
      </div>

      {/* Remove */}
      <button
        className={styles.removeBtn}
        onClick={handleRemove}
        aria-label={`Remove ${item.title} from cart`}
        title="Remove item"
      >
        <FiTrash2 />
      </button>
    </div>
  );
};

export default CartItem;
