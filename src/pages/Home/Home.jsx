// Home page

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FiArrowRight, FiTruck, FiShield, FiRefreshCw, FiHeadphones,
  FiAward, FiTrendingUp, FiStar, FiTarget, FiDollarSign,
  FiUsers, FiPackage, FiMessageSquare, FiShoppingBag
} from 'react-icons/fi';
import { TbLeaf } from 'react-icons/tb';

import Hero from '../../components/Hero/Hero';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import ProductCard from '../../components/ProductCard/ProductCard';
import Loader from '../../components/Loader/Loader';
import { products } from '../../data/products';
import { categories } from '../../data/categories';
import styles from './Home.module.scss';

// Why Choose EduMart features
const FEATURES = [
  {
    icon: FiTruck,
    title: 'Free Shipping',
    desc: 'On orders above ₹999. Pan-India delivery in 3-5 business days.',
    color: '#4361ee',
  },
  {
    icon: FiShield,
    title: 'Secure Payments',
    desc: '100% safe & secure payments via UPI, card, and net banking.',
    color: '#f72585',
  },
  {
    icon: FiRefreshCw,
    title: 'Easy Returns',
    desc: '7-day hassle-free return policy on all eligible products.',
    color: '#2dc653',
  },
  {
    icon: FiHeadphones,
    title: '24/7 Support',
    desc: 'Round-the-clock customer support via chat, email, and phone.',
    color: '#f77f00',
  },
];

// Featured Brands
const BRANDS = [
  { name: 'NCERT',       icon: FiStar,         desc: 'Official Textbooks',  color: '#4361ee', bgColor: '#eef0ff' },
  { name: 'Camlin',      icon: FiAward,        desc: 'Stationery & Art',    color: '#f72585', bgColor: '#fff0f7' },
  { name: 'Classmate',   icon: FiPackage,      desc: 'Notebooks & Pads',    color: '#3a86ff', bgColor: '#eef5ff' },
  { name: 'Wildcraft',   icon: FiShoppingBag,  desc: 'School Bags',         color: '#7209b7', bgColor: '#f5eeff' },
  { name: 'Milton',      icon: FiShield,       desc: 'Tiffin & Bottles',    color: '#f77f00', bgColor: '#fff5e6' },
  { name: 'Lego',        icon: FiTarget,       desc: 'Educational Toys',    color: '#e63946', bgColor: '#fff0f1' },
  { name: 'Horlicks',    icon: TbLeaf,         desc: 'Health Drinks',       color: '#2dc653', bgColor: '#edfff2' },
  { name: 'Nike',        icon: FiTrendingUp,   desc: 'Sports Footwear',     color: '#023e8a', bgColor: '#e8f0fe' },
];

const WHY_ITEMS = [
  { icon: FiTarget,         title: 'Curated Selection',  desc: 'Every product is vetted by education experts for quality and age-appropriateness.' },
  { icon: FiDollarSign,     title: 'Best Prices',        desc: 'We negotiate directly with brands to bring you the lowest prices guaranteed.' },
  { icon: TbLeaf,           title: 'Eco-Friendly',       desc: 'Sustainable packaging and environmentally conscious product selection.' },
  { icon: FiUsers,          title: 'Family-First',       desc: 'Designed with parents in mind — safe, trusted, and easy to shop.' },
  { icon: FiPackage,        title: 'Fast Delivery',      desc: '95% of orders delivered within 3-5 business days across India.' },
  { icon: FiMessageSquare,  title: 'Parent Reviews',     desc: 'Verified reviews from real parents and teachers help you decide better.' },
];

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Parent of 2 school kids',
    avatar: 'https://i.pravatar.cc/60?img=47',
    text: 'EduMart has made back-to-school shopping so much easier! Everything I need is in one place — from books to lunch boxes. Highly recommend!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Rahul Mehta',
    role: 'Class 10 Student',
    avatar: 'https://i.pravatar.cc/60?img=12',
    text: 'Found all my textbooks and stationery at great prices. The LEGO set I ordered was delivered super fast. Will shop again!',
    rating: 5,
  },
  {
    id: 3,
    name: 'Anjali Nair',
    role: 'Primary school teacher',
    avatar: 'https://i.pravatar.cc/60?img=32',
    text: 'I order classroom supplies from EduMart every term. The quality is excellent and the prices are unbeatable. Plus, the packaging is eco-friendly!',
    rating: 4,
  },
];

// Star rating component (no emoji stars)
const StarRating = ({ rating }) => (
  <div className={styles.stars} aria-label={`${rating} out of 5 stars`}>
    {Array.from({ length: 5 }, (_, i) => (
      <FiStar
        key={i}
        className={i < rating ? styles.starFilled : styles.starEmpty}
      />
    ))}
  </div>
);

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const featured    = products.filter((p) => p.isFeatured).slice(0, 8);
  const trending    = products.filter((p) => p.isTrending).slice(0, 4);
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);
  const newArrivals = products.filter((p) => p.isNewArrival).slice(0, 4);
  const snacks      = products.filter((p) => p.category === 'healthy-snacks').slice(0, 4);
  const toys        = products.filter((p) => p.category === 'educational-toys').slice(0, 4);
  const books       = products.filter((p) => p.category === 'books').slice(0, 4);

  return (
    <main>
      {/* ── Hero ── */}
      <Hero />

      {/* ── Features Bar ── */}
      <section className={styles.features} aria-label="Why choose EduMart">
        <div className="container-xl">
          <div className={styles.featuresGrid}>
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className={styles.featureItem} style={{ '--feat-color': f.color }}>
                  <div className={styles.featureIcon}>
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className={styles.featureTitle}>{f.title}</h3>
                    <p className={styles.featureDesc}>{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className={`${styles.section} section-padding`} aria-label="Product categories">
        <div className="container-xl">
          <div className={styles.sectionHeader}>
            <div>
              <h2 className="section-title">Shop by Category</h2>
              <p className={styles.sectionSub}>Explore our wide range of educational products</p>
            </div>
            <Link to="/products" className={styles.viewAllLink}>
              View All <FiArrowRight />
            </Link>
          </div>

          <div className={styles.categoriesGrid}>
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className={`${styles.sectionAlt} section-padding`} aria-label="Featured products">
        <div className="container-xl">
          <div className={styles.sectionHeader}>
            <div>
              <h2 className="section-title">Featured Products</h2>
              <p className={styles.sectionSub}>Hand-picked by our education experts</p>
            </div>
            <Link to="/products" className={styles.viewAllLink}>
              View All <FiArrowRight />
            </Link>
          </div>

          {loading ? (
            <Loader type="card" count={8} />
          ) : (
            <div className={styles.productsGrid}>
              {featured.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </section>

      {/* ── Promo Banner ── */}
      <section className={styles.promoBanner} aria-label="Today's deals promotion">
        <div className="container-xl">
          <div className={styles.promoContent}>
            <div className={styles.promoLeft}>
              <span className={styles.promoTag}>
                <FiTrendingUp /> Today's Deals
              </span>
              <h2 className={styles.promoTitle}>Up to 40% OFF on Educational Toys</h2>
              <p className={styles.promoText}>Limited time offer. Shop STEM kits, puzzles, and building blocks.</p>
              <Link to="/products?category=educational-toys" className={styles.promoCta}>
                Shop Now <FiArrowRight />
              </Link>
            </div>
            <div className={styles.promoIllustration} aria-hidden="true">
              <div className={styles.promoIconGrid}>
                <div className={styles.promoIcon} style={{ background: 'rgba(255,255,255,0.15)' }}>
                  <FiTarget size={28} color="#fff" />
                </div>
                <div className={styles.promoIcon} style={{ background: 'rgba(255,255,255,0.1)' }}>
                  <FiAward size={24} color="#fbbf24" />
                </div>
                <div className={styles.promoIcon} style={{ background: 'rgba(255,255,255,0.2)' }}>
                  <FiStar size={32} color="#fff" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Best Sellers ── */}
      <section className={`${styles.section} section-padding`} aria-label="Best selling products">
        <div className="container-xl">
          <div className={styles.sectionHeader}>
            <div>
              <h2 className="section-title">Best Sellers</h2>
              <p className={styles.sectionSub}>What parents and students love most</p>
            </div>
            <Link to="/products" className={styles.viewAllLink}>
              View All <FiArrowRight />
            </Link>
          </div>
          <div className={styles.productsGrid4}>
            {bestSellers.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ── Trending ── */}
      <section className={`${styles.sectionAlt} section-padding`} aria-label="Trending products">
        <div className="container-xl">
          <div className={styles.sectionHeader}>
            <div>
              <h2 className="section-title">Trending Now</h2>
              <p className={styles.sectionSub}>Most popular picks this week</p>
            </div>
            <Link to="/products" className={styles.viewAllLink}>
              View All <FiArrowRight />
            </Link>
          </div>
          <div className={styles.productsGrid4}>
            {trending.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ── Healthy Snacks ── */}
      <section className={`${styles.section} section-padding`} aria-label="Healthy snacks">
        <div className="container-xl">
          <div className={styles.sectionHeader}>
            <div>
              <h2 className="section-title">Healthy Snacks</h2>
              <p className={styles.sectionSub}>Nutritious and delicious school-safe snacks</p>
            </div>
            <Link to="/products?category=healthy-snacks" className={styles.viewAllLink}>
              View All <FiArrowRight />
            </Link>
          </div>
          <div className={styles.productsGrid4}>
            {snacks.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ── Educational Toys ── */}
      <section className={`${styles.sectionAlt} section-padding`} aria-label="Educational toys">
        <div className="container-xl">
          <div className={styles.sectionHeader}>
            <div>
              <h2 className="section-title">Educational Toys</h2>
              <p className={styles.sectionSub}>STEM, puzzles, and more for growing minds</p>
            </div>
            <Link to="/products?category=educational-toys" className={styles.viewAllLink}>
              View All <FiArrowRight />
            </Link>
          </div>
          <div className={styles.productsGrid4}>
            {toys.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ── Books ── */}
      <section className={`${styles.section} section-padding`} aria-label="Books section">
        <div className="container-xl">
          <div className={styles.sectionHeader}>
            <div>
              <h2 className="section-title">Books</h2>
              <p className={styles.sectionSub}>Textbooks, stories, references, and more</p>
            </div>
            <Link to="/products?category=books" className={styles.viewAllLink}>
              View All <FiArrowRight />
            </Link>
          </div>
          <div className={styles.productsGrid4}>
            {books.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ── New Arrivals ── */}
      <section className={`${styles.sectionAlt} section-padding`} aria-label="New arrivals">
        <div className="container-xl">
          <div className={styles.sectionHeader}>
            <div>
              <h2 className="section-title">New Arrivals</h2>
              <p className={styles.sectionSub}>Fresh additions to the EduMart catalogue</p>
            </div>
            <Link to="/products" className={styles.viewAllLink}>
              View All <FiArrowRight />
            </Link>
          </div>
          <div className={styles.productsGrid4}>
            {newArrivals.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ── Featured Brands ── */}
      <section className={`${styles.section} section-padding`} aria-label="Featured brands">
        <div className="container-xl">
          <div className="text-center mb-5">
            <h2 className="section-title-center mx-auto">Featured Brands</h2>
            <p className={styles.sectionSub} style={{ textAlign: 'center', marginTop: '0.5rem' }}>
              Trusted names in education, nutrition &amp; sports
            </p>
          </div>
          <div className={styles.brandsGrid}>
            {BRANDS.map((brand) => {
              const Icon = brand.icon;
              return (
                <Link
                  key={brand.name}
                  to={`/products?search=${brand.name.toLowerCase()}`}
                  className={styles.brandCard}
                  style={{ '--brand-color': brand.color, '--brand-bg': brand.bgColor }}
                >
                  <div className={styles.brandIconBox}>
                    <Icon size={22} color={brand.color} />
                  </div>
                  <span className={styles.brandName}>{brand.name}</span>
                  <span className={styles.brandDesc}>{brand.desc}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Why Choose EduMart ── */}
      <section className={`${styles.whySection} section-padding`} aria-label="Why choose EduMart">
        <div className="container-xl">
          <div className="text-center mb-5">
            <h2 className={`section-title-center mx-auto ${styles.whyTitle}`}>
              Why 50,000+ Families Trust EduMart
            </h2>
            <p className={styles.sectionSub}>
              We're more than just a store — we're your education partner.
            </p>
          </div>
          <div className={styles.whyGrid}>
            {WHY_ITEMS.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className={styles.whyCard}>
                  <div className={styles.whyIconBox}>
                    <Icon size={20} />
                  </div>
                  <h3 className={styles.whyCardTitle}>{item.title}</h3>
                  <p className={styles.whyCardDesc}>{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className={`${styles.sectionAlt} section-padding`} aria-label="Customer testimonials">
        <div className="container-xl">
          <div className="text-center mb-5">
            <h2 className="section-title-center mx-auto">What Our Customers Say</h2>
          </div>
          <div className={styles.testimonials}>
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className={styles.testimonialCard}>
                <StarRating rating={t.rating} />
                <p className={styles.testimonialText}>"{t.text}"</p>
                <div className={styles.testimonialAuthor}>
                  <img src={t.avatar} alt={t.name} className={styles.authorAvatar} />
                  <div>
                    <div className={styles.authorName}>{t.name}</div>
                    <div className={styles.authorRole}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
