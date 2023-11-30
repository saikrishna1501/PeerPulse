import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from '../LandingPage/Header';
import Login from '../auth/Login';
import Register from '../auth/Register';

const AppRoutes: React.FC = () => {
 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/users/auth" element={<Login />} />
        <Route path="/users/register" element={<Register/>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
