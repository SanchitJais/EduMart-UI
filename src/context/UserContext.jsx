// ============================================================
// EduMart – User Context
// Manages authentication, profile, and dark mode
// ============================================================

import { createContext, useContext, useCallback } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { dummyUsers } from '../data/users';

const UserContext = createContext(null);

/**
 * UserProvider wraps the app and provides user state + auth actions
 */
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useLocalStorage('edumart_user', null);
  const [darkMode, setDarkMode] = useLocalStorage('edumart_dark', false);
  const [recentlyViewed, setRecentlyViewed] = useLocalStorage('edumart_recent', []);

  // Apply dark mode class to document root
  if (darkMode) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }

  /**
   * Login: validate against dummy users
   * Returns { success, message }
   */
  const login = useCallback((email, password) => {
    const user = dummyUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      // Don't store password in context/localStorage
      const { password: _pw, ...safeUser } = user;
      setCurrentUser(safeUser);
      return { success: true, message: 'Welcome back!' };
    }
    return { success: false, message: 'Invalid email or password.' };
  }, [setCurrentUser]);

  /**
   * Register: create a new user entry
   */
  const register = useCallback((userData) => {
    // In a real app this would call an API.
    // Here we just save the user to context.
    const { confirmPassword: _cp, ...safeUser } = userData;
    const newUser = {
      id: Date.now(),
      avatar: `https://i.pravatar.cc/150?u=${userData.email}`,
      address: { street: '', city: '', state: '', pin: '' },
      ...safeUser,
    };
    const { password: _pw, ...userToStore } = newUser;
    setCurrentUser(userToStore);
    return { success: true, message: 'Account created successfully!' };
  }, [setCurrentUser]);

  /**
   * Logout: clear user session
   */
  const logout = useCallback(() => {
    setCurrentUser(null);
  }, [setCurrentUser]);

  /**
   * Update user profile fields
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
    darkMode,
    recentlyViewed,
    isLoggedIn: !!currentUser,
    login,
    logout,
    register,
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
