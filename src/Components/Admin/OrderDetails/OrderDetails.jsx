import Loader from "../../../Components/Loader";
import useFetchDocument from "../../../customHooks/useFetchDocument";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ChangeOrderStatus from "../ChangeOrderStatus/ChangeOrderStatus";

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const { id } = useParams();
  const { document } = useFetchDocument("orders", id);

  useEffect(() => {
    setOrder(document);
  }, [document]);

  // return (
  //   <div className="bg-blue-300">
  //     <h2>Order Details </h2>
  //     <div>
  //       <Link to="/admin/orders">&larr; Back to Orders</Link>
  //     </div>
  //     <br></br>

  //     {order === null ? (
  //       <>
  //         <Loader />
  //       </>
  //     ) : (
  //       <div className="bg-orange-400">
  //         <p>
  //           <b>Order ID</b>
  //           {order.id}
  //         </p>
  //         <p>
  //           <b>Order Amount</b>
  //           {order.orderAmount}
  //         </p>
  //         <p>
  //           <b>Order Status</b>
  //           {order.orderStatus}
  //         </p>
  //         <p>
  //           <b>Shipping Address</b>
  //           <br></br>
  //           Address {order.shippingAddress.line1},{order.shippingAddress.line2},
  //           {order.shippingAddress.city},{order.shippingAddress.State}
  //           <br></br>
  //           Country : {order.shippingAddress.country}
  //         </p>
  //         <br></br>

  //         <div className="flex">
  //           <p>s/n</p>
  //           <p>Product</p>
  //           <p>Price</p>
  //           <p>Quantity</p>
  //           <p>Total</p>
  //         </div>

  //         <div>
  //           {order.cartItems.map((cart, index) => {
  //             const { id, name, price, imageURL, cartQuantity } = cart;

  //             return (
  //               <div key={id} className="flex">
  //                 <div>{index + 1}</div>
  //                 <div>
  //                   <b>{name}</b>
  //                   <img className="w-20" src={imageURL} alt="" />
  //                 </div>
  //                 <div>{price}</div>
  //                 <div>{cartQuantity}</div>
  //                 <div>{(price * cartQuantity).toFixed(2)}</div>
  //               </div>
  //             );
  //           })}
  //         </div>
  //       </div>
  //     )}
  //     <ChangeOrderStatus order={order} id={id} />
  //   </div>
  // );
  // return (
  //   <div className="bg-blue-300">
  //     <h2>Order Details</h2>
  //     <div>
  //       <Link to="/admin/orders">&larr; Back to Orders</Link>
  //     </div>
  //     <br />
  //     {order === null ? (
  //       <>
  //         <Loader />
  //       </>
  //     ) : (
  //       <div className="bg-orange-400">
  //         <p>
  //           <b>Order ID:</b> {order.id}
  //         </p>
  //         <p>
  //           <b>Order Amount:</b> {order.orderAmount}
  //         </p>
  //         <p>
  //           <b>Order Status:</b> {order.orderStatus}
  //         </p>
  //         <p>
  //           <b>Shipping Address:</b>
  //           <br />
  //           Address: {order.shippingAddress.line1},{order.shippingAddress.line2}
  //           ,{order.shippingAddress.city},{order.shippingAddress.State}
  //           <br />
  //           Country: {order.shippingAddress.country}
  //         </p>
  //         <br />
  //         <div className="flex">
  //           <p className="flex-1">S/N</p>
  //           <p className="flex-">Name</p>
  //           <p className="flex-">Product</p>
  //           <p className="flex-1">Price</p>
  //           <p className="flex-1">Quantity</p>
  //           <p className="flex-1">Total</p>
  //         </div>

  //         <div>
  //           {order.cartItems.map((cart, index) => {
  //             const { id, name, price, imageURL, cartQuantity } = cart;

  //             return (
  //               <div key={id} className="flex items-center">
  //                 <p className="flex-1 text-gray-800">{index + 1}</p>
  //                 <div className="items-center flex-3">
  //                   <b className="text-gray-800">{name}</b>
  //                 </div>
  //                 <img className="w-20 ml-2" src={imageURL} alt={name} />
  //                 <p className="flex-1 text-gray-800">{price}</p>
  //                 <p className="flex-1 text-gray-800">{cartQuantity}</p>
  //                 <p className="flex-1 text-gray-800">
  //                   {(price * cartQuantity).toFixed(2)}
  //                 </p>
  //               </div>
  //             );
  //           })}
  //         </div>
  //       </div>
  //     )}
  //     <ChangeOrderStatus order={order} id={id} />
  //   </div>
  // );
  // return (
  //   <div className="min-h-screen p-4 bg-gray-100">
  //     <h2 className="mb-4 text-2xl font-bold text-gray-800">Order Details</h2>
  //     <div>
  //       <Link to="/admin/orders" className="text-blue-500">
  //         &larr; Back to Orders
  //       </Link>
  //     </div>
  //     <br />
  //     {order === null ? (
  //       <Loader />
  //     ) : (
  //       <div className="p-6 bg-white rounded shadow-md">
  //         <p className="mb-2">
  //           <b className="text-gray-700">Order ID: </b>
  //           <span className="text-gray-900">{order.id}</span>
  //         </p>
  //         <p className="mb-2">
  //           <b className="text-gray-700">Order Amount: </b>
  //           <span className="text-gray-900">
  //             ${order.orderAmount.toFixed(2)}
  //           </span>
  //         </p>
  //         <p className="mb-4">
  //           <b className="text-gray-700">Order Status: </b>
  //           <span
  //             className={`text-white px-2 py-1 ${
  //               order.orderStatus !== "Delivered"
  //                 ? "bg-red-900"
  //                 : "bg-green-500"
  //             }`}
  //           >
  //             {order.orderStatus}
  //           </span>
  //         </p>
  //         <p className="mb-4">
  //           <b className="text-gray-700">Shipping Address: </b>
  //           <br />
  //           <span className="text-gray-900">
  //             Address: {order.shippingAddress.line1},{" "}
  //             {order.shippingAddress.line2}, {order.shippingAddress.city},{" "}
  //             {order.shippingAddress.state}
  //             <br />
  //             Country: {order.shippingAddress.country}
  //           </span>
  //         </p>
  //         <br />

  //         <div className="grid grid-cols-5 gap-4 mb-4 font-bold text-gray-700">
  //           <p className="border-b">S/N</p>
  //           <p className="border-b">Name</p>
  //           <p className="border-b">Price</p>
  //           <p className="border-b">Quantity</p>
  //           <p className="border-b">Total</p>
  //         </div>

  //         <div>
  //           {order.cartItems.map((cart, index) => {
  //             const { id, name, price, cartQuantity } = cart;

  //             return (
  //               <div
  //                 key={id}
  //                 className="grid items-center grid-cols-5 gap-4 mb-2 text-gray-800 border-b"
  //               >
  //                 <div>{index + 1}</div>
  //                 <div>{name}</div>
  //                 <div>${price.toFixed(2)}</div>
  //                 <div>{cartQuantity}</div>
  //                 <div>${(price * cartQuantity).toFixed(2)}</div>
  //               </div>
  //             );
  //           })}
  //         </div>
  //       </div>
  //     )}
  //     <ChangeOrderStatus order={order} id={id} />
  //   </div>
  // );

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h2 className="font-bold text-gray-800 xs:mb-1 lg:mb-4 xs:text-sm lg:text-2xl">
        Order Details
      </h2>
      <div>
        <Link
          to="/admin/orders"
          className="text-blue-500 lg:text-base xs:text-xs"
        >
          &larr; Back to Orders
        </Link>
      </div>
      <br />
      {order === null ? (
        <Loader />
      ) : (
        <div className="p-6 bg-white rounded shadow-md lg:text-base xs:text-xs">
          <p className="mb-2">
            <b className="text-gray-700">Order ID: </b>
            <span className="text-gray-900">{order.id}</span>
          </p>
          <p className="mb-2">
            <b className="text-gray-700">Order Amount: </b>
            <span className="text-gray-900">
              ${order.orderAmount.toFixed(2)}
            </span>
          </p>
          <p className="mb-4">
            <b className="text-gray-700">Order Status: </b>
            <span
              className={`text-white px-2 py-1 ${
                order.orderStatus !== "Delivered"
                  ? "bg-red-900"
                  : "bg-green-500"
              }`}
            >
              {order.orderStatus}
            </span>
          </p>
          <p className="mb-4">
            <b className="text-gray-700">Shipping Address: </b>
            <br />
            <span className="text-gray-900">
              Address: {order.shippingAddress.line1},{" "}
              {order.shippingAddress.line2}, {order.shippingAddress.city},{" "}
              {order.shippingAddress.state}
              <br />
              Country: {order.shippingAddress.country}
            </span>
          </p>
          <br />

          <div className="grid gap-4 mb-4 font-bold text-gray-700 xs:grid-cols-4 lg:grid-cols-5">
            <p className="border-b">S/N</p>
            <p className="border-b">Name</p>
            <p className="border-b">Price</p>
            <p className="border-b lg:flex xs:hidden">Quantity</p>
            <p className="border-b">Total</p>
          </div>

          <div className="overflow-y-auto max-h-64">
            {order.cartItems.map((cart, index) => {
              const { id, name, price, cartQuantity } = cart;

              return (
                <div
                  key={id}
                  className="grid items-center gap-4 mb-2 text-gray-800 border-b xs:grid-cols-4 lg:grid-cols-5"
                >
                  <div>{index + 1}</div>
                  <div>{name}</div>
                  <div>${price.toFixed(2)}</div>
                  <div className=" lg:flex xs:hidden">{cartQuantity}</div>
                  <div>${(price * cartQuantity).toFixed(2)}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <ChangeOrderStatus order={order} id={id} />
    </div>
  );
};

export default OrderDetails;
