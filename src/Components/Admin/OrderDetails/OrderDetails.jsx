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
          <div className="flex justify-between w-full mb-10">
            <div className="">
              <p className="mb-2">
                <b className="text-gray-700">Order ID: </b>
                <span className="text-gray-900">{order.id}</span>
              </p>
              <p className="mb-2">
                <b className="text-gray-700">Order Amount: </b>
                <span className="text-gray-900">
                  ₹{order.orderAmount.toFixed(2)}
                </span>
              </p>
              <p className="mb-4">
                <b className="text-gray-700">Order Status: </b>
                <span
                  className={`px-3 py-1 rounded ${
                    order.orderStatus === "Delivered"
                      ? " bg-green-400"
                      : order.orderStatus === "Shipped..."
                      ? "bg-red-300"
                      : order.orderStatus === "Processing..."
                      ? "bg-red-500 text-white"
                      : "text-white bg-red-800"
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
                  {order.shippingAddress.line2 &&
                    order.shippingAddress.line2 + ","}{" "}
                  {order.shippingAddress.city}, {order.shippingAddress.state}
                  <br />
                  Country: {order.shippingAddress.country}
                </span>
              </p>
            </div>
            <br />
            <div className="w-[35%]">
              <ChangeOrderStatus order={order} id={id} />
            </div>
          </div>
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
                  <div>₹{price.toFixed(2)}</div>
                  <div className=" lg:flex xs:hidden">{cartQuantity}</div>
                  <div>₹{(price * cartQuantity).toFixed(2)}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
