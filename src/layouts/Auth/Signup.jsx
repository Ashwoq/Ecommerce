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
        // console.log(user);
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
     xs:w-[90%] lg:w-[57%] h-[70%]"
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
               absolute lg:mt-[.75rem] xs:mt-[.4rem] ml-[.9rem]"
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
                  className="absolute xs:left-[17rem] lg:left-[22rem] scale-75 cursor-pointer lg:mt-[4.4rem] xs:mt-[3.4rem]
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
               absolute lg:mt-[4.4rem] xs:mt-[3.4rem] ml-[.9rem]"
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
                  className="absolute xs:left-[17rem] lg:left-[22rem] scale-75 cursor-pointer lg:mt-[8.2rem] xs:mt-[6.4rem]
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
               absolute lg:mt-[8.2rem] xs:mt-[6.4rem] ml-[.9rem]"
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

// import { useState } from "react";
// // import { Alert, Slide, } from "@mui/material";
// import { EyeOff, Eye, UserRound, Lock } from "lucide-react";
// import login3 from "../../assets/Login/loginbg3.jpg";
// import signupvector from "../../assets/Images/Signup/signupvector.png";
// import "../../Global.css";
// import Divider from "@mui/material/Divider";
// import { Link, useNavigate } from "react-router-dom";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../firebase/config";
// import Loader from "../../Components/Loader";
// import { toast } from "react-toastify";

// const Signup = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showCPassword, setShowCPassword] = useState(false);

//   const toggleShowPassword = () => {
//     setShowPassword((prevShowPassword) => !prevShowPassword);
//   };

//   const toggleShowCPassword = () => {
//     setShowCPassword((prevShowPassword) => !prevShowPassword);
//   };

//   const location = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [cPassword, setCPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [validated, setValidated] = useState(true);
//   const [validationMsg, setValidationMsg] = useState("");

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     setValidated(false);
//     const hasRequiredLength = password.length >= 8;
//     const hasSpecialChar = /[#*]/.test(password);
//     const hasAt = email.includes("@");
//     const hasNumber = /[0-9]/.test(password);
//     const hasUppercase = /[A-Z]/.test(password);

//     if (
//       email.length >= 8 &&
//       hasAt &&
//       hasRequiredLength &&
//       hasSpecialChar &&
//       hasNumber &&
//       hasUppercase &&
//       password === cPassword
//     ) {
//       setValidated(true);
//       setValidationMsg("Validated");
//       setIsLoading(true);
//       createUserWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//           const user = userCredential.user;
//           console.log(user);
//           setIsLoading(false);
//           toast.success("Registration Succcessful");
//           location("/login");
//         })
//         .catch((error) => {
//           const errorCode = error.code;
//           const errorMessage = error.message;
//           toast.error(errorCode, errorMessage);
//           setIsLoading(false);
//         });
//     } else {
//       setValidated(false);
//       if (email.length < 8 || !hasAt) {
//         setValidationMsg("Invalid email id.");
//       } else if (!hasRequiredLength) {
//         setValidationMsg("Password must be at least 8 characters long.");
//       } else if (!hasSpecialChar) {
//         setValidationMsg(
//           "Password must include at least one spl chr (# or *)."
//         );
//       } else if (!hasNumber) {
//         setValidationMsg("Password must include at least one number.");
//       } else if (!hasUppercase) {
//         setValidationMsg(
//           "Password must include at least one uppercase letter."
//         );
//       } else if (password !== cPassword) {
//         setValidationMsg("Password didn't match!");
//         toast.error("Password didn't match!");
//       }
//     }
//   };

//   return (
//     <>
//       {isLoading && <Loader />}
//       <div
//         className="flex items-center justify-center w-screen h-screen overflow-hidden bg-theme-puple300"
//         style={{
//           backgroundImage: `url(${login3})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       >
//         <div
//           className="flex items-center justify-center rounded-3xl
//       shadow-[0_8px_30px_rgb(0,0,0,0.15)] backdrop-blur-sm bg-white/30
//       w-[57%] h-[70%]"
//         >
//           <div
//             className="lg:w-[48%] xs:w-full h-[85%]
//           rounded-3xl
//           bg-theme-ppk
//           "
//           >
//             <div
//               className="flex flex-col items-center justify-center w-full h-full rounded-3xl p-7 "
//               style={{
//                 boxShadow: "-80px 10px 100px 10px rgb(252, 188, 239,0.6)",
//               }}
//             >
//               <div className="w-full pb-2 bg-red">
//                 <span className="block text-xl font-bold text-center">
//                   SIGNUP
//                 </span>
//               </div>
//               <form
//                 onSubmit={handleSubmit}
//                 className="flex flex-col w-full text-sm bg-red"
//               >
//                 <div className="flex flex-col w-full">
//                   <input
//                     type="text"
//                     // required

//                     className={`${
//                       validationMsg === "Invalid email id."
//                         ? "outline-red-500"
//                         : ""
//                     }
//                   bg-theme-purple50 outline-none rounded-xl  py-2 pl-12 lg:h-[3rem] placeholder-slate-700
//                   `}
//                     value={email}
//                     autoComplete="email"
//                     placeholder="example@gmail.com"
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                   <div
//                     className={`${
//                       validated ? "text-green-500" : "text-red-500"
//                     } text-[11px] pl-2 mb-1 pt-1`}
//                   >
//                     {/* {validationMsg} */}
//                     {validationMsg === "Invalid email id." ? (
//                       validationMsg
//                     ) : (
//                       <div className="opacity-0 ">correct email id</div>
//                     )}
//                   </div>
//                   <div
//                     className={`${
//                       validationMsg === "Invalid email id."
//                         ? "text-red-500"
//                         : "text-black"
//                     }   absolute lg:mt-[0.8rem] xs:mt-[1.3rem] ml-[.9rem]`}
//                   >
//                     <UserRound className="scale-75" />
//                   </div>
//                 </div>
//                 <div className="flex flex-col w-full">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     // required
//                     value={password}
//                     autoComplete="current-password"
//                     className={`${
//                       validated || validationMsg === "Invalid email id."
//                         ? ""
//                         : "outline-red-500"
//                     } bg-theme-purple50 rounded-xl outline-none py-2 pl-12 lg:h-[3rem] placeholder-slate-700`}
//                     placeholder="Password"
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                   <div
//                     className={`${
//                       validated ? "" : "text-red-500"
//                     } text-[11px] pl-2 pt-1 h-8`}
//                   >
//                     {validationMsg && validationMsg !== "Invalid email id." && (
//                       <div
//                         className={
//                           validationMsg === "Validated" ? "text-green-500" : ""
//                         }
//                       >
//                         {validationMsg}
//                       </div>
//                     )}
//                     {validationMsg === "Invalid email id." && (
//                       <div className="opacity-0">{validationMsg}</div>
//                     )}
//                   </div>

//                   <div
//                     className={`${
//                       validated || validationMsg === "Invalid email id."
//                         ? "text-black"
//                         : "text-red-500"
//                     } text-[11px] absolute xs:right-9 lg:left-[18.25rem] scale-75 cursor-pointer lg:mt-[.7rem] xs:mt-[5.4rem]`}
//                   >
//                     {showPassword ? (
//                       <Eye onClick={toggleShowPassword} />
//                     ) : (
//                       <EyeOff onClick={toggleShowPassword} />
//                     )}
//                   </div>
//                   <div
//                     className={`${
//                       validated || validationMsg === "Invalid email id."
//                         ? "text-black"
//                         : "text-red-500"
//                     } flex
//                absolute lg:mt-[.7rem] xs:mt-[5.4rem] ml-[.9rem]`}
//                   >
//                     <Lock className="scale-75" />
//                   </div>
//                 </div>
//                 <input
//                   type={showCPassword ? "text" : "password"}
//                   // required
//                   value={cPassword}
//                   autoComplete="current-password"
//                   className={`${
//                     validated || validationMsg === "Invalid email id."
//                       ? ""
//                       : "outline-red-500"
//                   } bg-theme-purple50 rounded-xl outline-none py-2 pl-12 lg:h-[3rem] placeholder-slate-700`}
//                   placeholder="Confirm Password"
//                   onChange={(e) => setCPassword(e.target.value)}
//                 />
//                 <div
//                   className={`${
//                     validated ? "" : "text-red-500"
//                   } text-[11px] pl-2 pt-1`}
//                 >
//                   {validationMsg === "Password didn't match!" ? (
//                     <div className="">
//                       {validationMsg}
//                       <span className="opacity-0">leodas</span>
//                     </div>
//                   ) : validationMsg === "Validated" ? (
//                     <div className="text-green-500">{validationMsg}</div>
//                   ) : (
//                     <div className="opacity-0 "></div>
//                   )}
//                 </div>
//                 <div
//                   className={`${
//                     validated || validationMsg === "Invalid email id."
//                       ? "text-black"
//                       : "text-red-500"
//                   } text-[11px] absolute xs:right-9 lg:left-[18.25rem] scale-75 cursor-pointer lg:mt-[10.5rem] xs:mt-[5.4rem]`}
//                 >
//                   {showCPassword ? (
//                     <Eye onClick={toggleShowCPassword} />
//                   ) : (
//                     <EyeOff onClick={toggleShowCPassword} />
//                   )}
//                 </div>
//                 <div
//                   className={`${
//                     validated || validationMsg === "Invalid email id."
//                       ? "text-black"
//                       : "text-red-500"
//                   } flex
//                absolute lg:mt-[10.5rem] xs:mt-[5.4rem] ml-[.9rem]`}
//                 >
//                   <Lock className="scale-75" />
//                 </div>
//                 <div className="mb-3 text-right">
//                   <Link to="/reset">
//                     <button className="text-[10px] text-blue-700 underline transition-all hover:text-orange-500">
//                       {" "}
//                       forget Password
//                     </button>
//                   </Link>
//                 </div>
//                 <button
//                   type="submit"
//                   className={`block w-full  mb-2 p-3 px-5 rounded-2xl font-bold text-white transition-all hover:scale-[1.04] text-sm ${"bg-theme-purple hover:bg-theme-purple600"}`}
//                 >
//                   Register
//                 </button>
//                 <Divider />
//                 <div className="flex justify-center my-1 mb-5 text-xs bg-red-">
//                   <div className="cursor-default">Already have an account?</div>
//                   <Link to="/login">
//                     <div className="px-1 text-blue-700 underline transition-all cursor-pointer hover:text-orange-500">
//                       login
//                     </div>
//                   </Link>
//                 </div>
//               </form>
//             </div>
//           </div>
//           <div
//             className="lg:flex xs:hidden w-[50%] flex-col items-center
//           justify-center p-5 rounded-t-none rounded-b-none
//           rounded-3xl"
//           >
//             <div className="w-full mb-5  mt-[-10px]">
//               <span className="block text-2xl font-bold text-center">
//                 Hello there,
//               </span>
//             </div>
//             <div className="">
//               <img src={signupvector} alt="signupvector"></img>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Signup;
