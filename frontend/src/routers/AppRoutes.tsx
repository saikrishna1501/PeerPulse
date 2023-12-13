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
import ProtectedRoute from "./ProtectedRoutes";
import ForgotPassword from "../components/auth/ForgotPassword"
import PasswordReset from "../components/auth/PasswordReset";
import {
  AUTH_ROUTE,
  BLOGS_ROUTE,
  EVENTS_ROUTE,
  HOUSING_ROUTE,
  REGISTER_ROUTE,
  EVENT_DETAIL_ROUTE,
  LOGIN_PATH,
  BLOG_FORM_ROUTE,
  USER_DASHBOARD_ROUTE,
  HOUSING_DETAIL_ROUTE,
  BLOGS_VIEW,
  PASSWORD_RESET_ROUTE,
  NEW_PASSWORD_SETUP_ROUTE,
} from "../constants/routes";
import { LoginRequiredPage } from "../components/auth/LoginRequiredPage";
import BlogForm from "../pages/BlogFormPage/BlogForm";
import UserDashboardPage from "../pages/UserDashboardPage/UserDashboardPage";
import HousingDetailsPage from "../pages/HousingPage/HousingDetailsPage";
import BlogView from "../pages/Blog View/BlogView";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<LandingPage />} />
          <Route path={AUTH_ROUTE} element={<Login />} />
          <Route path={PASSWORD_RESET_ROUTE} element={<ForgotPassword/>} />
          <Route path={NEW_PASSWORD_SETUP_ROUTE} element={<PasswordReset/>} />
          <Route path={REGISTER_ROUTE} element={<Register />} />
          <Route path={USER_DASHBOARD_ROUTE} element={<UserDashboardPage />} />
          <Route
            path={EVENTS_ROUTE}
            element={<ProtectedRoute component={EventsPage} />}
          />
          <Route
            path={HOUSING_ROUTE}
            element={<ProtectedRoute component={HousingPage} />}
          />
          {/* <Route
            path={BLOGS_ROUTE}
            element={<ProtectedRoute component={BlogsPage} />}
          /> */}
          <Route path={BLOGS_ROUTE} element={<BlogsPage />} />
          <Route path={BLOGS_VIEW} element={<BlogView />} />
          <Route path={EVENT_DETAIL_ROUTE} element={<EventDetailsPage />} />
          <Route path={LOGIN_PATH} element={<LoginRequiredPage />} />
          <Route path={BLOG_FORM_ROUTE} element={<BlogForm />} />
          <Route path={HOUSING_DETAIL_ROUTE} element={<HousingDetailsPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
