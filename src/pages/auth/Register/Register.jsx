import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div>
      <h2 className="text-3xl text-center font-semibold mb-4">Register</h2>
      <form>
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
            required
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
            required
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
            required
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
            className="input input-primary w-full"
            type="text"
            id="photoUrl"
            placeholder="Photo URL"
            required
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
