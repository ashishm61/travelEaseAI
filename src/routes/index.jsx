import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoginForm, SignupForm } from '../components/auth';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/login" element={<LoginForm />} />
      {/* Add more routes as needed */}
    </Routes>
  );
};

export default AppRoutes;