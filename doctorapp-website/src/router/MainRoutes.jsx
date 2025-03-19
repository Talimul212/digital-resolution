import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../Pages/Error/ErrorPage";
import Main from "../Layout/Main/Main";
import HomeList from "../Pages/Home/HomeList";
import Login from "../Pages/Auth/Login";
import Resgister from "../Pages/Auth/Resgister";
import DoctorsList from "../Pages/DoctorsList/DoctorsList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomeList />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Resgister />,
      },
      {
        path: "/doctorslist",
        element: <DoctorsList />,
      },
    ],
  },
]);
export default router;
