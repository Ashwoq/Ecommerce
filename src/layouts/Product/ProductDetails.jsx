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

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { document } = useFetchDocument("products", id);
  const { data } = useFetchCollection("reviews");
  const filteredReviews = data.filter((review) => review.productID === id);
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
  console.log(product);
  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <div className="max-w-4xl p-4 mx-auto bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-3">
          <div className="font-semibold text-gray-800 lg:text-xl xs:text-sm">
            Product Details
          </div>
          <Link
            to="/#products"
            className="text-blue-600 transition-all lg:text-base xs:text-xs hover:scale-105"
          >
            &larr; Back to Product
          </Link>
        </div>

        {product === null ? (
          <Loader />
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
              <div className="flex items-center justify-center p-3 bg-gray-200 rounded-lg">
                <img
                  className="object-contain w-full rounded-lg xs:h-40 lg:h-56"
                  src={product.imageURL}
                  alt={product.name}
                />
              </div>
              <div className="space-y-2 lg:text-sm xs:text-xs ">
                <h3 className="font-semibold text-gray-800 xs:text-base lg:text-lg">
                  {product.name}
                </h3>
                <p className="text-gray-600 ">{product.desc}</p>
                <p className="font-medium text-gray-800 ">
                  Brand: {product.brand}
                </p>
                <div className="font-semibold text-gray-900 xs:text-base lg:text-lg">
                  ₹{product.price}
                  <span className="ml-2 text-xs text-gray-500 line-through">
                    M.R.P: ₹{product.mrp}
                  </span>
                </div>
                <p className="font-medium text-green-600 ">In stock</p>
                <p className="text-gray-600 ">
                  Sold by{" "}
                  <span className="text-blue-600">{product.sellerName}</span>
                </p>
                <p className="text-gray-600 ">
                  Gift options available.{" "}
                  <span className="text-blue-600 cursor-pointer">
                    Learn more
                  </span>
                </p>
                {isCartAdded < 0 ? (
                  <button
                    className="px-3 py-2 text-white bg-yellow-500 rounded-lg shadow hover:bg-yellow-600"
                    onClick={() => addToCart(product)}
                  >
                    Add To Cart
                  </button>
                ) : (
                  <div className="flex items-center p-2 space-x-2 bg-gray-100 rounded-lg shadow w-max">
                    <button
                      className="px-2 py-1 text-white bg-yellow-500 rounded hover:bg-yellow-600"
                      onClick={() => decreaseCart(product)}
                    >
                      -
                    </button>
                    <span className="px-3 py-1 bg-white rounded">
                      {cart.cartQuantity}
                    </span>
                    <button
                      className="px-2 py-1 text-white bg-yellow-500 rounded hover:bg-yellow-600"
                      onClick={() => increaseCart(product)}
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="p-3 bg-gray-100 rounded-lg shadow-md">
              <h3 className="mb-3 font-semibold text-gray-800 xs:text-sm lg:text-lg">
                Product Reviews
              </h3>
              {filteredReviews.length === 0 ? (
                <p className="text-gray-600 lg:text-sm xs:text-xs">
                  There are no reviews for this product.
                </p>
              ) : (
                filteredReviews.map((item, index) => {
                  const { rate, review, reviewDate, userName } = item;
                  return (
                    <div
                      key={index}
                      className="grid gap-3 xs:grid-cols-2 lg:grid-cols-3 "
                    >
                      <div className="p-3 mb-3 bg-white rounded-lg lg:w-max xs:w-[105%] lg:py-3 xs:py-1">
                        <div
                          className="flex items-start bg-gray-200 rounded-xl w-max
                        lg:ml-0 xs:ml-[-2.7rem]
                           lg:scale-100
                            xs:scale-[.65] "
                        >
                          <StarsRating value={rate} disabled />
                        </div>
                        <p className="text-gray-800 lg:text-sm xs:text-xs lg:mt-2 xs:mt-0">
                          {review}
                        </p>
                        <div className="mt-1 lg:text-xs xs:text-[10px] text-gray-500">
                          {reviewDate}
                        </div>
                        <div className="lg:text-xs xs:text-[10px]  text-gray-500">
                          {userName}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
