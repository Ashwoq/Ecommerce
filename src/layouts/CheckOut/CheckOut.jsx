import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectEmail } from "../../redux/slice/authSlice";
import {
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  selectCartItems,
  selectCartTotalAmount,
} from "../../redux/slice/cartSlice";
import {
  selectBillingAddress,
  selectShippingAddress,
} from "../../redux/slice/checkoutSlice";
import { toast } from "react-toastify";
import CheckOutForm from "../../Components/CheckOutForm/CheckOutForm";

const stripePromise = loadStripe(import.meta.env.VITE_API_STRIPE_PK);

const CheckOut = () => {
  const [message, setMessage] = useState("Initialiazing Checkout");
  const [clientSecret, setClientSecret] = useState("");

  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotalAmount);
  const customerEmail = useSelector(selectEmail);

  const shippingAddress = useSelector(selectShippingAddress);
  const billingAddress = useSelector(selectBillingAddress);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, [dispatch, cartItems]);

  // const description = `ECommerce payment : email : ${customerEmail}, Amount : ${totalAmount}`;

  // useEffect(() => {
  //   fetch("http://localhost:4242/create-payment-intent", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       items: cartItems,
  //       userEmail: customerEmail,
  //       shipping: shippingAddress,
  //       billing: billingAddress,
  //       description,
  //     }),
  //   })
  //     .then((res) => {
  //       if (res.ok) {
  //         return res.json();
  //       }
  //       return res.json().then((json) => Promise.reject(json));
  //     })
  //     .then((data) => {
  //       setClientSecret(data.clientSecret);
  //     })
  //     .catch((error) => {
  //       setMessage("Failed to initializes checkout");
  //       toast.error("Something went wrong");
  //     });
  // }, []);

  // const appearance = {
  //   theme: "stripe",
  // };

  // const options = {
  //   clientSecret,
  //   appearance,
  // };

  return (
    <div className="">
      {/* <h2>Checkout</h2> */}
      {/* {!clientSecret && <h3>{message}</h3>} */}
      {/* <div className="">
        {clientSecret && ( */}
      {/* <Elements options={options} stripe={stripePromise}> */}
      <CheckOutForm />
      {/* </Elements> */}
      {/* )} */}
      {/* </div> */}
    </div>
  );
};

export default CheckOut;
