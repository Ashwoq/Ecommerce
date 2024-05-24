import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./Global.css";
import NavBarNew from "./layouts/Global/NavBar/NavBarNew";
import Landing from "./layouts/Landing/Landing";
import Login from "./layouts/Auth/Login";
import Login1 from "./layouts/Auth/Login1";
import Login2 from "./layouts/Auth/Login2";
import Login3 from "./layouts/Auth/Login3";
import ErrorPage from "./layouts/ErrorPage";
import DetailedInfo from "./layouts/DetailedInfo";
import Signup from "./layouts/Auth/Signup";
import Signup1 from "./layouts/Auth/Signup1";
import Signup2 from "./layouts/Auth/Signup2";
import Signup3 from "./layouts/Auth/Signup3";
import Reset from "./layouts/Auth/Reset";
import Reset1 from "./layouts/Auth/Reset1";
import Reset2 from "./layouts/Auth/Reset2";
import Reset3 from "./layouts/Auth/Reset3";
import Admin from "./layouts/Admin/Admin";
import AdminOnlyRoute from "./Components/AdminOnlyRoute/AdminOnlyRoute";
import ProductDetails from "./layouts/Product/ProductDetails";
import AllProducts from "./layouts/Product/AllProducts";
import Cart from "./layouts/Cart/Cart";
import CheckOutDetails from "./layouts/CheckOut/CheckOutDetails";
import CheckOut from "./layouts/CheckOut/CheckOut";
import CheckOutSuccess from "./layouts/CheckOut/CheckOutSuccess";
import OrderHistory from "./layouts/OrderHistory/OrderHistory";
import OrderDetails from "./layouts/OrderDetails/OrderDetails";
import ReviewProducts from "./layouts/ReviewProducts/ReviewProducts";
import Contact from "./layouts/Contact";

function App() {
  const MainLayout = () => {
    return (
      <div className="overflow-hidden">
        <div>
          <NavBarNew />
          {/* <Outlet /> */}
        </div>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <Landing />,
        },
        {
          path: "/DetailedInfo",
          element: <DetailedInfo />,
        },
        {
          path: "/admin/*",
          element: (
            <AdminOnlyRoute>
              <Admin />
            </AdminOnlyRoute>
          ),
        },
        {
          path: "/product-details/:id",
          element: <ProductDetails />,
        },
        {
          path: "/allproducts/:id",
          element: <AllProducts />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/checkout-details",
          element: <CheckOutDetails />,
        },
        {
          path: "/checkout",
          element: <CheckOut />,
        },
        {
          path: "/checkout-success",
          element: <CheckOutSuccess />,
        },
        {
          path: "/order-history",
          element: <OrderHistory />,
        },
        {
          path: "/order-details/:id",
          element: <OrderDetails />,
        },
        {
          path: "/review-product/:id",
          element: <ReviewProducts />,
        },
        // {
        //   path: "/PrincipleBehaviourAnalyst",
        //   element: isAuthorized(3) ? (
        //     <PrincipleBehaviourAnalyst />
        //   ) : (
        //     <ErrorPage />
        //   ),
        // },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },

    {
      path: "/login1",
      element: <Login1 />,
    },

    {
      path: "/login2",
      element: <Login2 />,
    },

    {
      path: "/Login3",
      element: <Login3 />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/signup1",
      element: <Signup1 />,
    },
    {
      path: "/signup2",
      element: <Signup2 />,
    },
    {
      path: "/signup3",
      element: <Signup3 />,
    },
    {
      path: "/reset",
      element: <Reset />,
    },
    {
      path: "/reset1",
      element: <Reset1 />,
    },
    {
      path: "/reset2",
      element: <Reset2 />,
    },
    {
      path: "/reset3",
      element: <Reset3 />,
    },

    // {
    //   path: "/home",
    //   element: <Landing />,
    // },

    { path: "*", element: <ErrorPage /> },

    // {
    //   path: "/nav",
    //   element: <NavBarSwitcher />,
    // },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
