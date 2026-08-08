// Cart page

import { Link } from 'react-router-dom';
import { FiShoppingBag, FiArrowRight, FiTrash2 } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { formatCurrency } from '../../utils/currency';
import CartItem from '../../components/CartItem/CartItem';
import EmptyState from '../../components/EmptyState/EmptyState';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import styles from './Cart.module.scss';

const Cart = () => {
  const { cartItems, clearCart, calculateTotal, cartCount } = useCart();
  const { addToast } = useToast();

  const { subtotal, shipping, tax, total } = calculateTotal();

  const handleClearCart = () => {
    clearCart();
    addToast('Cart cleared', 'info');
  };

  if (cartItems.length === 0) {
    return (
      <div className="container-xl py-5">
        <EmptyState
          icon="🛒"
          title="Your cart is empty"
          description="Looks like you haven't added anything to your cart yet. Start shopping to fill it up!"
          actionLabel="Browse Products"
          actionLink="/products"
        />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className="container-xl">
        <Breadcrumb items={[{ label: 'Cart' }]} />

        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.title}>My Cart</h1>
            <p className={styles.count}>{cartCount} item{cartCount !== 1 ? 's' : ''}</p>
          </div>
          <button className={styles.clearBtn} onClick={handleClearCart} aria-label="Clear cart">
            <FiTrash2 /> Clear Cart
          </button>
        </div>

        <div className={styles.layout}>
          {/* Cart Items */}
          <div className={styles.itemsCol}>
            <div className={styles.itemsList}>
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            <Link to="/products" className={styles.continueLink}>
              <FiShoppingBag /> Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <aside className={styles.summaryCol}>
            <div className={styles.summaryCard}>
              <h2 className={styles.summaryTitle}>Order Summary</h2>

              <div className={styles.summaryRows}>
                <div className={styles.summaryRow}>
                  <span>Subtotal ({cartCount} items)</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Shipping</span>
                  <span className={shipping === 0 ? styles.free : ''}>
                    {shipping === 0 ? '🎉 FREE' : formatCurrency(shipping)}
                  </span>
                </div>
                <div className={styles.summaryRow}>
                  <span>GST (9%)</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
              </div>

              {shipping > 0 && (
                <div className={styles.shippingNote}>
                  Add {formatCurrency(999 - subtotal)} more to get FREE shipping!
                </div>
              )}

              <div className={styles.totalRow}>
                <span>Grand Total</span>
                <span className={styles.totalAmount}>{formatCurrency(total)}</span>
              </div>

              <Link to="/checkout" className={styles.checkoutBtn} id="proceed-checkout-btn">
                Proceed to Checkout <FiArrowRight />
              </Link>

              <div className={styles.paymentIcons}>
                <span className={styles.payIcon}>💳 Cards</span>
                <span className={styles.payIcon}>📱 UPI</span>
                <span className={styles.payIcon}>💵 COD</span>
              </div>

              <p className={styles.secureNote}>🔒 100% Secure Checkout</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Cart;
