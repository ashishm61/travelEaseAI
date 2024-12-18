import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const AuthButtons = () => {
  return (
    <div className="flex items-center gap-4">
      <Link
        to="/login"
        className="text-gray-900 hover:text-primary-600 transition-colors"
      >
        Log In
      </Link>
      <Button as={Link} to="/signup" variant="primary">
        Sign Up
      </Button>
    </div>
  );
};

export default AuthButtons;