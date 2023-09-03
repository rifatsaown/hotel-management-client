import { FcGoogle } from "react-icons/fc";
import { Outlet } from "react-router-dom";

const Auth = () => {
  return (
    <div>
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <Outlet></Outlet>
          <hr className="my-6" />
          <button className="btn btn-primary btn-outline w-full mb-4">
            Continue with <FcGoogle size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
