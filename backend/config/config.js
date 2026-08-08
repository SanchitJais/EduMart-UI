// Central config file for backend settings and environment variables

require('dotenv').config();

const config = {
  // Server settings
  port: parseInt(process.env.PORT, 10) || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  isDev: (process.env.NODE_ENV || 'development') === 'development',

  // CORS origin
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',

  // JWT configuration
  jwtSecret: process.env.JWT_SECRET || 'edumart_fallback_secret_change_in_production',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',

  // Database (optional MongoDB URI)
  // mongodbUri: process.env.MONGODB_URI,

  // File uploads
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE, 10) || 5 * 1024 * 1024, // 5 MB
  uploadDir: process.env.UPLOAD_DIR || 'uploads',

  // Optional SMTP setup
  smtp: {
    host: process.env.SMTP_HOST || '',
    port: parseInt(process.env.SMTP_PORT, 10) || 587,
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },

  // Resend API key for verification emails
  resend: {
    apiKey: process.env.RESEND_API_KEY || '',
    fromEmail: process.env.EMAIL_FROM || 'EduMart <onboarding@resend.dev>',
  },

  // Google OAuth client ID
  googleClientId: process.env.GOOGLE_CLIENT_ID || '',

  // Optional Razorpay credentials
  razorpay: {
    keyId: process.env.RAZORPAY_KEY_ID || '',
    secret: process.env.RAZORPAY_SECRET || '',
  },
};

module.exports = config;
