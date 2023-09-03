import { Helmet } from "react-helmet-async";
import { FaTrashAlt } from "react-icons/fa";

import Swal from "sweetalert2";

import useBookingList from "../../hooks/useBookingList";
import { useContext } from "react";
import { InfoContext } from "../../provider/InfoProvider";
import { useNavigate } from "react-router-dom";

const MyBookingList = () => {
  const {setPaymentInfo} = useContext(InfoContext);
  const { bookingList, refetch } = useBookingList();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(id);
        refetch();
      }
    });
  };

  const handlePay = (item) => {
    const paymentData = {
      item: item,
    }
    setPaymentInfo(paymentData);
    navigate("/dashboard/payment");
  }


  return (
    <>
      {bookingList.status === "error" ? (
        <>
          Please Login Again to see your cart <br />
          -- Your Token has been expired --
        </>
      ) : (
        <>
          <div className="w-full">
            <Helmet>
              <title>Bistro Boss | My Cart</title>
            </Helmet>

            <div className="uppercase text-2xl font-semibold my-4 flex justify-around">
              <h3>Total Item: {bookingList.length}</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead className="bg-base-200">
                  <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Room Type</th>
                    <th>Booking Days</th>
                    <th>Total Price</th>
                    <th>Daily Price</th>
                    <th>Pay</th> 
                    <th>Delete</th>

                  </tr>
                </thead>
                <tbody>
                  {bookingList.length > 0 ? (
                    <>
                      {bookingList.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            <div className="avatar">
                              <div className="w-32">
                                <img src={item.roomData.image} alt="Food Image" />
                              </div>
                            </div>
                          </td>
                          <td>{item.roomData.type}</td>
                          <td>{item.bookingDays}</td>
                          <td>{item.roomData.pricePerNight}</td>
                          <td>${item.totalPrice}</td>
                          <td>
                          <button onClick={() => handlePay(item)}
                              
                              className="btn btn-accent btn-sm text-lg bg-green-700 text-white"
                            >
                              Pay
                            </button>
                          </td>
                          <td>
                            <button
                              onClick={() => handleDelete(item._id)}
                              className="btn btn-accent text-lg bg-red-700 text-white"
                            >
                              <FaTrashAlt />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No Item Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MyBookingList;
