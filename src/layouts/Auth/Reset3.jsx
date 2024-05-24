import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserRound } from "lucide-react";
import vector from "../../assets/Images/resetVector.png";
import "../../Global.css";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import authsvg from "../../assets/SVG/authSVG.svg";
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
        className="flex items-center justify-center w-screen h-screen overflow-hidden cursor-default "
        style={{ backgroundImage: `url(${authsvg})`, backgroundSize: "cover" }}
      >
        <div
          className="flex items-center justify-center rounded-3xl
          text-white
      w-[57%] h-[50%] py-1"
        >
          <div
            className="w-[50%] h-full rounded-3xl flex flex-col pb-5 backdrop-blur-xl bg-white/15 
            shadow-[0_8px_30px_rgb(0,0,0,0.12)] "
          >
            <div className="flex flex-col items-center justify-center w-full h-full p-8 rounded-3xl ">
              <div className="flex flex-col items-start w-full gap-1 my-5">
                <div className="text-2xl font-bold ">Reset Password</div>
              </div>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col w-full text-sm"
              >
                <input
                  type="text"
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
                  }   absolute lg:mt-[0.8rem] xs:mt-[1.3rem] ml-[.9rem]`}
                >
                  <UserRound className="scale-75" />
                </div>
                <button
                  type="submit"
                  className={`block w-full p-3 px-5 mt-1 rounded-2xl mb-5 font-bold text-white transition-all hover:scale-[1.02] text-sm bluegradient`}
                >
                  Reset Password
                </button>
                <div className="flex justify-between my-1 text-xs bg-red-">
                  <Link to="/signup">
                    <div className="px-1 text-blue-500 underline transition-all cursor-pointer hover:text-orange-500">
                      register
                    </div>
                  </Link>
                  <Link to="/login">
                    <div className="px-1 text-blue-500 underline transition-all cursor-pointer hover:text-orange-500">
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
