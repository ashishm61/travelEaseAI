import React from 'react';
import clsx from 'clsx';

const Container = ({ as: Component = 'div', className, children }) => {
  return (
    <Component
      className={clsx(
        'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8',
        className
      )}
    >
      {children}
    </Component>
  );
};

export default Container;