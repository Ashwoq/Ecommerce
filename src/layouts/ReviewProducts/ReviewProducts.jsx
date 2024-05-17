// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { selectUserID, selectUserName } from "../../redux/slice/authSlice";
// // import { selectProducts } from "../../redux/slice/productSlice";
// import StarsRating from "react-star-rate";
// import { db } from "../../firebase/config";
// import { Timestamp, addDoc, collection, doc, getDoc } from "firebase/firestore";
// import { toast } from "react-toastify";
// // import useFetchDocument from "../../customHooks/useFetchDocument";
// import Loader from "../../Components/Loader";

// const ReviewProducts = () => {
//   const [rate, setRate] = useState(0);
//   const [review, setReview] = useState("");
//   const [product, setProduct] = useState(null);
//   const { id } = useParams();

//   // const { document } = useFetchDocument("products", id);
//   // console.log(document);
//   //
//   const getDocument = async () => {
//     const docRef = doc(db, "products", id);
//     const docSnap = await getDoc(docRef);
//     if (docSnap.exists()) {
//       const obj = {
//         id: id,
//         ...docSnap.data(),
//       };
//       //  console.log(collectionName);
//       setProduct(obj);
//       console.log(obj, "sd");

//       console.log(document, "od-oc");
//     } else {
//       toast.error("Document not found contact Admin");
//     }
//   };

//   //
//   const userID = useSelector(selectUserID);
//   const userName = useSelector(selectUserName);

//   useEffect(() => {
//     getDocument();
//     console.log(product);
//   }, [id]);

//   const submitReview = (e) => {
//     e.preventDefault();

//     const today = new Date();
//     const date = today.toDateString();
//     const reviewConfig = {
//       userID,
//       userName,
//       productID: id,
//       rate,
//       review,
//       reviewDate: date,
//       created: Timestamp.now().toDate(),
//     };

//     try {
//       addDoc(collection(db, "reviews"), reviewConfig);
//       toast.success("Review Submitted");
//       setRate(0);
//       setReview("");
//     } catch (error) {
//       alert("eror");
//       toast.error(error.message);
//     }
//   };

//   return (
//     <div>
//       {product === null && <Loader />}
//       <div className="bg-green-300">
//         <h1>Review Product</h1>
//         <p>
//           <b>Product name :</b>
//           {product.name}
//         </p>
//         <img src={product.imageURL} alt={product.name} />

//         <div className="bg-pink-300">
//           <form onSubmit={(e) => submitReview(e)}>
//             <label>Rating</label>
//             <StarsRating
//               value={rate}
//               onChange={(rate) => {
//                 setRate(rate);
//               }}
//             />

//             <label>Reiew</label>
//             <textarea
//               value={review}
//               onChange={(e) => setReview(e.target.value)}
//               required
//               cols={30}
//               rows={10}
//             ></textarea>

//             <button type="submit" className="bg-red-400">
//               Submit Review
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReviewProducts;

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectUserID, selectUserName } from "../../redux/slice/authSlice";
import StarsRating from "react-star-rate";
import { db } from "../../firebase/config";
import { Timestamp, addDoc, collection, doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import Loader from "../../Components/Loader";

const ReviewProducts = () => {
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState("");
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  const getDocument = async () => {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const obj = {
        id: id,
        ...docSnap.data(),
      };
      setProduct(obj);
    } else {
      toast.error("Document not found contact Admin");
    }
  };

  const userID = useSelector(selectUserID);
  const userName = useSelector(selectUserName);

  useEffect(() => {
    getDocument();
  }, [id]);

  useEffect(() => {
    // console.log(product); // Move the console.log here
  }, [product]); // Trigger when product changes

  const submitReview = (e) => {
    e.preventDefault();

    const today = new Date();
    const date = today.toDateString();
    const reviewConfig = {
      userID,
      userName,
      productID: id,
      rate,
      review,
      reviewDate: date,
      created: Timestamp.now().toDate(),
    };

    try {
      addDoc(collection(db, "reviews"), reviewConfig);
      toast.success("Review Submitted");
      setRate(0);
      setReview("");
    } catch (error) {
      alert("error");
      toast.error(error.message);
    }
  };

  return (
    // <div>
    //   {product === null && <Loader />}
    //   <div className="bg-green-300">
    //     <h1>Review Product</h1>
    //     <p>
    //       <b>Product name :</b>
    //       {product && product.name}
    //     </p>
    //     <img src={product && product.imageURL} alt={product && product.name} />

    //     <div className="bg-pink-300">
    //       <form onSubmit={(e) => submitReview(e)}>
    //         <label>Rating</label>
    //         <StarsRating
    //           value={rate}
    //           onChange={(rate) => {
    //             setRate(rate);
    //           }}
    //         />

    //         <label>Review</label>
    //         <textarea
    //           value={review}
    //           onChange={(e) => setReview(e.target.value)}
    //           required
    //           cols={30}
    //           rows={10}
    //         ></textarea>

    //         <button type="submit" className="bg-red-400">
    //           Submit Review
    //         </button>
    //       </form>
    //     </div>
    //   </div>
    // </div>
    <div className="min-h-screen p-4 bg-white cursor-default">
      {product === null ? (
        <Loader />
      ) : (
        <div className="max-w-3xl p-5 mx-auto bg-gray-200 rounded-lg shadow-lg">
          <div className="mb-4 font-semibold xs:text-base lg:text-2xl">
            Review Product
          </div>
          <div className="items-center justify-center gap-5 lg:flex">
            <div className="lg:w-[45%] xs:text-xs lg:text-sm mb-3 bg-white p-2 px-4 rounded-xl ">
              <div className="lg:w-[14rem] xs:w-[8rem] mx-auto ">
                <img
                  src={product.imageURL}
                  alt={product.name}
                  className="object-contain rounded-md"
                />
              </div>
              <p className="">
                <b>Product Name:</b> {product.name}
              </p>
              <p className="">
                <b>Product Category :</b> {product.category}
              </p>
              <p className="">
                <b>Product Desc :</b> {product.desc}
              </p>
              <p className="">
                <b>Product Price :</b> ₹{product.price}
              </p>
            </div>
            <div className="h-full font-bold bg-white xs:p-2 lg:p-4 rounded-xl">
              <form onSubmit={(e) => submitReview(e)} className="">
                <div className="flex items-center ">
                  <label className="xs:text-xs lg:text-lg ">Rating : </label>
                  <div className="lg:scale-75 xs:scale-[.60]">
                    <StarsRating
                      value={rate}
                      onChange={(rate) => setRate(rate)}
                    />
                  </div>
                </div>
                <div>
                  {/* <label className="block mb-2 text-md">Review</label> */}
                  <textarea
                    value={review}
                    placeholder="Write a review"
                    onChange={(e) => setReview(e.target.value)}
                    required
                    cols={30}
                    rows={5}
                    className="w-full p-2 mb-2 border rounded-lg lg:text-base xs:text-xs focus:outline-none focus:ring-2 focus:ring-gray-100"
                  ></textarea>
                </div>

                <div className="flex gap-5">
                  <button
                    type="submit"
                    className="w-full py-2 font-semibold text-white  bg-blue-600 rounded-lg lg:text-base xs:text-xs hover:scale-[1.02] transition-all"
                  >
                    Submit Review
                  </button>
                  <button
                    type="submit"
                    className="w-full py-2 font-semibold text-white  bg-blue-600 rounded-lg greengradient lg:text-base xs:text-xs hover:scale-[1.02] transition-all"
                  >
                    <Link to="/#products">Home</Link>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewProducts;
