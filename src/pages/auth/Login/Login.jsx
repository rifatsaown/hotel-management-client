import { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import handleErrorLogin from "../../../components/handleErrorLogin";
import { AuthContext } from "../../../provider/AuthProvider";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { signInWithEmail } = useContext(AuthContext);
  const onSubmit = (data) => {
    signInWithEmail(data.email, data.password)
      .then(() => {
        toast.success("Login successfully");
      })
      .catch((error) => {
        handleErrorLogin(error , "Login");
      });
  };

  return (
    <div>
      <h2 className="text-3xl text-center font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            {...register("email", { required: true })}
            className="input input-primary w-full"
            type="email"
            id="email"
            placeholder="Email"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            {...register("password", { required: true })}
            className="input input-primary w-full"
            type="password"
            id="password"
            placeholder="Password"
          />
        </div>
        <button type="submit" className="btn btn-primary w-full mb-4">
          Login with Email
        </button>
      </form>
      <div className="flex justify-between">
        <Link to="/auth/resetpass" className="text-primary">
          Forgot Password?
        </Link>
        <Link to="/auth/register" className="font-semibold">
          Create New Account
        </Link>
      </div>
    </div>
  );
};

export default Login;
