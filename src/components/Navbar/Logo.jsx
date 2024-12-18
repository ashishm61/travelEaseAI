import React from 'react';
import { HiLocationMarker } from 'react-icons/hi';

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <HiLocationMarker className="text-primary-600 text-2xl" />
      <span className="text-xl font-bold text-primary-700">TravelEase</span>
    </div>
  );
};

export default Logo;