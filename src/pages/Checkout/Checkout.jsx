// ============================================================
// EduMart – Checkout Page
// ============================================================

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheck } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useUser } from '../../context/UserContext';
import { useToast } from '../../context/ToastContext';
import { formatCurrency } from '../../utils/currency';
import {
  validateCheckoutForm, isFormValid
} from '../../utils/validation';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import styles from './Checkout.module.scss';

const INDIAN_STATES = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa',
  'Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala',
  'Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland',
  'Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura',
  'Uttar Pradesh','Uttarakhand','West Bengal','Delhi','Jammu & Kashmir','Ladakh',
];

const Checkout = () => {
  const { cartItems, calculateTotal, clearCart } = useCart();
  const { currentUser } = useUser();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    street: currentUser?.address?.street || '',
    city: currentUser?.address?.city || '',
    state: currentUser?.address?.state || '',
    pin: currentUser?.address?.pin || '',
    paymentMethod: 'cod',
    upiId: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
  });

  const [errors, setErrors] = useState({});

  const { subtotal, shipping, tax, total } = calculateTotal();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const newErrors = validateCheckoutForm(form);
    setErrors(newErrors);

    if (!isFormValid(newErrors)) {
      addToast('Please fill all required fields correctly.', 'error');
      return;
    }

    setLoading(true);
    // Simulate order placement
    setTimeout(() => {
      const id = `ORD-${Date.now()}`;
      setOrderId(id);
      setOrderPlaced(true);
      clearCart();
      setLoading(false);
    }, 1500);
  };

  // ── Success Screen ──────────────────────────────────────────
  if (orderPlaced) {
    return (
      <div className={styles.successScreen}>
        <div className={styles.successCard}>
          <div className={styles.successIcon}>
            <FiCheck />
          </div>
          <h1 className={styles.successTitle}>Order Placed Successfully! 🎉</h1>
          <p className={styles.successMsg}>
            Thank you for shopping with EduMart! Your order <strong>{orderId}</strong> has been confirmed.
            You will receive a confirmation email shortly.
          </p>
          <div className={styles.successActions}>
            <button className={styles.trackBtn} onClick={() => navigate('/orders')}>
              Track Order
            </button>
            <button className={styles.shopMoreBtn} onClick={() => navigate('/')}>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className="container-xl">
        <Breadcrumb items={[{ label: 'Cart', path: '/cart' }, { label: 'Checkout' }]} />
        <h1 className={styles.pageTitle}>Checkout</h1>

        <form onSubmit={handlePlaceOrder}>
          <div className={styles.layout}>
            {/* ── Left Column: Forms ── */}
            <div className={styles.formsCol}>
              {/* Billing Info */}
              <div className={styles.formCard}>
                <h2 className={styles.formTitle}>📋 Billing Information</h2>
                <div className={styles.formGrid}>
                  <div className={`${styles.formGroup} ${styles.full}`}>
                    <label htmlFor="checkout-name" className={styles.label}>Full Name *</label>
                    <input id="checkout-name" name="name" type="text" value={form.name}
                      onChange={handleChange} className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                      placeholder="Enter your full name" />
                    {errors.name && <span className={styles.error}>{errors.name}</span>}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="checkout-email" className={styles.label}>Email Address *</label>
                    <input id="checkout-email" name="email" type="email" value={form.email}
                      onChange={handleChange} className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                      placeholder="you@example.com" />
                    {errors.email && <span className={styles.error}>{errors.email}</span>}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="checkout-phone" className={styles.label}>Phone Number *</label>
                    <input id="checkout-phone" name="phone" type="tel" value={form.phone}
                      onChange={handleChange} className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                      placeholder="10-digit mobile number" maxLength={10} />
                    {errors.phone && <span className={styles.error}>{errors.phone}</span>}
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className={styles.formCard}>
                <h2 className={styles.formTitle}>📍 Shipping Address</h2>
                <div className={styles.formGrid}>
                  <div className={`${styles.formGroup} ${styles.full}`}>
                    <label htmlFor="checkout-street" className={styles.label}>Street Address *</label>
                    <input id="checkout-street" name="street" type="text" value={form.street}
                      onChange={handleChange} className={`${styles.input} ${errors.street ? styles.inputError : ''}`}
                      placeholder="House/flat no., street, area" />
                    {errors.street && <span className={styles.error}>{errors.street}</span>}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="checkout-city" className={styles.label}>City *</label>
                    <input id="checkout-city" name="city" type="text" value={form.city}
                      onChange={handleChange} className={`${styles.input} ${errors.city ? styles.inputError : ''}`}
                      placeholder="City" />
                    {errors.city && <span className={styles.error}>{errors.city}</span>}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="checkout-state" className={styles.label}>State *</label>
                    <select id="checkout-state" name="state" value={form.state}
                      onChange={handleChange} className={`${styles.input} ${errors.state ? styles.inputError : ''}`}>
                      <option value="">Select state</option>
                      {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    {errors.state && <span className={styles.error}>{errors.state}</span>}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="checkout-pin" className={styles.label}>PIN Code *</label>
                    <input id="checkout-pin" name="pin" type="text" value={form.pin}
                      onChange={handleChange} className={`${styles.input} ${errors.pin ? styles.inputError : ''}`}
                      placeholder="6-digit PIN code" maxLength={6} />
                    {errors.pin && <span className={styles.error}>{errors.pin}</span>}
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className={styles.formCard}>
                <h2 className={styles.formTitle}>💳 Payment Method</h2>

                <div className={styles.paymentOptions}>
                  {[
                    { value: 'cod', label: '💵 Cash on Delivery' },
                    { value: 'upi', label: '📱 UPI' },
                    { value: 'card', label: '💳 Credit / Debit Card' },
                  ].map((opt) => (
                    <label
                      key={opt.value}
                      className={`${styles.payOption} ${form.paymentMethod === opt.value ? styles.selectedPay : ''}`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={opt.value}
                        checked={form.paymentMethod === opt.value}
                        onChange={handleChange}
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>

                {/* UPI Fields */}
                {form.paymentMethod === 'upi' && (
                  <div className={styles.payFields}>
                    <label htmlFor="upi-id" className={styles.label}>UPI ID</label>
                    <input id="upi-id" name="upiId" type="text" value={form.upiId}
                      onChange={handleChange} className={styles.input}
                      placeholder="yourname@upi" />
                  </div>
                )}

                {/* Card Fields */}
                {form.paymentMethod === 'card' && (
                  <div className={`${styles.payFields} ${styles.formGrid}`}>
                    <div className={`${styles.formGroup} ${styles.full}`}>
                      <label htmlFor="card-number" className={styles.label}>Card Number</label>
                      <input id="card-number" name="cardNumber" type="text" value={form.cardNumber}
                        onChange={handleChange} className={styles.input}
                        placeholder="1234 5678 9012 3456" maxLength={19} />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="card-expiry" className={styles.label}>Expiry</label>
                      <input id="card-expiry" name="cardExpiry" type="text" value={form.cardExpiry}
                        onChange={handleChange} className={styles.input} placeholder="MM/YY" maxLength={5} />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="card-cvv" className={styles.label}>CVV</label>
                      <input id="card-cvv" name="cardCvv" type="password" value={form.cardCvv}
                        onChange={handleChange} className={styles.input} placeholder="•••" maxLength={4} />
                    </div>
                    <p className={styles.cardNote}>
                      🔒 This is a UI demo. No real card data is processed.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* ── Right Column: Order Summary ── */}
            <aside className={styles.summaryCol}>
              <div className={styles.summaryCard}>
                <h2 className={styles.summaryTitle}>Order Summary</h2>

                <div className={styles.summaryItems}>
                  {cartItems.map((item) => (
                    <div key={item.id} className={styles.summaryItem}>
                      <img src={item.images[0]} alt={item.title} className={styles.summaryImg} />
                      <div className={styles.summaryItemInfo}>
                        <span className={styles.summaryItemTitle}>{item.title}</span>
                        <span className={styles.summaryItemQty}>Qty: {item.quantity}</span>
                      </div>
                      <span className={styles.summaryItemPrice}>
                        {formatCurrency(item.discountPrice * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className={styles.summaryRows}>
                  <div className={styles.summaryRow}>
                    <span>Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className={styles.summaryRow}>
                    <span>Shipping</span>
                    <span className={shipping === 0 ? styles.free : ''}>
                      {shipping === 0 ? 'FREE' : formatCurrency(shipping)}
                    </span>
                  </div>
                  <div className={styles.summaryRow}>
                    <span>GST (9%)</span>
                    <span>{formatCurrency(tax)}</span>
                  </div>
                </div>

                <div className={styles.totalRow}>
                  <span>Total</span>
                  <span className={styles.totalAmount}>{formatCurrency(total)}</span>
                </div>

                <button
                  type="submit"
                  className={styles.placeOrderBtn}
                  disabled={loading || cartItems.length === 0}
                  id="place-order-btn"
                >
                  {loading ? (
                    <span className={styles.loadingDots}>Placing Order...</span>
                  ) : (
                    <>🛍️ Place Order — {formatCurrency(total)}</>
                  )}
                </button>

                <p className={styles.secureNote}>🔒 Secure & Encrypted Checkout</p>
              </div>
            </aside>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
