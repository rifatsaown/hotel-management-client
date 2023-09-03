import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ManagePayment = () => {
  const [axiosSecure] = useAxiosSecure();

  const { data: payments =[] , refetch } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments/allpaymentInfo");
      return res.data;
    },
  });

const handleAprove = async (id) => {
    await axiosSecure.patch(`/payments/${id}`);
    refetch();
}

  return (
    <>
      <div className="py-8 mx-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Payment Manage</h2>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {payments.map((payment ,index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h3 className="text-lg mb-2">
                <span className="font-semibold">Trx ID:</span> {payment.trxId}
              </h3>
              <p className="mb-2">
                <span className="font-semibold">Date:</span> {payment.date}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Email</span> {payment.email}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Order Status: </span>{" "}
                {payment.orderStatus}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Total Products: </span>
                {payment.quantity}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Products:</span>
              </p>
              <ul className="list-disc pl-6">
                {payment.itemsName.map((itemName ,i) => (
                  <li key={i}>{itemName}</li>
                ))}
              </ul>
              <p className="mt-4 font-bold">
                Total Price: ${payment.price.toFixed(2)}
              </p>
              {payment.orderStatus === 'approved' ? <button className="btn btn-accent mt-3 btn-wide btn-outline" disabled>Aproved</button> : 
              <button onClick={()=>handleAprove(payment._id)} className="btn btn-accent mt-3 btn-wide btn-outline">Aprove</button>}
            </div>
            
          ))}
        
        </div>
      </div>
    </>
  );
};

export default ManagePayment;
