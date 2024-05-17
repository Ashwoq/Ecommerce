// import { useDispatch, useSelector } from "react-redux";
// import InfoBox from "../../../Components/InfoBox/InfoBox";
// import { ArrowUp, CircleDollarSign, ShoppingBagIcon } from "lucide-react";
// import {
//   STORE_PRODUCTS,
//   selectProducts,
// } from "../../../redux/slice/productSlice";
// import {
//   CALC_TOTAL_ORDER_AMOUNT,
//   STORE_ORDER,
//   selectOrderHistoryData,
//   selectTotalOrderAmount,
// } from "../../../redux/slice/orderSlice";
// import useFetchCollection from "../../../customHooks/useFetchCollection";
// import { useEffect } from "react";
// import Charts from "../../../Components/Charts/Charts";

// // Icons
// const earningIcon = <CircleDollarSign size={30} color="#b624ff" />;
// const productIcon = <ShoppingBagIcon size={30} color="#b624ff" />;
// const ordersIcon = <ArrowUp size={30} color="#b624ff" />;

// const AdHome = () => {
//   const products = useSelector(selectProducts);
//   const orders = useSelector(selectOrderHistoryData);
//   const totalOrderAmount = useSelector(selectTotalOrderAmount);

//   const fbProducts = useFetchCollection("products");
//   const { data } = useFetchCollection("orders");

//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(
//       STORE_PRODUCTS({
//         products: fbProducts.data,
//       })
//     );
//     dispatch(STORE_ORDER(data));
//     dispatch(CALC_TOTAL_ORDER_AMOUNT());
//   }, [dispatch, data, fbProducts]);

//   return (
//     <div className="bg-red-300">
//       <h1>Admin Home</h1>
//       <div className="flex ">
//         <div className="w-24 bg-pink-400">
//           <InfoBox
//             title="Earnings"
//             count={totalOrderAmount}
//             icon={earningIcon}
//           />
//         </div>
//         <div className="w-24 bg-pink-400">
//           <InfoBox
//             title="Products"
//             count={products.length}
//             icon={productIcon}
//           />
//         </div>
//         <div className="w-24 bg-pink-400">
//           <InfoBox title="Orders" count={orders.length} icon={ordersIcon} />
//         </div>
//       </div>
//       <div className="w-[40%] h-[50%]">
//         <Charts />
//       </div>
//     </div>
//   );
// };

// export default AdHome;

import { useDispatch, useSelector } from "react-redux";
import InfoBox from "../../../Components/InfoBox/InfoBox";
import { ArrowUp, CircleDollarSign, ShoppingBagIcon } from "lucide-react";
import {
  STORE_PRODUCTS,
  selectProducts,
} from "../../../redux/slice/productSlice";
import {
  CALC_TOTAL_ORDER_AMOUNT,
  STORE_ORDER,
  selectOrderHistoryData,
  selectTotalOrderAmount,
} from "../../../redux/slice/orderSlice";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import { useEffect } from "react";
import Charts from "../../../Components/Charts/Charts";

// Icons
const earningIcon = <CircleDollarSign size={30} color="#b624ff" />;
const productIcon = <ShoppingBagIcon size={30} color="#b624ff" />;
const ordersIcon = <ArrowUp size={30} color="#b624ff" />;

const AdHome = () => {
  const products = useSelector(selectProducts);
  const orders = useSelector(selectOrderHistoryData);
  const totalOrderAmount = useSelector(selectTotalOrderAmount);

  const fbProducts = useFetchCollection("products");
  const { data } = useFetchCollection("orders");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: fbProducts.data,
      })
    );
    dispatch(STORE_ORDER(data));
    dispatch(CALC_TOTAL_ORDER_AMOUNT());
  }, [dispatch, data, fbProducts]);

  return (
    <div className="p-4 bg-gray-100">
      <h1 className="mb-4 font-bold xs:text-sm lg:text-2xl">Admin Home</h1>
      <div className="flex xs:justify-center lg:justify-start">
        <div className="w-11/12 p-2 bg-gray-700 xs:mb-1 lg:mb-4 rounded-xl lg:w-1/4 lg:mr-4">
          <InfoBox
            title="Earnings"
            count={totalOrderAmount}
            icon={earningIcon}
          />
        </div>
        <div className="w-11/12 p-2 bg-gray-700 xs:mb-1 lg:mb-4 rounded-xl lg:w-1/4 lg:mr-4">
          <InfoBox
            title="Products"
            count={products.length}
            icon={productIcon}
          />
        </div>
        <div className="w-11/12 p-2 bg-gray-700 xs:mb-1 lg:mb-4 rounded-xl lg:w-1/4">
          <InfoBox title="Orders" count={orders.length} icon={ordersIcon} />
        </div>
      </div>
      <div className="justify-start mt-8 w-max lg:w-3/5">
        <Charts />
      </div>
    </div>
  );
};

export default AdHome;
