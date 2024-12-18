import React from 'react';
import { Card, Divider } from '@/components/ui';
import { Logo } from '@/components/common';
import SocialLoginButtons from './SocialLoginButtons';
import EmailLoginForm from './EmailLoginForm';

const LoginForm = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-surface-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <Card className="p-8 space-y-8 animate-fade-in">
          <div className="flex flex-col items-center space-y-2">
            <Logo className="w-12 h-12" />
            <h1 className="text-4xl font-display text-gray-900">Welcome Back</h1>
            <p className="text-gray-600">Sign in to continue your journey</p>
          </div>

          <div className="space-y-6">
            <SocialLoginButtons />
            <Divider>or continue with email</Divider>
            <EmailLoginForm />
          </div>

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/signup" className="text-primary-600 hover:text-primary-700">
              Sign up for free
            </a>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;