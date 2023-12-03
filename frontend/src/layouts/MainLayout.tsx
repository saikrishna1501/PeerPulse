import { Outlet } from "react-router-dom"
import Header from "../components/LandingPage/Header"
import Footer from "../components/LandingPage/Footer"

const MainLayout = () => {
    return (
        <>
              <Header />
              <Outlet />
              <Footer />
        </>
    )
}

export default MainLayout;