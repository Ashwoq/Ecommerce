import { NavLink } from "react-router-dom";
import { RefreshCcw } from "lucide-react";

const ErrorPage = () => {
  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <div className="p-8 mx-auto bg-white rounded-lg shadow-lg lg:max-w-md md:max-w-[26rem] xs:max-w-[18rem]">
        <h1 className="mb-4 font-bold text-red-600 lg:text-3xl md:text-2xl xs:text-xl">
          404 Not Found
        </h1>
        <p className="mb-4 text-gray-700 xs:text-sm md:text-base lg:text-lg">
          {"We're sorry, but the page you are looking for cannot be found."}
        </p>
        <p className="mb-4 text-gray-700 xs:text-sm md:text-base lg:text-lg">
          {
            "It seems you don't have permission to access this page or you entered the wrong URL."
          }
        </p>
        <p className="mb-4 text-gray-700 xs:text-sm md:text-base lg:text-lg">
          Please contact your administrator for assistance.
        </p>
        <div className="flex justify-between">
          <NavLink
            to="/"
            className="inline-flex items-center justify-center w-[45%]"
          >
            <div
              className="p-3 rounded-lg bg-theme-purple400
            scale-[0.95]
            lg:text-base
            xs:text-xs
            transition-all
            text-white
            hover:bg-theme-purple600
            hover:rounded-lg
            hover:scale-[0.98]
            hover:shadow-[rgba(0,_0,_0,_0.2)_0px_5px_30px]
            "
            >
              Go to Main Page
            </div>
          </NavLink>
          <button
            onClick={reloadPage}
            className="inline-flex items-center justify-center w-[45%] p-3 rounded-lg bg-blue-500 
            lg:text-base
            xs:text-xs
            text-white hover:bg-blue-600
            "
          >
            Reload Page &nbsp;
            <RefreshCcw />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
