import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/home/Home";
import Rooms from "../pages/rooms/Rooms";
import ContactFrom from "../pages/ContactFrom/ContactFrom";

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
        path: "/login",
        element: <h1>Login</h1>,
      },
      {
        path: "*",
        element: <h1>Not Found</h1>,
      }
    ],
  },
]);

export default router;
