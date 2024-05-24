import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserRound } from "lucide-react";
import login3 from "../../assets/Login/loginbg3.jpg";
import "../../Global.css";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import Loader from "../../Components/Loader";

const Reset = () => {
  const location = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [validated, setValidated] = useState(true);
  const [validationMsg, setValidationMsg] = useState("");
  const hasAt = email.includes("@");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email.length >= 8 && hasAt) {
      setValidated(true);
      setValidationMsg("Validated");
      setIsLoading(true);
      sendPasswordResetEmail(auth, email)
        .then(() => {
          setIsLoading(false);
          toast.success("Check your email for a reset link");
          location("/login");
        })
        .catch((error) => {
          setIsLoading(false);
          toast.error(error.message);
        });
    } else {
      setValidated(false);
      if (email.length < 8 || !hasAt) {
        setValidationMsg("Invalid email id.");
      }
    }
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
      xs:w-[85%] lg:w-[45%] h-[60%]"
        >
          <div
            className="lg:w-[55%] xs:w-full h-[75%]
          rounded-3xl 
          bg-theme-ppk   
          "
          >
            <div
              className="flex flex-col items-center justify-center w-full h-full rounded-3xl p-7 "
              // shadow-[0_8px_30px_rgb(0,0,0,0.15)]
              style={{
                boxShadow: "6px 14px 70px 50px rgb(252, 188, 239,0.5)",
              }}
            >
              <div className="w-full pb-4 ">
                <span className="block text-xl font-bold text-center">
                  RESET
                </span>
              </div>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col w-full gap-1 text-sm bg-red"
              >
                <input
                  type="text"
                  // className="bg-white rounded-xl focus:outline-none py-2 pl-12 lg:h-[3rem] my-4 placeholder-slate-700"
                  className={`${
                    validationMsg === "Invalid email id."
                      ? "outline-red-500"
                      : ""
                  }
                  bg-theme-purple50 outline-none rounded-xl py-2 pl-12 lg:h-[3rem] placeholder-slate-700
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
                  }   absolute lg:mt-[0.8rem] xs:mt-[.3rem] ml-[.9rem]`}
                >
                  <UserRound className="scale-75" />
                </div>
                <button
                  type="submit"
                  className={`block w-full p-3 px-5 rounded-2xl mb-4 font-bold text-white transition-all hover:scale-[1.04] text-sm ${"bg-theme-purple hover:bg-theme-purple600"}`}
                >
                  Reset Password
                </button>
                <Divider />
                <div className="flex justify-between my-1 mb-5 text-xs bg-red-">
                  <Link to="/signup">
                    <div className="px-1 text-blue-700 underline transition-all cursor-pointer hover:text-orange-500">
                      register
                    </div>
                  </Link>
                  <Link to="/login">
                    <div className="px-1 text-blue-700 underline transition-all cursor-pointer hover:text-orange-500">
                      login
                    </div>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reset;
