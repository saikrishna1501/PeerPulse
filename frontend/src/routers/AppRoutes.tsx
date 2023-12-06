import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
// import LandingPage from '../LandingPage/Header';
import LandingPage from '../pages/LandingPage/LandingPage';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import EventsPage from '../pages/EventsPage/EventsPage';
import HousingPage from '../pages/HousingPage/HousingPage';
import BlogsPage from '../pages/BlogsPage/BlogsPage';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import MainLayout from '../layouts/MainLayout/MainLayout';
import UserSettingsPage from '../pages/UserSettingsPage/UserSettingsPage';


const AppRoutes: React.FC = () => {
 
  return (
    <Router>
      <Routes>
      <Route path="/" element={<MainLayout/>}>
        <Route index  element={<LandingPage />}/>
        <Route path="/users/auth" element={<Login />} />
        <Route path="/users/register" element={<Register/>} />
        <Route path="/users/settings" element={<UserSettingsPage/>} />
        <Route path="/events" element={<EventsPage/>}/>
        <Route path="/housing" element={<HousingPage/>}/>
        <Route path="/blogs" element={<BlogsPage/>}/>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
