// ============================================================
// EduMart – Backend Server Entry Point
// Node.js + Express.js REST API
// ============================================================

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('./config/config');
const seedDemoData = require('./db/seed');

// Import Routes
const authRoutes      = require('./routes/auth');
const productRoutes   = require('./routes/products');
const categoryRoutes  = require('./routes/categories');
const orderRoutes     = require('./routes/orders');
const cartRoutes      = require('./routes/cart');
const wishlistRoutes  = require('./routes/wishlist');
const userRoutes      = require('./routes/users');

// Import Middleware
const errorHandler    = require('./middleware/errorHandler');

const app = express();
const PORT = config.port;

// ── Global Middleware ─────────────────────────────────────────
app.use(helmet());
app.use(cors({ origin: config.clientUrl }));
app.use(morgan(config.isDev ? 'dev' : 'combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ── Static uploads ───────────────────────────────────────────
app.use('/uploads', express.static(config.uploadDir));

// ── Health Check ─────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'EduMart API is running', timestamp: new Date().toISOString() });
});

// ── API Routes ───────────────────────────────────────────────
app.use('/api/auth',       authRoutes);
app.use('/api/products',   productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders',     orderRoutes);
app.use('/api/cart',       cartRoutes);
app.use('/api/wishlist',   wishlistRoutes);
app.use('/api/users',      userRoutes);

// ── 404 Handler ──────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// ── Global Error Handler ─────────────────────────────────────
app.use(errorHandler);

// ── Start Server ─────────────────────────────────────────────
seedDemoData().then(() => {
  app.listen(PORT, () => {
    console.log(`EduMart API running on http://localhost:${PORT} [${config.nodeEnv}]`);
    if (!config.googleClientId) {
      console.warn('[config] GOOGLE_CLIENT_ID not set — Google Sign-In will return 501 until configured.');
    }
    if (!config.resend.apiKey) {
      console.warn('[config] RESEND_API_KEY not set — verification emails will be logged to the console instead of sent.');
    }
  });
});

module.exports = app;
