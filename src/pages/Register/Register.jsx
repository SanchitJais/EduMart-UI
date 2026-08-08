// Registration page

import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiPhone, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { useUser } from '../../context/UserContext';
import { useToast } from '../../context/ToastContext';
import {
  validateName, validateEmail, validatePhone,
  validatePassword, validateConfirmPassword
} from '../../utils/validation';
import GoogleSignInButton from '../../components/GoogleSignInButton/GoogleSignInButton';
import styles from './Register.module.scss';

const Register = () => {
  const { register, isLoggedIn } = useUser();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    password: '', confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  if (isLoggedIn) {
    return <Navigate to="/account" replace />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {
      name: validateName(form.name),
      email: validateEmail(form.email),
      phone: validatePhone(form.phone),
      password: validatePassword(form.password),
      confirmPassword: validateConfirmPassword(form.password, form.confirmPassword),
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) {
      addToast('Please fix the errors before proceeding.', 'error');
      return;
    }

    setLoading(true);
    const result = await register(form);
    if (result.success) {
      addToast(result.message, 'success');
      navigate('/account', { replace: true });
    } else {
      addToast(result.message, 'error');
    }
    setLoading(false);
  };

  const handleGoogleResult = (result) => {
    if (result.success) {
      addToast(result.message, 'success');
      navigate('/account', { replace: true });
    } else {
      addToast(result.message, 'error');
    }
  };

  const FIELDS = [
    { name: 'name', label: 'Full Name', type: 'text', icon: <FiUser />, placeholder: 'Your full name', id: 'reg-name' },
    { name: 'email', label: 'Email Address', type: 'email', icon: <FiMail />, placeholder: 'you@example.com', id: 'reg-email' },
    { name: 'phone', label: 'Phone Number', type: 'tel', icon: <FiPhone />, placeholder: '10-digit mobile', id: 'reg-phone' },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        {/* Left Panel */}
        <div className={styles.leftPanel}>
          <div className={styles.brandLogo}>🎓</div>
          <h2 className={styles.brandName}>Join EduMart</h2>
          <p className={styles.brandTagline}>
            Create your free account and unlock the best educational shopping experience in India!
          </p>
          <div className={styles.features}>
            {[
              '🎉 Welcome discount on first order',
              '📦 Free shipping on ₹999+',
              '💳 Multiple payment options',
              '🔔 Exclusive member deals',
            ].map((f) => <div key={f} className={styles.featureItem}>{f}</div>)}
          </div>
        </div>

        {/* Right Panel */}
        <div className={styles.rightPanel}>
          <h1 className={styles.formTitle}>Create Account ✨</h1>
          <p className={styles.formSubtitle}>It's free and takes less than a minute</p>

          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            {FIELDS.map((field) => (
              <div key={field.name} className={styles.formGroup}>
                <label htmlFor={field.id} className={styles.label}>{field.label}</label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon}>{field.icon}</span>
                  <input
                    id={field.id}
                    name={field.name}
                    type={field.type}
                    value={form[field.name]}
                    onChange={handleChange}
                    className={`${styles.input} ${errors[field.name] ? styles.inputError : ''}`}
                    placeholder={field.placeholder}
                  />
                </div>
                {errors[field.name] && <span className={styles.error}>{errors[field.name]}</span>}
              </div>
            ))}

            {/* Password */}
            <div className={styles.formGroup}>
              <label htmlFor="reg-password" className={styles.label}>Password</label>
              <div className={styles.inputWrapper}>
                <FiLock className={styles.inputIcon} />
                <input
                  id="reg-password" name="password"
                  type={showPass ? 'text' : 'password'}
                  value={form.password} onChange={handleChange}
                  className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                  placeholder="Min 6 characters"
                />
                <button type="button" className={styles.togglePassword}
                  onClick={() => setShowPass((v) => !v)} aria-label="Toggle password">
                  {showPass ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.password && <span className={styles.error}>{errors.password}</span>}
            </div>

            {/* Confirm Password */}
            <div className={styles.formGroup}>
              <label htmlFor="reg-confirm" className={styles.label}>Confirm Password</label>
              <div className={styles.inputWrapper}>
                <FiLock className={styles.inputIcon} />
                <input
                  id="reg-confirm" name="confirmPassword"
                  type={showConfirm ? 'text' : 'password'}
                  value={form.confirmPassword} onChange={handleChange}
                  className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ''}`}
                  placeholder="Repeat your password"
                />
                <button type="button" className={styles.togglePassword}
                  onClick={() => setShowConfirm((v) => !v)} aria-label="Toggle confirm password">
                  {showConfirm ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.confirmPassword && <span className={styles.error}>{errors.confirmPassword}</span>}
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading} id="register-submit-btn">
              {loading ? 'Creating Account...' : 'Create My Account 🎉'}
            </button>
          </form>

          <GoogleSignInButton onResult={handleGoogleResult} />

          <p className={styles.switchAuth}>
            Already have an account?{' '}
            <Link to="/login" className={styles.switchLink}>Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
