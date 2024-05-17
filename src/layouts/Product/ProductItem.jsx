import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  ADD_TO_CART,
  CALCULATE_TOTAL_QUANTITY,
  DECREASE_CART,
  selectCartItems,
} from "../../redux/slice/cartSlice";

const ProductItem = ({
  product,
  griddy,
  id,
  brand,
  category,
  desc,
  imageURL,
  mrp,
  price,
  name,
  sellerName,
}) => {
  const dispatch = useDispatch();

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  const increaseCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  const decreaseCart = (product) => {
    dispatch(DECREASE_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  const cartItems = useSelector(selectCartItems);
  const cart = cartItems.find((cart) => cart.id === id);
  const isCartAdded = cartItems.findIndex((cart) => {
    return cart.id === id;
  });

  return (
    // <div className={`${griddy ? "bg-red-100" : "bg-red-900 "}`}>
    <div
      className="rounded-xl
    shadow-[0_8px_30px_rgb(0,0,0,0.12)]
     cursor-default"
    >
      {griddy && (
        <div className="m-5 ">
          {/* {shortenText(name, 18)} */}

          <div className="col-span-1 ">
            <Link to={`/product-details/${id}`}>
              <div className="flex items-center lg:col-span-1 xs:col-span-2 justify-center rounded-md bg-[#f1f1f1] mb-3 ">
                <img
                  className="object-contain w-44 h-44 mix-blend-darken"
                  src={imageURL}
                  alt={name}
                />
              </div>
            </Link>
            <div className="flex items-center p-2 xs:text-[7px] lg:text-xs font-semibold bg-white">
              <span className="p-1 px-2 text-white line-through bg-red-700 rounded-sm ">
                {mrp}
              </span>
              <span className="p-1 px-2 text-red-700">Limited time deal</span>
            </div>
            <div className="p-2 mt-[-10px] xs:text-[9px] lg:text-lg bg-white">
              <small>₹</small>
              {price}
              {"  "}
              <span className="xs:text-[7px] lg:text-xs font-light text-gray-600">
                M.R.P: <span className="line-through">{mrp}</span>
              </span>
            </div>
            <div className="flex xs:flex-col lg:flex-row items-center justify-between p-2 mt-[-15px] bg-white ">
              <div className="font-semibold xs:text-[9px] lg:text-base ">
                {name}
              </div>

              {isCartAdded < 0 ? (
                <div className="flex lg:text-base xs:mt-2 xs:text-[8px] items-center w-max justify-center bg-red-100 border border-[#FCD200] shadow-md">
                  <button
                    className="p-1 lg:px-5 xs:px-3 bg-[#fdac41] transition-all  hover:scale-[1.04]  hover:bg-yellow-400 "
                    onClick={() => addToCart(product)}
                  >
                    Add
                  </button>
                </div>
              ) : (
                <div className="flex lg:text-base xs:mt-2 xs:text-[8px] items-center w-max justify-center bg-red-100 border border-[#FCD200] shadow-md">
                  <button
                    className="p-1 xs:px-2 lg:px-3 bg-[#fdac41] transition  hover:bg-[#fdac41d4] "
                    onClick={() => decreaseCart(product)}
                  >
                    -
                  </button>
                  <div className="p-1 xs:px-2 lg:px-3 bg-[#fdac414c]  cursor-default">
                    {cart.cartQuantity}
                  </div>

                  <button
                    className="p-1 xs:px-2 lg:px-3 bg-[#fdac41] transition  hover:bg-[#fdac41d4]"
                    onClick={() => increaseCart(product)}
                  >
                    +
                  </button>
                </div>
              )}
              {/* )} */}
            </div>
          </div>
        </div>
      )}
      {!griddy && (
        <div className="rounded-md border-[#f1f1f1] ">
          <div className="grid justify-center grid-cols-5 gap-5 ">
            <div className="flex items-center lg:col-span-1 xs:col-span-2 justify-center rounded-md bg-[#f1f1f1] mb-3">
              <Link to={`/product-details/${id}`}>
                <img
                  className="object-contain w-44 h-44 mix-blend-darken"
                  src={imageURL}
                  alt={name}
                />
              </Link>
            </div>
            <div className="lg:p-5 xs:p-2 lg:col-span-4 xs:col-span-3 ">
              <div className="font-semibold lg:text-lg xs:text-sm">{name}</div>
              <div className=" lg:leading-normal xs:leading-[14px] lg:text-base xs:text-xs lg:mt-[-8px] xs:mt-0">
                {desc}
              </div>
              <div className="mt-1 lg:text-sm xs:text-[11px]">{sellerName}</div>
              <div className="font-semibold lg:text-2xl xs:text-base ">
                <small className="relative text-xs align-top top-1">₹</small>
                {price}
              </div>
              <div className="mt-2 lg:text-xs lg:leading-normal xs:leading-3 xs:text-[10px] text-[#007600] font-medium">
                In stock
              </div>
              <div className="lg:text-xs lg:leading-normal xs:leading-3 xs:text-[10px] text-[#565959] font-medium">
                Sold by
                <span className="text-[#007185]"> {"sellerCompany"}</span>
              </div>
              <div className="lg:text-xs lg:leading-normal xs:leading-3 xs:text-[10px] text-[#565959] font-medium">
                Gift options available.
                <span className="text-[#007185]"> Learn more</span>
              </div>
              <div className="mt-2 ">
                {isCartAdded < 0 ? (
                  <div className="flex  items-center w-max justify-center bg-red-100 border border-[#FCD200] shadow-md">
                    <button
                      className="p-1 px-5 bg-[#fdac41] transition-all  hover:scale-[1.04]  hover:bg-yellow-400 "
                      onClick={() => addToCart(product)}
                    >
                      Add
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center w-max justify-center bg-red-100 border border-[#FCD200] shadow-md">
                    <button
                      className="p-1 px-3 bg-[#fdac41] transition  hover:bg-[#fdac41d4] "
                      onClick={() => decreaseCart(product)}
                    >
                      -
                    </button>
                    <div className="p-1 px-3 bg-[#fdac414c]  cursor-default">
                      {cart.cartQuantity}
                    </div>

                    <button
                      className="p-1 px-3 bg-[#fdac41] transition  hover:bg-[#fdac41d4]"
                      onClick={() => increaseCart(product)}
                    >
                      +
                    </button>
                  </div>
                )}
                {/* )} */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductItem;
