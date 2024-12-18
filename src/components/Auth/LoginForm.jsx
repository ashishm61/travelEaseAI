import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../common';
import EmailLoginForm from './forms/EmailLoginForm';
import SocialButtons from './forms/SocialButtons';
import { Card, Divider } from '../ui';

const LoginForm = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <Card className="p-8 space-y-8">
          <div className="flex flex-col items-center space-y-2">
            <Logo className="w-[180px] h-[60px]" />
            <h1 className="text-3xl font-display text-gray-900">Welcome Back</h1>
            <p className="text-gray-600">Sign in to continue your journey</p>
          </div>

          <div className="space-y-6">
            <SocialButtons />
            <Divider>or continue with email</Divider>
            <EmailLoginForm />
          </div>

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-gray-900 hover:text-gray-700 font-medium">
              Sign up for free
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;