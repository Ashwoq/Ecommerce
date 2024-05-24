import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeOff, Eye, UserRound, Lock, User } from "lucide-react";
import login3 from "../../assets/Login/loginbg3.jpg";
import vector from "../../assets/Login/vector.png";
import "../../Global.css";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import googlelogo from "../../assets/Images/googlelogo.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import Loader from "../../Components/Loader";
import { toast } from "react-toastify";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useSelector } from "react-redux";
import { selectPreviousURL } from "../../redux/slice/cartSlice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const previousURL = useSelector(selectPreviousURL);
  const location = useNavigate();

  const redirectUser = () => {
    if (previousURL.includes("cart")) {
      return location("/cart");
    } else if (email === "ashwoq00786@gmail.com") {
      return location("/admin/adhome");
    }
    location("/");
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        toast.success("Login Successfull");
        redirectUser();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // const user = userCredential.user;
        setIsLoading(false);
        toast.success("Login Successful");
        redirectUser();
      })
      .catch((error) => {
        setIsLoading(false);
        // const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <div
        className="flex items-center justify-center w-screen h-screen overflow-hidden bg-theme-puple300"
        style={{
          backgroundImage: `url(${login3})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="flex items-center justify-center rounded-3xl
      shadow-[0_8px_30px_rgb(0,0,0,0.15)]  backdrop-blur-sm bg-white/30
      xs:w-[90%] lg:w-[57%] h-[70%]"
        >
          <div
            // shadow-[0_8px_30px_rgb(0,0,0,0.15)]  backdrop-blur-md bg-white/35
            className="lg:flex xs:hidden w-[50%] flex-col items-center
          justify-center p-5 rounded-t-none rounded-b-none
          rounded-3xl"
          >
            <div className="w-full mt-[-10px] mb-3 ">
              <span className="block text-2xl font-bold text-center">
                Welcome Back!
              </span>
            </div>
            <div className="">
              <img src={vector} alt="vector"></img>
            </div>
          </div>
          <div
            className="lg:w-[45%] xs:w-full h-[85%]
          rounded-3xl
          bg-theme-ppk
          "
          >
            <div
              className="flex flex-col items-center justify-center w-full h-full rounded-3xl p-7 "
              // shadow-[0_8px_30px_rgb(0,0,0,0.15)]
              style={{
                // boxShadow: "42px 0px 7px 0px rgba(253,212,249,1)",

                boxShadow: "10px 10px 103px 26px rgba(253, 212, 249, 1)",
              }}
            >
              <div className="w-full pt-5 bg-red">
                <span className="block text-xl font-bold text-center">
                  LOGIN
                </span>
              </div>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col w-full gap-3 text-sm bg-red"
              >
                <input
                  type="text"
                  required
                  className="bg-white rounded-xl focus:outline-none py-2 pl-12 lg:h-[3rem] my-4 placeholder-slate-700"
                  value={email}
                  autoComplete="email"
                  placeholder="example@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div
                  className="
               absolute lg:mt-[1.72rem] xs:mt-[1.3rem] ml-[.9rem]"
                >
                  <UserRound className="scale-75" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  autoComplete="current-password"
                  className="bg-theme-purple50 rounded-xl focus:outline-none py-2 pl-12 lg:h-[3rem] placeholder-slate-700"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  className="absolute xs:right-9 lg:right-14 scale-75 cursor-pointer lg:mt-[6.4rem] xs:mt-[5.4rem]
                  "
                >
                  {showPassword ? (
                    <Eye onClick={toggleShowPassword} />
                  ) : (
                    <EyeOff onClick={toggleShowPassword} />
                  )}
                </div>
                <div
                  className=" flex
               absolute lg:mt-[6.4rem] xs:mt-[5.4rem] ml-[.9rem]"
                >
                  <Lock className="scale-75" />
                </div>
                <div className="text-right bg-red-">
                  <Link to="/reset">
                    <button className="text-[10px] text-blue-700 underline transition-all hover:text-orange-500">
                      {" "}
                      forget Password
                    </button>
                  </Link>
                </div>
                <button
                  type="submit"
                  className={`block w-full  mb-2 p-3 px-5 rounded-2xl font-bold text-white transition-all hover:scale-[1.04] text-sm ${"bg-theme-purple hover:bg-theme-purple600"}`}
                >
                  Login
                </button>
              </form>
              <div className="w-full text-xs">
                <Divider>or signin with</Divider>
                <button
                  onClick={signInWithGoogle}
                  className={`flex my-3 justify-center gap-1 items-center w-full mb-2 p-2 px-5 rounded-2xl font-bold text-black transition-all hover:scale-[1.02] text-sm ${"bg-theme-purple50 hover:bg-theme-purple100 "}`}
                >
                  <img
                    className="w-8 h-8 bg-red-90"
                    src={googlelogo}
                    alt="googlelogo"
                  />
                  Sign in with Google
                </button>
              </div>
              <Divider />
              <div className="flex justify-center my-1 mb-5 text-xs bg-red-">
                <div className="cursor-default">{"Don't have an account?"}</div>
                <Link to="/signup">
                  <div className="px-1 text-blue-700 underline transition-all cursor-pointer hover:text-orange-500">
                    signup
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
