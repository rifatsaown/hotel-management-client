import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/home/Home";
import Rooms from "../pages/rooms/Rooms";
import ContactFrom from "../pages/ContactFrom/ContactFrom";
import Auth from "../pages/auth/Auth";
import Login from "../pages/auth/Login/Login";
import Register from "../pages/auth/Register/Register";
import ResetPass from "../pages/auth/ResetPass/ResetPass";
import About from "../pages/About/About";

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
        element: <About/>,
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
