// import { Routes, Route, Link } from "react-router-dom";
// import AdHome from "../../Components/Admin/AdHome/AdHome";
// import ViewProducts from "../../Components/Admin/ViewProducts/ViewProducts";
// import AddProducts from "../../Components/Admin/AddProducts/AddProducts";
// import Orders from "../../Components/Admin/Orders/Orders";
// import { useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";
// // import Box from "@mui/material/Box";
// // import List from "@mui/material/List";
// // import ListItem from "@mui/material/ListItem";
// // import ListItemButton from "@mui/material/ListItemButton";
// // import ListItemIcon from "@mui/material/ListItemIcon";
// // import ListItemText from "@mui/material/ListItemText";
// // import { Inbox, Mail } from "lucide-react";
// // import "../../Global.css";
// import OrderDetails from "../../Components/Admin/OrderDetails/OrderDetails";
// import { selectUserName } from "../../redux/slice/authSlice";
// import { Divider } from "@mui/material";

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

//   // const DrawerList = (
//   //   <Box className="h-full p-2 py-5" role="presentation">
//   //     <div className="flex flex-col px-1 py-2 mx-2 font-bold text-white cursor-default button-animationreddy rounded-xl">
//   //       <div className="xs:text-sm lg:text-sm ">Hello,</div>
//   //       <div className="p-3 px-3 mx-auto border-opacity-25 rounded-lg xs:text-lg lg:text-2xl bg-red-300/60 ">
//   //         {userName}
//   //       </div>
//   //     </div>
//   //     <List>
//   //       {adminNavData.map((item, index) => (
//   //         <Link to={item.path} key={index}>
//   //           <ListItem
//   //             disablePadding
//   //             sx={{
//   //               display: "block",
//   //               backgroundColor: isActived(item.path) ? "#30dd8a" : "",
//   //               color: isActived(item.path) ? "black" : "",
//   //             }}
//   //             className="
//   //               flex
//   //               py-1
//   //               lg:my-4
//   //               md:my-2
//   //               xs:my-1
//   //               cursor-pointer
//   //               text-white
//   //               rounded-2xl
//   //               scale-[0.95]
//   //               transition-all
//   //               hover:bg-[#30dd8a]
//   //               hover:rounded-lg
//   //               hover:scale-[0.98]
//   //               hover:shadow-[rgba(0,_0,_0,_0.2)_0px_5px_30px]"
//   //           >
//   //             <ListItemButton
//   //               sx={{
//   //                 minHeight: 48,
//   //                 justifyContent: "center",
//   //                 px: 2.5,
//   //               }}
//   //             >
//   //               <ListItemIcon
//   //                 sx={{
//   //                   minWidth: 0,
//   //                   mr: 3,
//   //                   justifyContent: "center",
//   //                 }}
//   //               >
//   //                 {index % 2 === 0 ? <Inbox /> : <Mail />}
//   //               </ListItemIcon>
//   //               <ListItemText primary={item.value} />
//   //             </ListItemButton>
//   //           </ListItem>
//   //         </Link>
//   //       ))}
//   //     </List>
//   //   </Box>
//   // );

//   return (
//     <div className="lg:m-4 xs:m-4 ">
//       <div className="flex flex-col lg:flex-row">
//         <div className="w-full lg:w-[25%] border-white p-3 lg:border-r  bg-gray-300 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.2)] lg:rounded-tr-none lg:rounded-br-none ">
//           {/* {DrawerList} */}
//           <div className="flex flex-col px-1 py-2 mx-2 mb-8 font-bold text-white cursor-default button-animationreddy rounded-xl">
//             <div className="pl-1 xs:text-sm lg:text-sm">Hello,</div>
//             <div className="p-3 px-3 mx-auto border-opacity-25 rounded-lg xs:text-lg lg:text-2xl bg-red-300/60 ">
//               {userName}
//             </div>
//           </div>
//           {adminNavData.map((x, i) => (
//             <Link to={x.path} key={i}>
//               <div
//                 className="
//       flex
//       p-3
//      my-2
//       mx-2
//       cursor-pointer
//       rounded-xl
//       transition-all
//       hover:bg-gray-400
//       hover:rounded-lg
//       hover:scale-[1.02]
//       hover:shadow-[rgba(0,_0,_0,_0.2)_0px_5px_30px]"
//                 style={{
//                   color: isActived(x.path) ? "white" : "",
//                   backgroundColor: isActived(x.path) ? "#6b7280" : "",
//                 }}
//               >
//                 {x.value}
//               </div>
//               <div className="flex justify-center">
//                 <Divider className="w-[90%] " />
//               </div>
//             </Link>
//           ))}
//         </div>
//         <div className="w-full p-4 lg:rounded-r-lg xs:mt-2 lg:mt-0 xs:rounded-lg lg:rounded-l-none lg:backdrop-blur-3xl bg-blue-900/30">
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

import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Divider } from "@mui/material";
import AdHome from "../../Components/Admin/AdHome/AdHome";
import ViewProducts from "../../Components/Admin/ViewProducts/ViewProducts";
import AddProducts from "../../Components/Admin/AddProducts/AddProducts";
import Orders from "../../Components/Admin/Orders/Orders";
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

  return (
    <div className="flex min-h-screen bg-gray-100 rounded-xl lg:m-4 xs:m-4">
      <div className="flex flex-col w-full lg:flex-row">
        <div className="w-full p-6 bg-white shadow-md rounded-xl lg:w-1/4 lg:rounded-tr-none lg:rounded-br-none">
          <div className="py-4 mb-8 text-center border-b border-gray-300">
            <div className="text-lg font-semibold text-gray-700">Hello,</div>
            <div className="text-xl font-bold text-gray-900">{userName}</div>
          </div>
          <ul className="space-y-4">
            {adminNavData.map((x, i) => (
              <li key={i}>
                <Link
                  to={x.path}
                  className={`block p-4 rounded-lg transition-all ${
                    isActived(x.path)
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-blue-100"
                  }`}
                >
                  {x.value}
                </Link>
                {i < adminNavData.length - 1 && <Divider className="my-2" />}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 p-6 shadow-md rounded-xl lg:rounded-l-none ">
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
