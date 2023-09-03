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
import LoginRoute from "./LoginRoute";
import BookNow from "../pages/BookNow/BookNow";
import PrivateRoutes from "./PrivateRoutes";
import RoomDetails from "../pages/rooms/RoomDetails";
import AdminRoute from "./AdminRoutes";
import Dashboard from "../pages/Dashboard";
import AllUsers from "../pages/Dashboard/AllUsers";
import MyBookingList from "../pages/Dashboard/MyBookingList";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/PaymentHistory";

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
        path: "/rooms/:id",
        element: <RoomDetails/>,
        loader : ({params})=> fetch(`http://localhost:5000/rooms/${params.id}`)
      },
      {
        path: "/about",
        element: <PrivateRoutes><About/></PrivateRoutes>,
      },
      {
        path: "/contact",
        element: <ContactFrom/>,
      },
      {
        path: "/booknow",
        element: <BookNow/>,
      },
      {
        path: "/auth",
        element: <LoginRoute><Auth/></LoginRoute>,
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
          },
          
        ],
      },
    ],
  },
  
    {
      path: "/dashboard",
      element: (
        <PrivateRoutes>
          <Dashboard />
        </PrivateRoutes>
      ),
      children: [
        {
          path: "mycart",
          // element: <MyCart />,
        },
        {
          path: "payment",
          element: <Payment />,
        },
        {
          path: "payment-history",
          element: <PaymentHistory />,
        },
        {
          path: "bookingList",
          element: <MyBookingList />,
        },
        {
          path: "home",
          element: (
            <AdminRoute>
              <Home />
            </AdminRoute>
          ),
        },
        {
          path: "allusers",
          element: (
            <AdminRoute>
              <AllUsers />
            </AdminRoute>
          ),
        },
        {
          path: "addItem",
          element: (
            <AdminRoute>
              {/* <AddItem /> */}
            </AdminRoute>
          ),
        },
        {
          path: "manage-payment",
          element: (
            <AdminRoute>
              {/* <ManagePayment /> */}
            </AdminRoute>
          ),
        },
        {
          path: "manageItem",
          element: (
            <AdminRoute>
              {/* <ManageItems /> */}
            </AdminRoute>
          ),
        },
      ],
    },
  
  {
    path: "*",
    element: <h1>Not Found</h1>,
  }
]);

export default router;
