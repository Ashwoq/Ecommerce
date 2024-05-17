import React, { useEffect, useState } from "react";
import { AlignJustify, LayoutGrid } from "lucide-react";
import Search from "../../Components/Search";
import ProductItem from "./ProductItem";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_BY_SEARCH,
  SORT_PRODUCTS,
  selectFilteredProducts,
} from "../../redux/slice/filterSlice";
import Pagination from "../../Components/Pagination/Pagination";

const ProductList = ({ products }) => {
  const [griddy, setGriddy] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const filteredProducts = useSelector(selectFilteredProducts);
  // console.log(filteredProducts);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(6);

  // current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      SORT_PRODUCTS({
        products,
        sort,
      })
    );
  }, [dispatch, products, sort]);

  useEffect(() => {
    dispatch(
      FILTER_BY_SEARCH({
        products,
        search,
      })
    );
  }, [dispatch, products, search]);

  return (
    <div className="bg-gray-100 border-l" id="product">
      <div className="flex items-center justify-between w-full xs:px-7 lg:px-10 py-2 lg:text-base xs:text-[7px] ">
        <div className="flex bg-gray-300 rounded-lg cursor-default xs:p-1 lg:p-2 xs:px-1 lg:px-3">
          <LayoutGrid
            size={26}
            onClick={() => setGriddy(true)}
            className={`p-[2px] xs:mr-0 lg:mr-2  lg:scale-100 xs:scale-[.65]
            hover:scale-105 transition-all cursor-pointer rounded  ${
              griddy ? "bg-gray-500" : "bg-white"
            }`}
          />

          <AlignJustify
            size={26}
            onClick={() => setGriddy(false)}
            className={`p-[2px] lg:scale-100 xs:scale-[.65]
            hover:scale-105 transition-all cursor-pointer rounded  ${
              !griddy ? "bg-gray-500" : "bg-white"
            }`}
          />

          <div className="my-auto font-bold xs:pl-0 lg:pl-2">
            {filteredProducts.length} Product found
          </div>
        </div>
        <div className="p-1 bg-gray-300 rounded-lg ">
          <div>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="p-2 px-3 bg-gray-300 rounded-lg cursor-default lg:flex xs:hidden ">
          <label>Sort by &nbsp;</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="transition-all rounded-sm cursor-pointer hover:scale-105 outline-0"
          >
            <option value="latest">Latest</option>
            <option value="lowest-price">Lowest Price</option>
            <option value="highest-price">Highest Price</option>
            <option value="a-z">A - Z</option>
            <option value="z-a">Z - A</option>
          </select>
        </div>
      </div>
      <div className="m-7">
        {products.length === 0 ? (
          <p>No Product found</p>
        ) : (
          <div
            className={
              griddy
                ? "grid xs:grid-cols-2 lg:grid-cols-3 xs:gap-3 lg:gap-7"
                : "grid gap-9 mx-8"
            }
          >
            {currentProducts.map((product) => (
              <ProductItem
                product={product}
                key={product.id}
                {...product}
                griddy={griddy}
              />
            ))}
          </div>
        )}
      </div>
      <div className="my-5 ">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          productsPerPage={productsPerPage}
          totalProducts={filteredProducts.length}
        />
      </div>
    </div>
  );
};

export default ProductList;
