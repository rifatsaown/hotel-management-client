import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
  const { user } = useContext(AuthContext);
  // use axios and tanstack/react-query to get admin status
  const [axiosSecure] = useAxiosSecure();
  const { data: isAdmin, isLoading: isAdminLoading } = useQuery(
    ["isAdmin", user?.email],
    async () => {
      const { data } = await axiosSecure.get(`/user/admin/${user?.email}`);
      return data.admin;
    }
  );
  return { isAdmin, isAdminLoading };
};

export default useAdmin;
