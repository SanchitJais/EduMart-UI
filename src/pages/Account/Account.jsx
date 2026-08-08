// Account profile page

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiUser, FiMail, FiPhone, FiMapPin, FiLogOut,
  FiHeart, FiShoppingBag, FiEdit2, FiCheck
} from 'react-icons/fi';
import { useUser } from '../../context/UserContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { useOrders } from '../../context/OrderContext';
import { formatCurrency } from '../../utils/currency';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import styles from './Account.module.scss';

const Account = () => {
  const { currentUser, logout, updateProfile } = useUser();
  const { wishlistCount } = useWishlist();
  const { cartCount } = useCart();
  const { addToast } = useToast();
  const { orders } = useOrders();
  const navigate = useNavigate();

  const recentOrders = orders.slice(0, 2);

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    name: currentUser?.name || '',
    phone: currentUser?.phone || '',
    street: currentUser?.address?.street || '',
    city: currentUser?.address?.city || '',
    state: currentUser?.address?.state || '',
    pin: currentUser?.address?.pin || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateProfile({
      name: form.name,
      phone: form.phone,
      address: {
        street: form.street,
        city: form.city,
        state: form.state,
        pin: form.pin,
      },
    });
    setEditMode(false);
    addToast('Profile updated successfully!', 'success');
  };

  const handleLogout = () => {
    logout();
    addToast('Logged out successfully', 'info');
    navigate('/');
  };

  return (
    <div className={styles.page}>
      <div className="container-xl">
        <Breadcrumb items={[{ label: 'My Account' }]} />

        <div className={styles.layout}>
          {/* ── Sidebar ── */}
          <aside className={styles.sidebar}>
            {/* Profile Card */}
            <div className={styles.profileCard}>
              <div className={styles.avatar}>
                {currentUser?.avatar ? (
                  <img src={currentUser.avatar} alt={currentUser.name} />
                ) : (
                  <FiUser />
                )}
              </div>
              <h2 className={styles.userName}>{currentUser?.name}</h2>
              <p className={styles.userEmail}>{currentUser?.email}</p>

              <div className={styles.profileStats}>
                <Link to="/orders" className={styles.statItem}>
                  <span className={styles.statValue}>{orders.length}</span>
                  <span className={styles.statLabel}>Orders</span>
                </Link>
                <Link to="/wishlist" className={styles.statItem}>
                  <span className={styles.statValue}>{wishlistCount}</span>
                  <span className={styles.statLabel}>Wishlist</span>
                </Link>
                <Link to="/cart" className={styles.statItem}>
                  <span className={styles.statValue}>{cartCount}</span>
                  <span className={styles.statLabel}>Cart</span>
                </Link>
              </div>
            </div>

            {/* Quick Actions */}
            <div className={styles.quickActions}>
              <Link to="/orders" className={styles.actionItem}>
                <FiShoppingBag /> My Orders
              </Link>
              <Link to="/wishlist" className={styles.actionItem}>
                <FiHeart /> Wishlist ({wishlistCount})
              </Link>
              <button className={`${styles.actionItem} ${styles.logoutAction}`} onClick={handleLogout}>
                <FiLogOut /> Logout
              </button>
            </div>
          </aside>

          {/* ── Main Content ── */}
          <div className={styles.mainContent}>
            {/* Personal Details */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>Personal Details</h3>
                <button
                  className={styles.editBtn}
                  onClick={() => editMode ? handleSave() : setEditMode(true)}
                  id="edit-profile-btn"
                >
                  {editMode ? <><FiCheck /> Save Changes</> : <><FiEdit2 /> Edit Profile</>}
                </button>
              </div>

              <div className={styles.detailsGrid}>
                <div className={styles.detailItem}>
                  <label className={styles.detailLabel}>
                    <FiUser className={styles.detailIcon} /> Full Name
                  </label>
                  {editMode ? (
                    <input name="name" value={form.name} onChange={handleChange}
                      className={styles.detailInput} />
                  ) : (
                    <span className={styles.detailValue}>{currentUser?.name}</span>
                  )}
                </div>

                <div className={styles.detailItem}>
                  <label className={styles.detailLabel}>
                    <FiMail className={styles.detailIcon} /> Email
                  </label>
                  <span className={styles.detailValue}>{currentUser?.email}</span>
                </div>

                <div className={styles.detailItem}>
                  <label className={styles.detailLabel}>
                    <FiPhone className={styles.detailIcon} /> Phone
                  </label>
                  {editMode ? (
                    <input name="phone" value={form.phone} onChange={handleChange}
                      className={styles.detailInput} />
                  ) : (
                    <span className={styles.detailValue}>{currentUser?.phone || '—'}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Address */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>
                  <FiMapPin /> Saved Address
                </h3>
              </div>

              {editMode ? (
                <div className={styles.addressGrid}>
                  {[
                    { name: 'street', label: 'Street', placeholder: 'Street address' },
                    { name: 'city', label: 'City', placeholder: 'City' },
                    { name: 'state', label: 'State', placeholder: 'State' },
                    { name: 'pin', label: 'PIN Code', placeholder: '6-digit PIN' },
                  ].map((f) => (
                    <div key={f.name} className={styles.addressField}>
                      <label className={styles.detailLabel}>{f.label}</label>
                      <input name={f.name} value={form[f.name]} onChange={handleChange}
                        className={styles.detailInput} placeholder={f.placeholder} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.addressDisplay}>
                  {currentUser?.address?.street ? (
                    <p>
                      {currentUser.address.street},<br />
                      {currentUser.address.city}, {currentUser.address.state} – {currentUser.address.pin}
                    </p>
                  ) : (
                    <p className={styles.noAddress}>No address saved. Click Edit to add one.</p>
                  )}
                </div>
              )}
            </div>

            {/* Recent Orders Preview */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>Recent Orders</h3>
                <Link to="/orders" className={styles.viewAllLink}>View All</Link>
              </div>
              {recentOrders.length > 0 ? (
                <div className={styles.ordersPreview}>
                  {recentOrders.map((order) => (
                    <div key={order.id} className={styles.orderRow}>
                      <div>
                        <div className={styles.orderId}>{order.id}</div>
                        <div className={styles.orderDate}>
                          {new Date(order.date).toLocaleDateString('en-IN', {
                            day: 'numeric', month: 'short', year: 'numeric',
                          })}
                        </div>
                      </div>
                      <span className={`${styles.orderStatus} ${styles[order.status.toLowerCase()]}`}>
                        {order.status}
                      </span>
                      <span className={styles.orderAmount}>{formatCurrency(order.total)}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className={styles.noAddress}>No orders yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
