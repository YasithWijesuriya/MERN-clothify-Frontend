import { useLocation, useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useCreatePaymentIntentMutation, api as rtkApi } from "@/lib/api";
import { clearCart } from "@/lib/features/cartSlice";
import { useDispatch } from "react-redux";

export default function CardPaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const { orderPayload, totalPrice } = location.state || {};
  if (!orderPayload || !totalPrice) {
    navigate("/checkout/shipping");
    return null;
  }

  const dispatch = useDispatch();
  const [createPaymentIntent] = useCreatePaymentIntentMutation();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handlePayment() {
    if (!stripe || !elements) return;

    setLoading(true);
    setErrorMessage("");

    try {
      const { clientSecret, orderId } = await createPaymentIntent({
  amount: Math.round(totalPrice * 100),
  orderData: orderPayload,
}).unwrap();

      console.log("Creating payment intent:", {
        amount: Math.round(totalPrice * 100),
        orderData: orderPayload,
      });

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
        setup_future_usage: "off_session",
      });

      if (result.error) {
        setErrorMessage(result.error.message || "Payment failed.");
      } else if (result.paymentIntent && result.paymentIntent.status === "succeeded") {
        console.log("Payment Success:", result.paymentIntent);


       dispatch(rtkApi.util.updateQueryData('getMyOrdersByUser', undefined, (draft) => {
  const order = draft?.data.find(o => o._id === orderId);
  if (order) order.paymentStatus = "PAID";
}));
dispatch(rtkApi.util.invalidateTags(['MyOrders']));
        dispatch(clearCart());

        navigate(`/checkout/order-confirmation/${result.paymentIntent.id}`, {
          state: {
            totalPrice,
            paymentMethod: "CREDIT_CARD",
            orderPayload,
          },
        });
      } else {
        setErrorMessage("Payment not completed. Please try again.");
      }
    } catch (err) {
      const message = err?.message ?? String(err);
      setErrorMessage(message || "Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  }

  

  return (
    <div className="max-w-md mx-auto p-6 shadow-lg rounded-xl">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        Enter Your Card Details
      </h2>

      <div className="border p-3 rounded-lg bg-white">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#32325d",
                "::placeholder": { color: "#a0aec0" },
              },
              invalid: { color: "#fa755a" },
            },
          }}
        />
      </div>

      {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}

      <Button className="w-full mt-4" onClick={handlePayment} disabled={!stripe || loading}>
        {loading ? "Processing..." : `Pay LKR ${totalPrice.toFixed(2)}`}
      </Button>
    </div>
  );
}
