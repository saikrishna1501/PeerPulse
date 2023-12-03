import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
// import LandingPage from '../LandingPage/Header';
import LandingPage from '../LandingPage/LandingPage';
import Login from '../auth/Login';
import Register from '../auth/Register';
import EventsPage from '../EventsPage/EventsPage';
import HousingPage from '../HousingPage/HousingPage';
import BlogsPage from '../BlogsPage/BlogsPage';
import Header from '../LandingPage/Header';
import Footer from '../LandingPage/Footer';
import MainLayout from '../../layouts/MainLayout';

const AppRoutes: React.FC = () => {
 
  return (
    <Router>
      <Routes>
      <Route path="/" element={<MainLayout/>}>
        <Route index  element={<LandingPage />}/>
        <Route path="/users/auth" element={<Login />} />
        <Route path="/users/register" element={<Register/>} />
        <Route path="/events" element={<EventsPage/>}/>
        <Route path="/housing" element={<HousingPage/>}/>
        <Route path="/blogs" element={<BlogsPage/>}/>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
