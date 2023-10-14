import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../provider/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

const ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "18px",
      color: "#424770",
      letterSpacing: "0.025em",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

export default function PaymentForm({ paymentInfo ,setPaymentInfo }) {
  const {item} = paymentInfo;
  const {totalPrice} = item;
  const price = totalPrice || 0;

  console.log(item);

  console.log(item);
  const { user } = useContext(AuthContext);
  const elements = useElements();
  const navigate = useNavigate();
  const stripe = useStripe();
  const [axiosSecure] = useAxiosSecure();
  const [errorMessage, setErrorMessage] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [trxId, setTrxId] = useState("");
  const [processing, setProcessing] = useState(false);


  useEffect(() => {
    if(price <= 0) return;
    axiosSecure.post("/payment/create-payment-intent", { price }).then((res) => {
      setClientSecret(res.data.clientSecret);
    });
  }, [axiosSecure, price]);

//--------------- Submit For Payment -----------------------//
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardNumberElement);
    console.log(card);
    if (card == null) {
      return;
    }

    const payload = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (payload.error) {
      console.log("[error]", payload.error);
      setErrorMessage(payload.error.message);
      // setPaymentMethod(null);
    } else {
      console.log("[PaymentMethod]", payload.paymentMethod);
      // setPaymentMethod(payload.paymentMethod);
      setErrorMessage(null);
    }
    setProcessing(true);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "Anonymous",
            email: user?.email || "Anonymous",
          },
        },
      }
    );
    if (error) {
      setErrorMessage(error.message);
    }
    setProcessing(false);
    if (paymentIntent?.status === "succeeded") {
      setTrxId(paymentIntent?.id);
      const payment = {
        productInfo: item,
        email: user?.email,
        price : price,
        date: new Date().toLocaleString(),
        trxId: paymentIntent?.id,
      };
      axiosSecure.post("/payment/paymentInfo", payment)
        .then((res) => {
          if (res.data.insertedId) {
            setPaymentInfo({});
            Swal.fire({
              icon: "success",
              title: "Payment Successfull",
              text: "Your Payment is Successfull",
            });
            navigate("/dashboard/bookingList");
          }

        });
    }
  };
// --------------- Submit For Payment -----------------------//

  return (
    <div className="">
      {
        price && (<form
          onSubmit={handleSubmit}
          className=" bg-base-300 md:py-14 py-5 px-5 md:px-14 rounded-xl space-y-4"
        >
          <p className="text-center font-bold text-3xl">Please Pay ${price}</p>
          <div>
            <label htmlFor="cardNumber" className="block mb-1 font-medium">
              Card Number
            </label>
            <CardNumberElement
              className="input w-full pt-3"
              id="cardNumber"
              options={ELEMENT_OPTIONS}
            />
          </div>
          <div>
            <label htmlFor="cardName" className="block mb-1 font-medium">
              Card Holder
            </label>
            <input
              className="input w-full"
              placeholder={"Your Name"}
              name="cardHolder"
            />
          </div>
  
          <div className="flex gap-2 justify-between">
            <div className="w-3/5">
              <label htmlFor="cardMonth" className="block mb-1 font-medium">
                Expiration Date
              </label>
              <div className="flex">
                <CardExpiryElement
                  className="input w-2/6 pt-3"
                  options={ELEMENT_OPTIONS}
                />
              </div>
            </div>
            <div className="w-2/5">
              <label htmlFor="cardCvv" className="block mb-1 font-medium">
                CVV
              </label>
              <CardCvcElement
                className="input w-full pt-3"
                options={ELEMENT_OPTIONS}
              />
            </div>
          </div>
          {errorMessage && <div className="text-red-600">{errorMessage}</div>}
          {trxId && (
            <div className="text-green-600">Got Payment And TrXId: {trxId}</div>
          )}
  
          <input
            type="submit"
            disabled={!stripe || !clientSecret || processing}
            value="pay now"
            className="text-center btn w-full btn-outline"
          />
        </form>)
      }
    </div>
  );
}
