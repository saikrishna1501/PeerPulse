import React, { useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom'
import Login from '../auth/Login';
import Register from '../auth/Register';
//import EmailVerification from '../auth/EmailVerification';
import { checkAuthStatus } from '../utils/authUtils';

// Test component to check if cookie validation is working
// if cookie is present user is redirected to dashboard for now
const Body: React.FC = () =>{
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUserAuthentication = async () => {
      const isAuthenticated = await checkAuthStatus();
      if (!isAuthenticated) {
        // If not authenticated, redirect to the login page
        navigate('/users/auth');
      } else {
        // If authenticated, redirect to the dashboard or another protected route
        navigate('/user/dashboard');
      }
    };

    verifyUserAuthentication();
  }, [navigate]);

  return (
      <Routes>
        <Route path="/users/auth" element={<Login/>} />
        <Route path="/users/register" element={<Register/>} />
        {/* <Route path="/users/activate/:activation_token" element={<EmailVerification/>} /> */}
        {/* Add other routes as needed */}
      </Routes>
  )
}

export default Body