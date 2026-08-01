// ============================================================
// EduMart – CategoryCard Component
// ============================================================

import { Link } from 'react-router-dom';
import styles from './CategoryCard.module.scss';

const CategoryCard = ({ category }) => {
  return (
    <Link
      to={`/products?category=${category.slug}`}
      className={styles.card}
      style={{ '--cat-color': category.color, '--cat-bg': category.bgColor }}
      aria-label={`Browse ${category.name}`}
    >
      <div className={styles.iconWrapper}>
        <span className={styles.icon} role="img" aria-label={category.name}>
          {category.icon}
        </span>
      </div>
      <h3 className={styles.name}>{category.name}</h3>
      <p className={styles.count}>{category.productCount}+ products</p>
    </Link>
  );
};

export default CategoryCard;
