import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const location = useLocation(); // Use useLocation to get the current location
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};

  // If the user is not authenticated, redirect to the login page
  if (!storedUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated, render the children (protected component)
  return children;
};

export default PrivateRoute;
