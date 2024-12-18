import React from 'react';
import { Input, Button } from '../../ui';
import { useSignupForm } from '../../../hooks/auth';

const SignupFormFields = () => {
  const { formData, handleChange, handleSubmit, isLoading, errors } = useSignupForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input
          name="firstName"
          label="First Name"
          placeholder="Enter first name"
          value={formData.firstName}
          onChange={handleChange}
          error={errors.firstName}
          required
        />
        <Input
          name="lastName"
          label="Last Name"
          placeholder="Enter last name"
          value={formData.lastName}
          onChange={handleChange}
          error={errors.lastName}
          required
        />
      </div>

      <Input
        type="email"
        name="email"
        label="Email Address"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        required
      />

      <Input
        type="tel"
        name="phone"
        label="Phone Number (Optional)"
        placeholder="+1 (555) 000-0000"
        value={formData.phone}
        onChange={handleChange}
        error={errors.phone}
      />

      <div className="relative">
        <Input
          type="text"
          name="nationality"
          label="Select Nationality"
          placeholder="Choose your nationality"
          value={formData.nationality}
          onChange={handleChange}
          error={errors.nationality}
          required
        />
      </div>

      <Input
        type="password"
        name="password"
        label="Password"
        placeholder="Create a password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        required
      />

      <Input
        type="password"
        name="confirmPassword"
        label="Confirm Password"
        placeholder="Confirm your password"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
        required
      />

      {errors.general && (
        <p className="text-sm text-red-600 text-center">{errors.general}</p>
      )}

      <Button
        type="submit"
        className="w-full bg-[#2A4B8C] hover:bg-[#1e3a6a] text-white py-3 rounded-xl font-medium"
        disabled={isLoading}
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </Button>
    </form>
  );
};

export default SignupFormFields;