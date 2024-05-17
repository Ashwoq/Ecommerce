import React from "react";
import { Link } from "react-router-dom";

const CheckOutSuccess = () => {
  return (
    <div className="flex items-center justify-center h-screen max-w-4xl mx-auto mb-[-50px]">
      <div className="p-4 xs:w-[90%] lg:w-[70%] bg-gray-500 rounded-lg">
        <div className="font-bold text-white xs:text-base lg:text-2xl">
          CheckOutSuccess
        </div>
        <p className="text-white lg:text-base xs:text-sm">
          Thank you for your shopping
        </p>
        <br />
        <button className="px-4 py-2 bg-blue-400 rounded-lg lg:text-base xs:text-sm">
          <Link to="/order-history" className="text-white">
            View Order Status
          </Link>
        </button>
      </div>
    </div>
  );
};

export default CheckOutSuccess;
