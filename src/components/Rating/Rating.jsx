// Star rating component

import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import styles from './Rating.module.scss';

/**
 * @param {number} rating - value from 0 to 5
 * @param {number} count - number of reviews
 * @param {boolean} showCount - whether to show the review count
 * @param {'sm'|'md'|'lg'} size - star size
 */
const Rating = ({ rating = 0, count = 0, showCount = true, size = 'md' }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      // Full star
      stars.push(<FaStar key={i} className={styles.starFilled} />);
    } else if (rating >= i - 0.5) {
      // Half star
      stars.push(<FaStarHalfAlt key={i} className={styles.starFilled} />);
    } else {
      // Empty star
      stars.push(<FaRegStar key={i} className={styles.starEmpty} />);
    }
  }

  return (
    <div className={`${styles.rating} ${styles[`size-${size}`]}`} aria-label={`Rating: ${rating} out of 5`}>
      <div className={styles.stars}>{stars}</div>
      {showCount && (
        <span className={styles.count}>
          <span className={styles.ratingValue}>{rating.toFixed(1)}</span>
          {count > 0 && <span className={styles.reviewCount}>({count})</span>}
        </span>
      )}
    </div>
  );
};

export default Rating;
