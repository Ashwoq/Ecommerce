import React, { useState } from "react";
import { CountryDropdown } from "react-country-region-selector";
import {
  SAVE_BILLING_ADDRESS,
  SAVE_SHIPPING_ADDRESS,
} from "../../redux/slice/checkoutSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckOutSummary from "../../Components/CheckOutSummary/CheckOutSummary";
import { Divider } from "@mui/material";

const initialAddressState = {
  name: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "",
  phone: "",
};
const CheckOutDetails = () => {
  const dispatch = useDispatch();
  const location = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddressState,
  });
  const [billingAddress, setBillingAddress] = useState({
    ...initialAddressState,
  });

  const handleShipping = (e) => {
    const { name, value } = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };

  const handleBilling = (e) => {
    const { name, value } = e.target;
    setBillingAddress({
      ...billingAddress,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress));
    dispatch(SAVE_BILLING_ADDRESS(billingAddress));
    location("/checkout");
  };

  return (
    <div className="max-w-6xl bg-gray-300 cursor-default lg:mx-auto xs:mx-5 ">
      <div className="bg-white xs:mt-4 lg:mt-10 my-7 xs:p-4 lg:p-5 rounded-xl">
        <h2 className="font-semibold lg:text-2xl xs:text-base">
          Delivery Address
        </h2>
      </div>

      <div className="flex justify-around p-5 mx-auto lg:bg-gray-400 rounded-xl xs:bg-white">
        <form
          onSubmit={handleSubmit}
          className="lg:p-5 xs:p-0 xs:w-full lg:w-[65%] xs:bg-gray lg:bg-white rounded-xl space-y-10"
        >
          <div className="mb-3 space-y-5 rounded-xl">
            <div>
              <div className="mb-3 font-bold xs:text-base lg:text-2xl">
                Shipping Address
              </div>
              <div className="font-bold xs:text-xs lg:text-sm ">
                Receipient Name
              </div>
              <input
                className="w-full p-3 bg-gray-300 rounded-lg lg:text-base xs:text-sm"
                type="text"
                required
                placeholder="Receipient Name"
                name="name"
                value={shippingAddress.name}
                onChange={(e) => handleShipping(e)}
              />
              {/* <label>Receipient Name</label>
            <input
              type="text"
              required
              placeholder="Receipient Name"
              name="name"
              value={shippingAddress.name}
              onChange={(e) => handleShipping(e)}
            /> */}
            </div>
            <div>
              {/* <label>Address Line 1</label> */}
              <div className="font-bold xs:text-xs lg:text-sm">
                Address Line 1
              </div>
              <input
                className="w-full p-3 bg-gray-300 rounded-lg lg:text-base xs:text-sm"
                type="text"
                required
                placeholder="Line 1"
                name="line1"
                value={shippingAddress.line1}
                onChange={(e) => handleShipping(e)}
              />
            </div>
            <div>
              <div className="font-bold xs:text-xs lg:text-sm">
                Address Line 2
              </div>
              <input
                className="w-full p-3 bg-gray-300 rounded-lg outline-none lg:text-base xs:text-sm"
                type="text"
                required
                placeholder="Line 2"
                name="line2"
                value={shippingAddress.line2}
                onChange={(e) => handleShipping(e)}
              />
            </div>
            <div>
              {/* <label>city</label> */}
              <div className="font-bold xs:text-xs lg:text-sm">city</div>
              <input
                className="w-full p-3 bg-gray-300 rounded-lg lg:text-base xs:text-sm"
                type="text"
                required
                placeholder="city"
                name="city"
                value={shippingAddress.city}
                onChange={(e) => handleShipping(e)}
              />
            </div>
            <div>
              <div className="font-bold xs:text-xs lg:text-sm">state</div>
              {/* <label>state</label> */}
              <input
                type="text"
                required
                placeholder="state"
                className="w-full p-3 bg-gray-300 rounded-lg lg:text-base xs:text-sm"
                name="state"
                value={shippingAddress.state}
                onChange={(e) => handleShipping(e)}
              />
            </div>

            <div>
              {/* <label>postal code</label> */}
              <div className="font-bold xs:text-xs lg:text-sm">postal code</div>
              <input
                type="number"
                className="w-full p-3 bg-gray-300 rounded-lg lg:text-base xs:text-sm"
                required
                placeholder="postal code"
                name="postal_code"
                value={shippingAddress.postal_code}
                onChange={(e) => handleShipping(e)}
              />
            </div>
            <div>
              <div className="font-bold xs:text-xs lg:text-sm">Country</div>
              {/* <label>Country</label> */}
              <CountryDropdown
                className="w-full p-3 bg-gray-300 rounded-lg outline-none lg:text-base xs:text-sm"
                valueType="short"
                value={shippingAddress.country}
                onChange={(val) =>
                  handleShipping({
                    target: {
                      name: "country",
                      value: val,
                    },
                  })
                }
              />
            </div>
            <div>
              {/* <label>Phone Number</label> */}
              <div className="font-bold xs:text-xs lg:text-sm">
                Phone Number
              </div>
              <input
                className="w-full p-3 bg-gray-300 rounded-lg lg:text-base xs:text-sm"
                type="text"
                required
                placeholder="Phone Number"
                name="phone"
                value={shippingAddress.phone}
                onChange={(e) => handleShipping(e)}
              />
            </div>
          </div>
          <Divider />
          <div className="space-y-5 ">
            <div>
              <div className="mb-3 font-bold xs:text-base lg:text-2xl">
                Billing Address
              </div>
              <div className="font-bold xs:text-xs lg:text-sm ">
                Receipient Name
              </div>
              <input
                className="w-full p-3 bg-gray-300 rounded-lg lg:text-base xs:text-sm"
                type="text"
                required
                placeholder="Name"
                name="name"
                value={billingAddress.name}
                onChange={(e) => handleBilling(e)}
              />
            </div>
            {/* <h3>Billing Address</h3> */}
            {/* <label>Name</label>
            <input
              type="text"
              required
              placeholder="Name"
              name="name"
              value={billingAddress.name}
              onChange={(e) => handleBilling(e)}
            /> */}
            <div>
              <div className="font-bold xs:text-xs lg:text-sm">
                Address Line 1
              </div>
              <input
                className="w-full p-3 bg-gray-300 rounded-lg lg:text-base xs:text-sm"
                type="text"
                required
                placeholder="Line 1"
                name="line1"
                value={billingAddress.line1}
                onChange={(e) => handleBilling(e)}
              />
            </div>
            <div>
              <div className="font-bold xs:text-xs lg:text-sm">
                Address Line 2
              </div>
              <input
                className="w-full p-3 bg-gray-300 rounded-lg lg:text-base xs:text-sm"
                type="text"
                required
                placeholder="Line 2"
                name="line2"
                value={billingAddress.line2}
                onChange={(e) => handleBilling(e)}
              />
            </div>
            <div>
              <div className="font-bold xs:text-xs lg:text-sm">city</div>
              <input
                className="w-full p-3 bg-gray-300 rounded-lg lg:text-base xs:text-sm"
                type="text"
                required
                placeholder="city"
                name="city"
                value={billingAddress.city}
                onChange={(e) => handleBilling(e)}
              />
            </div>
            <div>
              <div className="font-bold xs:text-xs lg:text-sm">state</div>
              <input
                className="w-full p-3 bg-gray-300 rounded-lg lg:text-base xs:text-sm"
                type="text"
                required
                placeholder="state"
                name="state"
                value={billingAddress.state}
                onChange={(e) => handleBilling(e)}
              />
            </div>
            <div>
              <div className="font-bold xs:text-xs lg:text-sm">postal code</div>
              <input
                className="w-full p-3 bg-gray-300 rounded-lg lg:text-base xs:text-sm"
                type="number"
                required
                placeholder="postal code"
                name="postal_code"
                value={shippingAddress.postal_code}
                onChange={(e) => handleBilling(e)}
              />
            </div>
            <div>
              <div className="font-bold xs:text-xs lg:text-sm">Country</div>
              <CountryDropdown
                // className="bg-red-900"
                className="w-full p-3 bg-gray-300 rounded-lg outline-none lg:text-base xs:text-sm"
                valueType="short"
                value={shippingAddress.country}
                onChange={(val) =>
                  handleBilling({
                    target: {
                      name: "country",
                      value: val,
                    },
                  })
                }
              />
            </div>
            <div>
              <div className="font-bold xs:text-xs lg:text-sm">
                Phone Number
              </div>
              <input
                className="w-full p-3 bg-gray-300 rounded-lg lg:text-base xs:text-sm"
                type="text"
                required
                placeholder="Phone Number"
                name="phone"
                value={billingAddress.phone}
                onChange={(e) => handleBilling(e)}
              />
            </div>
            <button
              className="p-2 px-4 text-white transition-all bg-blue-500 rounded-lg lg:text-base xs:text-sm hover:scale-105"
              type="submit"
            >
              Proceed toCheckout
            </button>
          </div>
        </form>
        <div className="lg:flex xs:hidden">
          <CheckOutSummary />
        </div>
      </div>
    </div>
  );
};

export default CheckOutDetails;
