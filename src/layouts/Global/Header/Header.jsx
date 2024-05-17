import { Link, NavLink, useNavigate } from "react-router-dom";
// import logo from "../../../assets/logo.svg";
// import { CircleUserRound } from "lucide-react";
import { LogOut, Search } from "lucide-react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import AmazonCartSVG from "../../../assets/SVG/AmazonCartSVG.svg";
import { auth } from "../../../firebase/config";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_ACTIVE_USER,
  REMOVE_ACTIVE_USER,
} from "../../../redux/slice/authSlice";
import { AdminOnlyLink } from "../../../Components/AdminOnlyRoute/AdminOnlyRoute";
import {
  CALCULATE_TOTAL_QUANTITY,
  selectCartTotalQuantity,
} from "../../../redux/slice/cartSlice";

const Header = () => {
  const location = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, []);

  const dispatch = useDispatch();

  // Monitoring the current user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.displayName == null) {
          const u1 = user.email.substring(0, user.email.indexOf("@"));
          console.log(u1);
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
          console.log(uName);
          setDisplayName(uName);
        } else {
          setDisplayName(user.displayName);
        }

        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : displayName,
            userID: user.uid,
          })
        );
        // ...
      } else {
        setDisplayName("");
        dispatch(REMOVE_ACTIVE_USER());
        // User is signed out
        // ...
      }
    });
  }, [dispatch, displayName]);

  const logOut = () => {
    localStorage.clear();
    // window.location.reload();
    signOut(auth)
      .then(() => {
        toast.success("Successfully Logged Out");
        location("/login");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const top100Films = [
    { title: "Mobile" },
    { title: "Air Conditioner" },
    { title: "Chimney" },
    { title: "Shoes" },
    { title: "Refrigerator" },
    { title: "Microwave" },
    { title: "Waching Machine" },
  ];

  const options = top100Films.map((option) => {
    const firstLetter = option.title[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      ...option,
    };
  });

  return (
    <div className="grid items-center w-full grid-cols-8 text-white xs:h-8 lg:h-16">
      <div className="flex items-center justify-center col-span-1 ">
        <NavLink to="/">
          <div className="lg:text-2xl xs:text-xs font-bold xs:mb-0 lg:mb-[-3px]">
            <div className="lg:flex xs:hidden">ECommerce</div>
            <div className="p-1 mb-2 text-black bg-gray-100 rounded-lg xs:flex lg:hidden">
              Logo
            </div>
          </div>
        </NavLink>
      </div>
      <div className="w-full col-span-4 xs:pl-4 lg:pl-9 flex items-center justify-center lg:mt-0 xs:mt-[-8px] xs:h-[60%] lg:h-[80%] rounded-md">
        <Autocomplete
          className="w-full h-full bg-white border-none rounded-l-md"
          sx={{
            "& .MuiOutlinedInput-notchedOutline": { border: "none" },
            // "& .MuiOutlinedInput-root": {
            //   borderRadius: "7px",
            //   height: 50,
            //   border: "1px solid #909090",

            //   ":hover": {
            //     border: "0.5px solid #fd0000 !important",
            //     boxShadow: "-1px 1px 4px 4px #FFEAEA",
            //   },
            //   ":focus-within": { border: "0.5px solid #fd0000 !important" },
            // },

            // "& .MuiOutlinedInput-root.Mui-disabled": {
            //   ":hover": {
            //     border: "1px solid #909090 !important",
            //     boxShadow: "none",
            //   },
            // },

            // "& .MuiOutlinedInput-notchedOutline": {
            //   border: "none",
            // },
          }}
          id="grouped-demo"
          options={options.sort(
            (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
          )}
          groupBy={(option) => option.firstLetter}
          getOptionLabel={(option) => option.title}
          // sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} />}
        />
        <div className="flex items-center justify-center h-full p-1 bg-black border cursor-pointer xs:px-1 lg:px-2 rounded-r-md">
          <Search className="lg:scale-100 xs:scale-75" />
        </div>
      </div>
      <div className="flex items-center col-span-3 xs:justify-evenly lg:justify-between lg:px-7 xs:px-0 lg:mr-0 xs:mr-1 ">
        <Link to={!displayName && "/login"} className="lg:flex xs:hidden">
          <div
            // onClick={handleAuth}
            className="flex flex-col text-white "
          >
            <span className="bg-lime-0 text-[14px]">
              Hello,<br></br>
              {!displayName ? "Guest" : displayName.substring(0, 6)}...
            </span>
          </div>
        </Link>
        <Link to={"/order-history"} className="lg:flex xs:hidden">
          <div className="flex flex-col text-white cursor-pointer ">
            <span className="bg-lime-0 text-[12px]">Returns</span>
            <span className="bg-lime-0 text-[14px] font-bold">& Orders</span>
          </div>
        </Link>
        <AdminOnlyLink>
          <Link to="/admin/adhome">
            <button className="p-1 xs:text-sm lg:text-base xs:mb-2 lg:mb-0 lg:px-4 font-bold text-center text-white transition-all rounded lg:scale-100 xs:scale-[0.7] hover:rounded-md hover:scale-105 button-animationred ">
              Admin{" "}
            </button>
          </Link>
        </AdminOnlyLink>
        <Link to={"/cart"}>
          {/* lg:mr-[-20px] */}
          <div className="flex items-center text-white ">
            {/* <ShoppingCartOutlinedIcon fontSize="large" /> */}
            <img
              src={AmazonCartSVG}
              className="xs:h-3 lg:h-7"
              alt="AmazonCartSVG"
            />
            <span className="relative xs:left-[-10px] lg:left-[-22px] bottom-2 lg:text-base xs:text-[9px]  text-[#f3a847] font-bold">
              {cartTotalQuantity}
            </span>
          </div>
        </Link>
        {displayName && (
          <button
            className="flex flex-col items-center justify-center lg:pb-0 xs:pb-2 "
            onClick={logOut}
          >
            <LogOut className="lg:w-6 lg:h-6 xs:h-3 xs:w-3 " />

            <span className="lg:text-[0.65rem] xs:pt-0 lg:pt-1 xs:text-[8px]">
              Logout
            </span>
          </button>
        )}
        {!displayName && (
          <Link
            className="flex flex-col items-center justify-center lg:pb-0 xs:pb-2 "
            to="/login"
          >
            <LogOut className="lg:w-6 lg:h-6 xs:h-3 xs:w-3" />

            <span className="lg:text-[0.65rem] xs:pt-0 lg:pt-1 xs:text-[8px]  ">
              LogIn
            </span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
