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
import AllUser from "../Pages/Module/Admin/AllUser";
import AllDoctor from "../Pages/Module/Admin/AllDoctor";
import AllAppointments from "../Pages/Module/Admin/AllAppointments";
import WelcomePage from "../Pages/Module/Profile/WelcomePage";
import PrivateRoute from "./Private/PrivateRoute";
import AdminRoute from "./AdminRoute/AdminRoute";
import Appoveble from "../Pages/Module/Doctor/Appoveble";
import ContactForm from "../Components/Form/Contactform";

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
        path: "/contact",
        element: <ContactForm />,
      },
      {
        path: "/appointmentForm",
        element: (
          <PrivateRoute>
            <AppointmentFrom />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/profile",
    element: (
      <PrivateRoute>
        <ProfileLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/profile",
        element: <WelcomePage />,
      },
      {
        path: "/profile/details",
        element: <Profile />,
      },
      {
        path: "/profile/allappointment",
        element: <AllAppointment />,
      },
      {
        path: "/profile/appoveblelist",
        element: <Appoveble />,
      },
      {
        path: "/profile/reviews",
        element: <Review />,
      },
      {
        path: "/profile/alluser",
        element: (
          <AdminRoute>
            {" "}
            <AllUser />
          </AdminRoute>
        ),
      },
      {
        path: "/profile/alldoctor",
        element: (
          <AdminRoute>
            {" "}
            <AllDoctor />
          </AdminRoute>
        ),
      },
      {
        path: "/profile/admin/allappointment",
        element: (
          <AdminRoute>
            <AllAppointments />
          </AdminRoute>
        ),
      },
    ],
  },
]);
export default router;
