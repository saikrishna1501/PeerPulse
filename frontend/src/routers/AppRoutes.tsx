import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage/LandingPage";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import EventsPage from "../pages/EventsPage/EventsPage";
import HousingPage from "../pages/HousingPage/HousingPage";
import BlogsPage from "../pages/BlogsPage/BlogsPage";
import MainLayout from "../layouts/MainLayout/MainLayout";
import EventDetailsPage from "../pages/EventsPage/EventDetailsPage";
import {
  AUTH_ROUTE,
  BLOGS_ROUTE,
  EVENTS_ROUTE,
  HOUSING_ROUTE,
  REGISTER_ROUTE,
  EVENT_DETAIL_ROUTE
} from "../constants/routes";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<LandingPage />} />
          <Route path={AUTH_ROUTE} element={<Login />} />
          <Route path={REGISTER_ROUTE} element={<Register />} />
          <Route path={EVENTS_ROUTE} element={<EventsPage />} />
          <Route path={HOUSING_ROUTE} element={<HousingPage />} />
          <Route path={BLOGS_ROUTE} element={<BlogsPage />} />
          <Route path={EVENT_DETAIL_ROUTE} element={<EventDetailsPage/>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
