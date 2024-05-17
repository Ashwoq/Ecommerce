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

  const handleSubmit = (event) => {
    event.preventDefault();
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
      w-[45%] h-[60%]"
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
                className="flex flex-col w-full gap-2 text-sm bg-red"
              >
                <input
                  type="text"
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
                <button
                  type="submit"
                  className={`block w-full p-3 px-5 rounded-2xl mb-3 font-bold text-white transition-all hover:scale-[1.04] text-sm ${"bg-theme-purple hover:bg-theme-purple600"}`}
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
