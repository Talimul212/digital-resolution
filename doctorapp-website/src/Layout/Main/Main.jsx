import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";

const Main = () => {
  const location = useLocation();
  const hideNavbarFooterRoutes = ["/login", "/signup", "/agentForm"];

  const hideNavbarFooter = hideNavbarFooterRoutes.includes(location.pathname);
  return (
    <div>
      {!hideNavbarFooter && <Navbar />}
      <Outlet />
      {!hideNavbarFooter && <Footer />}
    </div>
  );
};

export default Main;
