import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../provider/AuthProvider";
import uploadPhoto from "../../components/uploadPhoto";
import updateNamePhoto from "../../components/updateNamePhoto";
import { toast } from "react-hot-toast";

const UserHome = () => {
  const [axiosSecure] = useAxiosSecure();
  const [payments, setPayments] = useState([]);
  const [update, setUpdate] = useState(false);
  const { user } = useContext(AuthContext);
  const { displayName, email, photoURL, emailVerified } = user;

  const { register, handleSubmit } = useForm();

  const onSubmit = ({name , photo}) => {
    if(photo.length>0){
      uploadPhoto(photo[0]).then((res) => {
        updateNamePhoto(user , name , res.data.data.display_url).then(() => {
          setUpdate(!update);
          toast.success("Profile Updated");
        });
      });
    }
    else{
      updateNamePhoto(user , name , photoURL).then(() => {
        setUpdate(!update);
        toast.success("Profile Updated");
      });
    }
  };

  useEffect(() => {
    axiosSecure.get(`/payment/paymentInfo/${user.email}`).then((res) => {
      setPayments(res.data);
    });
  }, [axiosSecure, user.email, update]);

  return (
    <div className="bg-white shadow-md rounded-md p-4">
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
      <div>
        <h3 className="text-lg font-semibold mt-4">Order History</h3>
        <p>Total Booked: {payments.length}</p>
        <p>
          Total Paid: $
          {payments.reduce(
            (acc, cur) => parseFloat(acc) + parseFloat(cur.price),
            0
          )}
        </p>
        <p>
          Total Night:{" "}
          {payments.reduce((acc, cur) => acc + cur.productInfo.bookingDays, 0)}
        </p>
      </div>
      {emailVerified ? (
        <div className="mt-4 flex items-center text-green-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 0a1 1 0 0 1 .7 1.7l-7 7a1 1 0 0 1-1.4 0l-7-7A1 1 0 0 1 0 0h10zm1 2.293L2.293 11H1a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-1.293zm8.427 4.427l-8 8a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L10 10.586l7.293-7.293a1 1 0 1 1 1.414 1.414z"
            />
          </svg>
          Verified
        </div>
      ) : (
        <div className="mt-4 flex items-center text-red-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 0a1 1 0 0 1 .7 1.7l-7 7a1 1 0 0 1-1.4 0l-7-7A1 1 0 0 1 0 0h10zm1 2.293L2.293 11H1a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-1.293zm8.427 4.427l-8 8a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L10 10.586l7.293-7.293a1 1 0 1 1 1.414 1.414z"
            />
          </svg>
          Not Verified
        </div>
      )}
      {/* Modal */}
      <button className="btn" onClick={() => window.my_modal_2.showModal()}>
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
              {...register("name" , {required: true})}
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
    </div>
  );
};

export default UserHome;
