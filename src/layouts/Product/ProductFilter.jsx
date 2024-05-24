import { Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts } from "../../redux/slice/productSlice";
import { useEffect, useState } from "react";
import {
  FILTER_BY_BRAND,
  FILTER_BY_CATEGORY,
  FILTER_BY_PRICE,
} from "../../redux/slice/filterSlice";

const ProductFilter = () => {
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [price, setPrice] = useState(1000000);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [minPrice, setMinPrice] = useState(0);

  const allCategories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const getBrandsByCategory = (category) => {
    if (category === "All") {
      return ["All", ...new Set(products.map((product) => product.brand))];
    }
    return [
      "All",
      ...new Set(
        products
          .filter((product) => product.category === category)
          .map((product) => product.brand)
      ),
    ];
  };

  const getFilteredProducts = (category, brand, price) => {
    let filteredProducts = products;
    if (category !== "All") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === category
      );
    }
    if (brand !== "All") {
      filteredProducts = filteredProducts.filter(
        (product) => product.brand === brand
      );
    }
    filteredProducts = filteredProducts.filter(
      (product) => product.price <= price
    );
    return filteredProducts;
  };

  const allBrands = getBrandsByCategory(category);

  useEffect(() => {
    const newMinPrice = Math.min(
      ...products
        .filter(
          (product) =>
            (category === "All" || product.category === category) &&
            (brand === "All" || product.brand === brand)
        )
        .map((product) => product.price),
      0
    );
    const newMaxPrice = Math.max(
      ...products
        .filter(
          (product) =>
            (category === "All" || product.category === category) &&
            (brand === "All" || product.brand === brand)
        )
        .map((product) => product.price),
      0
    );
    setMinPrice(newMinPrice);
    setMaxPrice(newMaxPrice);
    setPrice(newMaxPrice);
  }, [products, category, brand]);

  useEffect(() => {
    const filteredProducts = getFilteredProducts(category, brand, price);
    dispatch(FILTER_BY_BRAND({ products: filteredProducts, brand }));
    dispatch(FILTER_BY_PRICE({ products: filteredProducts, price }));
    dispatch(FILTER_BY_CATEGORY({ products: filteredProducts, category }));
  }, [dispatch, products, brand, price, category]);

  const filterProducts = (cat) => {
    setCategory(cat);
    setBrand("All");
  };

  const clearFilters = () => {
    setCategory("All");
    setBrand("All");
    setPrice(maxPrice);
  };

  return (
    <div className="bg-gray-100 cursor-default">
      <div className="bg-rd-100 justify-center grid gap-5 lg:w-60 xs:w-40 pt-4 text-[15px]">
        <div className="flex flex-col items-start justify-center w-full p-3 px-8 mb-1 rounded-lg shadow-xl">
          <div className="my-1 mb-2 text-lg font-bold rounded-md">
            Categories
          </div>
          {allCategories.map((cat, index) => {
            return (
              <button
                key={index}
                type="button"
                onClick={() => filterProducts(cat)}
                className={"hover:scale-[1.02] transition-all"}
              >
                <input
                  type="checkbox"
                  checked={cat === category}
                  onChange={() => {}}
                  className="w-3 h-3 mr-1"
                />
                {cat}
              </button>
            );
          })}
        </div>
        <Divider />

        <div className="flex flex-col items-start justify-center w-full p-3 px-8 mb-1 rounded-lg shadow-xl">
          <div className="mb-2 text-lg font-bold rounded-md">Price</div>
          <p className="">{price}</p>
          <input
            type="range"
            className={
              "hover:scale-[1.02] transition-all outline-0 cursor-pointer"
            }
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            min={minPrice}
            max={maxPrice}
          />
        </div>
        <Divider />
        <div className="flex flex-col items-start justify-center w-full p-3 px-8 mb-1 rounded-lg shadow-xl">
          <div className="mb-2 text-lg font-bold rounded-md">Brand</div>
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full transition-all cursor-pointer hover:scale-[1.02] outline-0 "
          >
            {allBrands.map((brand, index) => {
              return (
                <option value={brand} key={index}>
                  {brand}
                </option>
              );
            })}
          </select>
        </div>
        <button
          className="flex items-center justify-center p-2 px-4 my-3 text-sm font-semibold text-white transition-all bg-red-500 rounded-lg hover:scale-[1.02]"
          onClick={clearFilters}
        >
          Clear Filter
        </button>
      </div>
    </div>
  );
};

export default ProductFilter;
