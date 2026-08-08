// EduMart logo component

const EduMartLogo = ({ size = 36, showTagline = false, variant = 'default' }) => {
  const isWhite = variant === 'white';
  const primaryColor = isWhite ? '#ffffff' : '#2563eb';
  const accentColor = '#f59e0b';
  const taglineColor = isWhite ? 'rgba(255,255,255,0.7)' : '#64748b';

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.55rem',
        textDecoration: 'none',
        userSelect: 'none',
      }}
    >
      {/* ── SVG Mark ── */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="EduMart logo mark"
        role="img"
      >
        {/* Background circle */}
        <circle cx="24" cy="24" r="24" fill={isWhite ? 'rgba(255,255,255,0.15)' : '#eff6ff'} />

        {/* Open book base */}
        <path
          d="M12 30V18C12 17.4 12.5 17 13 17H22C23.1 17 24 17.9 24 19V31C22.9 30.4 21.8 30 20.5 30H13C12.4 30 12 29.6 12 29Z"
          fill={primaryColor}
          opacity="0.9"
        />
        <path
          d="M36 30V18C36 17.4 35.5 17 35 17H26C24.9 17 24 17.9 24 19V31C25.1 30.4 26.2 30 27.5 30H35C35.6 30 36 29.6 36 29Z"
          fill={primaryColor}
          opacity="0.65"
        />
        {/* Book spine highlight */}
        <rect x="23" y="17" width="2" height="14" fill={accentColor} rx="1" />

        {/* Graduation cap */}
        <path
          d="M24 10L34 14.5L24 19L14 14.5L24 10Z"
          fill={accentColor}
        />
        <path
          d="M30 17.2V22C30 22 28 24 24 24C20 24 18 22 18 22V17.2L24 19.8L30 17.2Z"
          fill={accentColor}
          opacity="0.75"
        />
        {/* Tassel */}
        <circle cx="34" cy="14.5" r="1.5" fill={accentColor} />
        <line x1="34" y1="16" x2="34" y2="21" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="32.5" y1="21" x2="35.5" y2="21" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" />

        {/* Bottom bar */}
        <rect x="12" y="31" width="24" height="2" rx="1" fill={primaryColor} opacity="0.25" />
      </svg>

      {/* ── Wordmark + Tagline ── */}
      <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <span
          style={{
            display: 'inline-flex',
            fontFamily: "'Poppins', 'Inter', sans-serif",
            fontWeight: 800,
            fontSize: `${size * 0.56}px`,
            letterSpacing: '-0.02em',
          }}
        >
          <span style={{ color: primaryColor }}>Edu</span>
          <span style={{ color: accentColor }}>Mart</span>
        </span>

        {showTagline && (
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: `${size * 0.25}px`,
              letterSpacing: '0.04em',
              color: taglineColor,
              marginTop: '1px',
              textTransform: 'uppercase',
            }}
          >
            Learn. Grow. Succeed.
          </span>
        )}
      </span>
    </span>
  );
};

export default EduMartLogo;
