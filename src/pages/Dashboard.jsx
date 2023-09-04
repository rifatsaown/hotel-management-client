import { BiMenuAltRight } from "react-icons/bi";
import {
  FaBook,
  FaHome,
  FaShoppingCart,
  FaUsers,
  FaUtensils,
  FaWallet,
} from "react-icons/fa";
import { IoBagCheckOutline } from "react-icons/io5";
import { NavLink, Outlet } from "react-router-dom";
// import useAdmin from "../Hooks/useAdmin";

import useAdmin from "../hooks/useAdmin";
import useBookingList from "../hooks/useBookingList";

const Dashboard = () => {
  const { bookingList } = useBookingList();

  const { isAdmin } = useAdmin();
  

  // const isAdmin = false;

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden my-4"
        >
          Open Side Bar
        </label>
        <Outlet></Outlet>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full bg-base-200 ">
          {/* Sidebar content here */}
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/adminhome">
                  <FaHome /> Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addroom">
                  <FaUtensils /> Add New Room
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/managerooms">
                  <FaWallet /> Manage All Rooms
                </NavLink>
                <NavLink to="/dashboard/manage-payment">
                  <FaBook /> Manage Payment
                </NavLink>
                <NavLink to="/dashboard/bookingList">
                  <FaBook /> My Booking List
                </NavLink>
                <NavLink to="/dashboard/allusers">
                  <FaUsers /> All Users
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/userhome">
                  <FaHome /> User Home
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/payment-history">
                  <FaWallet /> Payment History
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/bookingList">
                  <FaShoppingCart /> My Added List
                  <span className="badge badge-sm indicator-item">
                    {bookingList.length || 0}
                  </span>
                </NavLink>
              </li>
            </>
          )}

          <div className="divider" />
          <li>
            <NavLink to="/">
              <FaHome /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/rooms">
              <BiMenuAltRight /> Rooms
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact">
              <IoBagCheckOutline /> Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
