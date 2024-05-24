import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  CLEAR_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  SAVE_URL,
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "../../redux/slice/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import { CheckCircleIcon, ChevronLeft, CircleX, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { selectIsLoggedIn } from "../../redux/slice/authSlice";
import "../../Global.css";

const Cart = () => {
  const location = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const dispatch = useDispatch();

  const increaseCart = (cart) => {
    dispatch(ADD_TO_CART(cart));
  };

  const decreaseCart = (cart) => {
    dispatch(DECREASE_CART(cart));
  };

  const removeFromCart = (cart) => {
    dispatch(REMOVE_FROM_CART(cart));
  };

  const clearCart = () => {
    dispatch(CLEAR_CART());
  };

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
    dispatch(SAVE_URL(""));
  }, [dispatch, cartItems]);

  const url = window.location.href;

  const checkout = () => {
    if (isLoggedIn) {
      location("/checkout-details");
    } else {
      dispatch(SAVE_URL(url));
      location("/login");
    }
  };
  return (
    <div className="bg-gray-900 lg:text-base xs:text-xs">
      {/* <div className="my-2 text-2xl font-bold bg-pink-100">Shopping Bag</div> */}
      {cartItems.length === 0 ? (
        <div className="flex items-center justify-center h-[60vh] p-10 bg-gray-200">
          <div className="p-10 text-center bg-white rounded-lg shadow-lg lg:max-w-xl md:max-w-[26rem] xs:max-w-[18rem]">
            <h1 className="mb-4 font-bold lg:text-3xl md:text-2xl xs:text-xl">
              Your Shopping Cart is Empty
            </h1>
            <div className="p-2 px-3 mx-auto mt-5 font-bold text-white transition-all rounded-lg bluegradient hover:scale-105 w-max">
              <Link to="/#products">Continue Shopping </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-8 bg-gray-200 cursor-default xs:p-4 lg:p-8 ">
          <div className="lg:col-span-2 xs:col-span-3 bg-blue">
            <div className="flex items-center justify-between w-full gap-2 p-2 mb-5 xs:text-[10px] lg:text-sm bg-white backdrop-blur-md rounded-xl ">
              <Link to="/#products">
                {" "}
                <div className="flex items-center transition-all cursor-pointer hover:scale-105 ">
                  <ChevronLeft size={22} /> Continue Shopping
                </div>
              </Link>
              <button
                onClick={() => clearCart()}
                className="flex gap-1 p-1 px-2 text-white
                 xs:text-[10px] lg:text-[12px] bg-red-500 
                  hover:scale-105 transition-all
                  rounded-lg"
              >
                Clear Cart <CircleX size={17} />
              </button>
            </div>
            <div
              className="p-3 bg-gray-100 rounded-2xl
            shadow-[rgba(0,_0,_0,_0.3)_0px_15px_80px]
            "
            >
              <div className="flex justify-between my-2 font-bold bg-red">
                <div className="w-[28%] xs:text-sm lg:text-xl text-center bg-red">
                  Product
                </div>
                <div className="flex text-center xs:w-[45%] lg:w-[30%] xs:px-2 lg:px-5 bg-red justify-between">
                  <div className="bg-blue w-[49%]">Quantity</div>
                  <div className="xs:mr-0 lg:mr-5 bg-blue">Price</div>
                  <div className="bg-blue "></div>
                </div>
              </div>
              {cartItems.map((cart, index) => {
                const {
                  id,
                  name,
                  price,
                  category,
                  mrp,
                  sellerName,
                  brand,
                  imageURL,
                  desc,
                  cartQuantity,
                } = cart;
                return (
                  <div key={id}>
                    <div className="grid justify-center w-full grid-cols-7 bg-red lg:gap-4 xs:gap-2 lg:p-2 xs:p-2 ">
                      <div className="flex items-center justify-center p-2 bg-gray-200 rounded-md lg:col-span-2 xs:col-span-2">
                        <div className="relative xs:p-1 lg:p-2 xs:px-2 lg:px-3 xs:text-[9px] lg:text-xs text-white font-bold scale-[.80] bg-green-500 rounded-full lg:bottom-24 lg:right-[3.25rem] xs:bottom-24 xs:right-[1.25rem]">
                          {index + 1}
                        </div>
                        <img
                          className="object-contain w-44 h-44 ml-[-2rem] mix-blend-darken"
                          src={imageURL}
                          alt={name}
                        />
                      </div>
                      <div className="col-span-2 my-auto bg-blue lg:col-span-3">
                        <div className="font-semibold lg:text-xl xs:text-[10px]">
                          {name}
                        </div>
                        <div className="mt-1 xs:text-[9px] lg:text-sm">
                          {shortenText(desc, 50)}
                        </div>
                        <div className="lg:mt-2 xs:mt-0 lg:text-xs xs:text-[10px] text-[#007600] font-medium lg:leading-normal xs:leading-3">
                          In stock
                        </div>
                        <div className="lg:text-xs lg:leading-normal xs:leading-3 xs:text-[9px] text-[#565959] font-medium">
                          Sold by
                          <span className="text-[#007185]"> {sellerName}</span>
                        </div>
                        <div className="lg:text-xs lg:leading-normal xs:leading-3 xs:text-[9px] text-[#565959] font-medium">
                          Gift options available.
                          <span className="text-[#007185] lg:leading-normal xs:leading-3">
                            Learn more
                          </span>
                        </div>
                      </div>
                      {/* {!hideButton && ( */}
                      <div className="flex items-center justify-center ">
                        <button
                          className="p-1 xs:px-2 lg:px-3  bg-[#ffd28d] transition  hover:bg-[#f0c687] "
                          onClick={() => decreaseCart(cart)}
                        >
                          -
                        </button>
                        <div className="p-1 xs:px-2 lg:px-3 bg-[#ffd28d] transition  hover:bg-[#f0c687] ">
                          {cartQuantity}
                        </div>

                        <button
                          className="p-1 xs:px-2 lg:px-3  bg-[#ffd28d] transition  hover:bg-[#f0c687] "
                          onClick={() => increaseCart(cart)}
                        >
                          +
                        </button>
                      </div>
                      {/* )} */}
                      <div className="flex items-center justify-center font-semibold text-right bg-green lg:text-xl xs:text-xs">
                        <small>₹</small>
                        {(price * cartQuantity).toFixed(2)}
                        <div
                          className="mb-1 ml-2 text-red-500 transition-all cursor-pointer lg:scale-100 xs:scale-75 hover:scale-110"
                          onClick={() => removeFromCart(cart)}
                        >
                          <Trash2 />
                        </div>
                      </div>
                    </div>
                    <div className="mx-3 my-4 ">
                      <Divider />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div
            className="p-2 h-max rounded-xl lg:col-span-1 xs:col-span-3 bg-white   
shadow-[0_8px_30px_rgb(0,0,0,0.12)]
          w-[100%]"
          >
            <div className="flex flex-col justify-between rounded-2xl">
              <div className="m-4 ">
                <div className="mb-3 font-extrabold xs:text-sm lg:text-xl ">
                  Calculated Shipping
                </div>
                <div className=" text-[#008500] ">
                  <div className="text-[#008500]  xs:text-[10px] lg:text-xs font-medium">
                    Congrats your order qualifies for a FREE Delivery.
                  </div>
                  <small className="flex items-center mt-1 ml-[-10px] text-black scale-95 ">
                    So Shipping charges is{" "}
                    <strong className="text-base">&nbsp;₹0/-</strong>
                  </small>
                </div>
              </div>
              <div className="p-3 m-2 mt-4 bg-[#ffd28d] rounded-2xl ">
                <div className="mb-3 font-extrabold xs:text-sm lg:text-xl ">
                  Cart Total
                </div>
                <div className="grid justify-between grid-cols-2 my-2 xs:text-xs lg:text-base ">
                  <div className="">Total Item </div>
                  <strong className="text-right">{cartTotalQuantity}</strong>
                  <div>Total Price </div>
                  <strong className="text-right">
                    ₹{`${cartTotalAmount.toFixed(2)}`}
                  </strong>
                </div>

                <div className="flex items-center w-full px-3 ">
                  <button
                    className="w-full p-2 px-6 pb-2 my-3 mb-0 text-center text-white transition-all scale-95 bg-black rounded-xl hover:text-green-300 hover:scale-100 hover:bg-black/90 "
                    onClick={checkout}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
