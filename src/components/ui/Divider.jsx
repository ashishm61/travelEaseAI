import React from 'react';

const Divider = ({ children }) => {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-200"></div>
      </div>
      {children && (
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">{children}</span>
        </div>
      )}
    </div>
  );
};

export default Divider;