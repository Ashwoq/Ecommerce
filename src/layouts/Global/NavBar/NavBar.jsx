import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
// import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Menu as MenuIcon,
} from "lucide-react";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import navItem from "../../../assets/Data/PathNaviData.json";
import Header from "../Header/Header";
import { NavLink, Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import { useLocation } from "react-router-dom";

const drawerWidth = window.innerWidth >= 1024 ? 300 : 170;

const openedMixin = (theme) => ({
  width: drawerWidth,
  backgroundColor: "#5A57FF",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  backgroundColor: "#5A57FF",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 10px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: "#5A57FF",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  position: "fixed",
  ...(open && {
    ...openedMixin(theme),
    zIndex: theme.zIndex.drawer + 2,
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Overlay = styled("div")(({ theme, open }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: theme.zIndex.drawer - 1,
  display: open ? "block" : "none",
}));

export default function NavBar() {
  const location = useLocation();
  const isActived = (path) => {
    return location.pathname === path;
  };

  let navDataItem = navItem.role1;

  // const [user, setUser] = React.useState(getUser());
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 1,
              ...(open && { display: "none" }),
            }}
            className="transition-all hover:rounded-lg "
          >
            <MenuIcon className="lg:w-8 md:w-5 xs:w-4 lg:ml-0 xs:ml-[6px]" />
          </IconButton>
          <Header />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          ".MuiDrawer-paper": {
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            paddingX: window.innerWidth >= 1024 ? "7px" : "3px",
          },
        }}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon className="text-white" />
            ) : (
              <ChevronLeftIcon className="text-white" />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {navDataItem.map((item, index) => (
            <NavLink
              style={({ isActive }) => ({
                // color: isActive ? "white" : "blue",
                transition: "0.3s",
              })}
              to={item.path}
              key={index}
            >
              <ListItem
                disablePadding
                sx={{
                  display: "block",
                  backgroundColor: isActived(item.path) ? "#757dff" : "",
                }}
                className="
          flex
          lg:my-2
          md:my-2
          xs:my-1
          rounded-md
          cursor-pointer
          text-white
          scale-[0.95]
          transition-all
          hover:bg-theme-purple400
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
                    <div className="lg:w-6 md:w-5 xs:w-4">
                      <img src={item.icon} alt={item.icon} />
                    </div>
                  </ListItemIcon>
                  <ListItemText
                    primary={item.value}
                    sx={{
                      opacity: open ? 1 : 0,
                      ".MuiTypography-root": {
                        fontSize: window.innerWidth >= 1024 ? "16px" : "10px",
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </NavLink>
          ))}
        </List>
        <Divider />
      </Drawer>
      <div className="w-full">
        <DrawerHeader />
        <div className="lg:ml-[4.6rem] xs:ml-14">
          <Outlet />
        </div>
        <div className="lg:ml-[4.6rem] xs:ml-14">
          <Footer />
        </div>
      </div>
      <Overlay open={open} onClick={handleDrawerClose} />
    </Box>
  );
}
