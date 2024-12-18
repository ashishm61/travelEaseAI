import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateSignupForm } from '../../utils/validation';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const useSignupForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    nationality: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      // Client-side validation
      const validationErrors = validateSignupForm(formData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        setIsLoading(false);
        return;
      }

      // Prepare the data for the API
      const userData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone_number: formData.phone,
        nationality: formData.nationality,
        password: formData.password
      };

      console.log('Sending signup request to:', `${API_BASE_URL}/api/auth/register`);
      console.log('Request data:', userData);

      // Send the signup request to the backend
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(userData)
      });

      const data = await response.json();
      console.log('Response:', data);

      if (!response.ok) {
        if (data.errors) {
          // Handle validation errors from server
          const serverErrors = {};
          data.errors.forEach(error => {
            // Map server field names to client field names
            const fieldMap = {
              'first_name': 'firstName',
              'last_name': 'lastName',
              'phone_number': 'phone'
            };
            const fieldName = fieldMap[error.path] || error.path;
            serverErrors[fieldName] = error.msg;
          });
          setErrors(serverErrors);
        } else {
          throw new Error(data.message || 'Failed to register');
        }
        return;
      }

      // Success - redirect to login
      navigate('/login', { 
        state: { message: 'Registration successful! Please log in.' }
      });
    } catch (error) {
      console.error('Signup error:', error);
      setErrors({ 
        general: error.message || 'An unexpected error occurred. Please try again.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    isLoading,
    errors
  };
};