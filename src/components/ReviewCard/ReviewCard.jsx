// ============================================================
// EduMart – ReviewCard Component
// ============================================================

import { FiUser } from 'react-icons/fi';
import Rating from '../Rating/Rating';
import styles from './ReviewCard.module.scss';

const ReviewCard = ({ review }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.avatar}>
          <FiUser />
        </div>
        <div className={styles.meta}>
          <span className={styles.user}>{review.user}</span>
          <span className={styles.date}>
            {new Date(review.date).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </span>
        </div>
        <div className={styles.ratingWrapper}>
          <Rating rating={review.rating} showCount={false} size="sm" />
        </div>
      </div>
      <p className={styles.comment}>{review.comment}</p>
    </div>
  );
};

export default ReviewCard;
