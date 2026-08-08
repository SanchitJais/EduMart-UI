// ============================================================
// EduMart – Orders Page
// ============================================================

import { Link } from 'react-router-dom';
import { FiDownload, FiPackage } from 'react-icons/fi';
import { useOrders } from '../../context/OrderContext';
import { formatCurrency } from '../../utils/currency';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import EmptyState from '../../components/EmptyState/EmptyState';
import Loader from '../../components/Loader/Loader';
import styles from './Orders.module.scss';

const STATUS_COLORS = {
  Delivered: 'delivered',
  Processing: 'processing',
  Cancelled: 'cancelled',
  Shipped: 'shipped',
};

const Orders = () => {
  const { orders, ordersLoading } = useOrders();

  return (
    <div className={styles.page}>
      <div className="container-xl">
        <Breadcrumb items={[{ label: 'My Orders' }]} />
        <h1 className={styles.title}>My Orders</h1>

        {ordersLoading ? (
          <Loader type="list" count={3} />
        ) : orders.length === 0 ? (
          <EmptyState
            icon="📦"
            title="No orders yet"
            description="You haven't placed any orders. Start shopping to see your orders here."
            actionLabel="Shop Now"
            actionLink="/products"
          />
        ) : (
          <div className={styles.ordersList}>
            {orders.map((order) => (
              <div key={order.id} className={styles.orderCard}>
                {/* Order Header */}
                <div className={styles.orderHeader}>
                  <div className={styles.orderMeta}>
                    <span className={styles.orderId}>{order.id}</span>
                    <span className={styles.orderDate}>
                      Placed on {new Date(order.date).toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'long', year: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className={styles.orderHeaderRight}>
                    <span className={`${styles.status} ${styles[STATUS_COLORS[order.status]]}`}>
                      {order.status}
                    </span>
                    <span className={styles.orderTotal}>{formatCurrency(order.total)}</span>
                  </div>
                </div>

                {/* Order Items */}
                <div className={styles.orderItems}>
                  {order.items.map((item) => (
                    <div key={item.productId} className={styles.orderItem}>
                      <FiPackage className={styles.packageIcon} />
                      <div className={styles.itemInfo}>
                        <span className={styles.itemTitle}>{item.title}</span>
                        <span className={styles.itemQty}>Qty: {item.qty}</span>
                      </div>
                      <span className={styles.itemPrice}>{formatCurrency(item.price * item.qty)}</span>
                    </div>
                  ))}
                </div>

                {/* Order Footer */}
                <div className={styles.orderFooter}>
                  <div className={styles.paymentInfo}>
                    <span className={styles.paymentBadge}>
                      💳 {order.paymentMethod}
                    </span>
                    <span className={styles.shippingInfo}>
                      📍 {order.address.city}, {order.address.state}
                    </span>
                  </div>
                  <div className={styles.orderActions}>
                    <button
                      className={styles.invoiceBtn}
                      onClick={() => alert(`Invoice for ${order.id} — Feature coming soon!`)}
                      aria-label="Download invoice"
                    >
                      <FiDownload /> Invoice
                    </button>
                    {order.status !== 'Cancelled' && (
                      <Link to="/products" className={styles.reorderBtn}>
                        Reorder
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
