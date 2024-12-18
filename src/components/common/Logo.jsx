import React from 'react';
import { HiLocationMarker } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const Logo = ({ className = '' }) => {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <HiLocationMarker className="text-[#2A4B8C] text-2xl" />
      <span className="text-xl font-display font-bold text-gray-900">TravelEase</span>
    </Link>
  );
};

export default Logo;