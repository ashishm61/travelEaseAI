import React from 'react';

const SocialButton = ({ icon: Icon, provider, onClick, className = '', ...props }) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-full px-4 py-3 flex items-center justify-center gap-3
        bg-surface-50 hover:bg-surface-100 
        border border-surface-300 rounded-xl
        text-gray-700 font-medium
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
        ${className}
      `}
      {...props}
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      <span>Continue with {provider}</span>
    </button>
  );
};

export default SocialButton;