import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { SocialButton } from '@/components/ui';
import { useSocialLogin } from '@/hooks/auth';

const SocialLoginButtons = () => {
  const { handleGoogleLogin, handleFacebookLogin } = useSocialLogin();

  return (
    <div className="grid gap-4">
      <SocialButton
        icon={FcGoogle}
        provider="Google"
        onClick={handleGoogleLogin}
        className="animate-slide-up"
        style={{ animationDelay: '100ms' }}
      />
      <SocialButton
        icon={FaFacebook}
        provider="Facebook"
        onClick={handleFacebookLogin}
        className="animate-slide-up"
        style={{ animationDelay: '200ms' }}
      />
    </div>
  );
};

export default SocialLoginButtons;