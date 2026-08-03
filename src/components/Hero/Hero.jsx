// ============================================================
// EduMart – Hero Component
// Animated banner for the home page
// ============================================================

import { Link } from 'react-router-dom';
import {
  FiArrowRight, FiShoppingBag, FiStar,
  FiTruck, FiUsers, FiPackage
} from 'react-icons/fi';
import EduMartLogo from '../Logo/EduMartLogo';
import styles from './Hero.module.scss';

const HERO_STATS = [
  { icon: FiPackage,  value: '10,000+', label: 'Products' },
  { icon: FiUsers,    value: '50,000+', label: 'Happy Families' },
  { icon: FiTruck,    value: 'Free',    label: 'Shipping ₹999+' },
];


// Inline SVG icons for floating cards (no emoji)
const CardIcon = ({ type }) => {
  const icons = {
    bag: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 01-8 0"/>
      </svg>
    ),
    book: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
      </svg>
    ),
    science: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3H15"/><path d="M10 9l-3 12h10L14 9"/><path d="M10 3v6"/><path d="M14 3v6"/>
      </svg>
    ),
    salad: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 22c1.25-1.67 2.5-2.5 4-2.5 1.5 0 3 1.25 4.5 1.25 1.5 0 3-1.25 4.5-1.25 1.5 0 2.75.83 4 2.5"/>
        <path d="M2 17c1.25-1.67 2.5-2.5 4-2.5s3 1.25 4.5 1.25c1.5 0 3-1.25 4.5-1.25s2.75.83 4 2.5"/>
        <path d="M12 2a5 5 0 015 5 5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5"/>
      </svg>
    ),
  };
  return icons[type] || icons.book;
};


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
              to <span className={styles.highlight2}>Learn &amp; Grow</span>
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
              {HERO_STATS.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className={styles.stat}>
                    <div className={styles.statIconBox}>
                      <Icon size={18} />
                    </div>
                    <div>
                      <div className={styles.statValue}>{stat.value}</div>
                      <div className={styles.statLabel}>{stat.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column – Visual Cards */}
          <div className={styles.visualCol} aria-hidden="true">
            <div className={styles.floatingCard} data-pos="top-right">
              <div className={styles.cardIconBox} style={{ background: 'rgba(114,9,183,0.15)' }}>
                <CardIcon type="bag" />
              </div>
              <div>
                <div className={styles.cardLabel}>School Bags</div>
                <div className={styles.cardPrice}>From ₹999</div>
              </div>
            </div>

            <div className={styles.heroBadgeCenter}>
              <div className={styles.heroBadgeInner}>
                <EduMartLogo size={48} variant="white" showTagline />
              </div>
            </div>

            <div className={styles.floatingCard} data-pos="bottom-left">
              <div className={styles.cardIconBox} style={{ background: 'rgba(230,57,70,0.15)' }}>
                <CardIcon type="science" />
              </div>
              <div>
                <div className={styles.cardLabel}>STEM Toys</div>
                <div className={styles.cardPrice}>Up to 40% off</div>
              </div>
            </div>

            <div className={styles.floatingCard} data-pos="top-left">
              <div className={styles.cardIconBox} style={{ background: 'rgba(37,99,235,0.15)' }}>
                <CardIcon type="book" />
              </div>
              <div>
                <div className={styles.cardLabel}>Books</div>
                <div className={styles.cardPrice}>Starting ₹149</div>
              </div>
            </div>

            <div className={styles.floatingCard} data-pos="bottom-right">
              <div className={styles.cardIconBox} style={{ background: 'rgba(45,198,83,0.15)' }}>
                <CardIcon type="salad" />
              </div>
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
