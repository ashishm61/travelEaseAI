import React from 'react';
import { Link } from 'react-router-dom';

const NavLinks = () => {
  const links = [
    { name: 'Home', path: '/' },
    { name: 'Plan Trip', path: '/plan-trip' },
    { name: 'Itinerary', path: '/itinerary' },
    { name: 'Saved Itineraries', path: '/saved-itineraries' },
    { name: 'Live Tracker', path: '/live-tracker' }
  ];
  
  return (
    <div className="hidden md:flex items-center gap-6">
      {links.map(({ name, path }) => (
        <Link
          key={name}
          to={path}
          className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
        >
          {name}
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;