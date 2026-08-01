// ============================================================
// EduMart – Hero Component
// Animated banner for the home page
// ============================================================

import { Link } from 'react-router-dom';
import { FiArrowRight, FiShoppingBag, FiStar } from 'react-icons/fi';
import styles from './Hero.module.scss';

const HERO_STATS = [
  { icon: '📚', value: '10,000+', label: 'Products' },
  { icon: '👨‍👩‍👧‍👦', value: '50,000+', label: 'Happy Families' },
  { icon: '🚀', value: 'Free', label: 'Shipping ₹999+' },
];

const Hero = () => {
  return (
    <section className={styles.hero} aria-label="EduMart hero banner">
      {/* Decorative blobs */}
      <div className={styles.blob1} aria-hidden="true" />
      <div className={styles.blob2} aria-hidden="true" />

      <div className="container-xl">
        <div className={styles.content}>
          {/* Left Column */}
          <div className={styles.textCol}>
            {/* Trust badge */}
            <div className={styles.trustBadge}>
              <FiStar className={styles.starIcon} />
              <span>India's #1 Educational Shopping Destination</span>
            </div>

            <h1 className={styles.heading}>
              Everything Your
              <span className={styles.highlight}> Child Needs</span>
              <br />
              to <span className={styles.highlight2}>Learn & Grow</span> 🎓
            </h1>

            <p className={styles.subheading}>
              From textbooks to STEM toys, school bags to healthy snacks — EduMart
              has everything parents and students need for a successful school year.
            </p>

            {/* CTAs */}
            <div className={styles.ctas}>
              <Link to="/products" className={styles.primaryCta} id="hero-shop-now-btn">
                <FiShoppingBag />
                Shop Now
                <FiArrowRight className={styles.arrow} />
              </Link>
              <Link to="/products?category=educational-toys" className={styles.secondaryCta} id="hero-explore-btn">
                Explore Toys
              </Link>
            </div>

            {/* Stats */}
            <div className={styles.stats}>
              {HERO_STATS.map((stat, i) => (
                <div key={i} className={styles.stat}>
                  <span className={styles.statIcon}>{stat.icon}</span>
                  <div>
                    <div className={styles.statValue}>{stat.value}</div>
                    <div className={styles.statLabel}>{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column – Visual Cards */}
          <div className={styles.visualCol} aria-hidden="true">
            <div className={styles.floatingCard} data-pos="top-right">
              <span>🎒</span>
              <div>
                <div className={styles.cardLabel}>School Bags</div>
                <div className={styles.cardPrice}>From ₹999</div>
              </div>
            </div>

            <div className={styles.heroBadgeCenter}>
              <div className={styles.heroBadgeInner}>
                <span className={styles.heroEmoji}>🎓</span>
                <span className={styles.heroLabel}>EduMart</span>
                <span className={styles.heroSub}>Learn. Grow. Succeed.</span>
              </div>
            </div>

            <div className={styles.floatingCard} data-pos="bottom-left">
              <span>🧩</span>
              <div>
                <div className={styles.cardLabel}>STEM Toys</div>
                <div className={styles.cardPrice}>Up to 40% off</div>
              </div>
            </div>

            <div className={styles.floatingCard} data-pos="top-left">
              <span>📚</span>
              <div>
                <div className={styles.cardLabel}>Books</div>
                <div className={styles.cardPrice}>Starting ₹149</div>
              </div>
            </div>

            <div className={styles.floatingCard} data-pos="bottom-right">
              <span>🥗</span>
              <div>
                <div className={styles.cardLabel}>Healthy Snacks</div>
                <div className={styles.cardPrice}>New arrivals!</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave SVG */}
      <div className={styles.wave} aria-hidden="true">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,60 C360,100 1080,20 1440,60 L1440,100 L0,100 Z" fill="var(--bg-secondary)" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
