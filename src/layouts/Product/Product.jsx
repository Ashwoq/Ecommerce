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

const Product = () => {
  const [showFilter, setShowFilter] = useState(false);

  const { data, isLoading } = useFetchCollection("products");

  const dispatch = useDispatch();

  const products = useSelector(selectProducts);
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

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  return (
    <div className="w-full py-5 bg-gray-100">
      {/* <div className="">Product</div> */}
      <div className="flex w-full ">
        <aside className={`${showFilter ? `` : ``} lg:contents xs:hidden`}>
          <ProductFilter />
        </aside>
        <div className="w-full">
          {isLoading && <Loader />}

          <ProductList products={products} />
        </div>
      </div>
      {/* <div className="bg-pink" onClick={toggleFilter}>
        {showFilter ? "Hide Filter" : "Show Filter"}
      </div> */}
    </div>
  );
};

export default Product;
