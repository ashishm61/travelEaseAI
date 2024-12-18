import React from 'react';

const Card = ({ children, className = '' }) => {
  return (
    <div 
      className={`
        bg-white rounded-2xl
        border border-surface-200
        shadow-soft
        overflow-hidden
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;