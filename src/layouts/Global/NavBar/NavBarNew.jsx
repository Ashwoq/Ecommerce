import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
// import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  History,
  Home,
  Inbox,
  MessageSquare,
  ShoppingCart,
  User,
} from "lucide-react";
import { Mail } from "lucide-react";
import { Menu, ChevronLeft } from "lucide-react";
import Header from "../Header/Header";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectEmail } from "../../../redux/slice/authSlice";

const NavBarNew = () => {
  const location = useLocation();
  const isActived = (path) => {
    return location.pathname === path;
  };
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const NavData = [
    { path: "/", value: "Home", icon: Home },
    { path: "/order-history", value: "Order History", icon: History },
    { path: "/cart", value: "Cart", icon: ShoppingCart },
    { path: "/contact", value: "Contact Us", icon: MessageSquare },
  ];

  const userEmail = useSelector(selectEmail);
  const isAdmin = userEmail === "ashwoq00786@gmail.com";

  if (isAdmin) {
    NavData.push({
      path: "/admin/adhome",
      value: "Admin Dashboard",
      icon: User,
    });
  }

  const DrawerList = (
    <Box
      sx={{ width: 350 }}
      className="h-full p-2 py-5 bg-white"
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <div className="flex items-center justify-between px-3 py-2 mx-2 text-xl font-bold bg-gray-300 rounded-xl">
        <div className="">E-Commerce</div>
        <button className="p-2 text-white bg-black rounded-full">
          <ChevronLeft />
        </button>
      </div>
      <List>
        {NavData.map((navItem, index) => (
          <NavLink
            key={index}
            to={navItem.path}
            style={({ isActive }) => ({
              // color: isActive ? "white" : "blue",
              // transition: "0s",
            })}
          >
            <ListItem
              key={navItem.path}
              disablePadding
              sx={{
                display: "block",
                backgroundColor: isActived(navItem.path) ? "#3383f6" : "ffffff",
                color: isActived(navItem.path) ? "white" : "black",
              }}
              className="
              flex
              py-1
              lg:my-4
              md:my-2
              xs:my-1
              cursor-pointer
              text-black
              rounded-2xl
              scale-[0.95]
              transition-all
              hover:bg-blue-200
              hover:rounded-lg
              hover:scale-[0.98]
              hover:shadow-[rgba(0,_0,_0,_0.2)_0px_5px_30px]"
            >
              <ListItemButton
                sx={{
                  minHeight: window.innerWidth >= 1024 ? 48 : 39,
                  justifyContent: open ? "initial" : "center",
                  px: window.innerWidth >= 1024 ? 2.5 : 2,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? (window.innerWidth >= 1024 ? 3 : 1) : "auto",
                    justifyContent: "center",
                  }}
                >
                  <navItem.icon />
                </ListItemIcon>
                <ListItemText
                  primary={navItem.value}
                  sx={{
                    opacity: open ? 1 : 0,
                    ".MuiTypography-root": {
                      fontSize: window.innerWidth >= 1024 ? "16px" : "10px",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
            <div className="flex items-center justify-center">
              <Divider className="w-[90%]" />
            </div>
          </NavLink>
        ))}
      </List>
    </Box>
  );

  return (
    <div
      className={`${
        location.pathname === "/" ? "bg-white " : "bg-gray-300"
      } pt-1`}
    >
      <div className="sticky top-0 flex z-[1000] m-3 mt-1 mb-0 bg-black rounded-xl">
        <button
          className="transition-all xs:p-2 lg:p-4 rounded-l-xl hover:bg-gray-500 lg:scale-100 xs:scale-75"
          onClick={toggleDrawer(true)}
        >
          <Menu className="text-white " />
        </button>
        <Header />
        <Drawer open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
      </div>
      <div className="w-full">
        <div className="">
          <Outlet />
        </div>
        <div className="">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default NavBarNew;
