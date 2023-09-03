import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaTrashAlt, FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../provider/AuthProvider";

const AllUsers = () => {
  const { user } = useContext(AuthContext);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  const [axiosSecure] = useAxiosSecure();
  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const res = await axiosSecure.get(`/user/allusers`);
    return res.data;
  });

  useEffect(() => {
    axiosSecure.get(`/user/superadmin/${user?.email}`).then((res) => {
      setIsSuperAdmin(res.data.superadmin);
    });
  });

  const makeAdmin = (user) => {
    axiosSecure.patch(`/user/makeAdmin/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: `${user.name} is now Admin`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      refetch();
    });
  };
  const makeUser = (user) => {
    axiosSecure.patch(`/user/makeUser/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: `${user.name} is now User`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      refetch();
    });
  };


  const handleDelete = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it.",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/user/deleteUser/${user._id}`)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "User Deleted Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            refetch();
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          icon: "error",
          title: "Cancelled",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div className="w-full">
      <Helmet>
        <title>Galaxies Hotel | All Users</title>
      </Helmet>
      <h1 className="text-xl my-4 font-semibold text-center">
        Total User: {users.length}
      </h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <div>
                    {user.role === "admin" || user.role === "superadmin" ? (
                      <p>{user.role}</p>
                    ) : (
                      <button
                        onClick={() => makeAdmin(user)}
                        className="btn btn-accent bg-orange-500 text-white"
                      >
                        Make Admin
                        <FaUserShield className=" text-lg" />
                      </button>
                    )}
                  </div>
                  <div>
                    {
                      isSuperAdmin && user.role ==="admin" && (<button onClick={()=>makeUser(user)} className="btn btn-warning mt-2">Make User</button>)
                    }
                  </div>
                </td>
                <td>
                  {
                    isSuperAdmin && (user.role ==="admin" || user.role ==="user") ? (<button className="btn btn-error btn-circle">
                      <FaTrashAlt
                        onClick={() => handleDelete(user)}
                        className="text-red-900 text-lg"
                      />
                    </button>):(<>None</>)
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
