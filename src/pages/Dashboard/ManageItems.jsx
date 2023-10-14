import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import SecTitle from "../../Components/SecTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useMenu from "../../Hooks/useMenu";

const ManageItems = () => {
  const [menu, , refetch] = useMenu();
  const [axiosSecure] = useAxiosSecure();

  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, delete ${item.name}!`,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`menu/${item._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "Your Item has been deleted.", "success");
          }
        });
      }
    });
  };

  return (
    <div className="w-full">
      <SecTitle headding={"Manage All Item"} subHeadding={"---Hurry Up!---"} />
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Item</th>
              <th>Category</th>
              <th>Price</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {menu.map((item, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={item.image} alt={item.name} />
                      </div>
                    </div>
                    <div className="font-bold">{item.name}</div>
                  </div>
                </td>
                <td>{item.category}</td>
                <td>{item.price} $</td>
                <th>
                  <button className="btn btn-warning">
                    <FaEdit className="text-xl" />
                  </button>
                </th>
                <th>
                  <button
                    onClick={() => handleDelete(item)}
                    className="btn btn-error"
                  >
                    <FaTrashAlt className="text-xl" />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageItems;
