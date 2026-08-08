// ============================================================
// EduMart – Login Page
// ============================================================

import { useState } from 'react';
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { useUser } from '../../context/UserContext';
import { useToast } from '../../context/ToastContext';
import { validateEmail, validatePassword } from '../../utils/validation';
import GoogleSignInButton from '../../components/GoogleSignInButton/GoogleSignInButton';
import styles from './Login.module.scss';

const Login = () => {
  const { login, isLoggedIn } = useUser();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const [form, setForm] = useState({ email: '', password: '', remember: false });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  if (isLoggedIn) {
    return <Navigate to={from} replace />;
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailErr = validateEmail(form.email);
    const passErr = validatePassword(form.password);
    if (emailErr || passErr) {
      setErrors({ email: emailErr, password: passErr });
      return;
    }

    setLoading(true);
    const result = await login(form.email, form.password);
    if (result.success) {
      addToast(result.message, 'success');
      navigate(from, { replace: true });
    } else {
      addToast(result.message, 'error');
      setErrors({ password: result.message });
    }
    setLoading(false);
  };

  const handleGoogleResult = (result) => {
    if (result.success) {
      addToast(result.message, 'success');
      navigate(from, { replace: true });
    } else {
      addToast(result.message, 'error');
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        {/* Left Panel */}
        <div className={styles.leftPanel}>
          <div className={styles.brandLogo}>🎓</div>
          <h2 className={styles.brandName}>EduMart</h2>
          <p className={styles.brandTagline}>
            Your one-stop shop for all educational needs. Books, stationery, toys, and more!
          </p>
          <div className={styles.features}>
            {['📚 50,000+ Products', '🚚 Free Shipping', '⭐ Trusted by 50K+ Families', '🔒 Secure Checkout'].map((f) => (
              <div key={f} className={styles.featureItem}>{f}</div>
            ))}
          </div>
        </div>

        {/* Right Panel: Form */}
        <div className={styles.rightPanel}>
          <h1 className={styles.formTitle}>Welcome Back! 👋</h1>
          <p className={styles.formSubtitle}>Login to your EduMart account</p>

          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            {/* Email */}
            <div className={styles.formGroup}>
              <label htmlFor="login-email" className={styles.label}>Email Address</label>
              <div className={styles.inputWrapper}>
                <FiMail className={styles.inputIcon} />
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>
              {errors.email && <span className={styles.error}>{errors.email}</span>}
            </div>

            {/* Password */}
            <div className={styles.formGroup}>
              <div className={styles.labelRow}>
                <label htmlFor="login-password" className={styles.label}>Password</label>
                <button type="button" className={styles.forgotLink}>Forgot Password?</button>
              </div>
              <div className={styles.inputWrapper}>
                <FiLock className={styles.inputIcon} />
                <input
                  id="login-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={handleChange}
                  className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                  placeholder="Minimum 6 characters"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className={styles.togglePassword}
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.password && <span className={styles.error}>{errors.password}</span>}
            </div>

            {/* Remember Me */}
            <label className={styles.rememberMe}>
              <input
                type="checkbox"
                name="remember"
                checked={form.remember}
                onChange={handleChange}
              />
              <span>Remember me</span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
              id="login-submit-btn"
            >
              {loading ? 'Logging in...' : 'Login to EduMart'}
            </button>
          </form>

          <GoogleSignInButton onResult={handleGoogleResult} />

          <p className={styles.switchAuth}>
            Don't have an account?{' '}
            <Link to="/register" className={styles.switchLink}>
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
