import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

import { toast } from "react-hot-toast";
import updateNamePhoto from "../../components/updateNamePhoto";
import uploadPhoto from "../../components/uploadPhoto";
import { AuthContext } from "../../provider/AuthProvider";

const AdminHome = () => {
  const [update, setUpdate] = useState(false);
  const { user } = useContext(AuthContext);
  const { displayName, email, photoURL } = user;

  const { register, handleSubmit } = useForm();

  const onSubmit = ({ name, photo }) => {
    if (photo.length > 0) {
      uploadPhoto(photo[0]).then((res) => {
        updateNamePhoto(user, name, res.data.data.display_url).then(() => {
          setUpdate(!update);
          toast.success("Profile Updated");
        });
      });
    } else {
      updateNamePhoto(user, name, photoURL).then(() => {
        setUpdate(!update);
        toast.success("Profile Updated");
      });
    }
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4">
      <h1 className="text-center font-bold text-2xl text-success mb-4">
        ADMIN
      </h1>
      <div className="flex items-center">
        <img
          src={photoURL}
          alt={`${displayName}'s profile`}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h2 className="text-lg font-semibold">{displayName}</h2>
          <p className="text-gray-600">{email}</p>
        </div>
      </div>
      {/* Modal */}
      <button
        className="btn btn-primary w-full btn-sm mt-4"
        onClick={() => window.my_modal_2.showModal()}
      >
        Edit Profile
      </button>
      <dialog id="my_modal_2" className="modal">
        <form
          onSubmit={handleSubmit(onSubmit)}
          method="dialog"
          className="modal-box"
        >
          <div className="space-y-2">
            <p>Edit Name</p>
            <input
              type="text"
              defaultValue={displayName}
              {...register("name", { required: true })}
              className="input input-primary w-full"
            />
            <p>Edit Profile Photos</p>
            <input
              type="file"
              {...register("photo")}
              className="file-input file-input-primary rounded-full w-full"
            />
          </div>
          <input type="submit" className="btn mt-2 btn-success" />
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
        {/* Statistic */}
      <div className="stats stats-vertical w-full mt-2 lg:stats-horizontal shadow">
        <div className="stat">
          <div className="stat-title">Total User</div>
          <div className="stat-value">31K</div>
          
        </div>

        <div className="stat">
          <div className="stat-title">Total Booking</div>
          <div className="stat-value">4,200</div>
          
        </div>

        <div className="stat">
          <div className="stat-title">Total Payment Receved</div>
          <div className="stat-value">1,200 $ </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
