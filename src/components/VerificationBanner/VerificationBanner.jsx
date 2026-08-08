// ============================================================
// EduMart – VerificationBanner
// Non-blocking reminder for unverified accounts — login stays
// seamless either way, this just nudges toward finishing setup.
// ============================================================

import { useState } from 'react';
import { FiMail, FiX } from 'react-icons/fi';
import { useUser } from '../../context/UserContext';
import { useToast } from '../../context/ToastContext';
import styles from './VerificationBanner.module.scss';

const DISMISS_KEY = 'edumart_verify_banner_dismissed';

const VerificationBanner = () => {
  const { currentUser, isLoggedIn, resendVerification } = useUser();
  const { addToast } = useToast();
  const [dismissed, setDismissed] = useState(() => sessionStorage.getItem(DISMISS_KEY) === '1');
  const [sending, setSending] = useState(false);

  if (!isLoggedIn || currentUser?.verified !== false || dismissed) return null;

  const handleResend = async () => {
    setSending(true);
    const result = await resendVerification();
    addToast(result.message, result.success ? 'success' : 'error');
    setSending(false);
  };

  const handleDismiss = () => {
    sessionStorage.setItem(DISMISS_KEY, '1');
    setDismissed(true);
  };

  return (
    <div className={styles.banner} role="status">
      <div className={styles.content}>
        <FiMail className={styles.icon} />
        <span>Please verify your email address to unlock all account features.</span>
      </div>
      <div className={styles.actions}>
        <button className={styles.resendBtn} onClick={handleResend} disabled={sending}>
          {sending ? 'Sending…' : 'Resend Email'}
        </button>
        <button className={styles.closeBtn} onClick={handleDismiss} aria-label="Dismiss">
          <FiX />
        </button>
      </div>
    </div>
  );
};

export default VerificationBanner;
