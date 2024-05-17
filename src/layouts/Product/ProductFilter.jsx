import { Divider } from "@mui/material";
import { Star, StarBorder } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMaxPrice,
  selectMinPrice,
  selectProducts,
} from "../../redux/slice/productSlice";
import { useEffect, useState } from "react";
import {
  FILTER_BY_BRAND,
  FILTER_BY_CATEGORY,
  FILTER_BY_PRICE,
} from "../../redux/slice/filterSlice";

const ProductFilter = () => {
  const products = useSelector(selectProducts);
  const minPrice = useSelector(selectMinPrice);
  const maxPrice = useSelector(selectMaxPrice);

  const dispatch = useDispatch();

  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [price, setPrice] = useState(1000000);

  const allCategories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];
  const allBrands = [
    "All",
    ...new Set(products.map((product) => product.brand)),
  ];
  // console.log(allBrands);

  useEffect(() => {
    dispatch(FILTER_BY_BRAND({ products, brand }));
  }, [dispatch, products, brand]);

  useEffect(() => {
    dispatch(FILTER_BY_PRICE({ products, price }));
  }, [dispatch, products, price]);

  const filterProducts = (cat) => {
    setCategory(cat);
    dispatch(FILTER_BY_CATEGORY({ products, category: cat }));
  };

  const clearFilters = () => {
    setCategory("All");
    setBrand("All");
    setPrice(maxPrice);
  };

  return (
    <div className="bg-gray-100 cursor-default">
      <div className="bg-rd-100 justify-center grid gap-4 lg:w-60 xs:w-40 pt-4  text-[15px]">
        <div className="p-1 px-3 mb-2 text-lg font-bold text-black bg-yellow-300 rounded-lg w-max">
          Product Filter
        </div>
        <div
          className="flex flex-col items-start p-3 px-5 mb-1
        shadow-[0_8px_30px_rgb(0,0,0,0.12)]
         font-semibold bg-yellow-200 rounded-lg w-max"
        >
          <div className="p-1 px-2 my-1 mb-3 bg-gray-100 rounded-md">
            Categories
          </div>
          {allCategories.map((cat, index) => {
            return (
              <button
                key={index}
                type="button"
                onClick={() => filterProducts(cat)}
                className={"hover:scale-105 transition-all"}
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

        <div
          className="flex flex-col items-start p-3 px-5 mb-1 
        shadow-[0_8px_30px_rgb(0,0,0,0.12)]
        font-semibold bg-yellow-200 rounded-lg w-max"
        >
          <div className="p-1 px-2 mb-3 bg-gray-100 rounded-md">Price</div>{" "}
          <p className="">{price}</p>
          <input
            type="range"
            className={
              "hover:scale-105 transition-all outline-0 cursor-pointer"
            }
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            min={minPrice}
            max={maxPrice}
          />
        </div>
        <div
          className="flex flex-col items-start p-3 px-5 mb-1 
        shadow-[0_8px_30px_rgb(0,0,0,0.12)]
        font-semibold bg-yellow-200  rounded-lg w-max"
        >
          <div className="p-1 px-2 mb-3 bg-gray-100 rounded-md">Brand</div>{" "}
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="transition-all cursor-pointer hover:scale-105 outline-0 "
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
          className="flex items-center justify-center p-1 px-4 my-3 text-sm font-semibold text-white transition-all bg-red-500 rounded-lg hover:scale-105 w-max"
          onClick={clearFilters}
        >
          Clear Filter
        </button>
        {/*    

         <div className="flex flex-col items-start mb-1 font-semibold bg-blu-500 ">
          Delivery Day
          <label className="font-normal bg-rd-100 ">
            <input type="checkbox" className="w-3 h-3 mr-1" />
            Get It by Tomorrow
          </label>
          <label className="font-normal ">
            <input type="checkbox" className="w-3 h-3 mr-1" />
            Get It in 2 Days
          </label>
        </div>
        <Divider />
        
         {/* <div className="font-normal ">Under ₹1,000</div>
          <div className="font-normal ">₹1,000 - ₹5,000</div>
          <div className="font-normal ">₹5,000 - ₹10,000</div>
          <div className="font-normal ">₹10,000 - ₹20,000</div>
          <div className="font-normal ">Over ₹20,000</div> 
        <div className="my-4 font-medium bg-blu-700">
          Customers Review
          <div className="flex text-xs font-normal ">
            <Star fontSize="small" className="text-[#ffa41c] " />
            <Star fontSize="small" className="text-[#ffa41c] " />
            <Star fontSize="small" className="text-[#ffa41c] " />
            <Star fontSize="small" className="text-[#ffa41c] " />
            <StarBorder fontSize="small" className="text-[#ffa41c] " /> & Up
            {Array(3)
              .fill()
              .map((_, i) => (
                <div key={i} className="flex text-xs font-normal">
                  <Star fontSize="small" className="text-[#ffa41c] " />
                </div>
              ))}
          </div>
          <div className="flex text-xs font-normal ">
            <Star fontSize="small" className="text-[#ffa41c] " />
            <Star fontSize="small" className="text-[#ffa41c] " />
            <Star fontSize="small" className="text-[#ffa41c] " />
            <StarBorder fontSize="small" className="text-[#ffa41c] " />{" "}
            <StarBorder fontSize="small" className="text-[#ffa41c] " /> & Up
          </div>
          <div className="flex text-xs font-normal ">
            <Star fontSize="small" className="text-[#ffa41c] " />
            <Star fontSize="small" className="text-[#ffa41c] " />
            <StarBorder fontSize="small" className="text-[#ffa41c] " />
            <StarBorder fontSize="small" className="text-[#ffa41c] " />
            <StarBorder fontSize="small" className="text-[#ffa41c] " />& Up
          </div>
        </div>
        <div className="flex flex-col items-start my-4 font-medium bg-blu-100">
          Brands
          <label className="flex items-center font-normal ">
            <input type="checkbox" className="w-3 h-3 mr-1" />
            realme
          </label>
          <label className="flex items-center font-normal ">
            <input type="checkbox" className="w-3 h-3 mr-1" />
            OnePlus
          </label>
          <label className="flex items-center font-normal ">
            <input type="checkbox" className="w-3 h-3 mr-1" />
            Redmi
          </label>
          <label className="flex items-center font-normal ">
            <input type="checkbox" className="w-3 h-3 mr-1" />
            Apple
          </label>
          <label className="flex items-center font-normal ">
            <input type="checkbox" className="w-3 h-3 mr-1" />
            Samsung
          </label>
          <label className="flex items-center font-normal ">
            <input type="checkbox" className="w-3 h-3 mr-1" />
            Nothing
          </label>
          <label className="flex items-center font-normal ">
            <input type="checkbox" className="w-3 h-3 mr-1" />
            POCO
          </label>
          <label className="flex items-center font-normal ">
            <input type="checkbox" className="w-3 h-3 mr-1" />
            Vivo
          </label>
          <label className="flex items-center font-normal ">
            <input type="checkbox" className="w-3 h-3 mr-1" />
            IQOO
          </label>
          <label className="flex items-center font-normal ">
            <input type="checkbox" className="w-3 h-3 mr-1" />
            Nokia
          </label>
          <label className="flex items-center font-normal ">
            <input type="checkbox" className="w-3 h-3 mr-1" />
            Motorola
          </label>
        </div>
        <div className="my-4 font-medium bg-blu-900">
          Deals & Discounts
          <div className="font-normal ">All Discounts</div>
          <div className="font-normal ">Today's Deals</div>
        </div>
        <div className="flex flex-col items-start my-4 font-medium bg-blu-500">
          Cellular Phone Memory Storage Capacity{" "}
          <label className="flex items-center font-normal ">
            <input type="checkbox" className="w-3 h-3 mr-1" />
            Up to 3.9 GB
          </label>
          <label className="flex items-center font-normal ">
            <input type="checkbox" className="w-3 h-3 mr-1" />4 GB
          </label>
          <label className="flex items-center font-normal ">
            <input type="checkbox" className="w-3 h-3 mr-1" />8 GB
          </label>
          <label className="flex items-center font-normal ">
            <input type="checkbox" className="w-3 h-3 mr-1" />
            16 GB
          </label>
          <label className="flex items-center font-normal ">
            <input type="checkbox" className="w-3 h-3 mr-1" />
            32 GB
          </label>
          <label className="flex items-center font-normal ">
            <input type="checkbox" className="w-3 h-3 mr-1" />
            64 GB
          </label>
          <label className="flex items-center font-normal ">
            <input type="checkbox" className="w-3 h-3 mr-1" />
            128 GB
          </label>
          <label className="flex items-center font-normal ">
            <input type="checkbox" className="w-3 h-3 mr-1" />
            256 GB
          </label>
          <label className="flex items-center font-normal ">
            <input type="checkbox" className="w-3 h-3 mr-1" />
            512 GB & above
          </label>
        </div>
        <div className="flex flex-col items-start my-4 font-medium bg-blu-400">
          Pay On Delivery
          <label className="flex items-center font-normal ">
            <input type="checkbox" className="w-3 h-3 mr-1" />
            Eligible for Pay On Delivery
          </label>
        </div>
        <div className="flex flex-col items-start my-4 font-medium bg-blu-700">
          Processor Speed
          <label className="flex items-center font-normal ">
            <input type="checkbox" className="w-3 h-3 mr-1" />
            Less Than 0.99 GHz
          </label>
          <label className="flex items-center font-normal ">
            <input type="checkbox" className="w-3 h-3 mr-1" />1 - 1.49 GHz
          </label>
          <label className="flex items-center font-normal ">
            <input type="checkbox" className="w-3 h-3 mr-1" />
            1.50 - 1.99 GHz
          </label>
          <label className="flex items-center font-normal ">
            <input type="checkbox" className="w-3 h-3 mr-1" />
            2.00 - 2.49 GHz
          </label>
          <label className="flex items-center font-normal ">
            <input type="checkbox" className="w-3 h-3 mr-1" />
            2.50 GHz & Above{" "}
          </label>
        </div>
        <div className="flex flex-col items-start my-4 font-medium bg-blu-700">
          Battery Capacity
          <label className="flex items-center font-normal ">
            <input type="checkbox" className="w-3 h-3 mr-1" />
            Up to 2,999 mAh
          </label>
          <label className="flex items-center font-normal ">
            <input type="checkbox" className="w-3 h-3 mr-1" />
            3,000 to 3,999 mAh{" "}
          </label>
          <label className="flex items-center font-normal ">
            <input type="checkbox" className="w-3 h-3 mr-1" />
            4,000 to 4,999 mAh
          </label>
          <label className="flex items-center font-normal ">
            <input type="checkbox" className="w-3 h-3 mr-1" />
            5,000 to 5,999 mAh
          </label>
          <label className="flex items-center font-normal ">
            <input type="checkbox" className="w-3 h-3 mr-1" />
            6,000 mAh & Above
          </label>
        </div>
        <div className="flex flex-col items-start my-4 font-medium bg-blu-700">
          Mobile Phone Primary Camera Resolution
          <label className="flex items-center font-normal">
            <input type="checkbox" className="w-3 h-3 mr-1" />
            Up to 3.9 MP
          </label>
          <label className="flex items-center font-normal ">
            <input type="checkbox" className="w-3 h-3 mr-1" />4 - 7.9 MP{" "}
          </label>
          <label className="flex items-center font-normal ">
            <input type="checkbox" className="w-3 h-3 mr-1" />8 - 11.9 MP
          </label>
          <label className="flex items-center font-normal ">
            <input type="checkbox" className="w-3 h-3 mr-1" />
            12 - 15.9 MP{" "}
          </label>
          <label className="flex items-center font-normal ">
            <input type="checkbox" className="w-3 h-3 mr-1" />
            16 - 19.9 MP{" "}
          </label>
          <label className="flex items-center font-normal ">
            <input type="checkbox" className="w-3 h-3 mr-1" />
            20 - 23.9 MP
          </label>
          <label className="flex items-center font-normal ">
            <input type="checkbox" className="w-3 h-3 mr-1" />
            32 MP & Above{" "}
          </label>
        </div>
        <div className="flex flex-col items-start my-4 font-medium bg-blu-700">
          Lens Type{" "}
          <label className="flex items-center font-normal">
            <input type="checkbox" className="w-3 h-3 mr-1" />
            Macro{" "}
          </label>
          <label className="flex items-center font-normal ">
            <input type="checkbox" className="w-3 h-3 mr-1" />
            Ultra Wide{" "}
          </label>
          <label className="flex items-center font-normal ">
            <input type="checkbox" className="w-3 h-3 mr-1" />
            Wide Angle{" "}
          </label>
        </div>
        <div className="flex flex-col items-start my-4 font-medium bg-blu-700">
          Cellular Phone Battery Average Life
          <label className="flex items-center font-normal">
            <input type="checkbox" className="w-3 h-3 mr-1" />
            Up to 6.9 h
          </label>
          <label className="flex items-center font-normal ">
            <input type="checkbox" className="w-3 h-3 mr-1" />7 to 12.9 h
          </label>
          <label className="flex items-center font-normal ">
            <input type="checkbox" className="w-3 h-3 mr-1" />
            13 to 18.9 h
          </label>
          <label className="flex items-center font-normal ">
            <input type="checkbox" className="w-3 h-3 mr-1" />
            19 h & above
          </label>
        </div>{" "}
        */}
      </div>
    </div>
  );
};

export default ProductFilter;
