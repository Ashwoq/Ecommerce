// import useFetchCollection from "../../../customHooks/useFetchCollection";
// import { Loader } from "lucide-react";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { selectUserID } from "../../../redux/slice/authSlice";
// import {
//   STORE_ORDER,
//   selectOrderHistoryData,
// } from "../../../redux/slice/orderSlice";

// const Orders = () => {
//   const location = useNavigate();
//   const { data, isLoading } = useFetchCollection("orders");
//   const orders = useSelector(selectOrderHistoryData);

//   const userID = useSelector(selectUserID);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(STORE_ORDER(data));
//   }, [dispatch, data]);

//   const handleClick = (id) => {
//     location(`/admin/orders-details/${id}`);
//   };

//   // const filteredOrder = orders.filter((order) => order.userID === userID);
//   const filteredOrder = orders;
//   console.log(orders);

//   return (
//     <div className="flex flex-col items-center justify-center">
//       {isLoading && <Loader />}
//       {filteredOrder.length === 0 ? (
//         <div className="text-center text-gray-800">No orders found</div>
//       ) : (
//         <div className="w-full overflow-x-auto">
//           <table className="w-full table-auto lg:text-base xs:text-[9px]">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="px-2 py-2 xs:px-4 xs:py-2">#</th>
//                 <th className="px-2 py-2 xs:px-4 xs:py-2">Date & Time</th>
//                 <th className="px-2 py-2 xs:px-4 xs:py-2">Order ID</th>
//                 <th className="px-2 py-2 xs:px-4 xs:py-2">User Email</th>
//                 <th className="px-2 py-2 xs:px-4 xs:py-2">Order Amount</th>
//                 <th className="px-2 py-2 xs:px-4 xs:py-2">Order Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredOrder.map((order, index) => {
//                 const {
//                   id,
//                   orderDate,
//                   orderTime,
//                   orderAmount,
//                   orderStatus,
//                   userEmail,
//                 } = order;
//                 return (
//                   <tr
//                     key={id}
//                     onClick={() => handleClick(id)}
//                     className="transition-colors cursor-pointer hover:bg-gray-100"
//                   >
//                     <td className="px-2 py-2 border xs:px-4 xs:py-2">
//                       {index + 1}
//                     </td>
//                     <td className="px-2 py-2 border xs:px-4 xs:py-2">{`${orderDate} at ${orderTime}`}</td>
//                     <td className="px-2 py-2 border xs:px-4 xs:py-2">{id}</td>
//                     <td className="px-2 py-2 border xs:px-4 xs:py-2">
//                       {userEmail}
//                     </td>
//                     <td className="px-2 py-2 border xs:px-4 xs:py-2">{`₹${orderAmount}`}</td>
//                     <td
//                       className={`border px-2 py-2 xs:px-4 xs:py-2 ${
//                         orderStatus !== "Delivered"
//                           ? "text-red-900 bg-red-100"
//                           : "text-green-900 bg-green-100"
//                       }`}
//                     >
//                       {orderStatus}
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Orders;

import useFetchCollection from "../../../customHooks/useFetchCollection";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUserID } from "../../../redux/slice/authSlice";
import {
  STORE_ORDER,
  selectOrderHistoryData,
} from "../../../redux/slice/orderSlice";

const Orders = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useFetchCollection("orders");
  const orders = useSelector(selectOrderHistoryData);
  const userID = useSelector(selectUserID);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(STORE_ORDER(data));
  }, [dispatch, data]);

  const handleClick = (id) => {
    navigate(`/admin/orders-details/${id}`);
  };

  const filteredOrder = orders;

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Orders</h1>
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <Loader className="animate-spin" size={48} />
        </div>
      ) : filteredOrder.length === 0 ? (
        <div className="text-center text-gray-800">No orders found</div>
      ) : (
        <div className="w-full overflow-x-auto bg-white ">
          <table className="w-full text-sm table-auto lg:text-base">
            <thead className="text-gray-900 bg-gray-400">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Date & Time</th>
                <th className="px-4 py-2">Order ID</th>
                <th className="px-4 py-2">User Email</th>
                <th className="px-4 py-2">Order Amount</th>
                <th className="px-4 py-2">Order Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrder.map((order, index) => {
                const {
                  id,
                  orderDate,
                  orderTime,
                  orderAmount,
                  orderStatus,
                  userEmail,
                } = order;
                return (
                  <tr
                    key={id}
                    onClick={() => handleClick(id)}
                    className="transition-colors cursor-pointer hover:bg-gray-100"
                  >
                    <td className="px-4 py-2 border">{index + 1}</td>
                    <td className="px-4 py-2 border">{`${orderDate} at ${orderTime}`}</td>
                    <td className="px-4 py-2 border">{id}</td>
                    <td className="px-4 py-2 border">{userEmail}</td>
                    <td className="px-4 py-2 border">{`₹${orderAmount}`}</td>
                    <td
                      className={`px-4 py-2 border ${
                        orderStatus === "Delivered"
                          ? " bg-green-400"
                          : orderStatus === "Shipped..."
                          ? "bg-red-300"
                          : orderStatus === "Processing..."
                          ? "bg-red-500 text-white"
                          : "text-white bg-red-800"
                      }`}
                    >
                      {orderStatus}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
