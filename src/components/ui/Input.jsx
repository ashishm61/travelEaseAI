import React from 'react';
import clsx from 'clsx';

const Input = ({
  label,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        className={clsx(
          'block w-full px-4 py-3',
          'rounded-xl border border-gray-300',
          'focus:ring-2 focus:ring-[#2A4B8C] focus:border-transparent',
          'placeholder-gray-400',
          'transition duration-150 ease-in-out',
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Input;