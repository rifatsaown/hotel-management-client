import { useContext } from "react";
import { Navigate } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import { AuthContext } from "../provider/AuthProvider";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const { isAdmin, isAdminLoading } = useAdmin();

  if (loading || isAdminLoading) {
    return (
      <div className="text-center mt-40">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  if (user && isAdmin) {
    return children;
  }

  return <Navigate to="/" replace />;
};

export default AdminRoute;
