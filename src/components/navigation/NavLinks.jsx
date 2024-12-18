import React from 'react';
import { NavLink } from 'react-router-dom';

const NavLinks = () => {
  const links = [
    { name: 'Home', path: '/' },
    { name: 'Plan Trip', path: '/plan-trip' },
    { name: 'Itinerary', path: '/itinerary' },
    { name: 'Saved Itineraries', path: '/saved-itineraries' },
    { name: 'Live Tracker', path: '/live-tracker' }
  ];
  
  return (
    <div className="hidden md:flex items-center gap-8">
      {links.map(({ name, path }) => (
        <NavLink
          key={name}
          to={path}
          className={({ isActive }) =>
            `text-gray-900 hover:text-[#2A4B8C] transition-colors ${
              isActive ? 'font-medium text-[#2A4B8C]' : ''
            }`
          }
        >
          {name}
        </NavLink>
      ))}
    </div>
  );
};

export default NavLinks;