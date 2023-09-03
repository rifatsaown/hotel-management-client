import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import { toast } from "react-hot-toast";
import handleErrorLogin from "../../../components/handleErrorLogin";

const Register = () => {
  const { registerWithEmail }= useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    registerWithEmail(data.email, data.password)
      .then(() => {
        toast.success("Register successfully");
      })
      .catch((error) => {
        handleErrorLogin(error ,"Register");
        console.log(error);
      });
  };

  return (
    <div>
      <h2 className="text-3xl text-center font-semibold mb-4">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="input input-primary w-full"
            type="text"
            id="name"
            placeholder="Name"
            {...register("name", { required: true })}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="input input-primary w-full"
            type="email"
            id="email"
            placeholder="Email"
            {...register("email", { required: true })}
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
            className="input input-primary w-full"
            type="password"
            id="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="photoUrl"
          >
            Photo URL
          </label>
          <input
            className="file-input file-input-primary rounded-full w-full"
            type="file"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full mb-4"
        >
          Register
        </button>
        <p className="text-right">Already Registerd? <Link to="/auth/login" className="font-bold text-primary">Login</Link></p>
      </form>
    </div>
  );
};

export default Register;
