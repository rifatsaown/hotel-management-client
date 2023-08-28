import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/home/Home";
import Rooms from "../pages/rooms/Rooms";

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
        path: "/services",
        element: <h1>Services</h1>,
      },
      {
        path: "/findBestValue",
        element: <h1>Find Best Value</h1>,
      },
      {
        path: "/contact",
        element: <h1>Contact</h1>,
      }
    ],
  },
]);

export default router;
