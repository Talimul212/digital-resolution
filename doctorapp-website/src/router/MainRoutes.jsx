import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../Pages/Error/ErrorPage";
import Main from "../Layout/Main/Main";
import HomeList from "../Pages/Home/HomeList";

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
    ],
  },
]);
export default router;
