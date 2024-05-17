import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./Global.css";
import NavBarNew from "./layouts/Global/NavBar/NavBarNew";
import Landing from "./layouts/Landing/Landing";
import Login from "./layouts/Auth/Login";
import ErrorPage from "./layouts/ErrorPage";
import DetailedInfo from "./layouts/DetailedInfo";
import Signup from "./layouts/Auth/Signup";
import Reset from "./layouts/Auth/Reset";
import Admin from "./layouts/Admin/Admin";
import AdminOnlyRoute from "./Components/AdminOnlyRoute/AdminOnlyRoute";
import ProductDetails from "./layouts/Product/ProductDetails";
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
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/reset",
      element: <Reset />,
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
