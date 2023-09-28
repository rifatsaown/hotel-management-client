import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import About from "../pages/About/About";
import BookNow from "../pages/BookNow/BookNow";
import ContactFrom from "../pages/ContactFrom/ContactFrom";
import Dashboard from "../pages/Dashboard";
import AdminHome from "../pages/Dashboard/AdminHome";
import AllUsers from "../pages/Dashboard/AllUsers";
import MyBookingList from "../pages/Dashboard/MyBookingList";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/PaymentHistory";
import UserHome from "../pages/Dashboard/UserHome";
import Auth from "../pages/auth/Auth";
import Login from "../pages/auth/Login/Login";
import Register from "../pages/auth/Register/Register";
import ResetPass from "../pages/auth/ResetPass/ResetPass";
import Home from "../pages/home/Home";
import RoomDetails from "../pages/rooms/RoomDetails";
import Rooms from "../pages/rooms/Rooms";
import AdminRoute from "./AdminRoutes";
import LoginRoute from "./LoginRoute";
import PrivateRoutes from "./PrivateRoutes";

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
        element: <Rooms />,
      },
      {
        path: "/rooms/:id",
        element: <RoomDetails />,
        loader: ({ params }) =>
          fetch(`https://hotel-ts.vercel.app/rooms/${params.id}`),
      },
      {
        path: "/about",
        element: (
          <PrivateRoutes>
            <About />
          </PrivateRoutes>
        ),
      },
      {
        path: "/contact",
        element: <ContactFrom />,
      },
      {
        path: "/booknow",
        element: <BookNow />,
      },
      {
        path: "/auth",
        element: (
          <LoginRoute>
            <Auth />
          </LoginRoute>
        ),
        children: [
          {
            path: "",
            element: <Login />,
          },
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "register",
            element: <Register />,
          },
          {
            path: "resetpass",
            element: <ResetPass />,
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
        path: "userhome",
        element: <UserHome />,
      },
      {
        path: "adminhome",
        element: (
          <AdminRoute>
            <AdminHome />
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
        element: <AdminRoute>{/* <AddItem /> */}</AdminRoute>,
      },
      {
        path: "manage-payment",
        element: <AdminRoute>{/* <ManagePayment /> */}</AdminRoute>,
      },
      {
        path: "manageItem",
        element: <AdminRoute>{/* <ManageItems /> */}</AdminRoute>,
      },
    ],
  },

  {
    path: "*",
    element: <h1>Not Found</h1>,
  },
]);

export default router;
