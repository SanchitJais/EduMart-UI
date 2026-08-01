// ============================================================
// EduMart – Wishlist Page
// ============================================================

import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import WishlistCard from '../../components/WishlistCard/WishlistCard';
import EmptyState from '../../components/EmptyState/EmptyState';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import styles from './Wishlist.module.scss';

const Wishlist = () => {
  const { wishlistItems, clearWishlist, wishlistCount } = useWishlist();
  const { addToast } = useToast();

  const handleClearWishlist = () => {
    clearWishlist();
    addToast('Wishlist cleared', 'info');
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="container-xl py-5">
        <EmptyState
          icon="💝"
          title="Your wishlist is empty"
          description="Save your favourite products here so you can come back to them later."
          actionLabel="Explore Products"
          actionLink="/products"
        />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className="container-xl">
        <Breadcrumb items={[{ label: 'Wishlist' }]} />

        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>My Wishlist ❤️</h1>
            <p className={styles.count}>{wishlistCount} saved item{wishlistCount !== 1 ? 's' : ''}</p>
          </div>
          <button className={styles.clearBtn} onClick={handleClearWishlist}>
            Clear All
          </button>
        </div>

        <div className={styles.grid}>
          {wishlistItems.map((product) => (
            <WishlistCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
