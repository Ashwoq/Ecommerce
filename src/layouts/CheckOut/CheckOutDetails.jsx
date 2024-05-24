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
  const [validated, setValidated] = useState(true);
  const [validationField, setValidationField] = useState(null);

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
    setValidated(false);
    if (
      shippingAddress.name.length > 2 &&
      shippingAddress.phone.length > 2 &&
      shippingAddress.line1.length > 2 &&
      shippingAddress.line2.length > 2 &&
      shippingAddress.city.length > 2 &&
      shippingAddress.state.length > 2 &&
      shippingAddress.postal_code.length > 2 &&
      billingAddress.name.length > 2 &&
      billingAddress.phone.length > 2 &&
      billingAddress.line1.length > 2 &&
      billingAddress.line2.length > 2 &&
      billingAddress.city.length > 2 &&
      billingAddress.state.length > 2 &&
      billingAddress.postal_code.length > 2
    ) {
      setValidated(true);
      setValidationField(null);
      dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress));
      dispatch(SAVE_BILLING_ADDRESS(billingAddress));
      location("/checkout");
    } else {
      setValidated(false);
      if (shippingAddress.name.length <= 2) {
        window.scrollTo({ top: 50, behavior: "smooth" });
        setValidationField("sname");
      } else if (shippingAddress.phone.length <= 2) {
        window.scrollTo({ top: 50, behavior: "smooth" });
        setValidationField("sphone");
      } else if (shippingAddress.line1.length <= 2) {
        window.scrollTo({ top: 120, behavior: "smooth" });
        setValidationField("sline1");
      } else if (shippingAddress.line2.length <= 2) {
        window.scrollTo({ top: 210, behavior: "smooth" });
        setValidationField("sline2");
      } else if (shippingAddress.city.length <= 2) {
        window.scrollTo({ top: 270, behavior: "smooth" });
        setValidationField("scity");
      } else if (shippingAddress.state.length <= 2) {
        window.scrollTo({ top: 370, behavior: "smooth" });
        setValidationField("sstate");
      } else if (shippingAddress.postal_code.length <= 2) {
        window.scrollTo({ top: 370, behavior: "smooth" });
        setValidationField("spostal");
      }
      // else if (shippingAddress.country.length <= 2) {
      //   window.scrollTo({ top: 370, behavior: "smooth" });
      //   setValidationField("scountry");
      // }
      else if (billingAddress.name.length <= 2) {
        window.scrollTo({ top: 530, behavior: "smooth" });
        setValidationField("bname");
      } else if (billingAddress.phone.length <= 2) {
        window.scrollTo({ top: 530, behavior: "smooth" });
        setValidationField("bphone");
      } else if (billingAddress.line1.length <= 2) {
        window.scrollTo({ top: 600, behavior: "smooth" });
        setValidationField("bline1");
      } else if (billingAddress.line2.length <= 2) {
        window.scrollTo({ top: 600, behavior: "smooth" });
        setValidationField("bline2");
      } else if (billingAddress.city.length <= 2) {
        window.scrollTo({ top: 600, behavior: "smooth" });
        setValidationField("bscity");
      } else if (billingAddress.state.length <= 2) {
        window.scrollTo({ top: 600, behavior: "smooth" });
        setValidationField("bstate");
      } else if (billingAddress.postal_code.length <= 2) {
        window.scrollTo({ top: 600, behavior: "smooth" });
        setValidationField("bpostal");
      }
      // else if (billingAddress.country.length <= 2) {
      //   window.scrollTo({ top: 600, behavior: "smooth" });
      //   setValidationField("bcountry");
      // }
    }
  };

  return (
    <div className="bg-white cursor-default xs:p-5 lg:p-10 py-14 lg:mx-auto xs:mx-0 ">
      {/* <div className="bg-white xs:mt-4 lg:mt-10 my-7 xs:p-4 lg:p-5 rounded-xl">
        <h2 className="font-semibold lg:text-2xl xs:text-base">
          Delivery Address
        </h2>
      </div> */}
      <div className="justify-between lg:flex xs:block rounded-xl ">
        <form
          onSubmit={handleSubmit}
          className="lg:p-7 xs:p-3 shadow-[rgba(0,_0,_0,_0.2)_0px_15px_80px] xs:w-full lg:w-[65%] xs:bg-white lg:bg-white rounded-xl space-y-10"
        >
          <div className="mb-3 xs:space-y-2 lg:space-y-5 rounded-xl">
            <div>
              <div className="mb-3 font-bold xs:text-base lg:text-2xl">
                Shipping Address
              </div>
              <div className="flex justify-between gap-7">
                <div className="w-full">
                  <div className="font-bold xs:text-xs lg:text-sm ">
                    Receipient Name
                  </div>
                  <input
                    className={`w-full p-3 bg-gray-300 rounded-lg lg:text-base xs:text-sm ${
                      validationField === "sname"
                        ? "outline-red-500 outline outline-2 animate-shake-delay"
                        : "outline-0"
                    }`}
                    type="text"
                    // required
                    placeholder="Receipient Name"
                    name="name"
                    value={shippingAddress.name}
                    onChange={(e) => handleShipping(e)}
                  />
                  <div
                    className={`${
                      validationField === "sname" ? "opacity-100" : "opacity-0"
                    } text-[11px] p-1 text-red-500 animate-shake-delay`}
                  >
                    Invalid Data
                  </div>
                </div>
                <div className="w-full">
                  {/* <label>Phone Number</label> */}
                  <div className="font-bold xs:text-xs lg:text-sm">
                    Phone Number
                  </div>
                  <input
                    className={`w-full p-3 bg-gray-300 rounded-lg lg:text-base xs:text-sm ${
                      validationField === "sphone"
                        ? "outline-red-500 outline outline-2 animate-shake-delay"
                        : "outline-0"
                    }`}
                    type="number"
                    // required
                    placeholder="Phone Number"
                    name="phone"
                    value={shippingAddress.phone}
                    onChange={(e) => handleShipping(e)}
                  />{" "}
                  <div
                    className={`${
                      validationField === "sphone" ? "opacity-100" : "opacity-0"
                    } text-[11px] p-1 text-red-500 animate-shake-delay`}
                  >
                    Invalid Data
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="font-bold xs:text-xs lg:text-sm">
                Address Line 1
              </div>
              <input
                className={`w-full p-3 bg-gray-300 rounded-lg lg:text-base xs:text-sm ${
                  validationField === "sline1"
                    ? "outline-red-500 outline outline-2 animate-shake-delay"
                    : "outline-0"
                }`}
                type="text"
                // required
                placeholder="Line 1"
                name="line1"
                value={shippingAddress.line1}
                onChange={(e) => handleShipping(e)}
              />
              <div
                className={`${
                  validationField === "sline1" ? "opacity-100" : "opacity-0"
                } text-[11px] p-1 text-red-500 animate-shake-delay`}
              >
                Invalid Data
              </div>
            </div>
            <div>
              <div className="font-bold xs:text-xs lg:text-sm">
                Address Line 2
              </div>
              <input
                className={`w-full p-3 bg-gray-300 rounded-lg lg:text-base xs:text-sm ${
                  validationField === "sline2"
                    ? "outline-red-500 outline outline-2 animate-shake-delay"
                    : "outline-0"
                }`}
                type="text"
                // required
                placeholder="Line 2"
                name="line2"
                value={shippingAddress.line2}
                onChange={(e) => handleShipping(e)}
              />
              <div
                className={`${
                  validationField === "sline2" ? "opacity-100" : "opacity-0"
                } text-[11px] p-1 text-red-500 animate-shake-delay`}
              >
                Invalid Data
              </div>
            </div>
            <div className="gap-3 lg:flex xs:grid xs:grid-cols-2">
              <div>
                <div className="font-bold xs:text-xs lg:text-sm">city</div>
                <input
                  className={`w-full p-3 bg-gray-300 rounded-lg lg:text-base xs:text-sm ${
                    validationField === "scity"
                      ? "outline-red-500 outline outline-2 animate-shake-delay"
                      : "outline-0"
                  }`}
                  type="text"
                  // required
                  placeholder="city"
                  name="city"
                  value={shippingAddress.city}
                  onChange={(e) => handleShipping(e)}
                />
                <div
                  className={`${
                    validationField === "scity" ? "opacity-100" : "opacity-0"
                  } text-[11px] p-1 text-red-500 animate-shake-delay`}
                >
                  Invalid Data
                </div>
              </div>
              <div>
                <div className="font-bold xs:text-xs lg:text-sm">state</div>
                {/* <label>state</label> */}
                <input
                  type="text"
                  // required
                  placeholder="state"
                  className={`w-full p-3 bg-gray-300 rounded-lg lg:text-base xs:text-sm ${
                    validationField === "sstate"
                      ? "outline-red-500 outline outline-2 animate-shake-delay"
                      : "outline-0"
                  }`}
                  name="state"
                  value={shippingAddress.state}
                  onChange={(e) => handleShipping(e)}
                />
                <div
                  className={`${
                    validationField === "sstate" ? "opacity-100" : "opacity-0"
                  } text-[11px] p-1 text-red-500 animate-shake-delay`}
                >
                  Invalid Data
                </div>
              </div>
              <div>
                <div className="font-bold xs:text-xs lg:text-sm">
                  postal code
                </div>
                <input
                  type="number"
                  className={`w-full p-3 bg-gray-300 rounded-lg lg:text-base xs:text-sm ${
                    validationField === "spostal"
                      ? "outline-red-500 outline outline-2 animate-shake-delay"
                      : "outline-0"
                  }`}
                  // required
                  placeholder="postal code"
                  name="postal_code"
                  value={shippingAddress.postal_code}
                  onChange={(e) => handleShipping(e)}
                />
                <div
                  className={`${
                    validationField === "spostal" ? "opacity-100" : "opacity-0"
                  } text-[11px] p-1 text-red-500 animate-shake-delay`}
                >
                  Invalid Data
                </div>
              </div>
              <div>
                <div className="font-bold xs:text-xs lg:text-sm">Country</div>
                <CountryDropdown
                  className={`w-full p-[14px] bg-gray-300 rounded-lg outline-none lg:text-base xs:text-sm ${
                    validationField === "scountry"
                      ? "outline-red-500 outline outline-2 animate-shake-delay"
                      : "outline-0"
                  }`}
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
                <div
                  className={`${
                    validationField === "scountry" ? "opacity-100" : "opacity-0"
                  } text-[11px] p-1 text-red-500 animate-shake-delay`}
                >
                  Invalid Data
                </div>
              </div>
            </div>
          </div>
          <Divider />
          <div className="mb-3 xs:space-y-2 lg:space-y-5 rounded-xl">
            <div>
              <div className="mb-3 font-bold xs:text-base lg:text-2xl">
                Billing Address
              </div>
              <div className="flex justify-between gap-7">
                <div className="w-full">
                  <div className="font-bold xs:text-xs lg:text-sm ">
                    Receipient Name
                  </div>
                  <input
                    className={`w-full p-3 bg-gray-300 rounded-lg lg:text-base xs:text-sm ${
                      validationField === "bname"
                        ? "outline-red-500 outline outline-2 animate-shake-delay"
                        : "outline-0"
                    }`}
                    type="text"
                    // required
                    placeholder="Name"
                    name="name"
                    value={billingAddress.name}
                    onChange={(e) => handleBilling(e)}
                  />
                  <div
                    className={`${
                      validationField === "bname" ? "opacity-100" : "opacity-0"
                    } text-[11px] p-1 text-red-500 animate-shake-delay`}
                  >
                    Invalid Data
                  </div>
                </div>
                <div className="w-full">
                  <div className="font-bold xs:text-xs lg:text-sm">
                    Phone Number
                  </div>
                  <input
                    className={`w-full p-3 bg-gray-300 rounded-lg lg:text-base xs:text-sm ${
                      validationField === "bphone"
                        ? "outline-red-500 outline outline-2 animate-shake-delay"
                        : "outline-0"
                    }`}
                    type="text"
                    // required
                    placeholder="Phone Number"
                    name="phone"
                    value={billingAddress.phone}
                    onChange={(e) => handleBilling(e)}
                  />
                  <div
                    className={`${
                      validationField === "bphone" ? "opacity-100" : "opacity-0"
                    } text-[11px] p-1 text-red-500 animate-shake-delay`}
                  >
                    Invalid Data
                  </div>
                </div>
              </div>
            </div>
            <div>
              {" "}
              <div className="font-bold xs:text-xs lg:text-sm">
                Address Line 1
              </div>
              <input
                className={`w-full p-3 bg-gray-300 rounded-lg lg:text-base xs:text-sm ${
                  validationField === "bline1"
                    ? "outline-red-500 outline outline-2 animate-shake-delay"
                    : "outline-0"
                }`}
                type="text"
                // required
                placeholder="Line 1"
                name="line1"
                value={billingAddress.line1}
                onChange={(e) => handleBilling(e)}
              />
              <div
                className={`${
                  validationField === "bline1" ? "opacity-100" : "opacity-0"
                } text-[11px] p-1 text-red-500 animate-shake-delay`}
              >
                Invalid Data
              </div>
            </div>
            <div>
              <div className="font-bold xs:text-xs lg:text-sm">
                Address Line 2
              </div>
              <input
                className={`w-full p-3 bg-gray-300 rounded-lg lg:text-base xs:text-sm ${
                  validationField === "bline2"
                    ? "outline-red-500 outline outline-2 animate-shake-delay"
                    : "outline-0"
                }`}
                type="text"
                // required
                placeholder="Line 2"
                name="line2"
                value={billingAddress.line2}
                onChange={(e) => handleBilling(e)}
              />
              <div
                className={`${
                  validationField === "bline2" ? "opacity-100" : "opacity-0"
                } text-[11px] p-1 text-red-500 animate-shake-delay`}
              >
                Invalid Data
              </div>
            </div>
            <div className="gap-3 lg:flex xs:grid xs:grid-cols-2">
              <div>
                <div className="font-bold xs:text-xs lg:text-sm">city</div>
                <input
                  className={`w-full p-3 bg-gray-300 rounded-lg lg:text-base xs:text-sm ${
                    validationField === "bcity"
                      ? "outline-red-500 outline outline-2 animate-shake-delay"
                      : "outline-0"
                  }`}
                  type="text"
                  // required
                  placeholder="city"
                  name="city"
                  value={billingAddress.city}
                  onChange={(e) => handleBilling(e)}
                />
                <div
                  className={`${
                    validationField === "bcity" ? "opacity-100" : "opacity-0"
                  } text-[11px] p-1 text-red-500 animate-shake-delay`}
                >
                  Invalid Data
                </div>
              </div>
              <div>
                <div className="font-bold xs:text-xs lg:text-sm">state</div>
                <input
                  className="w-full p-3 bg-gray-300 rounded-lg lg:text-base xs:text-sm"
                  type="text"
                  // required
                  placeholder="state"
                  name="state"
                  value={billingAddress.state}
                  onChange={(e) => handleBilling(e)}
                />
                <div
                  className={`${
                    validationField === "bstate" ? "opacity-100" : "opacity-0"
                  } text-[11px] p-1 text-red-500 animate-shake-delay`}
                >
                  Invalid Data
                </div>
              </div>
              <div>
                <div className="font-bold xs:text-xs lg:text-sm">
                  postal code
                </div>
                <input
                  className={`w-full p-3 bg-gray-300 rounded-lg lg:text-base xs:text-sm ${
                    validationField === "bpostal"
                      ? "outline-red-500 outline outline-2 animate-shake-delay"
                      : "outline-0"
                  }`}
                  type="text"
                  // required
                  placeholder="postal code"
                  name="postal_code"
                  value={billingAddress.postal_code}
                  onChange={(e) => handleBilling(e)}
                />
                <div
                  className={`${
                    validationField === "bpostal" ? "opacity-100" : "opacity-0"
                  } text-[11px] p-1 text-red-500 animate-shake-delay`}
                >
                  Invalid Data
                </div>
              </div>
              <div>
                <div className="font-bold xs:text-xs lg:text-sm">Country</div>
                <CountryDropdown
                  // className="bg-red-900"
                  className="w-full p-3 bg-gray-300 rounded-lg outline-none lg:text-base xs:text-sm"
                  valueType="short"
                  value={billingAddress.country}
                  onChange={(val) =>
                    handleBilling({
                      target: {
                        name: "country",
                        value: val,
                      },
                    })
                  }
                />
                <div
                  className={`${
                    validationField === "bcountry" ? "opacity-100" : "opacity-0"
                  } text-[11px] p-1 text-red-500 animate-shake-delay`}
                >
                  Invalid Data
                </div>
              </div>
            </div>
          </div>
          <button
            className="p-2 px-5 text-white transition-all rounded-xl bluegradient lg:text-lg xs:text-sm hover:scale-[1.02]"
            type="submit"
          >
            Proceed to Payment
          </button>
        </form>
        <div className="xs:w-full lg:w-[32%] flex flex-col rounded-xl bg-hite space-y-5">
          <CheckOutSummary />
          {/* <button
            className="p-2 px-5 text-white transition-all mx-auto rounded-xl bluegradient lg:text-lg xs:text-sm hover:scale-[1.02]"
            type="submit"
            onSubmit={handleSubmit}
          >
            Proceed to Payment
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default CheckOutDetails;

// return (
//   <div className="max-w-6xl bg-gray-300 cursor-default lg:mx-auto xs:mx-5 ">
//     <div className="bg-white xs:mt-4 lg:mt-10 my-7 xs:p-4 lg:p-5 rounded-xl">
//       <h2 className="font-semibold lg:text-2xl xs:text-base">
//         Delivery Address
//       </h2>
//     </div>

//     <div className="flex justify-around p-5 mx-auto lg:bg-gray-400 rounded-xl xs:bg-white">
//       <form
//         onSubmit={handleSubmit}
//         className="lg:p-5 xs:p-0 xs:w-full lg:w-[65%] xs:bg-gray lg:bg-white rounded-xl space-y-10"
//       >
//         <div className="mb-3 space-y-5 rounded-xl">
//           <div>
//             <div className="mb-3 font-bold xs:text-base lg:text-2xl">
//               Shipping Address
//             </div>
//             <div className="font-bold xs:text-xs lg:text-sm ">
//               Receipient Name
//             </div>
//             <input
//               className="w-full p-3 bg-gray-300 rounded-lg lg:text-base xs:text-sm"
//               type="text"
//               required
//               placeholder="Receipient Name"
//               name="name"
//               value={shippingAddress.name}
//               onChange={(e) => handleShipping(e)}
//             />
//             {/* <label>Receipient Name</label>
//           <input
//             type="text"
//             required
//             placeholder="Receipient Name"
//             name="name"
//             value={shippingAddress.name}
//             onChange={(e) => handleShipping(e)}
//           /> */}
//           </div>
//           <div>
//             {/* <label>Address Line 1</label> */}
//             <div className="font-bold xs:text-xs lg:text-sm">
//               Address Line 1
//             </div>
//             <input
//               className="w-full p-3 bg-gray-300 rounded-lg lg:text-base xs:text-sm"
//               type="text"
//               required
//               placeholder="Line 1"
//               name="line1"
//               value={shippingAddress.line1}
//               onChange={(e) => handleShipping(e)}
//             />
//           </div>
//           <div>
//             <div className="font-bold xs:text-xs lg:text-sm">
//               Address Line 2
//             </div>
//             <input
//               className="w-full p-3 bg-gray-300 rounded-lg outline-none lg:text-base xs:text-sm"
//               type="text"
//               required
//               placeholder="Line 2"
//               name="line2"
//               value={shippingAddress.line2}
//               onChange={(e) => handleShipping(e)}
//             />
//           </div>
//           <div>
//             {/* <label>city</label> */}
//             <div className="font-bold xs:text-xs lg:text-sm">city</div>
//             <input
//               className="w-full p-3 bg-gray-300 rounded-lg lg:text-base xs:text-sm"
//               type="text"
//               required
//               placeholder="city"
//               name="city"
//               value={shippingAddress.city}
//               onChange={(e) => handleShipping(e)}
//             />
//           </div>
//           <div>
//             <div className="font-bold xs:text-xs lg:text-sm">state</div>
//             {/* <label>state</label> */}
//             <input
//               type="text"
//               required
//               placeholder="state"
//               className="w-full p-3 bg-gray-300 rounded-lg lg:text-base xs:text-sm"
//               name="state"
//               value={shippingAddress.state}
//               onChange={(e) => handleShipping(e)}
//             />
//           </div>

//           <div>
//             {/* <label>postal code</label> */}
//             <div className="font-bold xs:text-xs lg:text-sm">postal code</div>
//             <input
//               type="number"
//               className="w-full p-3 bg-gray-300 rounded-lg lg:text-base xs:text-sm"
//               required
//               placeholder="postal code"
//               name="postal_code"
//               value={shippingAddress.postal_code}
//               onChange={(e) => handleShipping(e)}
//             />
//           </div>
//           <div>
//             <div className="font-bold xs:text-xs lg:text-sm">Country</div>
//             {/* <label>Country</label> */}
//             <CountryDropdown
//               className="w-full p-3 bg-gray-300 rounded-lg outline-none lg:text-base xs:text-sm"
//               valueType="short"
//               value={shippingAddress.country}
//               onChange={(val) =>
//                 handleShipping({
//                   target: {
//                     name: "country",
//                     value: val,
//                   },
//                 })
//               }
//             />
//           </div>
//           <div>
//             {/* <label>Phone Number</label> */}
//             <div className="font-bold xs:text-xs lg:text-sm">
//               Phone Number
//             </div>
//             <input
//               className="w-full p-3 bg-gray-300 rounded-lg lg:text-base xs:text-sm"
//               type="text"
//               required
//               placeholder="Phone Number"
//               name="phone"
//               value={shippingAddress.phone}
//               onChange={(e) => handleShipping(e)}
//             />
//           </div>
//         </div>
//         <Divider />
//         <div className="space-y-5 ">
//           <div>
//             <div className="mb-3 font-bold xs:text-base lg:text-2xl">
//               Billing Address
//             </div>
//             <div className="font-bold xs:text-xs lg:text-sm ">
//               Receipient Name
//             </div>
//             <input
//               className="w-full p-3 bg-gray-300 rounded-lg lg:text-base xs:text-sm"
//               type="text"
//               required
//               placeholder="Name"
//               name="name"
//               value={billingAddress.name}
//               onChange={(e) => handleBilling(e)}
//             />
//           </div>
//           {/* <h3>Billing Address</h3> */}
//           {/* <label>Name</label>
//           <input
//             type="text"
//             required
//             placeholder="Name"
//             name="name"
//             value={billingAddress.name}
//             onChange={(e) => handleBilling(e)}
//           /> */}
//           <div>
//             <div className="font-bold xs:text-xs lg:text-sm">
//               Address Line 1
//             </div>
//             <input
//               className="w-full p-3 bg-gray-300 rounded-lg lg:text-base xs:text-sm"
//               type="text"
//               required
//               placeholder="Line 1"
//               name="line1"
//               value={billingAddress.line1}
//               onChange={(e) => handleBilling(e)}
//             />
//           </div>
//           <div>
//             <div className="font-bold xs:text-xs lg:text-sm">
//               Address Line 2
//             </div>
//             <input
//               className="w-full p-3 bg-gray-300 rounded-lg lg:text-base xs:text-sm"
//               type="text"
//               required
//               placeholder="Line 2"
//               name="line2"
//               value={billingAddress.line2}
//               onChange={(e) => handleBilling(e)}
//             />
//           </div>
//           <div>
//             <div className="font-bold xs:text-xs lg:text-sm">city</div>
//             <input
//               className="w-full p-3 bg-gray-300 rounded-lg lg:text-base xs:text-sm"
//               type="text"
//               required
//               placeholder="city"
//               name="city"
//               value={billingAddress.city}
//               onChange={(e) => handleBilling(e)}
//             />
//           </div>
//           <div>
//             <div className="font-bold xs:text-xs lg:text-sm">state</div>
//             <input
//               className="w-full p-3 bg-gray-300 rounded-lg lg:text-base xs:text-sm"
//               type="text"
//               required
//               placeholder="state"
//               name="state"
//               value={billingAddress.state}
//               onChange={(e) => handleBilling(e)}
//             />
//           </div>
//           <div>
//             <div className="font-bold xs:text-xs lg:text-sm">postal code</div>
//             <input
//               className="w-full p-3 bg-gray-300 rounded-lg lg:text-base xs:text-sm"
//               type="number"
//               required
//               placeholder="postal code"
//               name="postal_code"
//               value={shippingAddress.postal_code}
//               onChange={(e) => handleBilling(e)}
//             />
//           </div>
//           <div>
//             <div className="font-bold xs:text-xs lg:text-sm">Country</div>
//             <CountryDropdown
//               // className="bg-red-900"
//               className="w-full p-3 bg-gray-300 rounded-lg outline-none lg:text-base xs:text-sm"
//               valueType="short"
//               value={shippingAddress.country}
//               onChange={(val) =>
//                 handleBilling({
//                   target: {
//                     name: "country",
//                     value: val,
//                   },
//                 })
//               }
//             />
//           </div>
//           <div>
//             <div className="font-bold xs:text-xs lg:text-sm">
//               Phone Number
//             </div>
//             <input
//               className="w-full p-3 bg-gray-300 rounded-lg lg:text-base xs:text-sm"
//               type="text"
//               required
//               placeholder="Phone Number"
//               name="phone"
//               value={billingAddress.phone}
//               onChange={(e) => handleBilling(e)}
//             />
//           </div>
//           <button
//             className="p-2 px-4 text-white transition-all bg-blue-500 rounded-lg lg:text-base xs:text-sm hover:scale-105"
//             type="submit"
//           >
//             Proceed toCheckout
//           </button>
//         </div>
//       </form>
//       <div className="lg:flex xs:hidden">
//         <CheckOutSummary />
//       </div>
//     </div>
//   </div>
// );
