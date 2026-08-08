// ============================================================
// EduMart – Centralised App Configuration
// All environment-dependent settings live here.
// Import this module instead of reading process.env directly.
// ============================================================

require('dotenv').config();

const config = {
  // ── Server ────────────────────────────────────────────────
  port: parseInt(process.env.PORT, 10) || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  isDev: (process.env.NODE_ENV || 'development') === 'development',

  // ── CORS ──────────────────────────────────────────────────
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',

  // ── JWT ───────────────────────────────────────────────────
  jwtSecret: process.env.JWT_SECRET || 'edumart_fallback_secret_change_in_production',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',

  // ── Database ──────────────────────────────────────────────
  // Uncomment when integrating a real database
  // mongodbUri: process.env.MONGODB_URI,

  // ── File Upload ───────────────────────────────────────────
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE, 10) || 5 * 1024 * 1024, // 5 MB
  uploadDir: process.env.UPLOAD_DIR || 'uploads',

  // ── Email (optional) ──────────────────────────────────────
  smtp: {
    host: process.env.SMTP_HOST || '',
    port: parseInt(process.env.SMTP_PORT, 10) || 587,
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },

  // ── Resend (transactional email — verification links) ─────
  resend: {
    apiKey: process.env.RESEND_API_KEY || '',
    fromEmail: process.env.EMAIL_FROM || 'EduMart <onboarding@resend.dev>',
  },

  // ── Google Sign-In ─────────────────────────────────────────
  googleClientId: process.env.GOOGLE_CLIENT_ID || '',

  // ── Payment (optional) ────────────────────────────────────
  razorpay: {
    keyId: process.env.RAZORPAY_KEY_ID || '',
    secret: process.env.RAZORPAY_SECRET || '',
  },
};

module.exports = config;
