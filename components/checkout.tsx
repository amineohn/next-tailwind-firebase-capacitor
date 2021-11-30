import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import Loading from "./loading";

const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }
    if (stripe == null) {
      return;
    }
    setLoading(true);
    const { error, paymentMethod }: any = await stripe?.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement) as any,
    });
    if (error) {
      console.log("[error]", error);
      setError(error.message);
      setLoading(false);
    }
    if (paymentMethod) {
      console.log("[paymentMethod]", paymentMethod);
      setLoading(false);
    }
    setLoading(false);
  };
  return (
    <>
      <form className="space-y-2" onSubmit={handleSubmit}>
        <CardElement />
        <div className="flex justify-end space-x-2">
          <button
            className={`py-2 px-2 flex justify-center items-center bg-greenDDTV hover:bg-green-800 focus:ring-green-800 focus:ring-offset-green-100 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ${
              error &&
              "bg-red-600 hover:bg-red-700 focus:!ring-red-500 focus:!ring-offset-red-200"
            }`}
            type="submit"
            disabled={!stripe}
          >
            {loading ? (
              <Loading message="Chargement..." />
            ) : error ? (
              <p className="text-medium text-sm">{error}</p>
            ) : (
              "Payer"
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default Checkout;
