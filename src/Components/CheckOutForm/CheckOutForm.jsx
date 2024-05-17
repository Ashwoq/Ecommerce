import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import CheckOutSummary from "../../Components/CheckOutSummary/CheckOutSummary";
import Loader from "../../Components/Loader";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { selectEmail, selectUserID } from "../../redux/slice/authSlice";
import {
  CLEAR_CART,
  selectCartItems,
  selectCartTotalAmount,
} from "../../redux/slice/cartSlice";
import { selectShippingAddress } from "../../redux/slice/checkoutSlice";
import { useNavigate } from "react-router-dom";

const CheckOutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const location = useNavigate();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const userID = useSelector(selectUserID);
  const userEmail = useSelector(selectEmail);
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const shippingAddress = useSelector(selectShippingAddress);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    // stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
    //   switch (paymentIntent.status) {
    //     case "succeeeded":
    //       setMessage("Payment succeeded!");
    //       break;
    //     case "processing":
    //       setMessage("Your oayment is processing");
    //       break;
    //     case "requires_payment_method":
    //       setMessage("Your payment was not successful, please try again");
    //       break;
    //     default:
    //       setMessage("Something went wrong");
    //       break;
    //   }
    // });
  }, [stripe]);

  const saveOrder = () => {
    const today = new Date();
    const date = today.toDateString();
    const time = today.toLocaleDateString();
    const orderConfig = {
      userID,
      userEmail,
      orderDate: date,
      orderTime: time,
      orderAmount: cartTotalAmount,
      orderStatus: "Order Placed...",
      cartItems,
      shippingAddress,
      created: Timestamp.now().toDate(),
    };

    try {
      addDoc(collection(db, "orders"), orderConfig);
      // name: product.name,
      // desc: product.desc,
      // sellerName: product.sellerName,
      // brand: product.brand,
      // mrp: Number(product.mrp),
      // price: Number(product.price),
      // category: product.category,
      // imageURL: product.imageURL,
      // createdAt: productEdit.createdAt,
      // editedAt: Timestamp.now().toDate(),
      // });
      dispatch(CLEAR_CART());
      toast.success("Order Success");
      location("/checkout-success");
      // location("/admin/all-products");
    } catch (error) {
      alert("eror");
      toast.error(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);

    //   const confirmPayment = await stripe
    //     .confirmPayment({
    //       elements,
    //       confirmParams: {
    //         return_url: "http://localhost:3001/checkout-success",
    //       },
    //       // redirect: "if_required",
    //     })
    //     .then((result) => {
    //       if (result.error) {
    //         toast.error(result.error);
    //         setMessage(result.error.message);
    //         return;
    //       }
    //       if (result.paymentIntent) {
    //         if (result.paymentIntent.status === "succeeded") {
    //           setIsLoading(false);
    //           toast.success("Payment successful");
    //           saveOrder();
    //         }
    //       }
    //     });
    //   setIsLoading(false);
    // };
    try {
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "http://localhost:3001/checkout-success",
        },
        // redirect: "if_required",
        redirect: "if_required",
      });

      if (result.error) {
        toast.error(result.error.message);
        setMessage(result.error.message);
      } else if (
        result.paymentIntent &&
        result.paymentIntent.status === "succeeded"
      ) {
        setIsLoading(false);
        toast.success("Payment successful");
        saveOrder();
        // window.location.href = "http://localhost:3001/checkout-success";
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      setMessage("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen cursor-default">
      <h2 className="p-3 font-semibold bg-gray-100 lg:mx-96 rounded-xl xs:mb-2 lg:mb-4 lg:text-2xl xs:text-sm">
        Order Details
      </h2>
      <form
        className="flex justify-center gap-5 lg:flex-row xs:flex-col"
        onSubmit={handleSubmit}
      >
        <div className="">
          <CheckOutSummary />
        </div>
        <div className="p-4 bg-green-300 rounded-xl h-max">
          <div className="mb-3 font-bold xs:text-base lg:text-xl">
            stripe checkout
          </div>
          <PaymentElement if="payment-element" />
          <button
            disabled={isLoading || !stripe || !elements}
            id="submit"
            className="p-1 px-4 mt-5 text-white transition-all rounded-lg hover:scale-105 bluegradient"
          >
            <span id="button-text">{isLoading ? <Loader /> : "Pay now"}</span>
          </button>
          {message && <div id="payment-message">{message}</div>}
        </div>
      </form>
    </div>
  );
};

export default CheckOutForm;
