import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/home/Home";
import Rooms from "../pages/rooms/Rooms";
import ContactFrom from "../pages/ContactFrom/ContactFrom";
import Auth from "../pages/auth/Auth";
import Login from "../pages/auth/Login/Login";
import Register from "../pages/auth/Register/Register";
import ResetPass from "../pages/auth/ResetPass/ResetPass";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/rooms",
        element: <Rooms/>,
      }, 
      {
        path: "/about",
        element: <h1>ABout</h1>,
      },
      {
        path: "/contact",
        element: <ContactFrom/>,
      },
      {
        path: "/auth",
        element: <Auth/>,
        children: [
          {
            path: "",
            element: <Login/>,
          },
          {
            path: "login",
            element: <Login/>,
          },
          {
            path: "register",
            element: <Register/>,
          },
          {
            path: "resetpass",
            element: <ResetPass/>,
          }
        ],
      },
      {
        path: "*",
        element: <h1>Not Found</h1>,
      }
    ],
  },
]);

export default router;
