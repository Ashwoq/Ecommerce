import { Timestamp, doc, setDoc } from "firebase/firestore";
import Loader from "../../../Components/Loader";
import { useState } from "react";
import { toast } from "react-toastify";
import { db } from "../../../firebase/config";
import { useNavigate } from "react-router-dom";

const ChangeOrderStatus = ({ order, id }) => {
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const location = useNavigate();

  const editOrder = (e, id) => {
    e.preventDefault();
    setIsLoading(true);
    const orderConfig = {
      userID: order.userID,
      userEmail: order.userEmail,
      orderDate: order.orderDate,
      orderTime: order.orderTime,
      orderAmount: order.orderAmount,
      orderStatus: status,
      cartItems: order.cartItems,
      shippingAddress: order.shippingAddress,
      created: order.created,
      editedAt: Timestamp.now().toDate(),
    };

    try {
      setDoc(doc(db, "orders", id), orderConfig);
      setIsLoading(false);
      toast.success("Order Status Changed");
      location("/admin/orders");
      // location("/admin/all-products");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  // return (
  //   <div className="bg-yellow-800">
  //     {isLoading && <Loader />}
  //     <div className="bg-blue-700">
  //       <h1>Update Status</h1>
  //       <form onSubmit={(e) => editOrder(e, id)}>
  //         <span>
  //           <select value={status} onChange={(e) => setStatus(e.target.value)}>
  //             <option value="" disabled>
  //               -- Choose one --
  //             </option>
  //             <option value="Order Placed...">Order Placed...</option>
  //             <option value="Processing...">Processing...</option>
  //             <option value="Shipped..." className="">
  //               Shipped ...
  //             </option>
  //             <option value="Delivered">Delivered</option>
  //           </select>
  //         </span>
  //         <span>
  //           <button type="submit" className="bg-red-500">
  //             Update Status
  //           </button>
  //         </span>
  //       </form>
  //     </div>
  //   </div>
  // );
  return (
    <div className="flex items-center justify-start mt-5 bg-gray-100">
      {isLoading && <Loader />}
      <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
        <h1 className="mb-4 font-bold text-gray-800 xs:text-sm lg:text-xl">
          Update Status
        </h1>
        <form onSubmit={(e) => editOrder(e, id)} className="space-y-4">
          <div>
            <label
              htmlFor="status"
              className="block mb-2 text-gray-700 lg:text-base xs:text-xs"
            >
              Order Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded lg:text-base xs:text-xs"
            >
              <option value="" disabled>
                -- Choose one --
              </option>
              <option value="Order Placed...">Order Placed...</option>
              <option value="Processing...">Processing...</option>
              <option value="Shipped...">Shipped...</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 text-white transition duration-300 bg-blue-600 rounded lg:text-base xs:text-xs hover:bg-blue-700"
            >
              Update Status
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangeOrderStatus;
