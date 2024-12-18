export const validateSignupForm = (data) => {
  const errors = {};

  // Name validation
  if (!data.firstName?.trim()) {
    errors.firstName = 'First name is required';
  } else if (!/^[a-zA-Z\s]{2,50}$/.test(data.firstName)) {
    errors.firstName = 'First name must be 2-50 characters and contain only letters';
  }

  if (!data.lastName?.trim()) {
    errors.lastName = 'Last name is required';
  } else if (!/^[a-zA-Z\s]{2,50}$/.test(data.lastName)) {
    errors.lastName = 'Last name must be 2-50 characters and contain only letters';
  }

  // Email validation
  if (!data.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Phone validation (optional)
  if (data.phone && !/^\+?\d{1,3}[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(data.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  // Password validation
  if (!data.password) {
    errors.password = 'Password is required';
  } else if (data.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(data.password)) {
    errors.password = 'Password must include uppercase, lowercase, number, and special character';
  }

  // Confirm Password validation
  if (!data.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password';
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
};