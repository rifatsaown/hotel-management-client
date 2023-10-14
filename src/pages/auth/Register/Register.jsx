import { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import handleErrorLogin from "../../../components/handleErrorLogin";
import updateNamePhoto from "../../../components/updateNamePhoto";
import uploadPhoto from "../../../components/uploadPhoto";
import { AuthContext } from "../../../provider/AuthProvider";
import addUserToDb from "../../../components/addUserToDb";

const Register = () => {
  const { registerWithEmail } = useContext(AuthContext); // Context
  const { register, handleSubmit } = useForm(); // React Hook Form

  // Function to handle submit form
  const onSubmit = (data) => {
    // Register with email and password
    registerWithEmail(data.email, data.password)
      .then((result) => {
        toast.success("Register successfully");
        // Upload photo to imgbb
        uploadPhoto(data.photo[0]).then((res) => {
          const photoURL = res.data.data.display_url;
          // Update name and photo
          updateNamePhoto(result.user, data.name, photoURL);
          // Add user to database
          addUserToDb(data.name, data.email);
        });
      })
      .catch((error) => {
        handleErrorLogin(error, "Register");
        console.log(error);
      });
  };
  // Handle submit form end

  // JSX
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
            Photo
          </label>
          <input
            {...register("photo", { required: true })}
            className="file-input file-input-primary rounded-full w-full"
            type="file"
          />
        </div>
        <button type="submit" className="btn btn-primary w-full mb-4">
          Register
        </button>
        <p className="text-right">
          Already Registerd?{" "}
          <Link to="/auth/login" className="font-bold text-primary">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
