// ============================================================
// EduMart – ProtectedRoute Component
// Redirects to /login if user is not authenticated
// ============================================================

import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

/**
 * Wrap any route that requires authentication.
 * Stores the intended URL so user is redirected back after login.
 */
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useUser();
  const location = useLocation();

  if (!isLoggedIn) {
    return (
      <Navigate
        to="/login"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoute;
