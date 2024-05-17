import { useState } from "react";
// import { Alert, Slide, } from "@mui/material";
import { EyeOff, Eye, UserRound, Lock } from "lucide-react";
import login3 from "../../assets/Login/loginbg3.jpg";
import signupvector from "../../assets/Images/Signup/signupvector.png";
import "../../Global.css";
import Divider from "@mui/material/Divider";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import Loader from "../../Components/Loader";
import { toast } from "react-toastify";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleShowCPassword = () => {
    setShowCPassword((prevShowPassword) => !prevShowPassword);
  };

  const location = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== cPassword) {
      toast.error("Password didn't match!");
    }
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setIsLoading(false);
        toast.success("Registration Succcessful");
        location("/login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorCode, errorMessage);
        setIsLoading(false);
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
      w-[57%] h-[70%]"
        >
          <div
            className="lg:w-[45%] xs:w-full h-[85%]
          rounded-3xl 
          bg-theme-ppk   
          "
          >
            <div
              className="flex flex-col items-center justify-center w-full h-full rounded-3xl p-7 "
              style={{
                boxShadow: "-80px 10px 100px 10px rgb(252, 188, 239,0.6)",
              }}
            >
              <div className="w-full pb-2 bg-red">
                <span className="block my-3 text-xl font-bold text-center">
                  SIGNUP
                </span>
              </div>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col w-full gap-3 text-sm bg-red"
              >
                <input
                  type="text"
                  className="bg-white rounded-xl focus:outline-none py-2 pl-12 lg:h-[3rem] placeholder-slate-700"
                  value={email}
                  required
                  autoComplete="email"
                  placeholder="example@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div
                  className=" 
               absolute lg:mt-[.75rem] xs:mt-[1.3rem] ml-[.9rem]"
                >
                  <UserRound className="scale-75" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  required
                  autoComplete="current-password"
                  className="bg-theme-purple50 rounded-xl focus:outline-none py-2 pl-12 lg:h-[3rem] placeholder-slate-700"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  className="absolute xs:left-[10rem] lg:left-[22rem] scale-75 cursor-pointer lg:mt-[4.4rem] xs:mt-[5.4rem] 
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
               absolute lg:mt-[4.4rem] xs:mt-[5.4rem] ml-[.9rem]"
                >
                  <Lock className="scale-75" />
                </div>
                <input
                  type={showCPassword ? "text" : "password"}
                  value={cPassword}
                  required
                  autoComplete="current-password"
                  className="bg-theme-purple50 rounded-xl focus:outline-none py-2 pl-12 lg:h-[3rem] placeholder-slate-700"
                  placeholder="Confirm Password"
                  onChange={(e) => setCPassword(e.target.value)}
                />
                <div
                  className="absolute xs:left-[10rem] lg:left-[22rem] scale-75 cursor-pointer lg:mt-[8.2rem] xs:mt-[5.4rem] 
                  "
                >
                  {showCPassword ? (
                    <Eye onClick={toggleShowCPassword} />
                  ) : (
                    <EyeOff onClick={toggleShowCPassword} />
                  )}
                </div>
                <div
                  className=" flex
               absolute lg:mt-[8.2rem] xs:mt-[5.4rem] ml-[.9rem]"
                >
                  <Lock className="scale-75" />
                </div>
                <button
                  type="submit"
                  className={`block w-full  mb-2 p-3 px-5 rounded-2xl font-bold text-white transition-all hover:scale-[1.04] text-sm ${"bg-theme-purple hover:bg-theme-purple600"}`}
                >
                  Register
                </button>

                <Divider />
                <div className="flex justify-center my-1 mb-5 text-xs bg-red-">
                  <div className="cursor-default">Already have an account?</div>
                  <Link to="/login">
                    <div className="px-1 text-blue-700 underline transition-all cursor-pointer hover:text-orange-500">
                      login
                    </div>
                  </Link>
                </div>
              </form>
            </div>
          </div>
          <div
            className="lg:flex xs:hidden w-[50%] flex-col items-center 
          justify-center p-5 rounded-t-none rounded-b-none 
          rounded-3xl"
          >
            <div className="w-full mb-5  mt-[-10px]">
              <span className="block text-2xl font-bold text-center">
                Hello there,
              </span>
            </div>
            <div className="">
              <img src={signupvector} alt="signupvector"></img>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
