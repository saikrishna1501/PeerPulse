import { Outlet, useNavigate } from "react-router-dom"
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"
import { useEffect } from "react";
import { checkAuthStatus } from "../../services/AuthService";
import './MainLayout.scss';

const MainLayout = () => {
    // const navigate = useNavigate();

    // useEffect(() => {
    //   const verifyUserAuthentication = async () => {
    //     const isAuthenticated = await checkAuthStatus();
    //     if (!isAuthenticated) {
    //       // If not authenticated, redirect to the login page
    //       navigate('/users/auth');
    //     } else {
    //       // If authenticated, redirect to the dashboard or another protected route
    //       navigate('/user/dashboard');
    //     }
    //   };
  
    //   verifyUserAuthentication();
    // }, [navigate]);
    return (
        <>
              <Header />
              <main style={{ backgroundSize: "250px", backgroundRepeat: "repeat", }}>
                <Outlet />
              </main>
              <Footer />
        </>
    )
}

export default MainLayout;