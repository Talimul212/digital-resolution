import { Navigate, useLocation } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  const location = useLocation();

  // Check if the user exists and has the 'admin' role
  if (storedUser && storedUser.role === "admin") {
    return children;
  }

  // If not an admin, redirect to login page
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AdminRoute;
