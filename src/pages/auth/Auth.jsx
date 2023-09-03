import { FcGoogle } from "react-icons/fc";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import addUserToDb from "../../components/addUserToDb";


const Auth = () => {
  const {signInWithGoogle} = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const handleGoogleLogin = () => {
    signInWithGoogle()
    .then((res) => {
      addUserToDb(res.user.displayName , res.user.email)
      .then(() => {
        toast.success("Login successfully");
        navigate(from);
      })
    })
  }

  return (
    <div>
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <Outlet></Outlet>
          <hr className="my-6" />
          <button onClick={handleGoogleLogin} className="btn btn-primary btn-outline w-full mb-4">
            Continue with <FcGoogle size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
