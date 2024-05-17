import Loader from "../../Components/Loader";
import useFetchDocument from "../../customHooks/useFetchDocument";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const { id } = useParams();
  const { document } = useFetchDocument("orders", id);

  useEffect(() => {
    setOrder(document);
  }, [document]);

  return (
    // <div className="bg-blue-300">
    //   <h2>Order Details</h2>
    //   <div>
    //     <Link to="/order-history">&larr; Back to Orders</Link>
    //   </div>
    //   <br></br>

    //   {order === null ? (
    //     <>
    //       <Loader />
    //     </>
    //   ) : (
    //     <div className="bg-orange-400">
    //       <p>
    //         <b>Order ID</b>
    //         {order.id}
    //       </p>
    //       <p>
    //         <b>Order Amount</b>
    //         {order.orderAmount}
    //       </p>
    //       <p>
    //         <b>Order Status</b>
    //         {order.orderStatus}
    //       </p>
    //       <br></br>

    //       <div>
    //         <p>s/n</p>
    //         <p>Product</p>
    //         <p>Price</p>
    //         <p>Quantity</p>
    //         <p>Total</p>
    //         <p>Action</p>
    //       </div>

    //       <div>
    //         {order.cartItems.map((cart, index) => {
    //           const { id, name, price, imageURL, cartQuantity } = cart;

    //           return (
    //             <div key={id}>
    //               <div>{index + 1}</div>
    //               <div>
    //                 <b>{name}</b>
    //                 <img src={imageURL} alt="" />
    //               </div>
    //               <div>{price}</div>
    //               <div>{cartQuantity}</div>
    //               <div>{(price * cartQuantity).toFixed(2)}</div>

    //               <div>
    //                 <Link to={`/review-product/${id}`}> Review Product</Link>{" "}
    //               </div>
    //             </div>
    //           );
    //         })}
    //       </div>
    //     </div>
    //   )}
    // </div>
    <div className="min-h-screen bg-gray-100 cursor-default">
      <div className="max-w-5xl mx-auto xs:p-4 lg:p-8">
        <h2 className="font-semibold xs:mb-2 lg:mb-4 lg:text-3xl">
          Order Details
        </h2>
        <div className=" xs:mb-2 lg:mb-4 xs:text-[11px] lg:text-base">
          <Link to="/order-history" className="text-blue-600 hover:underline">
            &larr; Back to Orders
          </Link>
        </div>

        {order === null ? (
          <Loader />
        ) : (
          <div className="bg-white rounded-lg shadow-md xs:p-2 lg:p-6">
            <div className="flex justify-between xs:mb-4 lg:mb-12">
              <div className="mt-auto font-semibold bg-gray-200 rounded-md lg:p-2 lg:px-3 xs:p-1 xs:text-[10px] lg:text-xl h-max">
                Order Items
              </div>

              <div className="bg-gray-200 rounded-md lg:text-base xs:text-[10px] lg:p-3 xs:p-1 w-fit">
                <p>
                  <span className="">Order ID:</span> <b>{order.id}</b>
                </p>
                <p>
                  <span className="">Order Amount:</span> ₹
                  <b>{order.orderAmount}</b>
                </p>
                <p>
                  <span className="">Order Status:</span>{" "}
                  <b>{order.orderStatus}</b>
                </p>
              </div>
            </div>

            <div className="xs:mb-2 lg:mb-6">
              <div className="grid xs:grid-cols-6 lg:grid-cols-12 gap-4 font-medium text-center lg:text-sm xs:text-[10px]">
                <div className="">Index No</div>
                <div className="lg:col-span-2">Product</div>
                <div className="col-span-3 lg:block xs:hidden">Image</div>
                <div className="">Price</div>
                <div>Quantity</div>
                <div className="lg:col-span-2">Total</div>
                <div className="lg:col-span-2">Action</div>
              </div>
              {order.cartItems.map((cart, index) => {
                const { id, name, price, imageURL, cartQuantity } = cart;

                return (
                  <div
                    key={id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    } grid lg:grid-cols-12 xs:grid-cols-6 gap-4 pt-4 border-t items-center justify-center text-center lg:text-base xs:text-[9.5px]`}
                  >
                    <div className="text-center">{index + 1}</div>
                    <div className="flex items-center justify-center space-x-2 lg:col-span-2 xs:col-span-1">
                      <div>{name}</div>
                    </div>
                    <div className="items-center justify-center space-x-2 lg:flex lg:col-span-3 xs:hidden">
                      <img
                        src={imageURL}
                        alt=""
                        // className="object-contain w-full h-48 rounded-lg"
                        className="h-[180px]
                        object-cover mix-blend-darken"
                      />
                    </div>
                    <div className="">₹{price}</div>
                    <div className="text-center">{cartQuantity}</div>
                    <div className="lg:col-span-2">
                      ₹{(price * cartQuantity).toFixed(2)}
                    </div>
                    <div className="lg:col-span-2  w-max text-center p-1 lg:px-2 xs:p-1 lg:scale-100 xs:scale-95 mr-1 ml-[-5px] text-white transition-all rounded-md bluegradient hover:scale-105">
                      <div className="lg:flex xs:hidden">
                        <Link to={`/review-product/${id}`}>Review Product</Link>
                      </div>
                      <div className="lg:hidden xs:flex">
                        <Link to={`/review-product/${id}`}>Review</Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
