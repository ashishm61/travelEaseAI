import React from 'react';
import { Input, Button } from '../../ui';
import { useLoginForm } from '../../../hooks/auth';

const EmailLoginForm = () => {
  const { handleSubmit, isLoading } = useLoginForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="email"
        label="Email address"
        placeholder="Enter your email"
        id="email"
        required
      />
      <Input
        type="password"
        label="Password"
        placeholder="Enter your password"
        id="password"
        required
      />
      
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2">
          <input 
            type="checkbox" 
            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" 
          />
          <span className="text-gray-600">Remember me</span>
        </label>
        <a href="#" className="text-gray-900 hover:text-gray-700 font-medium">
          Forgot password?
        </a>
      </div>

      <Button type="submit" variant="primary" className="w-full" disabled={isLoading}>
        {isLoading ? 'Signing in...' : 'Sign In'}
      </Button>
    </form>
  );
};

export default EmailLoginForm;