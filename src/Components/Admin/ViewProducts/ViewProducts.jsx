import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { collection, orderBy, query, onSnapshot } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { db } from "../../../firebase/config";
import { Link } from "react-router-dom";
import { FilePenLine, Trash2 } from "lucide-react";
import Loader from "../../Loader";
import { doc, deleteDoc } from "firebase/firestore";
import Notiflix from "notiflix";
import { useDispatch, useSelector } from "react-redux";
import {
  STORE_PRODUCTS,
  selectProducts,
} from "../../../redux/slice/productSlice";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import Search from "../../../Components/Search";
import {
  FILTER_BY_SEARCH,
  selectFilteredProducts,
} from "../../../redux/slice/filterSlice";
import Pagination from "../../../Components/Pagination/Pagination";

const ViewProducts = () => {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useFetchCollection("products");
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const filteredProducts = useSelector(selectFilteredProducts);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(8);

  // current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // const [products, setProducts] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   getProducts();
  // }, []);

  // const getProducts = () => {
  //   setIsLoading(true);

  //   try {
  //     const productsRef = collection(db, "products");
  //     const q = query(productsRef, orderBy("createdAt", "desc"));
  //     onSnapshot(q, (querySnapshot) => {
  //       const allProducts = querySnapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));
  //       console.log(allProducts);
  //       setProducts(allProducts);
  //       setIsLoading(false);
  //       dispatch(
  //         STORE_PRODUCTS({
  //           products: allProducts,
  //         })
  //       );
  //     });
  //   } catch (error) {
  //     setIsLoading(false);
  //     toast.error(error.message);
  //   }
  // };

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
  }, [dispatch, data]);

  useEffect(() => {
    dispatch(
      FILTER_BY_SEARCH({
        products,
        search,
      })
    );
  }, [dispatch, products, search]);
  const deleteProduct = async (id, imageURL) => {
    try {
      await deleteDoc(doc(db, "products", id));

      const storage = getStorage();
      const storageRef = ref(storage, imageURL);
      await deleteObject(storageRef);

      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const confirmDelete = (id, imageURL) => {
    Notiflix.Confirm.show(
      "Delete Product!!!",
      "You are about to delete this product",
      "Delete",
      "Cancel",
      function okCb() {
        deleteProduct(id, imageURL);
      },
      function cancelCb() {
        console.log("Delete Canceled");
      },
      {
        width: "320px",
        borderRadius: "3px",
        titleColor: "red",
        okButtonBackground: "red",
        cssAnimationStyle: "zoom",
      }
    );
  };

  return (
    <div className="lg:text-base xs:text-[10px]">
      <div className="p-2 px-4 mb-5 font-bold text-gray-100 bg-green-500 xs:text-sm lg:text-2xl w-max rounded-xl ">
        All Products
      </div>
      {/* <div className="mb-5 text-2xl font-bold"> All Products</div> */}
      {isLoading && <Loader />}
      <div className="">
        {filteredProducts.length === 0 ? (
          <p>no products found</p>
        ) : (
          <div className="w-full p-2 px-3 bg-gray-200 rounded-xl">
            <div className="mb-3 text-lg font-bold ">
              {filteredProducts.length}&nbsp;products found
            </div>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="flex w-full py-2 font-bold ">
              <div className="p-2 w-[5%] text-center ">s/n</div>
              <div className="grid w-full text-center xs:grid-cols-9 lg:grid-cols-12 ">
                <div className="col-span-3 p-2">Image</div>
                <div className="col-span-2 p-2 ">Name</div>
                <div className="col-span-3 p-2 lg:flex xs:hidden ">
                  Description
                </div>
                <div className="col-span-2 p-2">Category</div>
                <div className="col-span-1 p-2 ">Price</div>
                <div className="p-2 lg:flex xs:hidden ">Actions</div>
              </div>
            </div>
            {currentProducts.map((product, index) => {
              const { id, name, price, imageURL, category, desc } = product;
              return (
                <div
                  key={id}
                  className="flex w-full p-1 mb-3 bg-gray-50 rounded-xl"
                >
                  <div className="p-2 w-[5%]">{index + 1}</div>
                  <div className="grid w-full text-center xs:grid-cols-9 lg:grid-cols-12 ">
                    <div className="col-span-3 p-2 mx-auto">
                      <img
                        src={imageURL}
                        alt="imgurl"
                        className="xs:h-[50px] lg:h-[140px]
                        object-cover mix-blend-darken
                        "
                      />
                    </div>
                    <div className="col-span-2 p-2 ">{name}</div>
                    <div className="col-span-3 p-2 lg:flex xs:hidden ">
                      {desc}
                    </div>
                    <div className="col-span-2 p-2 ">{category}</div>
                    <div className="p-2 ">{price}</div>
                    <div className="justify-between p-2 lg:flex xs:block h-max ">
                      <Link to={`/admin/add-products/${id}`} className="">
                        <div className="lg:scale-100 xs:scale-50">
                          <FilePenLine />
                        </div>
                      </Link>
                      <button
                        className=""
                        onClick={() => confirmDelete(id, imageURL)}
                      >
                        <div className="lg:scale-100 xs:scale-50">
                          <Trash2 />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div className="my-5 ">
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            productsPerPage={productsPerPage}
            totalProducts={filteredProducts.length}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewProducts;
