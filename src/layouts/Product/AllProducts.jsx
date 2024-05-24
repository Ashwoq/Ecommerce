import useFetchCollection from "../../customHooks/useFetchCollection";
import ProductFilter from "./ProductFilter";
import ProductList from "./ProductList";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_PRICE_RANGE,
  STORE_PRODUCTS,
  selectProducts,
} from "../../redux/slice/productSlice";
import { useEffect, useState } from "react";
import Loader from "../../Components/Loader";
import { useParams } from "react-router-dom";

const AllProducts = () => {
  const { data, isLoading } = useFetchCollection("products");
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const { id } = useParams();

  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );

    dispatch(
      GET_PRICE_RANGE({
        products: data,
      })
    );
  }, [dispatch, data]);

  // Filter products whenever id changes
  useEffect(() => {
    const formattedId = id
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    const filteredProductsArray = products.filter((product) => {
      return product.category === formattedId;
    });

    setFilteredProducts(filteredProductsArray);

    // Here you can dispatch an action to store the filtered products in Redux state
  }, [id, products]);

  return (
    <div className="w-full py-5 bg-gray-100">
      <div className="flex w-full ">
        <aside className={`lg:contents xs:hidden`}>
          <ProductFilter />
        </aside>
        <div className="w-full">
          {isLoading && <Loader />}
          <ProductList products={filteredProducts} />
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
