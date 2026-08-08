// User authentication and settings context

import { createContext, useContext, useCallback, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { authApi, ApiError } from '../utils/api';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useLocalStorage('edumart_user', null);
  const [authToken, setAuthToken] = useLocalStorage('edumart_token', null);
  const [darkMode, setDarkMode] = useLocalStorage('edumart_dark', false);
  const [recentlyViewed, setRecentlyViewed] = useLocalStorage('edumart_recent', []);

  // Apply dark mode class to document root
  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [darkMode]);

  const applySession = useCallback((token, user) => {
    setAuthToken(token);
    setCurrentUser(user);
  }, [setAuthToken, setCurrentUser]);

  /**
   * Login with email + password against the real backend
   * Returns { success, message }
   */
  const login = useCallback(async (email, password) => {
    try {
      const { token, user, message } = await authApi.login(email, password);
      applySession(token, user);
      return { success: true, message: message || 'Welcome back!' };
    } catch (err) {
      return { success: false, message: err instanceof ApiError ? err.message : 'Login failed. Please try again.' };
    }
  }, [applySession]);

  /**
   * One-click sign in/up with a Google ID token — no form, no password
   */
  const googleLogin = useCallback(async (credential) => {
    try {
      const { token, user, message } = await authApi.google(credential);
      applySession(token, user);
      return { success: true, message: message || `Welcome, ${user.name}!` };
    } catch (err) {
      return { success: false, message: err instanceof ApiError ? err.message : 'Google sign-in failed.' };
    }
  }, [applySession]);

  /**
   * Register a new account via the real backend.
   * Logs the user in immediately — verification is a reminder, not a gate.
   */
  const register = useCallback(async (userData) => {
    try {
      const { confirmPassword: _cp, ...payload } = userData;
      const { token, user, message } = await authApi.register(payload);
      applySession(token, user);
      return { success: true, message: message || 'Account created successfully!' };
    } catch (err) {
      return { success: false, message: err instanceof ApiError ? err.message : 'Registration failed. Please try again.' };
    }
  }, [applySession]);

  /**
   * Re-send the verification email for the current account
   */
  const resendVerification = useCallback(async () => {
    if (!authToken) return { success: false, message: 'You must be logged in.' };
    try {
      const { message } = await authApi.resendVerification(authToken);
      return { success: true, message: message || 'Verification email sent!' };
    } catch (err) {
      return { success: false, message: err instanceof ApiError ? err.message : 'Could not resend the verification email.' };
    }
  }, [authToken]);

  /**
   * Logout: clear user session
   */
  const logout = useCallback(() => {
    setCurrentUser(null);
    setAuthToken(null);
  }, [setCurrentUser, setAuthToken]);

  /**
   * Update user profile fields (local only — no PUT /profile endpoint yet)
   */
  const updateProfile = useCallback((updates) => {
    setCurrentUser((prev) => ({ ...prev, ...updates }));
  }, [setCurrentUser]);

  /**
   * Toggle dark mode
   */
  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => !prev);
  }, [setDarkMode]);

  /**
   * Track recently viewed products (max 10)
   */
  const addRecentlyViewed = useCallback((product) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      return [product, ...filtered].slice(0, 10);
    });
  }, [setRecentlyViewed]);

  const value = {
    currentUser,
    authToken,
    darkMode,
    recentlyViewed,
    isLoggedIn: !!currentUser,
    login,
    googleLogin,
    logout,
    register,
    resendVerification,
    updateProfile,
    toggleDarkMode,
    addRecentlyViewed,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

/**
 * Custom hook to consume UserContext
 */
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserContext;
