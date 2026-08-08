// Category card component

import { Link } from 'react-router-dom';
import CategoryIcon from '../icons/CategoryIcon';
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
        <CategoryIcon
          name={category.icon}
          size={28}
          color={category.color}
          className={styles.icon}
        />
      </div>
      <h3 className={styles.name}>{category.name}</h3>
      <p className={styles.count}>{category.productCount}+ products</p>
    </Link>
  );
};

export default CategoryCard;
