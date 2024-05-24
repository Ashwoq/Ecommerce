import { useState } from "react";
import { EyeOff, Eye, UserRound, Lock } from "lucide-react";
import authsvg from "../../assets/SVG/authSVG.svg";
import "../../Global.css";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import Loader from "../../Components/Loader";
import { toast } from "react-toastify";

const Signup3 = () => {
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

    if (
      email.length >= 8 &&
      hasAt &&
      hasRequiredLength &&
      hasSpecialChar &&
      hasNumber &&
      hasUppercase &&
      password === cPassword
    ) {
      setValidated(true);
      setValidationMsg("Validated");
      setIsLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          //   console.log(user);
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
    } else {
      setValidated(false);
      if (email.length < 8 || !hasAt) {
        setValidationMsg("Invalid email id.");
      } else if (!hasRequiredLength) {
        setValidationMsg("Password must be at least 8 characters long.");
      } else if (!hasSpecialChar) {
        setValidationMsg(
          "Password must include at least one spl chr (# or *)."
        );
      } else if (!hasNumber) {
        setValidationMsg("Password must include at least one number.");
      } else if (!hasUppercase) {
        setValidationMsg(
          "Password must include at least one uppercase letter."
        );
      } else if (password !== cPassword) {
        setValidationMsg("Password didn't match!");
        toast.error("Password didn't match!");
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
      lg:w-[57%] xs:w-[85%] h-[83%] py-1"
        >
          <div
            className="xs:w-full lg:w-[50%] h-full rounded-3xl flex flex-col pb-5 backdrop-blur-xl bg-white/15 
            shadow-[0_8px_30px_rgb(0,0,0,0.12)] "
          >
            <div className="flex flex-col items-center justify-center w-full h-full p-8 rounded-3xl ">
              <div className="flex flex-col items-center justify-center gap-1 mb-5 ">
                <div className="text-2xl font-bold ">ECommerce</div>
                <div className="text-sm font-semibold ">Hello there!</div>
              </div>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col w-full text-sm"
              >
                <div className="flex flex-col w-full">
                  <input
                    type="text"
                    // required
                    className={`${
                      validationMsg === "Invalid email id."
                        ? "outline-red-500"
                        : ""
                    }
                  bg-theme-purple50 outline-none rounded-xl  py-2 pl-12 lg:h-[3rem] text-black placeholder-slate-700
                  `}
                    value={email}
                    autoComplete="email"
                    placeholder="example@gmail.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div
                    className={`${
                      validated ? "text-green-500" : "text-red-500"
                    } text-[11px] pl-2 mb-1 pt-1`}
                  >
                    {/* {validationMsg} */}
                    {validationMsg === "Invalid email id." ? (
                      validationMsg
                    ) : (
                      <div className="opacity-0 ">correct email id</div>
                    )}
                  </div>
                  <div
                    className={`${
                      validationMsg === "Invalid email id."
                        ? "text-red-500"
                        : "text-black"
                    }   absolute lg:mt-[0.8rem] xs:mt-[.4rem] ml-[.9rem]`}
                  >
                    <UserRound className="scale-75" />
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <input
                    type={showPassword ? "text" : "password"}
                    // required
                    value={password}
                    autoComplete="current-password"
                    className={`${
                      validated || validationMsg === "Invalid email id."
                        ? ""
                        : "outline-red-500"
                    } bg-theme-purple50 rounded-xl outline-none py-2 pl-12 lg:h-[3rem] text-black placeholder-slate-700`}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div
                    className={`${
                      validated ? "" : "text-red-500"
                    } text-[11px] pl-2 pt-1 h-8`}
                  >
                    {validationMsg && validationMsg !== "Invalid email id." && (
                      <div
                        className={
                          validationMsg === "Validated" ? "text-green-500" : ""
                        }
                      >
                        {validationMsg}
                      </div>
                    )}
                    {validationMsg === "Invalid email id." && (
                      <div className="opacity-0">{validationMsg}</div>
                    )}
                  </div>

                  <div
                    className={`${
                      validated || validationMsg === "Invalid email id."
                        ? "text-black"
                        : "text-red-500"
                    } text-[11px] absolute xs:right-10 lg:left-[23rem] scale-75 cursor-pointer lg:mt-[.7rem] xs:mt-[.4rem]`}
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
               absolute lg:mt-[.7rem] xs:mt-[.3rem] ml-[.9rem]`}
                  >
                    <Lock className="scale-75" />
                  </div>
                </div>
                <input
                  type={showCPassword ? "text" : "password"}
                  // required
                  value={cPassword}
                  autoComplete="current-password"
                  className={`${
                    validated || validationMsg === "Invalid email id."
                      ? ""
                      : "outline-red-500"
                  } bg-theme-purple50 rounded-xl outline-none py-2 pl-12 lg:h-[3rem] text-black placeholder-slate-700`}
                  placeholder="Confirm Password"
                  onChange={(e) => setCPassword(e.target.value)}
                />
                <div
                  className={`${
                    validated ? "" : "text-red-500"
                  } text-[11px] pl-2 pt-1`}
                >
                  {validationMsg === "Password didn't match!" ? (
                    <div className="">
                      {validationMsg}
                      <span className="opacity-0">leodas</span>
                    </div>
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
                  } text-[11px] absolute xs:right-10 lg:left-[23rem] scale-75 cursor-pointer lg:mt-[10.5rem] xs:mt-[8.6rem]`}
                >
                  {showCPassword ? (
                    <Eye onClick={toggleShowCPassword} />
                  ) : (
                    <EyeOff onClick={toggleShowCPassword} />
                  )}
                </div>
                <div
                  className={`${
                    validated || validationMsg === "Invalid email id."
                      ? "text-black"
                      : "text-red-500"
                  } flex
               absolute lg:mt-[10.4rem] xs:mt-[8.5rem] ml-[.9rem]`}
                >
                  <Lock className="scale-75" />
                </div>
                <div className="mb-5 text-right">
                  <Link to="/reset">
                    <button className="text-[10px] text-blue-500 underline transition-all hover:text-orange-500">
                      {" "}
                      forget Password
                    </button>
                  </Link>
                </div>
                <button
                  type="submit"
                  className={`block w-full p-3 px-5 rounded-2xl font-bold text-white transition-all hover:scale-[1.02] text-sm bluegradient`}
                >
                  Register
                </button>
                <div className="text-[10.5px] my-4">
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
            </div>
            <div className="flex justify-center mb-2 text-xs">
              <div className="cursor-default">Already have an account?</div>
              <Link to="/login">
                <div className="px-1 text-blue-500 underline transition-all cursor-pointer hover:text-orange-500">
                  login
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup3;
