import { Outlet } from "react-router-dom";
import NavBar from "../pages/shared/Navbar";

const MainLayout = () => {
    return (
        <div>
            <NavBar/>
            <Outlet/>
        </div>
    );
};

export default MainLayout;