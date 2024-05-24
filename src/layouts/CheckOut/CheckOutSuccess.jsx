import { Link } from "react-router-dom";

const CheckOutSuccess = () => {
  return (
    <div className="flex items-center justify-center min-h-[90vh]">
      <div className="w-full max-w-3xl p-8 bg-gray-500 rounded-lg">
        <div className="mb-2 font-bold text-center text-white lg:text-2xl">
          CheckOutSuccess
        </div>
        <p className="text-center text-white lg:text-base xs:text-sm">
          Thank you for your shopping
        </p>
        <br />
        <div className="flex justify-center">
          <button className="px-4 py-2 hover:scale-[1.02] transition-all rounded-lg bluegradient lg:text-base xs:text-sm">
            <Link to="/order-history" className="text-white">
              View Order Status
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckOutSuccess;
