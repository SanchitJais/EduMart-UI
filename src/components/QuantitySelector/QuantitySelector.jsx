// Quantity selector component

import { FiMinus, FiPlus } from 'react-icons/fi';
import styles from './QuantitySelector.module.scss';

/**
 * @param {number} quantity - current quantity
 * @param {Function} onIncrease
 * @param {Function} onDecrease
 * @param {number} max - maximum stock
 */
const QuantitySelector = ({ quantity, onIncrease, onDecrease, max = 100 }) => {
  return (
    <div className={styles.selector} role="group" aria-label="Quantity selector">
      <button
        className={styles.btn}
        onClick={onDecrease}
        disabled={quantity <= 1}
        aria-label="Decrease quantity"
      >
        <FiMinus />
      </button>
      <span className={styles.count} aria-live="polite" aria-label={`Quantity: ${quantity}`}>
        {quantity}
      </span>
      <button
        className={styles.btn}
        onClick={onIncrease}
        disabled={quantity >= max}
        aria-label="Increase quantity"
      >
        <FiPlus />
      </button>
    </div>
  );
};

export default QuantitySelector;
