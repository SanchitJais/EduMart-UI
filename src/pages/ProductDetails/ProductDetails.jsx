// ============================================================
// EduMart – Product Details Page
// ============================================================

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiShare2, FiChevronLeft } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import { useUser } from '../../context/UserContext';
import { products } from '../../data/products';
import { formatCurrency, calcDiscount } from '../../utils/currency';
import Rating from '../../components/Rating/Rating';
import ReviewCard from '../../components/ReviewCard/ReviewCard';
import QuantitySelector from '../../components/QuantitySelector/QuantitySelector';
import ProductCard from '../../components/ProductCard/ProductCard';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import EmptyState from '../../components/EmptyState/EmptyState';
import styles from './ProductDetails.module.scss';

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();
  const { addRecentlyViewed } = useUser();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  // Track as recently viewed
  useEffect(() => {
    if (product) {
      addRecentlyViewed(product);
      setSelectedImage(0);
    }
  }, [product, addRecentlyViewed]);

  if (!product) {
    return (
      <div className="container-xl py-5">
        <EmptyState
          icon="😕"
          title="Product Not Found"
          description="The product you're looking for doesn't exist or has been removed."
          actionLabel="Browse All Products"
          actionLink="/products"
        />
      </div>
    );
  }

  const inCart = isInCart(product.id);
  const inWishlist = isInWishlist(product.id);
  const discount = calcDiscount(product.price, product.discountPrice);

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    addToast(`${product.title} added to cart!`, 'success');
  };

  const handleWishlist = () => {
    toggleWishlist(product);
    addToast(
      inWishlist ? 'Removed from wishlist' : 'Added to wishlist!',
      inWishlist ? 'info' : 'success'
    );
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    addToast('Product link copied to clipboard!', 'info');
  };

  return (
    <div className={styles.page}>
      <div className="container-xl">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Products', path: '/products' },
            { label: product.category.replace('-', ' '), path: `/products?category=${product.category}` },
            { label: product.title },
          ]}
        />

        {/* Back Button */}
        <Link to="/products" className={styles.backBtn}>
          <FiChevronLeft /> Back to Products
        </Link>

        {/* Product Section */}
        <div className={styles.productLayout}>
          {/* ── Image Gallery ── */}
          <div className={styles.gallery}>
            <div className={styles.mainImage}>
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className={styles.mainImg}
              />
              {discount > 0 && (
                <span className={styles.discountBadge}>-{discount}% OFF</span>
              )}
              {product.isBestSeller && (
                <span className={styles.bestSellerBadge}>🏆 Best Seller</span>
              )}
            </div>

            {product.images.length > 1 && (
              <div className={styles.thumbnails}>
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    className={`${styles.thumbnail} ${i === selectedImage ? styles.activeThumbnail : ''}`}
                    onClick={() => setSelectedImage(i)}
                    aria-label={`View image ${i + 1}`}
                  >
                    <img src={img} alt={`${product.title} view ${i + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Product Info ── */}
          <div className={styles.info}>
            <div className={styles.categoryRow}>
              <span className={styles.category}>{product.category.replace('-', ' ')}</span>
              <span className={styles.brand}>{product.brand}</span>
            </div>

            <h1 className={styles.title}>{product.title}</h1>

            {/* Rating */}
            <div className={styles.ratingRow}>
              <Rating
                rating={product.rating}
                count={product.reviews?.length}
                size="md"
              />
            </div>

            {/* Price */}
            <div className={styles.priceSection}>
              <span className={styles.currentPrice}>{formatCurrency(product.discountPrice)}</span>
              {discount > 0 && (
                <>
                  <span className={styles.originalPrice}>{formatCurrency(product.price)}</span>
                  <span className={styles.saveBadge}>You save {formatCurrency(product.price - product.discountPrice)} ({discount}%)</span>
                </>
              )}
            </div>

            {/* Stock */}
            <div className={styles.stockRow}>
              {product.stock > 0 ? (
                <>
                  <span className={styles.inStock}>✅ In Stock</span>
                  {product.stock < 10 && (
                    <span className={styles.lowStockWarning}>Only {product.stock} left!</span>
                  )}
                </>
              ) : (
                <span className={styles.outOfStock}>❌ Out of Stock</span>
              )}
            </div>

            {/* Quantity */}
            {product.stock > 0 && (
              <div className={styles.quantitySection}>
                <label className={styles.qtyLabel}>Quantity:</label>
                <QuantitySelector
                  quantity={quantity}
                  onIncrease={() => setQuantity((q) => Math.min(q + 1, product.stock))}
                  onDecrease={() => setQuantity((q) => Math.max(q - 1, 1))}
                  max={product.stock}
                />
              </div>
            )}

            {/* Actions */}
            <div className={styles.actions}>
              <button
                className={`${styles.addToCartBtn} ${inCart ? styles.inCart : ''}`}
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                id="add-to-cart-detail-btn"
              >
                <FiShoppingCart />
                {inCart ? 'Added to Cart ✓' : 'Add to Cart'}
              </button>

              <button
                className={`${styles.wishlistBtn} ${inWishlist ? styles.wishlisted : ''}`}
                onClick={handleWishlist}
                aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                id="wishlist-detail-btn"
              >
                {inWishlist ? <FaHeart /> : <FiHeart />}
              </button>

              <button
                className={styles.shareBtn}
                onClick={handleShare}
                aria-label="Share product"
                id="share-product-btn"
              >
                <FiShare2 />
              </button>
            </div>

            {/* Buy Now */}
            {product.stock > 0 && !inCart && (
              <Link to="/cart" className={styles.buyNowBtn} onClick={handleAddToCart}>
                Buy Now
              </Link>
            )}

            {/* Trust Badges */}
            <div className={styles.trustBadges}>
              <span className={styles.trustBadge}>🔒 Secure Payment</span>
              <span className={styles.trustBadge}>🚚 Free Shipping ₹999+</span>
              <span className={styles.trustBadge}>🔄 7-Day Return</span>
            </div>
          </div>
        </div>

        {/* ── Tabs: Description / Specs / Reviews ── */}
        <div className={styles.tabs}>
          <div className={styles.tabNav}>
            {['description', 'specifications', 'reviews'].map((tab) => (
              <button
                key={tab}
                className={`${styles.tabBtn} ${activeTab === tab ? styles.activeTab : ''}`}
                onClick={() => setActiveTab(tab)}
                aria-selected={activeTab === tab}
                id={`tab-${tab}`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {tab === 'reviews' && ` (${product.reviews?.length || 0})`}
              </button>
            ))}
          </div>

          <div className={styles.tabContent}>
            {activeTab === 'description' && (
              <div className={styles.description}>
                <p>{product.description}</p>
                <div className={styles.tagList}>
                  {product.tags?.map((tag) => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className={styles.specifications}>
                {product.specifications ? (
                  <table className={styles.specTable}>
                    <tbody>
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <tr key={key}>
                          <td className={styles.specKey}>{key}</td>
                          <td className={styles.specValue}>{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className={styles.noSpecs}>No specifications available.</p>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className={styles.reviews}>
                {product.reviews?.length > 0 ? (
                  <>
                    <div className={styles.reviewsSummary}>
                      <div className={styles.avgRating}>
                        <span className={styles.avgRatingNumber}>{product.rating.toFixed(1)}</span>
                        <Rating rating={product.rating} showCount={false} size="lg" />
                        <span className={styles.totalReviews}>{product.reviews.length} reviews</span>
                      </div>
                    </div>
                    <div className={styles.reviewsList}>
                      {product.reviews.map((review) => (
                        <ReviewCard key={review.id} review={review} />
                      ))}
                    </div>
                  </>
                ) : (
                  <p className={styles.noReviews}>No reviews yet. Be the first to review!</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ── Related Products ── */}
        {relatedProducts.length > 0 && (
          <div className={styles.related}>
            <h2 className="section-title mb-4">Related Products</h2>
            <div className={styles.relatedGrid}>
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
