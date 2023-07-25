import { useContext} from "react";
import Headroom from "react-headroom";
import { InfoContext } from "../../provider/InfoProvider";

function NavBar() {
    const {basicInfo} = useContext(InfoContext);
  const links = (
    <>
      <li>
        <a>Home</a>
      </li>
      <li>
        <a>Rooms</a>
      </li>
      <li>
        <a>Services</a>
      </li>
      <li>
        <a>Find Best Value</a>
      </li>
      <li>
        <a>Contact</a>
      </li>
    </>
  );

  return (
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
            <a className="btn btn-secondary btn-sm">Book Now</a>
          </div>
        </div>
      </Headroom>
    </div>
  );
}

export default NavBar;
