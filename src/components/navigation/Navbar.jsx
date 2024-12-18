import React from 'react';
import { Logo } from '../common';
import NavLinks from './NavLinks';
import AuthButtons from './AuthButtons';
import Container from '../ui/Container';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-100 z-50">
      <Container>
        <div className="flex items-center justify-between h-16">
          <Logo />
          <NavLinks />
          <AuthButtons />
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;