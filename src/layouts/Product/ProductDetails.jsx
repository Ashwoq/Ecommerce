import Loader from "../../Components/Loader";
import { db } from "../../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  ADD_TO_CART,
  CALCULATE_TOTAL_QUANTITY,
  DECREASE_CART,
  selectCartItems,
} from "../../redux/slice/cartSlice";
import useFetchDocument from "../../customHooks/useFetchDocument";
import useFetchCollection from "../../customHooks/useFetchCollection";
import StarsRating from "react-star-rate";
import CheckOutSummary from "../../Components/CheckOutSummary/CheckOutSummary";
import { Banknote, Star, TicketPercent } from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { document } = useFetchDocument("products", id);
  const { data } = useFetchCollection("reviews");
  const filteredReviews = data.filter((review) => review.productID === id);

  const calculateAverageRating = (reviews) => {
    const totalRatings = reviews.reduce((sum, review) => sum + review.rate, 0);
    const avgrate = totalRatings / reviews.length;
    const averageRating = isNaN(avgrate) ? "Not Rated" : avgrate.toFixed(1);
    return averageRating; // Round to one decimal place
  };

  // const getProduct = async () => {
  //   const docRef = doc(db, "products", id);
  //   const docSnap = await getDoc(docRef);

  //   if (docSnap.exists()) {
  //     // console.log(docSnap.data());
  //     const obj = {
  //       id: id,
  //       ...docSnap.data(),
  //     };
  //     setProduct(obj);
  //   } else {
  //     toast.error("Product not found contact Admin");
  //   }
  // };

  useEffect(() => {
    setProduct(document);
  }, [document]);

  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const cart = cartItems.find((cart) => cart.id === id);
  const isCartAdded = cartItems.findIndex((cart) => {
    return cart.id === id;
  });

  const increaseCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  const decreaseCart = (product) => {
    dispatch(DECREASE_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };
  // return (
  //   <div className="flex min-h-screen p-4 bg-gray-50">
  //     <div className="max-w-4xl p-4 mx-auto bg-white rounded-lg shadow-md">
  //       <div className="flex items-center justify-between mb-3">
  //         <div className="font-semibold text-gray-800 lg:text-xl xs:text-sm">
  //           Product Details
  //         </div>
  //         <Link
  //           to="/#products"
  //           className="text-blue-600 transition-all lg:text-base xs:text-xs hover:scale-105"
  //         >
  //           &larr; Back to Product
  //         </Link>
  //       </div>

  //       {product === null ? (
  //         <Loader />
  //       ) : (
  //         <>
  //           <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
  //             <div className="flex items-center justify-center p-3 bg-gray-200 rounded-lg">
  //               <img
  //                 className="object-contain w-full rounded-lg xs:h-40 lg:h-56"
  //                 src={product.imageURL}
  //                 alt={product.name}
  //               />
  //             </div>
  //             <div className="space-y-2 lg:text-sm xs:text-xs ">
  //               <h3 className="font-semibold text-gray-800 xs:text-base lg:text-lg">
  //                 {product.name}
  //               </h3>
  //               <p className="text-gray-600 ">{product.desc}</p>
  //               <p className="font-medium text-gray-800 ">
  //                 Brand: {product.brand}
  //               </p>
  //               <div className="font-semibold text-gray-900 xs:text-base lg:text-lg">
  //                 ₹{product.price}
  //                 <span className="ml-2 text-xs text-gray-500 line-through">
  //                   M.R.P: ₹{product.mrp}
  //                 </span>
  //               </div>
  //               <p className="font-medium text-green-600 ">In stock</p>
  //               <p className="text-gray-600 ">
  //                 Sold by{" "}
  //                 <span className="text-blue-600">{product.sellerName}</span>
  //               </p>
  //               <p className="text-gray-600 ">
  //                 Gift options available.{" "}
  //                 <span className="text-blue-600 cursor-pointer">
  //                   Learn more
  //                 </span>
  //               </p>
  //               {isCartAdded < 0 ? (
  //                 <button
  //                   className="px-3 py-2 text-white bg-yellow-500 rounded-lg shadow hover:bg-yellow-600"
  //                   onClick={() => addToCart(product)}
  //                 >
  //                   Add To Cart
  //                 </button>
  //               ) : (
  //                 <div className="flex items-center p-2 space-x-2 bg-gray-100 rounded-lg shadow w-max">
  //                   <button
  //                     className="px-2 py-1 text-white bg-yellow-500 rounded hover:bg-yellow-600"
  //                     onClick={() => decreaseCart(product)}
  //                   >
  //                     -
  //                   </button>
  //                   <span className="px-3 py-1 bg-white rounded">
  //                     {cart.cartQuantity}
  //                   </span>
  //                   <button
  //                     className="px-2 py-1 text-white bg-yellow-500 rounded hover:bg-yellow-600"
  //                     onClick={() => increaseCart(product)}
  //                   >
  //                     +
  //                   </button>
  //                 </div>
  //               )}
  //             </div>
  //           </div>

  //           <div className="p-3 bg-gray-100 rounded-lg shadow-md">
  //             <h3 className="mb-3 font-semibold text-gray-800 xs:text-sm lg:text-lg">
  //               Product Reviews
  //             </h3>
  // {filteredReviews.length === 0 ? (
  //   <p className="text-gray-600 lg:text-sm xs:text-xs">
  //     There are no reviews for this product.
  //   </p>
  // ) : (
  //   filteredReviews.map((item, index) => {
  //     const { rate, review, reviewDate, userName } = item;
  //     return (
  //       <div
  //         key={index}
  //         className="grid gap-3 xs:grid-cols-2 lg:grid-cols-3 "
  //       >
  //         <div className="p-3 mb-3 bg-white rounded-lg lg:w-max xs:w-[105%] lg:py-3 xs:py-1">
  //           <div
  //             className="flex items-start bg-gray-200 rounded-xl w-max
  //           lg:ml-0 xs:ml-[-2.7rem]
  //              lg:scale-100
  //               xs:scale-[.65] "
  //           >
  //             <StarsRating value={rate} disabled />
  //           </div>
  //           <p className="text-gray-800 lg:text-sm xs:text-xs lg:mt-2 xs:mt-0">
  //             {review}
  //           </p>
  //           <div className="mt-1 lg:text-xs xs:text-[10px] text-gray-500">
  //             {reviewDate}
  //           </div>
  //           <div className="lg:text-xs xs:text-[10px]  text-gray-500">
  //             {userName}
  //           </div>
  //         </div>
  //       </div>
  //     );
  //   })
  // )}
  //           </div>
  //         </>
  //       )}
  //     </div>
  //     <CheckOutSummary />
  //   </div>
  // );
  // return (
  //   <div className="flex flex-col min-h-screen p-4 md:flex-row bg-gray-50">
  //     <div className="flex-1 max-w-5xl p-4 mx-auto bg-white rounded-lg shadow-lg md:mr-4">
  //       <div className="flex items-center justify-between pb-4 border-b">
  //         <h1 className="text-lg font-semibold text-gray-800">
  //           Product Details
  //         </h1>
  //         <Link
  //           to="/#products"
  //           className="text-blue-600 transition-all hover:underline"
  //         >
  //           &larr; Back to Products
  //         </Link>
  //       </div>

  //       {product === null ? (
  //         <Loader />
  //       ) : (
  //         <div className="grid grid-cols-1 gap-4 py-4 md:grid-cols-2">
  //           <div className="flex items-center justify-center p-4 bg-gray-100 rounded-lg">
  //             <img
  //               className="object-contain w-full h-96"
  //               src={product.imageURL}
  //               alt={product.name}
  //             />
  //           </div>
  //           <div className="flex flex-col justify-between">
  //             <div className="space-y-3">
  //               <h2 className="text-2xl font-semibold text-gray-800">
  //                 {product.name}
  //               </h2>
  //               <p className="text-gray-700">{product.desc}</p>
  //               <p className="text-gray-600">
  //                 Brand: <span className="font-medium">{product.brand}</span>
  //               </p>
  //               <div className="text-2xl font-bold text-gray-900">
  //                 ₹{product.price}
  //                 <span className="ml-2 text-sm text-gray-500 line-through">
  //                   M.R.P: ₹{product.mrp}
  //                 </span>
  //               </div>
  //               <p className="font-medium text-green-600">In stock</p>
  //               <p className="text-gray-600">
  //                 Sold by{" "}
  //                 <span className="text-blue-600">{product.sellerName}</span>
  //               </p>
  //               <p className="text-gray-600">
  //                 Gift options available.{" "}
  //                 <span className="text-blue-600 cursor-pointer">
  //                   Learn more
  //                 </span>
  //               </p>
  //             </div>

  //             <div className="mt-4">
  //               {isCartAdded < 0 ? (
  //                 <button
  //                   className="w-full py-3 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600"
  //                   onClick={() => addToCart(product)}
  //                 >
  //                   Add To Cart
  //                 </button>
  //               ) : (
  //                 <div className="flex items-center space-x-2">
  //                   <button
  //                     className="px-4 py-2 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600"
  //                     onClick={() => decreaseCart(product)}
  //                   >
  //                     -
  //                   </button>
  //                   <span className="px-4 py-2 bg-gray-200 rounded-lg">
  //                     {cart.cartQuantity}
  //                   </span>
  //                   <button
  //                     className="px-4 py-2 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600"
  //                     onClick={() => increaseCart(product)}
  //                   >
  //                     +
  //                   </button>
  //                 </div>
  //               )}
  //             </div>
  //           </div>
  //         </div>
  //       )}

  //       <div className="p-4 mt-4 bg-white rounded-lg shadow-md">
  //         <h3 className="mb-3 text-lg font-semibold text-gray-800">
  //           Product Reviews
  //         </h3>
  //         {filteredReviews.length === 0 ? (
  //           <p className="text-gray-600">
  //             There are no reviews for this product.
  //           </p>
  //         ) : (
  //           <div className="space-y-4">
  //             {filteredReviews.map((item, index) => {
  //               const { rate, review, reviewDate, userName } = item;
  //               return (
  //                 <div key={index} className="p-4 bg-gray-100 rounded-lg">
  //                   <div className="flex items-center mb-2">
  //                     <StarsRating value={rate} disabled />
  //                     <p className="ml-2 font-medium text-gray-800">
  //                       {userName}
  //                     </p>
  //                   </div>
  //                   <p className="text-gray-700">{review}</p>
  //                   <div className="flex justify-between mt-2 text-sm text-gray-500">
  //                     <span>{reviewDate}</span>
  //                     <span>{rate} stars</span>
  //                   </div>
  //                 </div>
  //               );
  //             })}
  //           </div>
  //         )}
  //       </div>
  //     </div>
  //     <div className="w-full md:w-1/3">
  //       <CheckOutSummary />
  //     </div>
  //   </div>
  // );

  return (
    <div className="flex flex-col min-h-screen pb-24 xs:p-5 lg:p-10 md:flex-row bg-gray-50">
      <div
        className="flex-1 max-w-5xl p-4 mx-auto bg-white rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.2)]
      md:mr-4"
      >
        <div className="flex items-center justify-between pb-4 border-b">
          <h1 className="font-semibold text-gray-800 lg:text-lg xs:text-sm">
            Product Details
          </h1>
          <Link
            to="/#products"
            className="text-blue-600 transition-all lg:text-base xs:text-xs hover:underline"
          >
            &larr; Back to Products
          </Link>
        </div>

        {product === null ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 gap-4 py-4 md:grid-cols-2">
            <div className="flex items-center justify-center p-4 bg-gray-100 rounded-lg">
              <img
                className="object-contain w-full xs:h-44 lg:h-96"
                src={product.imageURL}
                alt={product.name}
              />
            </div>
            <div className="flex flex-col justify-between">
              <div className="space-y-2">
                <div className="font-semibold text-gray-800 lg:text-2xl xs:text-lg">
                  {product.name}
                </div>
                <div className="text-gray-700 lg:text-base xs:text-xs">
                  {product.desc}
                </div>
                <div className="flex items-center gap-1 p-1 px-2 font-medium text-white bg-green-500 rounded xs:text-xs lg:text-sm w-max">
                  <Star size={20} className=" fill-white" />
                  {calculateAverageRating(filteredReviews)}
                </div>
                <div className="text-gray-600 lg:text-base xs:text-xs">
                  Brand : <span className="font-semibold">{product.brand}</span>
                </div>
                <div className="font-bold text-gray-900 lg:text-2xl xs:text-lg">
                  ₹{product.price}
                  <span className="ml-2 text-sm text-gray-500 line-through">
                    M.R.P: ₹{product.mrp}
                  </span>
                  <span className="ml-2 text-sm text-green-600 ">
                    {(
                      ((product.mrp - product.price) / product.mrp) *
                      100
                    ).toFixed(0)}
                    % off
                  </span>
                </div>
                <div className="xs:text-xs lg:text-sm">
                  <div className="text-sm font-medium text-green-600">
                    In stock
                  </div>
                  <div className="text-gray-600">
                    Sold by
                    <span className="font-semibold text-blue-600">
                      {" "}
                      {product.sellerName}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600">
                    Gift options available.{" "}
                    <span className="text-blue-600 cursor-pointer">
                      Learn more
                    </span>
                  </div>
                </div>
                {/* <div> */}
                <div className="font-bold text-gray-800 lg:text-sm xs:text-xs">
                  Coupons for you
                </div>
                <div className="xs:text-[10px] lg:text-xs text-gray-600">
                  <Banknote size={22} className="inline text-green-500" />{" "}
                  <b>Partner Offer</b> Buy this & get upto ₹500 Off on Furniture
                </div>
                <div className="mt-2 font-bold text-gray-800 lg:text-sm xs:text-xs">
                  Available offers
                </div>
                <div className="my-1 xs:text-[10px] lg:text-xs  text-gray-600">
                  <TicketPercent size={22} className="inline text-green-500" />{" "}
                  <b>Bank Offer</b> Get ₹50 instant discount on first Flipkart
                  UPI txn on order of ₹200 and above{" "}
                  <span className="text-blue-700"> T&C</span>
                </div>
                <div className="my-1 xs:text-[10px] lg:text-xs  text-gray-600">
                  <TicketPercent size={22} className="inline text-green-500" />{" "}
                  <b>Bank Offer</b> 5% Cashback on Flipkart Axis Bank Card{" "}
                  <span className="text-blue-700"> T&C</span>
                </div>
                <div className="my-1 xs:text-[10px] lg:text-xs  text-gray-600">
                  <TicketPercent size={22} className="inline text-green-500" />{" "}
                  <b>Bank Offer</b> 10% off up to ₹1,250 on HDFC Bank Credit
                  Card EMI Txns, Tenure: 6 and 9 months, Min Txn Value: ₹7500
                  <span className="text-blue-700"> T&C</span>
                </div>
                {/* </div> */}
              </div>

              <div className="my-6 lg:text-base xs:text-xs">
                {isCartAdded < 0 ? (
                  <button
                    className="w-full xs:py-2 lg:py-3 text-white bg-yellow-500 transition-all rounded-lg hover:scale-[1.01] hover:bg-yellow-600"
                    onClick={() => addToCart(product)}
                  >
                    Add To Cart
                  </button>
                ) : (
                  <div className="flex items-center xs:space-x-1 lg:space-x-2">
                    <button
                      className="text-white bg-yellow-500 rounded-lg lg:px-4 lg:py-2 xs:px-2 xs:py-1 hover:bg-yellow-600"
                      onClick={() => decreaseCart(product)}
                    >
                      -
                    </button>
                    <span className="bg-gray-200 rounded-lg lg:px-4 lg:py-2 xs:px-2 xs:py-1">
                      {cart.cartQuantity}
                    </span>
                    <button
                      className="text-white bg-yellow-500 rounded-lg lg:px-4 lg:py-2 xs:px-2 xs:py-1 hover:bg-yellow-600"
                      onClick={() => increaseCart(product)}
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="p-4 mt-4 bg-gray-100 rounded-lg shadow-md">
          <div className="flex items-center gap-4">
            <div className="mb-4 font-semibold text-gray-800 xs:text-sm lg:text-lg">
              Product Reviews
            </div>
            <p className="p-1 px-2 mb-4 font-medium text-white bg-green-500 rounded shadow-lg xs:text-xs lg:text-sm ">
              Overall : {calculateAverageRating(filteredReviews)}
              <Star size={20} className="inline ml-2 fill-white" />
            </p>
          </div>
          {filteredReviews.length === 0 ? (
            <p className="text-gray-600 lg:text-sm xs:text-[11px]">
              There are no reviews for this product.
            </p>
          ) : (
            <>
              {/* <p className="mb-1 text-sm font-medium text-gray-800">
                Overall Rating: {calculateAverageRating(filteredReviews)} stars
              </p> */}
              <div className="grid gap-3 xs:grid-cols-2 lg:grid-cols-3">
                {filteredReviews.map((item, index) => {
                  const { rate, review, reviewDate, userName } = item;
                  return (
                    <div
                      key={index}
                      className="p-3 mb-2 bg-white rounded-lg lg:w-max xs:w-[105%] lg:py-3 xs:py-1"
                    >
                      <div
                        className="flex items-start  rounded-xl w-max
                  lg:ml-0 xs:ml-[-2.7rem]
                  lg:scale-100 xs:scale-[.65] "
                      >
                        <StarsRating value={rate} disabled />
                      </div>
                      <p className="text-gray-800 lg:text-sm xs:text-xs">
                        {review}
                      </p>
                      <div className="mt-1 lg:text-xs xs:text-[10px] text-gray-500">
                        {reviewDate}
                      </div>
                      <div className="lg:text-xs xs:text-[10px] text-gray-500">
                        {userName}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="w-full md:w-1/3">
        <CheckOutSummary />
      </div>
    </div>
  );
};

export default ProductDetails;
