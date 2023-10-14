import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const LoginRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return children;
  }

  return <Navigate to="/"/>;
};

export default LoginRoute;