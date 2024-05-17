import { useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "../../redux/slice/cartSlice";
import { Link } from "react-router-dom";

const CheckOutSummary = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

  return (
    // <div>
    //   <h3>CheckOutSummary</h3>
    //   <div>
    //     {cartItems.length === 0 ? (
    //       <>
    //         <p>No items in your cart</p>
    //         <button className="bg-pink-400"></button>
    //         <Link to="/#products">Back to Shop</Link>
    //       </>
    //     ) : (
    //       <div>
    //         <p>
    //           <b>{`Cart items(s): ${cartTotalQuantity}`}</b>
    //         </p>
    //         <div className="bg-blue-400">
    //           <h4>Subtotal : nnumber </h4>
    //           <h3>{cartTotalAmount.toFixed(2)}</h3>
    //         </div>
    //         {cartItems.map((item, index) => {
    //           const { id, name, price, cartQuantity } = item;
    //           return (
    //             <div key={index}>
    //               <h4>Product : {name}</h4>
    //               <p>Quantity : {cartQuantity}</p>
    //               <p>Unit Price : {price}</p>
    //               <p>Set Price : {cartQuantity * price}</p>
    //             </div>
    //           );
    //         })}
    //       </div>
    //     )}
    //   </div>
    // </div>
    // <div>
    //   <h3 className="text-gray-800">CheckOutSummary</h3>
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
    //       <div>
    //         <p className="text-gray-800">
    //           <b>{`Cart item(s): ${cartTotalQuantity}`}</b>
    //         </p>
    //         <div className="p-4 bg-gray-300 rounded-lg">
    //           <h4 className="text-gray-800">Subtotal:</h4>
    //           <h3 className="text-gray-800">
    //             ₹{`${cartTotalAmount.toFixed(2)}`}
    //           </h3>
    //         </div>
    //         {cartItems.map((item, index) => {
    //           const { id, name, price, cartQuantity } = item;
    //           return (
    //             <div key={index} className="p-4 mt-4 bg-gray-200 rounded-lg">
    //               <h4 className="text-gray-800">Product: {name}</h4>
    //               <p className="text-gray-800">Quantity: {cartQuantity}</p>
    //               <p className="text-gray-800">Unit Price: {price}</p>
    //               <p className="text-gray-800">
    //                 Set Price: {cartQuantity * price}
    //               </p>
    //             </div>
    //           );
    //         })}
    //       </div>
    //     )}
    //   </div>
    // </div>
    <div className="p-4 bg-gray-200 h-max rounded-xl">
      <div className="mb-2 font-bold text-gray-800 xs:text-sm lg:text-xl">
        CheckOutSummary
      </div>
      <div>
        {cartItems.length === 0 ? (
          <>
            <p className="text-gray-800">No items in your cart</p>
            <div className="flex gap-2">
              <button className="px-4 py-2 text-gray-800 bg-gray-300 rounded-lg">
                Checkout
              </button>
              <Link to="/#products" className="text-gray-800">
                Back to Shop
              </Link>
            </div>
          </>
        ) : (
          <div className=" xs:text-sm lg:text-base">
            <p className="text-gray-800">
              Cart item(s): <b>{`${cartTotalQuantity}`}</b>
            </p>
            <p className="text-gray-800">
              Subtotal : <b>{cartTotalAmount.toFixed(2)}</b>
            </p>
            {cartItems.map((item, index) => {
              const { id, name, price, cartQuantity } = item;
              return (
                <div key={index} className="p-4 mt-3 bg-white rounded-xl">
                  <h4 className="text-gray-800">
                    Product : <b>{name}</b>
                  </h4>
                  <p className="text-gray-800">
                    Quantity : <b>{cartQuantity}</b>
                  </p>
                  <p className="text-gray-800">
                    Unit Price : <b>{price}</b>
                  </p>
                  <p className="text-gray-800">
                    Set Price : <b>{cartQuantity * price}</b>
                  </p>

                  {/* <div className="grid justify-between grid-cols-2 my-2 text-base ">
                    <div className="">Product : </div>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckOutSummary;
