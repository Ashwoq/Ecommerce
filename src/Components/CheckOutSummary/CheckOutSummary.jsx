import { useDispatch, useSelector } from "react-redux";
import {
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "../../redux/slice/cartSlice";
import { Link } from "react-router-dom";
import { Divider } from "@mui/material";
import { useEffect } from "react";

const CheckOutSummary = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY());
    dispatch(CALCULATE_SUBTOTAL());
  }, [dispatch, cartItems]);

  return (
    // <div className="p-4 bg-gray-200 h-max rounded-xl">
    //   <div className="mb-2 font-bold text-gray-800 xs:text-sm lg:text-xl">
    //     CheckOutSummary
    //   </div>
    //   <div>
    //     {cartItems.length === 0 ? (
    //       <>
    //         <p className="text-gray-800">No items in your cart</p>
    //         <div className="flex gap-2">
    //           <button className="px-4 py-2 text-gray-800 bg-gray-300 rounded-lg">
    //             Checkout
    //           </button>
    //           <Link to="/#products" className="text-gray-800">
    //             Back to Shop
    //           </Link>
    //         </div>
    //       </>
    //     ) : (
    //       <div className=" xs:text-sm lg:text-base">
    //         <p className="text-gray-800">
    //           Cart item(s): <b>{`${cartTotalQuantity}`}</b>
    //         </p>
    //         <p className="text-gray-800">
    //           Subtotal : <b>{cartTotalAmount.toFixed(2)}</b>
    //         </p>
    //         {cartItems.map((item, index) => {
    //           const { id, name, price, cartQuantity } = item;
    //           return (
    //             <div key={index} className="p-4 mt-3 bg-white rounded-xl">
    //               <h4 className="text-gray-800">
    //                 Product : <b>{name}</b>
    //               </h4>
    //               <p className="text-gray-800">
    //                 Quantity : <b>{cartQuantity}</b>
    //               </p>
    //               <p className="text-gray-800">
    //                 Unit Price : <b>{price}</b>
    //               </p>
    //               <p className="text-gray-800">
    //                 Set Price : <b>{cartQuantity * price}</b>
    //               </p>

    //               {/* <div className="grid justify-between grid-cols-2 my-2 text-base ">
    //                 <div className="">Product : </div>
    //                 <strong className="text-right">{name}</strong>
    //                 <div>Quantity : </div>
    //                 <strong className="text-right">{cartQuantity}</strong>
    //                 <div>Unit Price : </div>
    //                 <strong className="text-right">{price}</strong>
    //                 <div>Set Price :</div>
    //                 <strong className="text-right">
    //                   {cartQuantity * price}
    //                 </strong>
    //               </div> */}
    //             </div>
    //           );
    //         })}
    //       </div>
    //     )}
    //   </div>
    // </div>
    <div className="w-full p-4 h-max rounded-xl">
      <div className="mb-4 font-bold text-right text-gray-800 xs:text-sm lg:text-2xl">
        {cartItems.length === 0 ? "Cart Summary" : "Order Summary"}
      </div>
      <div className="p-4 bg-gray-200 rounded-lg shadow-md">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-5 cursor-default h-max">
            <div className="p-2 px-4 text-gray-800 bg-white shadow rounded-xl">
              Your cart is currently empty
            </div>
            <div className="p-2 px-4 text-white transition-transform bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl hover:scale-105">
              <Link to="/#products">Continue Shopping</Link>
            </div>
          </div>
        ) : (
          <div className="xs:text-sm lg:text-base">
            <div className="text-right ">
              {/* <div> */}
              <b>{cartTotalQuantity} items</b> in your bag
            </div>
            {/* <div>
                Subtotal : <b>{cartTotalAmount.toFixed(2)}</b>
              </div> */}
            {/* </div> */}
            <div className="my-4 mb-6 ">
              <Divider />
            </div>
            {cartItems.map((item, index) => {
              const { id, name, price, cartQuantity, imageURL } = item;
              return (
                <div
                  key={index}
                  className="grid items-center justify-center grid-cols-2 grid-rows-2 p-1 mb-4 text-base bg-white shadow-xl rounded-xl"
                >
                  <div className="row-span-2 py-2 w-[90%] bg-gray-200 rounded-xl ">
                    <img
                      src={imageURL}
                      alt={name}
                      className="object-contain w-32 h-32 mx-auto mix-blend-darken"
                    />
                  </div>
                  <div className="mt-3 mr-3 ">
                    <div className="">
                      <b>{name}</b>
                    </div>
                    <div className="text-lg ">
                      <b className=""> ₹{price}</b>
                    </div>
                  </div>

                  <div className="mb-3 mr-3 text-sm text-gray-500 ">
                    <div className="flex justify-between">
                      Qty
                      <div className="font-bold text-right text-black">
                        {cartQuantity}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      Total Price
                      <div className="font-bold text-right text-black">
                        {cartQuantity * price}
                      </div>
                    </div>
                  </div>
                  {/* <div className="grid justify-between grid-cols-2 my-2 text-base ">
                    <div className="">Product &#x2022; </div>
                    <strong className="text-right">{name}</strong>
                    <div>Quantity : </div>
                    <strong className="text-right">{cartQuantity}</strong>
                    <div>Unit Price : </div>
                    <strong className="text-right">{price}</strong>
                    <div>Set Price :</div>
                    <strong className="text-right">
                      {cartQuantity * price}
                    </strong>
                  </div> */}
                </div>
              );
            })}
            <div className="grid grid-cols-2 gap-1 mx-2 mt-7 ">
              <div>Cart Subtotal</div>
              <b className="text-right">₹ {cartTotalAmount}</b>
              <div>Shippping & Handling</div>
              <b className="text-right">₹ 0</b>
              <div className="text-lg font-bold">Cart Total</div>
              <b className="text-lg text-right">
                ₹{cartTotalAmount.toFixed(2)}
              </b>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckOutSummary;
