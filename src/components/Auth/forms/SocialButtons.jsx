import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { Button } from '../../ui';
import { useSocialLogin } from '../../../hooks/auth';

const SocialButtons = () => {
  const { handleGoogleLogin, handleFacebookLogin } = useSocialLogin();

  return (
    <div className="grid gap-4">
      <Button
        onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-900 py-3 rounded-xl font-medium"
      >
        <FcGoogle className="w-5 h-5" />
        <span>Sign in with Google</span>
      </Button>
      <Button
        onClick={handleFacebookLogin}
        className="w-full flex items-center justify-center gap-3 bg-[#1877F2] hover:bg-[#1874EA] text-white py-3 rounded-xl font-medium"
      >
        <FaFacebook className="w-5 h-5" />
        <span>Sign in with Facebook</span>
      </Button>
    </div>
  );
};

export default SocialButtons;