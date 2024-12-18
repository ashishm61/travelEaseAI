import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui';

const AuthButtons = () => {
  return (
    <div className="flex items-center gap-4">
      <Link
        to="/login"
        className="text-gray-900 hover:text-[#2A4B8C] transition-colors"
      >
        Log In
      </Link>
      <Button
        as={Link}
        to="/signup"
        variant="primary"
        className="bg-[#2A4B8C] hover:bg-[#1e3a6a]"
      >
        Sign Up
      </Button>
    </div>
  );
};

export default AuthButtons;