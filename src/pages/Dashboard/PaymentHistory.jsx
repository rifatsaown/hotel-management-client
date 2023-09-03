import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../provider/AuthProvider";

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    axiosSecure.get(`/payment/paymentInfo/${user.email}`).then((res) => {
      setPayments(res.data);
      console.log(res.data);
    });
  }, [axiosSecure, user.email]);

  return (
    <>
      {payments.length == 0 ? <h1 className="text-3xl font-semibold">No Payment History</h1> : <div className="py-8 mx-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Payment History</h2>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {payments.map((payment) => (
            <div
              key={payment._id}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h3 className="text-lg mb-2">
              <span className="font-semibold">Trx ID:</span> {payment.trxId}
              </h3>
              <p className="mb-2"><span className="font-semibold">Date:</span> {payment.date}</p>
              <p className="mb-2"><span className="font-semibold">Total Night: </span>{payment.productInfo.bookingDays}</p>
              <p className="mb-2"><span className="font-semibold">Start Date: </span>{payment.productInfo.startDate}</p>
              <p className="mb-2"><span className="font-semibold">End Date: </span>{payment.productInfo.endDate}</p>
              <p className="mb-2"><span className="font-semibold">Room Type: </span>{payment.productInfo.roomData.type}</p>
              <p className="mb-2"><span className="font-semibold">Room Price: </span>{payment.productInfo.roomData.pricePerNight}$</p>
              <p className="mb-2"><span className="font-semibold">Paid Amount: </span>{payment.price}$</p>
            </div>
          ))}
        </div>
      </div>}
    </>
  );
};

export default PaymentHistory;
