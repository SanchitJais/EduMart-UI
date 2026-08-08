// Form validation helpers

/**
 * Validate a required field
 */
export const validateRequired = (value, fieldName = 'Field') => {
  if (!value || value.toString().trim() === '') {
    return `${fieldName} is required.`;
  }
  return '';
};

/**
 * Validate email format
 */
export const validateEmail = (email) => {
  if (!email) return 'Email is required.';
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email)) return 'Please enter a valid email address.';
  return '';
};

/**
 * Validate password length
 */
export const validatePassword = (password) => {
  if (!password) return 'Password is required.';
  if (password.length < 6) return 'Password must be at least 6 characters.';
  return '';
};

/**
 * Validate confirm password
 */
export const validateConfirmPassword = (password, confirm) => {
  if (!confirm) return 'Please confirm your password.';
  if (password !== confirm) return 'Passwords do not match.';
  return '';
};

/**
 * Validate Indian phone number (10 digits)
 */
export const validatePhone = (phone) => {
  if (!phone) return 'Phone number is required.';
  const re = /^[6-9]\d{9}$/;
  if (!re.test(phone)) return 'Enter a valid 10-digit mobile number.';
  return '';
};

/**
 * Validate Indian PIN code (6 digits)
 */
export const validatePIN = (pin) => {
  if (!pin) return 'PIN code is required.';
  const re = /^[1-9][0-9]{5}$/;
  if (!re.test(pin)) return 'Enter a valid 6-digit PIN code.';
  return '';
};

/**
 * Validate name
 */
export const validateName = (name) => {
  if (!name || name.trim() === '') return 'Name is required.';
  if (name.trim().length < 2) return 'Name must be at least 2 characters.';
  return '';
};

/**
 * Validate entire checkout form
 */
export const validateCheckoutForm = (formData) => {
  const errors = {};
  errors.name = validateName(formData.name);
  errors.email = validateEmail(formData.email);
  errors.phone = validatePhone(formData.phone);
  errors.street = validateRequired(formData.street, 'Street address');
  errors.city = validateRequired(formData.city, 'City');
  errors.state = validateRequired(formData.state, 'State');
  errors.pin = validatePIN(formData.pin);
  return errors;
};

/**
 * Check if form errors object is clean
 */
export const isFormValid = (errors) => {
  return Object.values(errors).every((err) => err === '');
};
