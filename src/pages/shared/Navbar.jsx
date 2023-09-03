import { motion } from "framer-motion";
import { useContext } from "react";
import Headroom from "react-headroom";
import { BiLogInCircle } from "react-icons/bi";
import { Link, NavLink } from "react-router-dom";
import useHeaderShadow from "../../hooks/useHeaderShawow";
import { AuthContext } from "../../provider/AuthProvider";
import { InfoContext } from "../../provider/InfoProvider";
import { headerVariants } from "./motion";
import useBookingList from "../../hooks/useBookingList";

function NavBar() {
  const {bookingList} = useBookingList();
  const { user, logOut } = useContext(AuthContext);
  const { basicInfo } = useContext(InfoContext);

  const handleLogout = () => {
    logOut();
  };

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/rooms">Rooms</NavLink>
      </li>
      <li>
        <NavLink to="/about">About</NavLink>
      </li>
      <li>
        <NavLink to="/contact">Contact</NavLink>
      </li>
      {user ? (
        <>
          <li>
            <Link to="dashboard">
              Dashboard 
              <div className="badge">{bookingList.length}</div>
            </Link>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink to="/auth/login">
              Login <BiLogInCircle />
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <motion.div
      variants={headerVariants}
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      style={{ boxShadow: useHeaderShadow }}
    >
      <div className="relative z-10">
        <Headroom>
          <div className="navbar backdrop-blur-2xl rounded-b-xl ">
            <div className="navbar-start">
              <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost lg:hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h8m-8 6h16"
                    />
                  </svg>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                >
                  {links}
                </ul>
              </div>
              <div className="btn btn-ghost normal-case text-xl ">
                <img className="w-10 h-8" src={basicInfo?.logo} alt="" />
                <a>{basicInfo?.name}</a>
              </div>
            </div>
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1">{links}</ul>
            </div>
            <div className="navbar-end">
              <>
                {user ? (
                  <>
                    <div className="dropdown dropdown-end">
                      <label
                        tabIndex={0}
                        className="btn btn-ghost btn-circle avatar"
                      >
                        <div className="w-10 rounded-full">
                          <img
                            src={user?.photoURL ? user.photoURL : "./logo.png"}
                          />
                        </div>
                      </label>
                      <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                      >
                        <li>
                          <a className="justify-between">Profile</a>
                        </li>
                        <li>
                          <Link to ='/dashboard'>Dashboard</Link>
                        </li>
                        <li>
                          <a onClick={handleLogout}>Logout</a>
                        </li>
                      </ul>
                    </div>
                  </>
                ) : (
                  <Link to="/booknow" className="btn btn-secondary btn-sm">
                    Book Now
                  </Link>
                )}
              </>
            </div>
          </div>
        </Headroom>
      </div>
    </motion.div>
  );
}

export default NavBar;
