import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <h2 className="text-3xl text-center font-semibold mb-4">Login</h2>
      <form>
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
        <button type="submit" className="btn btn-primary w-full mb-4">
          Login with Email
        </button>
      </form>
      <div className="flex justify-between">
        <Link to='/auth/resetpass' className="text-primary">Forgot Password?</Link>
        <Link to='/auth/register' className="font-semibold">Create New Account</Link>
        </div>
    </div>
  );
};

export default Login;
