// import {
//   PaymentElement,
//   useElements,
//   useStripe,
// } from "@stripe/react-stripe-js";
// import CheckOutSummary from "../../Components/CheckOutSummary/CheckOutSummary";
// import Loader from "../../Components/Loader";
// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { Timestamp, addDoc, collection } from "firebase/firestore";
// import { db } from "../../firebase/config";
// import { useDispatch, useSelector } from "react-redux";
// import { selectEmail, selectUserID } from "../../redux/slice/authSlice";
// import {
//   CLEAR_CART,
//   selectCartItems,
//   selectCartTotalAmount,
// } from "../../redux/slice/cartSlice";
// import { selectShippingAddress } from "../../redux/slice/checkoutSlice";
// import { useNavigate } from "react-router-dom";

// const CheckOutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const location = useNavigate();

//   const [message, setMessage] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const dispatch = useDispatch();

//   const userID = useSelector(selectUserID);
//   const userEmail = useSelector(selectEmail);
//   const cartItems = useSelector(selectCartItems);
//   const cartTotalAmount = useSelector(selectCartTotalAmount);
//   const shippingAddress = useSelector(selectShippingAddress);

//   useEffect(() => {
//     if (!stripe) {
//       return;
//     }

//     const clientSecret = new URLSearchParams(window.location.search).get(
//       "payment_intent_client_secret"
//     );

//     if (!clientSecret) {
//       return;
//     }

//     // stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
//     //   switch (paymentIntent.status) {
//     //     case "succeeeded":
//     //       setMessage("Payment succeeded!");
//     //       break;
//     //     case "processing":
//     //       setMessage("Your oayment is processing");
//     //       break;
//     //     case "requires_payment_method":
//     //       setMessage("Your payment was not successful, please try again");
//     //       break;
//     //     default:
//     //       setMessage("Something went wrong");
//     //       break;
//     //   }
//     // });
//   }, [stripe]);

//   const saveOrder = () => {
//     const today = new Date();
//     const date = today.toDateString();
//     const time = today.toLocaleDateString();
//     const orderConfig = {
//       userID,
//       userEmail,
//       orderDate: date,
//       orderTime: time,
//       orderAmount: cartTotalAmount,
//       orderStatus: "Order Placed...",
//       cartItems,
//       shippingAddress,
//       created: Timestamp.now().toDate(),
//     };

//     try {
//       addDoc(collection(db, "orders"), orderConfig);
//       dispatch(CLEAR_CART());
//       toast.success("Order Success");
//       location("/checkout-success");
//       // location("/admin/all-products");
//     } catch (error) {
//       alert("eror");
//       toast.error(error.message);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage(null);

//     if (!stripe || !elements) {
//       return;
//     }
//     setIsLoading(true);

//     //   const confirmPayment = await stripe
//     //     .confirmPayment({
//     //       elements,
//     //       confirmParams: {
//     //         return_url: "http://localhost:3001/checkout-success",
//     //       },
//     //       // redirect: "if_required",
//     //     })
//     //     .then((result) => {
//     //       if (result.error) {
//     //         toast.error(result.error);
//     //         setMessage(result.error.message);
//     //         return;
//     //       }
//     //       if (result.paymentIntent) {
//     //         if (result.paymentIntent.status === "succeeded") {
//     //           setIsLoading(false);
//     //           toast.success("Payment successful");
//     //           saveOrder();
//     //         }
//     //       }
//     //     });
//     //   setIsLoading(false);
//     // };
//     try {
//       const result = await stripe.confirmPayment({
//         elements,
//         confirmParams: {
//           return_url: "http://localhost:3001/checkout-success",
//         },
//         // redirect: "if_required",
//         redirect: "if_required",
//       });

//       if (result.error) {
//         toast.error(result.error.message);
//         setMessage(result.error.message);
//       } else if (
//         result.paymentIntent &&
//         result.paymentIntent.status === "succeeded"
//       ) {
//         setIsLoading(false);
//         toast.success("Payment successful");
//         saveOrder();
//         // window.location.href = "http://localhost:3001/checkout-success";
//       }
//     } catch (error) {
//       toast.error("An unexpected error occurred");
//       setMessage("An unexpected error occurred");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-red-900 cursor-default">
//       <form
//         className="flex justify-center gap-5 bg-yellow-600 lg:flex-row xs:flex-col"
//         onSubmit={handleSubmit}
//       >
//         <div className="p-4 bg-green-300 rounded-xl h-max">
//           <h2 className="p-3 font-semibold bg-gray-100 rounded-xl lg:text-2xl xs:text-sm">
//             Order Details
//           </h2>
//           <div className="mb-3 font-bold xs:text-base lg:text-xl">
//             stripe checkout
//           </div>
//           <PaymentElement if="payment-element" />
//           <button
//             disabled={isLoading || !stripe || !elements}
//             id="submit"
//             className="p-1 px-4 mt-5 text-white transition-all rounded-lg hover:scale-105 bluegradient"
//           >
//             <span id="button-text">{isLoading ? <Loader /> : "Pay now"}</span>
//           </button>
//           {message && <div id="payment-message">{message}</div>}
//         </div>
//         <div className="">
//           <CheckOutSummary />
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CheckOutForm;

//

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
  const [paymentMethod, setPaymentMethod] = useState("stripe");

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
  }, [stripe]);

  const saveOrder = () => {
    const today = new Date();
    const date = today.toDateString();
    const time = today.toLocaleTimeString();
    const orderConfig = {
      userID,
      userEmail,
      orderDate: date,
      orderTime: time,
      orderAmount: cartTotalAmount,
      orderStatus: "Order Placed...",
      cartItems,
      paymentMethod: paymentMethod,
      shippingAddress,
      created: Timestamp.now(),
    };

    try {
      addDoc(collection(db, "orders"), orderConfig);
      dispatch(CLEAR_CART());
      toast.success("Order Success");
      location("/checkout-success");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (paymentMethod === "stripe") {
      if (!stripe || !elements) {
        return;
      }
      setIsLoading(true);

      try {
        const result = await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: "http://localhost:3001/checkout-success",
          },
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
        }
      } catch (error) {
        toast.error("An unexpected error occurred");
        setMessage("An unexpected error occurred");
      } finally {
        setIsLoading(false);
      }
    } else {
      saveOrder();
    }
  };

  // return (
  //   <div className="min-h-screen bg-red-900 cursor-default">
  //     <h2 className="p-3 font-semibold bg-gray-100 rounded-xl lg:text-2xl xs:text-sm">
  //       Payment Method
  //     </h2>
  //     <form
  //       className="flex justify-center gap-5 bg-yellow-600 lg:flex-row xs:flex-col"
  //       onSubmit={handleSubmit}
  //     >
  //       <div className="p-4 bg-green-300 rounded-xl h-max">
  //         <div className="mb-3 font-bold xs:text-base lg:text-xl">Checkout</div>
  //         <div className="mb-3">
  //           <label className="mr-2">
  //             <input
  //               type="radio"
  //               name="paymentMethod"
  //               value="stripe"
  //               checked={paymentMethod === "stripe"}
  //               onChange={(e) => setPaymentMethod(e.target.value)}
  //             />
  //             Credit/Debit Card (Stripe)
  //           </label>
  //           <label className="ml-4">
  //             <input
  //               type="radio"
  //               name="paymentMethod"
  //               value="cod"
  //               checked={paymentMethod === "cod"}
  //               onChange={(e) => setPaymentMethod(e.target.value)}
  //             />
  //             Cash on Delivery (COD)
  //           </label>
  //         </div>
  //         {paymentMethod === "stripe" && (
  //           <PaymentElement id="payment-element" />
  //         )}
  //         {paymentMethod === "stripe" && (
  //           <button
  //             disabled={isLoading || !stripe || !elements}
  //             id="submit"
  //             className="p-1 px-4 mt-5 text-white transition-all rounded-lg hover:scale-105 bluegradient"
  //           >
  //             <span id="button-text">{isLoading ? <Loader /> : "Pay now"}</span>
  //           </button>
  //         )}
  //         {paymentMethod === "cod" && (
  //           <button
  //             type="submit"
  //             className="p-1 px-4 mt-5 text-white transition-all rounded-lg hover:scale-105 bluegradient"
  //           >
  //             Place Order
  //           </button>
  //         )}
  //         {message && <div id="payment-message">{message}</div>}
  //       </div>
  //       <div className="">
  //         <CheckOutSummary />
  //       </div>
  //     </form>
  //   </div>
  // );
  return (
    <div className="min-h-screen mx-auto bg-white cursor-default xs:p-5 lg:p-10 py-14">
      <div className="justify-center gap-10 lg:flex xs:block ">
        <form
          className="shadow-[rgba(0,_0,_0,_0.2)_0px_15px_80px]  bg-white"
          onSubmit={handleSubmit}
        >
          {/* <div className="p-4 mb-4 font-semibold bg-gray-100 lg:text-2xl xs:text-sm">
            Payment Method
          </div>{" "} */}
          <div className="h-full bg-white p-7">
            <div className="mt-2 mb-6 font-bold xs:text-base lg:text-2xl">
              Payment Method
            </div>
            <div className="flex justify-between mx-2 mb-3 text-sm">
              <div className="p-4 py-3 mr-2 hover:scale-[1.02] transition-all bg-gray-200 rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 mr-2"
                  name="paymentMethod"
                  value="stripe"
                  checked={paymentMethod === "stripe"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Credit/Debit Card (Stripe)
              </div>
              <div className="p-4 py-3 mr-2 rounded-lg hover:scale-[1.02] transition-all bg-gray-200 cursor-pointer">
                <input
                  type="checkbox"
                  name="paymentMethod"
                  className="w-4 h-4 mr-2"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => {
                    setPaymentMethod(e.target.value);
                    setMessage(null);
                  }}
                />
                Cash on Delivery (COD)
              </div>
            </div>
            {paymentMethod === "stripe" && (
              <PaymentElement id="payment-element" />
            )}
            <div className="flex justify-between">
              {paymentMethod === "stripe" && (
                <button
                  disabled={isLoading || !stripe || !elements}
                  id="submit"
                  className="p-1 px-4 mt-5 text-white transition-all rounded-lg hover:scale-105 bluegradient"
                >
                  <span id="button-text">
                    {isLoading ? <Loader /> : "Pay now"}
                  </span>
                </button>
              )}
              {paymentMethod === "cod" && (
                <button
                  type="submit"
                  className="p-1 px-4 mt-5 text-white transition-all rounded-lg hover:scale-105 bluegradient"
                >
                  Place Order
                </button>
              )}
              {message && (
                <div
                  className="p-1 px-4 mt-5 text-sm text-white bg-red-500 w-max rounded-xl"
                  id="payment-message"
                >
                  {message}
                </div>
              )}
            </div>
          </div>
        </form>
        <div className="shadow-[rgba(0,_0,_0,_0.2)_0px_15px_80px]  bg-white">
          <CheckOutSummary />
        </div>
      </div>
    </div>
  );
};

export default CheckOutForm;
