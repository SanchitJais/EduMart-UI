// ============================================================
// EduMart – Email Verification Landing Page
// Reached via the link Resend emails out; confirms the token
// server-side and reflects the result back to the user.
// ============================================================

import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FiCheckCircle, FiXCircle, FiLoader } from 'react-icons/fi';
import { authApi, ApiError } from '../../utils/api';
import { useUser } from '../../context/UserContext';
import styles from './VerifyEmail.module.scss';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const { currentUser, updateProfile } = useUser();

  const [status, setStatus] = useState('loading'); // loading | success | error
  const [message, setMessage] = useState('');
  const attempted = useRef(false);

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('This verification link is missing its token.');
      return;
    }

    // Verification tokens are single-use — StrictMode's dev-only double
    // effect-invoke would otherwise burn the token on a throwaway request
    // and show its "already used" failure instead of the real result.
    if (attempted.current) return;
    attempted.current = true;

    authApi
      .verifyEmail(token)
      .then((res) => {
        setStatus('success');
        setMessage(res.message || 'Email verified successfully!');
        if (currentUser) updateProfile({ verified: true });
      })
      .catch((err) => {
        setStatus('error');
        setMessage(err instanceof ApiError ? err.message : 'Could not verify this link.');
      });
    // Only run once per mount — currentUser/updateProfile are stable enough for this one-shot check.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        {status === 'loading' && (
          <>
            <FiLoader className={`${styles.icon} ${styles.spin}`} />
            <h1 className={styles.title}>Verifying your email…</h1>
            <p className={styles.description}>Just a moment.</p>
          </>
        )}

        {status === 'success' && (
          <>
            <FiCheckCircle className={`${styles.icon} ${styles.success}`} />
            <h1 className={styles.title}>Email Verified! 🎉</h1>
            <p className={styles.description}>{message}</p>
            <Link to={currentUser ? '/account' : '/login'} className={styles.actionBtn}>
              {currentUser ? 'Go to My Account' : 'Log In'}
            </Link>
          </>
        )}

        {status === 'error' && (
          <>
            <FiXCircle className={`${styles.icon} ${styles.error}`} />
            <h1 className={styles.title}>Verification Failed</h1>
            <p className={styles.description}>{message}</p>
            <Link to="/" className={styles.actionBtn}>Back to Home</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
