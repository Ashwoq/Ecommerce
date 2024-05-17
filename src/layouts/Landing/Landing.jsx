// import bts from "../../assets/Images/bts.png";
// import suit from "../../assets/Images/suit1.png";
// import apli from "../../assets/Images/apli.png";
import lotion from "../../assets/Images/lotion.jpeg";
import crocs from "../../assets/Images/crocs.png";
// import iphonefamily from "../../assets/Images/iphonefamily.png";
import blackjacket from "../../assets/Images/blackjacket.png";
import football7cr from "../../assets/Images/football7cr.png";
// import schoolkidbag from "../../assets/Images/schoolkidbag.png";

import hockey from "../../assets/Images/hockey.png";
import golf from "../../assets/Images/golf.png";
// import jacket from "../../assets/Images/jacket.png";
// import kiddress from "../../assets/Images/kiddress.png";
import hockey1 from "../../assets/Images/hockey1.png";

import nike1 from "../../assets/Images/nike1.png";
import nike2 from "../../assets/Images/nike2.png";
import nike3 from "../../assets/Images/nike3.png";
import nike4 from "../../assets/Images/nike4.png";
import nike5 from "../../assets/Images/nike5.png";
import nike6 from "../../assets/Images/nike6.png";

import iwatch from "../../assets/Images/iwatch.png";
import iwatch2 from "../../assets/Images/watch2.png";
import iwatch3 from "../../assets/Images/watch3.png";
import iwatch4 from "../../assets/Images/watch4.png";
import iwatch5 from "../../assets/Images/watch5.png";

import lgac from "../../assets/Images/lgac.png";
import lgac2 from "../../assets/Images/lgac2.png";
import lgac3 from "../../assets/Images/lgac3.png";

import Slider from "../../Components/Slider";
import { Link, useNavigate } from "react-router-dom";
import landingData from "../../assets/Data/ProductsData.json";
import "../../Global.css";
import Product from "../Product/Product";
import { useEffect } from "react";

const Landing = () => {
  const url = window.location.href;

  useEffect(() => {
    const scrollToProducts = () => {
      if (url.includes("#products")) {
        window.scrollTo({
          top: 750,
          behavior: "smooth",
        });
      }
    };
    scrollToProducts();
  }, [url]);

  const sportsData = [
    { url: hockey, alt: "Hockey Fever: Exclusive Offers Await!" },
    { url: golf, alt: "Fore! Golf Deals Tee'd Up for You" },
    { url: hockey1, alt: "Hat-trick of Savings: Hockey's Finest!" },
    { url: football7cr, alt: "Football Frenzy: Score Big on Offers!" },
  ];

  const shoeData = [
    { url: nike1, alt: "nike1" },
    { url: nike2, alt: "nike2" },
    { url: nike3, alt: "nike3" },
    { url: nike4, alt: "nike4" },
    { url: nike5, alt: "nike5" },
    { url: nike6, alt: "nike6" },
  ];

  const watchData = [
    { url: iwatch, alt: "iwatch" },
    { url: iwatch2, alt: "iwatch2" },
    { url: iwatch3, alt: "iwatch3" },
    { url: iwatch4, alt: "iwatch4" },
    { url: iwatch5, alt: "iwatch5" },
  ];

  const lgData = [
    { url: lgac, alt: "lgac" },
    { url: lgac2, alt: "lgac2" },
    { url: lgac3, alt: "lgac3" },
  ];

  const location = useNavigate();
  const scroller = () => {
    location("/#products");
    window.location.reload();
  };

  return (
    //  bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-gray-700 via-gray-100 to-gray-700

    <div className="bg-gray-200 rounded-b-none shadow-2xl cursor-default ">
      {/* bg-gradient-to-b from-gray-400 via-slate-100 to-gray-300 */}
      <div className=" p-7">
        <div
          className="grid gap-5 xs:grid-cols-2 lg:grid-cols-4 lg:grid-rows-3 xs:grid-rows-5 "
          style={{ gridTemplateRows: "12rem 12rem 12rem" }}
        >
          <div
            className="relative 
shadow-[-5px_-5px_25px_10px_#00000024]
          h-full lg:col-span-2 xs:col-span-2 bg-gradient-to-r from-green-200 via-green-400 to-green-500 rounded-3xl "
          >
            <Slider slides={sportsData} flexBanner={true} milliSeconds={5000} />
          </div>
          <div
            className="flex
shadow-[-5px_-5px_25px_10px_#00000024]
          flex-col justify-center lg:row-span-2 xs:row-span-1 p-3 rounded-3xl bg-gradient-to-r from-gray-100 to-gray-300"
          >
            <div className="">
              <Slider
                slides={watchData}
                smartBanner={true}
                milliSeconds={4700}
              />
            </div>
          </div>
          <div
            className="flex 
shadow-[-5px_-5px_25px_10px_#00000024]
          flex-col justify-center lg:row-span-2 xs:row-span-1 rounded-3xl bg-gradient-to-r from-gray-100 to-gray-300"
          >
            <div>
              <Slider
                slides={shoeData}
                smartBanner={true}
                milliSeconds={4000}
              />
            </div>
          </div>
          <div
            className="relative lg:h-full xs:h-max
shadow-[-5px_-5px_25px_10px_#00000024]
          col-span-2 bg-gradient-to-r from-yellow-100 via-yellow-300 to-yellow-500 rounded-3xl "
          >
            <img
              className="w-full lg:h-full xs:h-max lg:object-cover xs:object-contain rounded-3xl"
              src={lotion}
              alt="lotion"
            />
            <div className="absolute top-0 flex items-center justify-center w-full h-full lg:left-64 xs:left-20">
              <button
                onClick={() => scroller}
                className="lg:p-2  xs:p-1 xs:px-3 lg:px-5 xs:text-xs lg:text-lg font-bold
                    background-animate
                 text-white bg-gradient-to-b from-orange-500 to-yellow-300 rounded-2xl
          scale-[0.93]
          transition-all
          hover:rounded-lg
          hover:scale-[0.98]
          hover:shadow-[rgba(0,_0,_0,_0.2)_0px_5px_30px]"
              >
                Explore !!!
              </button>
            </div>{" "}
          </div>
          <div
            className="lg:flex  
shadow-[-5px_-5px_25px_10px_#00000024]
          items-center p-5 w-fit rounded-3xl bg-gradient-to-r from-gray-100 to-gray-300"
          >
            <img
              className="object-contain w-full lg:h-full xs:h-fit"
              src={crocs}
              alt="crocs"
            />
            <div className="p-2 text-center bg-red-500 rounded-2xl w-fit">
              <div className="p-1 xs:my-0 lg:my-5 font-bold text-center text-white xs:text-[10px] lg:text-sm bg-gradient-to-bl from-fuchsia-900 to-pink-900 box -rotate-12">
                Croc-tastic Deals!
              </div>
              <button
                className="p-2 xs:text-xs lg:text-sm 
                bg-gradient-to-r
                from-rose-700 to-pink-600
          background-animate
         text-white rounded-xl
          scale-[0.93]
          transition-all
          hover:rounded-lg
          hover:scale-[0.98]
          hover:shadow-[rgba(0,_0,_0,_0.2)_0px_5px_30px]"
              >
                Click here
              </button>
            </div>
          </div>
          <div
            className="lg:flex 
shadow-[-5px_-5px_25px_10px_#00000024]
           items-center p-2 px-4 w-fit rounded-3xl bg-gradient-to-r from-gray-100 to-gray-300"
          >
            <img
              className="object-contain w-full lg:h-full xs:h-fit"
              src={blackjacket}
              alt="blackjacket"
            />
            <div className="text-center bg-gray-800 lg:p-2 lg:py-4 rounded-2xl w-fit">
              <div className="p-1 font-bold text-center text-white lg:my-5 lg:px-4 xs:px-2 xs:text-[8px] lg:text-sm bg-gradient-to-r from-sky-400 to-blue-500 box1">
                Stay cozy, stay stylish{" "}
              </div>
              <button
                className="p-2 xs:text-[8px] lg:text-sm 
bg-gradient-from-b from-gray-900 to-gray-600 bg-gradient-to-r
                    background-animate
               text-white
                rounded-xl
          scale-[0.93]
          transition-all
          hover:rounded-lg
          hover:scale-[0.98]
          hover:shadow-[rgba(0,_0,_0,_0.2)_0px_5px_30px]"
              >
                Click here
              </button>
            </div>
          </div>
          <div
            className="lg:flex xs:hidden
shadow-[-5px_-5px_25px_10px_#00000024]           items-center col-span-2 px-5 rounded-3xl bg-gradient-to-r from-gray-100 to-gray-300"
          >
            <div className="w-full h-full">
              <Slider slides={lgData} flexBanner2={true} milliSeconds={6000} />
            </div>
          </div>
        </div>
      </div>

      {/* <div className="grid justify-center gap-5 p-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        {Object.keys(landingData.fourBoxes).map((boxKey) => (
          <div
            key={boxKey}
            className="bg-gray-100 max-w-[355px] p-5
          shadow-[-5px_-5px_25px_10px_#00000024]
          "
          >
            <div className="text-[21px] font-semibold">
              {landingData.fourBoxes[boxKey].title}
            </div>
            <div className="grid items-center justify-center grid-cols-2 gap-3 my-2 gap-y-5">
              {landingData.fourBoxes[boxKey].items.map((item, i) => (
                <div
                  className="flex flex-col items-center justify-center cursor-pointer"
                  key={i}
                >
                  <img
                    className="object-cover h-28"
                    src={item.imgTag}
                    alt={`product-${i}`}
                  />
                  <div className="text-[12px] font-semibold h-10 w-full">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
            <Link to="/appliances">
              <div className="inline-flex text-xs text-blue-500 cursor-pointer">
                {landingData.fourBoxes[boxKey].endTitle}
              </div>
            </Link>
          </div>
        ))}
      </div> */}
      {/* <div className="p-5 mb-0 bg-white m-7">
        <div className="text-xl font-semibold ">Today's Deals</div>
        <div className="flex gap-3">
          <div className="flex gap-3 overflow-x-auto">
            {landingData.mobilePhones.map((phone, index) => (
              <div className="min-w-64 " key={index}>
                <div className="flex items-center justify-center mb-2 bg-gray-200 rounded-md">
                  <img
                    className="object-cover py-2 mix-blend-darken"
                    src={phone.imgSRC}
                    alt={phone.title}
                  />
                </div>
                <div className="flex items-center text-xs font-semibold">
                  <span className="p-1 px-2 text-white bg-red-700 rounded-sm">
                    {phone.discount}
                  </span>
                  <span className="p-1 px-2 text-red-700">
                    Limited time deal
                  </span>
                </div>
                <div className="my-1 text-lg">
                  <small>₹</small>
                  {phone.price}
                  {"  "}
                  <span className="text-xs font-light text-gray-600">
                    M.R.P: <span className="line-through">{phone.mrp}</span>
                  </span>
                </div>
                <div className="flex items-center justify-between mr-1 ">
                  <div className="text-base font-semibold ">{phone.title}</div>

                  {2 > 0 ? (
                    <div className="flex w-max  border border-[#FCD200] shadow-md">
                      <button
                        className="p-1 px-3  bg-[#FFD814] transition  hover:bg-[#f7ca00]  "
                        // onClick={() => removeFromBasket(phone)}
                      >
                        -
                      </button>
                      <div className="p-1 px-3  bg-[#FFD814] transition  hover:bg-[#f7ca00]  ">
                        01
                      </div>

                      <button
                        className="p-1 px-3  bg-[#FFD814] transition  hover:bg-[#f7ca00]  "
                        // onClick={() => addToBasket(phone)}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      className="p-1 px-5  bg-[#FFD814] transition hover:bg-[#f7ca00] border border-[#FCD200] shadow-md "
                      // onClick={() => addToBasket(phone)}
                    >
                      Add
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}

      <Product />
    </div>
  );
};

export default Landing;
{
  /* <img
              className="object-cover w-[70%] h-[70%]"
              src={lgac}
              alt="lgac"
            />{" "}
            <div className="flex items-center ">
              <div className="w-max">
                <div className="text-xs font-bold text-gray-400">
                  Beat the Heat
                </div>
                <div className="text-lg font-bold">Summer's Best Friend</div>
                <button
                  className="p-2 px-4 my-2 text-sm text-white
                    background-animate

bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-blue-700 via-blue-800 to-gray-900
               scale-[0.93]
          transition-all
          hover:rounded-lg
          hover:scale-[0.98]
          hover:shadow-[rgba(0,_0,_0,_0.2)_0px_5px_30px]
              rounded-xl"
                >
                  More info
                </button>
              </div>
            </div> */
}
