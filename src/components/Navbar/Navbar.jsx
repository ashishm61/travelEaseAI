import React from 'react';
import Logo from './Logo';
import NavLinks from './NavLinks';
import AuthButtons from './AuthButtons';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />
          <NavLinks />
          <AuthButtons />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;