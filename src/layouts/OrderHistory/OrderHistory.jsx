import { useEffect } from "react";
import useFetchCollection from "../../customHooks/useFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import {
  STORE_ORDER,
  selectOrderHistoryData,
} from "../../redux/slice/orderSlice";
import { selectUserID } from "../../redux/slice/authSlice";
import { Link, useNavigate } from "react-router-dom";
import "../../Global.css";
import { Divider } from "@mui/material";
import Loader from "../../Components/Loader";

const OrderHistory = () => {
  const location = useNavigate();
  const { data, isLoading } = useFetchCollection("orders");
  const orders = useSelector(selectOrderHistoryData);
  // const orders = initialState.orderHistoryData;
  // console.log(initialState);
  const userID = useSelector(selectUserID);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(STORE_ORDER(data));
  }, [dispatch, data]);

  const handleClick = (id) => {
    location(`/order-details/${id}`);
  };

  const filteredOrder = orders.filter((order) => order.userID === userID);

  // console.log(filteredOrder);

  // const orders = [
  //   {
  //     id: "001",
  //     date: "2023-05-16",
  //     total: "$120.00",
  //     status: "Delivered",
  //     quantity: 3,
  //     shippingAddress: "123 Main St, Springfield, IL, 62704",
  //     paymentMethod: "Credit Card",
  //     actions: ["View", "Track", "Repeat"],
  //   },
  //   {
  //     id: "002",
  //     date: "2023-05-12",
  //     total: "$80.00",
  //     status: "Processing",
  //     quantity: 2,
  //     shippingAddress: "456 Elm St, Springfield, IL, 62704",
  //     paymentMethod: "PayPal",
  //     actions: ["View", "Cancel"],
  //   },
  //   // Add more orders as needed
  // ];
  // const statusPoints = ["Order Placed", "Processing", "Shipping", "Delivered"];
  const statusPoints = [
    "Order Placed...",
    "Processing...",
    "Shipped...",
    "Delivered",
  ];

  const formatDate = (timestamp) => {
    if (!timestamp || !timestamp.seconds) return "N/A";
    const date = new Date(
      timestamp.seconds * 1000 + (timestamp.nanoseconds || 0) / 1000000
    );
    return date.toLocaleString();
  };

  return (
    <div>
      {isLoading && <Loader />}
      {filteredOrder.length === 0 ? (
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-md xs:mb-4 lg:mb-6 xs:p-2 lg:p-6">
          <h1 className="font-semibold text-gray-800 lg:text-2xl">
            No Order Found
          </h1>
        </div>
      ) : (
        <div className="flex flex-col items-center min-h-screen p-6 bg-gray-100 cursor-default">
          <div className="w-full max-w-3xl bg-white rounded-lg shadow-md xs:mb-4 lg:mb-6 xs:p-2 lg:p-6">
            <h1 className="font-semibold text-gray-800 lg:text-2xl">
              Order History
            </h1>
          </div>
          <div className="w-full max-w-3xl space-y-4">
            {filteredOrder.map((order, index) => {
              const {
                id,
                orderDate,
                orderTime,
                orderAmount,
                orderStatus,
                created,
                editedAt,
              } = order;
              return (
                // <div
                //   key={id}
                //   className="flex p-6 space-y-4 bg-white rounded-lg shadow-md"
                // >
                //   <div className="flex items-center bg-yellow-300">
                //     {statusPoints.map((point, index) => {
                //       const isActive = point === orderStatus;
                //       return (
                //         <div key={point} className="flex items-center">
                //           <div
                //             className={`w-5 h-5 rounded-full ${
                //               isActive ? "bg-green-500" : "bg-gray-300"
                //             }`}
                //           ></div>

                //           {index < statusPoints.length - 1 && (
                //             <div
                //               className={`h-1 w-20 ${
                //                 isActive ? "bg-green-500" : "bg-gray-300"
                //               }`}
                //             ></div>
                //           )}
                //           <div className={`${isActive ? "flex" : "hidden"}`}>
                //             {orderStatus}
                //           </div>
                //         </div>
                //       );
                //     })}
                //   </div>
                //   <div className="flex items-center justify-between bg-red-300">
                //     <div className="w-full bg-green-200">
                //       <div className="bg-pink-400">{index + 1}</div>
                //       <div className="bg-pink-400">
                //         {orderDate} at {orderTime}
                //       </div>
                //       <div className="bg-pink-400">{id}</div>
                //       <div className="bg-pink-400">
                //         {"$"}
                //         {orderAmount}
                //       </div>
                //       <div
                //         className={
                //           orderStatus !== "Delivered"
                //             ? "bg-red-900"
                //             : "bg-green-500"
                //         }
                //       >
                //         {orderStatus}
                //       </div>
                //       <div onClick={() => handleClick(id)}>Write a Review</div>
                //     </div>
                //   </div>
                // </div>
                <div key={id} className="bg-white rounded-xl lg:pb-0 xs:pb-1">
                  <div className="flex justify-center w-full p-4 px-3 bg-white rounded-lg shadow-md xs:space-x-1 lg:space-x-5">
                    <div className="flex bg-gray-200 xs:p-1 lg:p-3 rounded-xl">
                      <div className="flex flex-col ">
                        {statusPoints.map((point, index) => {
                          // const isAcative = point === orderStatus;
                          return (
                            <div
                              key={point}
                              className="flex flex-col items-center "
                            >
                              {index < statusPoints.length && (
                                <div
                                  className={`lg:w-5 lg:h-5 xs:w-3 xs:h-3 rounded-full ${
                                    statusPoints.indexOf(orderStatus) >= index
                                      ? "bg-green-500"
                                      : "bg-gray-400"
                                  }`}
                                ></div>
                              )}

                              {index < statusPoints.length - 1 && (
                                <>
                                  <div
                                    className={`xs:w-[2px] lg:w-1 h-10 ${
                                      statusPoints.indexOf(orderStatus) > index
                                        ? "bg-green-500"
                                        : "bg-gray-400"
                                    }`}
                                  ></div>
                                </>
                              )}
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex flex-col ml-1 ">
                        {statusPoints.map((point, index) => {
                          const isActive = point === orderStatus;
                          return (
                            <div
                              key={index}
                              className="text-center xs:h-max lg:h-[3.7rem] "
                            >
                              <div
                                className={`${
                                  isActive
                                    ? " bg-green-300 rounded-xl xs:p-[4px] lg:p-1 lg:text-base w-max xs:text-[9px] "
                                    : " bg-blue-300  opacity-0"
                                }`}
                              >
                                {point}
                                <div
                                  className={`${
                                    point === "Order Placed..."
                                      ? " bg-green-300 rounded-xl xs:text-[8px] lg:text-[10px] xs:p-[2px] lg:p-1 "
                                      : " bg-blue-300 hidden"
                                  }`}
                                >
                                  {orderDate}
                                </div>
                                <div
                                  className={`${
                                    point !== "Order Placed..."
                                      ? " bg-green-300 rounded-xl xs:text-[8px] lg:text-[10px] xs:p-[2px] lg:p-1 "
                                      : " bg-blue-300 hidden"
                                  }`}
                                >
                                  {formatDate(editedAt)}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="aqua-300">
                      <Divider orientation="vertical" />
                    </div>
                    <div className="flex flex-col lg:text-base xs:text-[10px] xs:p-2 lg:p-4 rounded-xl xs:w-[90%] lg:w-[50%] gap-2 bg-gray-200">
                      {/* <div className="w-full bg-yellow-200"> */}
                      {/* <div>{index + 1}</div> */}
                      <div>Order Date : {orderTime}</div>
                      <div>Ref ID : {id}</div>
                      <div>
                        Amount Payed : {"₹ "}
                        {orderAmount}
                      </div>
                      <div>Payment Method : Card </div>
                      <div className="flex">
                        Order Status : &nbsp;
                        <div
                          className={`
                        ${
                          orderStatus !== "Delivered"
                            ? "bg-red-500"
                            : "bg-green-500"
                        } font-bold p-1 text-white mt-[-4px] lg:px-3 xs:px-2 rounded-xl
                      `}
                        >
                          {orderStatus}
                        </div>
                      </div>

                      {/* </div> */}
                    </div>
                    <div className="lg:flex xs:hidden flex-col justify-start gap-5 lg:text-sm xs:text-[10px] bg-gray-200 xs:p-1 lg:p-3 rounded-xl ">
                      <button
                        onClick={() => handleClick(id)}
                        className="p-1 px-2  text-white transition-all rounded-md hover:scale-[1.03] bluegradient "
                      >
                        Rating ?
                      </button>
                      <button className="p-1 px-2  text-white transition-all rounded-md hover:scale-[1.03] greengradient ">
                        <Link to="/#products">Shopping ?</Link>
                      </button>
                      <button className="p-1 px-2 text-white  transition-all rounded-md hover:scale-[1.03] bg-red-500 ">
                        <Link to="/contact"> Contact US</Link>
                      </button>
                    </div>
                  </div>
                  <div className="xs:flex mt-3 mb-1  lg:hidden justify-center gap-5 lg:text-sm xs:text-[10px]  xs:p-1 lg:p-3 rounded-xl ">
                    <button
                      onClick={() => handleClick(id)}
                      className="p-1 px-2  text-white transition-all rounded-md hover:scale-[1.03] bluegradient "
                    >
                      Rating ?
                    </button>
                    <button className="p-1 px-2 text-white transition-all rounded-md hover:scale-[1.03] greengradient ">
                      <Link to="/#products">Shopping ?</Link>
                    </button>
                    <button className="p-1 px-2 text-white  transition-all rounded-md hover:scale-[1.03] bg-red-500 ">
                      <Link to="/contact"> Contact US</Link>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>

    // <div className="flex flex-col items-center min-h-screen p-6 bg-gray-100">
    //   <header className="w-full max-w-3xl p-6 mb-6 bg-white rounded-lg shadow-md">
    //     <h1 className="text-2xl font-semibold text-gray-800">Order History</h1>
    //   </header>
    //   <div className="w-full max-w-3xl space-y-4">
    //     {orders.map((order) => (
    //       <div
    //         key={order.id}
    //         className="p-6 space-y-4 bg-white rounded-lg shadow-md"
    //       >
    //         {/* Horizontal Progress Bar */}
    //         <div className="flex items-center space-x-4">
    //           {statusPoints.map((point, index) => {
    //             const isActive = statusPoints.indexOf(order.status) >= index;
    //             return (
    //               <div key={point} className="flex items-center">
    //                 <div
    //                   className={`w-4 h-4 rounded-full ${
    //                     isActive ? "bg-green-500" : "bg-gray-300"
    //                   }`}
    //                 ></div>
    //                 {index < statusPoints.length - 1 && (
    //                   <div
    //                     className={`h-1 w-12 ${
    //                       isActive ? "bg-green-500" : "bg-gray-300"
    //                     }`}
    //                   ></div>
    //                 )}
    //               </div>
    //             );
    //           })}
    //         </div>

    //         {/* Order Details */}
    //         <div className="flex items-center justify-between">
    //           <div>
    //             <div className="text-lg font-semibold text-gray-800">
    //               Order #{order.id}
    //             </div>
    //             <div className="text-gray-600">Date: {order.date}</div>
    //             <div className="text-gray-600">Total: {order.total}</div>
    //             <div className="text-gray-600">Quantity: {order.quantity}</div>
    //             <div className="text-gray-600">
    //               Shipping: {order.shippingAddress.split(",")[0]}
    //             </div>
    //             <div className="text-gray-600">
    //               Payment: {order.paymentMethod}
    //             </div>
    //             <div
    //               className={`text-sm mt-1 font-medium ${
    //                 order.status === "Delivered"
    //                   ? "text-green-500"
    //                   : "text-yellow-500"
    //               }`}
    //             >
    //               Status: {order.status}
    //             </div>
    //           </div>

    //           {/* Action Buttons */}
    //           <div className="flex space-x-2">
    //             {order.actions.map((action) => (
    //               <button
    //                 key={action}
    //                 className="px-4 py-2 text-sm font-medium text-white transition duration-200 bg-blue-500 rounded-md hover:bg-blue-600"
    //               >
    //                 {action}
    //               </button>
    //             ))}
    //           </div>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
};

export default OrderHistory;
