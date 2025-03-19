import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../Pages/Error/ErrorPage";
import Main from "../Layout/Main/Main";
import HomeList from "../Pages/Home/HomeList";
import Login from "../Pages/Auth/Login";
import Resgister from "../Pages/Auth/Resgister";
import DoctorsList from "../Pages/DoctorsList/DoctorsList";
import AppointmentFrom from "../Components/Form/AppointmentFrom";
import ProfileLayout from "../Layout/ProfileLayout/ProfileLayout";
import Profile from "../Pages/Module/Profile/Profile";
import AllAppointment from "../Pages/Module/Patient/AllAppointment";
import Review from "../Pages/Module/Patient/Review";

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
      {
        path: "/appointmentForm",
        element: <AppointmentFrom />,
      },
    ],
  },
  {
    path: "/profile",
    element: <ProfileLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/profile/details",
        element: <Profile />,
      },
      {
        path: "/profile/allappointmen",
        element: <AllAppointment />,
      },
      {
        path: "/profile/reviews",
        element: <Review />,
      },
    ],
  },
]);
export default router;
