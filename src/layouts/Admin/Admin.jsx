// import { Routes, Route } from "react-router-dom";
// import AdHome from "../../Components/Admin/AdHome/AdHome";
// import ViewProducts from "../../Components/Admin/ViewProducts/ViewProducts";
// import AddProducts from "../../Components/Admin/AddProducts/AddProducts";
// import Orders from "../../Components/Admin/Orders/Orders";
// import { useLocation, NavLink } from "react-router-dom";
// import {
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
// } from "@mui/material";
// import { selectUserName } from "../../redux/slice/authSlice";
// import { useSelector } from "react-redux";
// import Box from "@mui/material/Box";
// import List from "@mui/material/List";
// import { Inbox } from "lucide-react";
// import { Mail } from "lucide-react";
// import "../../Global.css";
// import OrderDetails from "../../Components/Admin/OrderDetails/OrderDetails";

// const adminNavData = [
//   { path: "/admin/adhome", value: "Home" },
//   { path: "/admin/orders", value: "Orders" },
//   { path: "/admin/all-products", value: "View Products" },
//   { path: "/admin/add-products/ADD", value: "Add Products" },
// ];

// const Admin = () => {
//   const userName = useSelector(selectUserName);
//   const location = useLocation();
//   const isActived = (path) => {
//     return location.pathname === path;
//   };

//   const DrawerList = (
//     <Box className="h-full p-2 py-5" role="presentation">
//       <div className="flex flex-col px-1 py-2 mx-2 font-bold text-white cursor-default button-animationreddy rounded-xl">
//         <div className="text-sm ">Hello,</div>
//         <div className="p-3 px-3 mx-auto text-2xl border-opacity-25 rounded-lg bg-red-300/60 ">
//           {userName}
//         </div>
//       </div>
//       <List>
//         {adminNavData.map((item, index) => (
//           <NavLink to={item.path} key={index}>
//             <ListItem
//               disablePadding
//               sx={{
//                 display: "block",
//                 backgroundColor: isActived(item.path) ? "#30dd8a" : "",
//                 color: isActived(item.path) ? "black" : "",
//               }}
//               className="
//           flex
//           py-1
//           lg:my-4
//           md:my-2
//           xs:my-1
//           cursor-pointer
//           text-white
//           rounded-2xl
//           scale-[0.95]
//           transition-all
//           hover:bg-[#30dd8a]
//           hover:rounded-lg
//           hover:scale-[0.98]
//           hover:shadow-[rgba(0,_0,_0,_0.2)_0px_5px_30px]"
//             >
//               <ListItemButton
//                 sx={{
//                   minHeight: window.innerWidth >= 1024 ? 48 : 39,
//                   justifyContent: open ? "initial" : "center",
//                   px: window.innerWidth >= 1024 ? 2.5 : 2,
//                 }}
//               >
//                 <ListItemIcon
//                   sx={{
//                     minWidth: 0,
//                     mr: open ? (window.innerWidth >= 1024 ? 3 : 1) : "auto",
//                     justifyContent: "center",
//                   }}
//                 >
//                   {index % 2 === 0 ? <Inbox /> : <Mail />}
//                 </ListItemIcon>
//                 <ListItemText
//                   primary={item.value}
//                   sx={{
//                     opacity: open ? 1 : 0,
//                     ".MuiTypography-root": {
//                       fontSize: window.innerWidth >= 1024 ? "16px" : "10px",
//                     },
//                   }}
//                 />
//               </ListItemButton>
//             </ListItem>
//           </NavLink>
//         ))}
//       </List>
//     </Box>
//   );

//   return (
//     <div className="">
//       <div className="flex p-6 ">
//         <div
//           className="w-[25%]
//            border-white
//           backdrop-blur-3xl bg-blue-900/30 border-opacity-25
//          border-r
//         rounded-xl rounded-tr-none rounded-br-none "
//         >
//           {DrawerList}
//         </div>
//         <div className="w-full p-4 rounded-r-lg backdrop-blur-3xl bg-blue-900/30 ">
//           <Routes>
//             <Route path="/adhome" element={<AdHome />} />
//             <Route path="/all-products" element={<ViewProducts />} />
//             <Route path="/add-products/:id" element={<AddProducts />} />
//             <Route path="/orders" element={<Orders />} />
//             <Route path="/orders-details/:id" element={<OrderDetails />} />
//           </Routes>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Admin;

import { Routes, Route, Link } from "react-router-dom";
import AdHome from "../../Components/Admin/AdHome/AdHome";
import ViewProducts from "../../Components/Admin/ViewProducts/ViewProducts";
import AddProducts from "../../Components/Admin/AddProducts/AddProducts";
import Orders from "../../Components/Admin/Orders/Orders";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Inbox, Mail } from "lucide-react";
import "../../Global.css";
import OrderDetails from "../../Components/Admin/OrderDetails/OrderDetails";
import { selectUserName } from "../../redux/slice/authSlice";

const adminNavData = [
  { path: "/admin/adhome", value: "Home" },
  { path: "/admin/orders", value: "Orders" },
  { path: "/admin/all-products", value: "View Products" },
  { path: "/admin/add-products/ADD", value: "Add Products" },
];

const Admin = () => {
  const userName = useSelector(selectUserName);
  const location = useLocation();
  const isActived = (path) => {
    return location.pathname === path;
  };

  const DrawerList = (
    <Box className="h-full p-2 py-5" role="presentation">
      <div className="flex flex-col px-1 py-2 mx-2 font-bold text-white cursor-default button-animationreddy rounded-xl">
        <div className="xs:text-sm lg:text-sm ">Hello,</div>
        <div className="p-3 px-3 mx-auto border-opacity-25 rounded-lg xs:text-lg lg:text-2xl bg-red-300/60 ">
          {userName}
        </div>
      </div>
      <List>
        {adminNavData.map((item, index) => (
          <Link to={item.path} key={index}>
            <ListItem
              disablePadding
              sx={{
                display: "block",
                backgroundColor: isActived(item.path) ? "#30dd8a" : "",
                color: isActived(item.path) ? "black" : "",
              }}
              className="
                flex
                py-1
                lg:my-4
                md:my-2
                xs:my-1
                cursor-pointer
                text-white
                rounded-2xl
                scale-[0.95]
                transition-all
                hover:bg-[#30dd8a]
                hover:rounded-lg
                hover:scale-[0.98]
                hover:shadow-[rgba(0,_0,_0,_0.2)_0px_5px_30px]"
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: 3,
                    justifyContent: "center",
                  }}
                >
                  {index % 2 === 0 ? <Inbox /> : <Mail />}
                </ListItemIcon>
                <ListItemText primary={item.value} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <div className="lg:m-10 xs:m-4 ">
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-[25%] border-white lg:border-r lg:backdrop-blur-3xl bg-blue-900/30 rounded-xl lg:rounded-tr-none lg:rounded-br-none ">
          {DrawerList}
        </div>
        <div className="w-full p-4 lg:rounded-r-lg xs:mt-2 lg:mt-0 xs:rounded-lg lg:rounded-l-none lg:backdrop-blur-3xl bg-blue-900/30">
          <Routes>
            <Route path="/adhome" element={<AdHome />} />
            <Route path="/all-products" element={<ViewProducts />} />
            <Route path="/add-products/:id" element={<AddProducts />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders-details/:id" element={<OrderDetails />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;
