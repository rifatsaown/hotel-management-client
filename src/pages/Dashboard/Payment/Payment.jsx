import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm.jsx";
import { InfoContext } from "../../../provider/InfoProvider.jsx";
import { useContext } from "react";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Payment = () => {
  const {paymentInfo , setPaymentInfo} = useContext(InfoContext);
  

  return (
    <div className="max-w-2xl w-full">
      <Elements stripe={stripePromise}>
        <PaymentForm paymentInfo={paymentInfo} setPaymentInfo={setPaymentInfo} price={paymentInfo.totalPrice} />
      </Elements>
    </div>
  );
};

export default Payment;
