import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeOff, Eye, UserRound, Lock } from "lucide-react";
import authsvg from "../../assets/SVG/authSVG.svg";
import "../../Global.css";
import { Link } from "react-router-dom";
import googlelogo from "../../assets/Images/googlelogo.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import Loader from "../../Components/Loader";
import { toast } from "react-toastify";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useSelector } from "react-redux";
import { selectPreviousURL } from "../../redux/slice/cartSlice";

const Login3 = () => {
  const [showPassword, setShowPassword] = useState(false);
  const previousURL = useSelector(selectPreviousURL);
  const location = useNavigate();

  const redirectUser = () => {
    if (previousURL.includes("cart")) {
      return location("/cart");
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
  const [validated, setValidated] = useState(true);
  const [validationMsg, setValidationMsg] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setValidated(false);
    const hasRequiredLength = password.length >= 8;
    const hasSpecialChar = /[#*]/.test(password);
    const hasAt = email.includes("@");
    const hasNumber = /[0-9]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    // setIsLoading(true);

    if (
      email.length >= 8 &&
      hasAt &&
      hasRequiredLength &&
      hasSpecialChar &&
      hasNumber &&
      hasUppercase
    ) {
      setValidated(true);
      setValidationMsg("Validated");
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
    } else {
      setValidated(false);
      if (email.length < 8 || !hasAt) {
        setValidationMsg("Invalid email id.");
      } else if (!hasRequiredLength) {
        setValidationMsg("Password must be at least 8 characters long.");
      } else if (!hasSpecialChar) {
        setValidationMsg(
          "Password must include at least one special character (# or *)."
        );
      } else if (!hasNumber) {
        setValidationMsg("Password must include at least one number.");
      } else if (!hasUppercase) {
        setValidationMsg(
          "Password must include at least one uppercase letter."
        );
      }
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div
        className="flex items-center justify-center w-screen h-screen overflow-hidden cursor-default "
        style={{ backgroundImage: `url(${authsvg})`, backgroundSize: "cover" }}
      >
        <div
          className="flex items-center justify-center rounded-3xl
          text-white
      xs:w-[90%] lg:w-[57%] h-[83%] py-1"
        >
          <div
            className="xs:w-full lg:w-[50%] h-full rounded-3xl flex flex-col pb-5 backdrop-blur-xl bg-white/15 
            shadow-[0_8px_30px_rgb(0,0,0,0.12)] "
          >
            <div className="flex flex-col items-center justify-center w-full h-full p-8 rounded-3xl ">
              <div className="flex flex-col items-start w-full gap-1 my-2">
                <div className="text-2xl font-bold ">Login</div>
                <div className="text-sm font-semibold ">
                  Welcome back please login to your account.
                </div>
              </div>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col w-full text-sm "
              >
                <input
                  type="text"
                  // required

                  className={`${
                    validationMsg === "Invalid email id."
                      ? "outline-red-500"
                      : ""
                  }
                  bg-theme-purple50 outline-none rounded-xl  py-2 pl-12 lg:h-[3rem] mt-4 placeholder-slate-700
                  text-black`}
                  value={email}
                  autoComplete="email"
                  placeholder="example@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                />

                <div
                  className={`${
                    validated ? "text-green-500" : "text-red-500 animate-shake"
                  } text-[11px] pl-2 mb-1 pt-1`}
                >
                  {/* {validationMsg} */}
                  {validationMsg === "Invalid email id." ? (
                    validationMsg
                  ) : (
                    <div className="opacity-0 ">corect email id</div>
                  )}
                </div>
                <div
                  className={`${
                    validationMsg === "Invalid email id."
                      ? "text-red-500"
                      : "text-black"
                  }   absolute lg:mt-[1.72rem] xs:mt-[1.3rem] ml-[.9rem]`}
                >
                  <UserRound className="scale-75" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  // required
                  value={password}
                  autoComplete="current-password"
                  className={`${
                    validated || validationMsg === "Invalid email id."
                      ? ""
                      : "outline-red-500"
                  } bg-theme-purple50 mb-1 rounded-xl outline-none py-2 pl-12 lg:h-[3rem] placeholder-slate-700 text-black`}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />

                <div
                  className={`${
                    validated ? "" : "text-red-500  px-2"
                  } text-[11px] pt-1`}
                >
                  {/* {validationMsg} */}
                  {validationMsg !== "Invalid email id." &&
                  validationMsg !== "Validated" ? (
                    <div className="animate-shake">{validationMsg}</div>
                  ) : validationMsg === "Validated" ? (
                    <div className="text-green-500">{validationMsg}</div>
                  ) : (
                    <div className="opacity-0 "></div>
                  )}
                </div>
                <div
                  className={`${
                    validated || validationMsg === "Invalid email id."
                      ? "text-black"
                      : "text-red-500"
                  } text-[11px] absolute xs:right-9 lg:right-[3rem] scale-75 cursor-pointer lg:mt-[6.5rem] xs:mt-[5.4rem]`}
                >
                  {showPassword ? (
                    <Eye onClick={toggleShowPassword} />
                  ) : (
                    <EyeOff onClick={toggleShowPassword} />
                  )}
                </div>
                <div
                  className={`${
                    validated || validationMsg === "Invalid email id."
                      ? "text-black"
                      : "text-red-500"
                  } flex
               absolute lg:mt-[6.35rem] xs:mt-[5.4rem] ml-[.9rem]`}
                >
                  <Lock className="scale-75" />
                </div>
                <div className="mb-3 text-right">
                  <Link to="/reset">
                    <button className="text-[10px] text-blue-500 underline transition-all hover:text-orange-500">
                      {" "}
                      forget Password
                    </button>
                  </Link>
                </div>
                <button
                  type="submit"
                  className={`block w-full  mb-2 p-3 px-5 rounded-2xl font-bold text-white transition-all 
                  bluegradient
                  hover:scale-[1.02] text-sm`}
                >
                  Login
                </button>
                <div className="text-[10.5px]">
                  By continuing, you agree to ECommerce's{" "}
                  <span className="text-blue-500 transition-all cursor-not-allowed hover:underline hover:text-orange-500 ">
                    Conditions of Use
                  </span>{" "}
                  and{" "}
                  <span className="text-blue-500 transition-all cursor-not-allowed hover:underline hover:text-orange-500 ">
                    Privacy Notice
                  </span>
                  .
                </div>
              </form>
              <div className="w-full text-xs">
                <div className="flex items-center justify-center my-5">
                  <div className="w-full h-[.3px] bg-white/60"></div>
                  <div className="w-full text-center ">or signin with</div>
                  <div className="w-full h-[.3px] bg-white/60"></div>
                </div>
                <button
                  onClick={signInWithGoogle}
                  className={`flex my-3 justify-center gap-1 items-center w-full mb-2 p-2 px-5 rounded-2xl font-bold text-white transition-all hover:scale-[1.02] text-sm bluegradient`}
                >
                  <img
                    className="w-8 h-8 bg-white rounded-full"
                    src={googlelogo}
                    alt="googlelogo"
                  />
                  Sign in with Google
                </button>
              </div>
            </div>

            <div className="flex justify-center my-1 text-xs ">
              <div className="cursor-default">{"Don't have an account?"}</div>
              <Link to="/signup">
                <div className="px-1 text-blue-500 underline transition-all cursor-pointer hover:text-orange-500">
                  signup
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login3;
