// ============================================================
// EduMart – GoogleSignInButton
// One-click Google sign-in/sign-up, shared by Login & Register.
// Renders Google's own button + enables One Tap for returning
// visitors — the "seamless" login path (no form, no password).
// ============================================================

import { GoogleLogin } from '@react-oauth/google';
import { useUser } from '../../context/UserContext';
import styles from './GoogleSignInButton.module.scss';

/**
 * @param {(result: {success: boolean, message: string}) => void} onResult
 */
const GoogleSignInButton = ({ onResult }) => {
  const { googleLogin } = useUser();

  const handleSuccess = async (credentialResponse) => {
    const result = await googleLogin(credentialResponse.credential);
    onResult?.(result);
  };

  const handleError = () => {
    onResult?.({ success: false, message: 'Google sign-in was cancelled or failed.' });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.divider}>
        <span>OR</span>
      </div>
      <div className={styles.googleBtn}>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          useOneTap
          theme="outline"
          size="large"
          shape="pill"
          logo_alignment="center"
          text="continue_with"
          width="360"
        />
      </div>
    </div>
  );
};

export default GoogleSignInButton;
