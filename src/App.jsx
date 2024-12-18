import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { LoginForm, SignupForm } from './components/auth';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<div>Home Page</div>} />
      </Routes>
    </Layout>
  );
}

export default App;