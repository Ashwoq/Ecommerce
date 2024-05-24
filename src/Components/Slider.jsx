// import nike1 from "../assets/Images/nike1.png";
// import apli from "../assets/Images/apli.png";
// import bts from "../assets/Images/bts.png";
// import crocs from "../assets/Images/crocs.png";
// import football7cr from "../assets/Images/football7cr.png";
// import iphonefamily from "../assets/Images/iphonefamily.png";
// import hockey from "../assets/Images/hockey.png";
// import golf from "../assets/Images/golf.png";
// import jacket from "../assets/Images/jacket.png";
// import kiddress from "../assets/Images/kiddress.png";
// import blackjacket from "../assets/Images/blackjacket.png";
// import hockey1 from "../assets/Images/hockey1.png";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Slider = ({
  slides,
  flexBanner,
  flexBanner2,
  smartBanner,
  milliSeconds,
}) => {
  const location = useNavigate();
  const scroller = () => {
    location("/#products");
    window.location.reload();
  };
  //   const slides = [
  //     { url: hockey, alt: "Hockey Fever: Exclusive Offers Await!" },
  //     { url: golf, alt: "Fore! Golf Deals Tee'd Up for You" },
  //     { url: hockey1, alt: "Hat-trick of Savings: Hockey's Finest!" },
  //     { url: football7cr, alt: "Football Frenzy: Score Big on Offers!" },
  //   ];

  //   const slides = [
  //     {
  //       url: "https://images-eu.ssl-images-amazon.com/images/G/31/img21/OHL/Budget/Unrec/GW/BS_2X_PC_1._CB580097921_.jpg",
  //       alt: "Landing1stImage",
  //     },
  //     {
  //       url: "https://images-eu.ssl-images-amazon.com/images/G/31/OHL/24/BAU/feb/PC_hero_1_2x_1._CB582889946_.jpg",
  //       alt: "Landing1stImage",
  //     },
  //     {
  //       url: "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Beauty/GW/Skincare._CB580162062_.jpg",
  //       alt: "Landing1stImage",
  //     },
  //     {
  //       url: "https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/GW/Uber/Nov/D103625178_DesktopTallHero_3000x1200._CB574597993_.jpg",
  //     },
  //     {
  //       url: "https://images-eu.ssl-images-amazon.com/images/G/31/img22/CE/March/Unrec/HF/Under_1499_Tallhero_3000x1200._CB581730972_.jpg",
  //       alt: "Landing1stImage",
  //     },
  //     {
  //       url: "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Consumables/X-GL/Feb5/PC_Hero_1_3000._CB582457311_.jpg",
  //       alt: "Landing1stImage",
  //     },
  //   ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, milliSeconds);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="relative h-full m-auto group">
      {flexBanner && (
        <div
          className="w-full h-full bg-center bg-no-repeat bg-cover duration-500 transition-filter
        z-[-1] 
        "
          style={{
            backgroundImage: `url(${slides[currentIndex].url})`,
          }}
        >
          <div className="absolute left-0 flex flex-col items-center justify-center w-full h-full gap-3 font-bold top-5">
            <div className="p-2 px-3 text-center bg-white xs:text-sm lg:text-xl rounded-2xl ">
              {slides[currentIndex].alt}
            </div>
            <button
              onClick={() => scroller}
              className="p-2 px-5 lg:text-base xs:text-xs 
                    background-animate
bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-green-500 to-green-700
             text-white rounded-xl
          scale-[0.95]
          transition-all
          hover:bg-theme-purple400
          hover:rounded-lg
          hover:scale-[0.98]
          hover:shadow-[rgba(0,_0,_0,_0.2)_0px_5px_30px]"
            >
              See More
            </button>
          </div>

          <div className="hidden group-hover:flex absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer ">
            <ChevronLeft onClick={prevSlide} size={30} />
          </div>
          <div className="hidden group-hover:flex absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
            <ChevronRight onClick={nextSlide} size={30} />
          </div>
        </div>
      )}
      {/* <img
            className="object-contain my-auto duration-500 bg-red-900 transition-filter w-fit h-fit"
            src={slides[currentIndex].url}
            alt={slides[currentIndex].alt}
          /> */}
      {smartBanner && (
        <div className="relative flex flex-col justify-between h-fit group">
          {slides.map((slide, index) => (
            <img
              key={index}
              className="absolute top-0 left-0 right-0 object-contain my-auto transition-opacity duration-500 scale-90 opacity-0 bottom-8 w-fit h-fit"
              src={slide.url}
              alt={slide.alt}
              style={{
                opacity: index === currentIndex ? 1 : 0,
              }}
            />
          ))}
          <div className="flex items-center justify-between gap-5 px-6 lg:mt-[21rem]  xs:mt-[7rem]">
            <div>
              <div className="lg:text-xs xs:text-[10px] font-bold text-gray-400">
                Pick of the day
              </div>
              <div className="font-bold lg:text-lg xs:text-xs">
                {slides[currentIndex].alt}
              </div>
            </div>
            <button
              onClick={() => scroller()}
              className="xs:p-1 lg:p-2 xs:px-3 lg:px-4 xs:text-[10px] lg:text-sm text-white background-animate bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-700 via-blue-800 to-gray-900 scale-[0.93] transition-all hover:rounded-lg hover:scale-[0.98] hover:shadow-[rgba(0,_0,_0,_0.2)_0px_5px_30px] rounded-xl z-50"
            >
              Explore
            </button>
          </div>
          <div className="hidden group-hover:flex absolute top-[50%] -translate-x-0 translate-y-[-50%] left-1 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer ">
            <ChevronLeft onClick={prevSlide} size={20} />
          </div>
          <div className="hidden group-hover:flex absolute top-[50%] -translate-x-0 translate-y-[-50%] right-1 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
            <ChevronRight onClick={nextSlide} size={20} />
          </div>
        </div>
      )}
      {flexBanner2 && (
        <div className="relative flex justify-between w-full h-full group">
          <div className="">
            {slides.map((slide, index) => (
              <img
                key={index}
                className="absolute top-0 bottom-0 left-8 right-0 object-contain my-auto transition-opacity duration-500 scale-90 opacity-0 w-[60%] h-fit"
                src={slide.url}
                alt={slide.alt}
                style={{
                  opacity: index === currentIndex ? 1 : 0,
                }}
              />
            ))}
          </div>
          {/* <div className="flex flex-col justify-center px-10 bg-red-900">
            <div>
              <div className="text-xs font-bold text-gray-400">
                Pick of the day
              </div>
              <div className="text-lg font-bold">
                {slides[currentIndex].alt}
              </div>
            </div>
            <button
            
            onClick={()=>scroller()}className="p-2 px-4 text-sm text-white background-animate bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-700 via-blue-800 to-gray-900 scale-[0.93] transition-all hover:rounded-lg hover:scale-[0.98] hover:shadow-[rgba(0,_0,_0,_0.2)_0px_5px_30px] rounded-xl">
              Explore
            </button>
          </div> */}
          <div className="flex items-center ">
            <div className="w-max">
              <div className="text-xs font-bold text-gray-400">
                Beat the Heat
              </div>
              <div className="text-lg font-bold">
                Summer's Best Friend <br></br>
                {slides[currentIndex].alt}
              </div>
              <button
                onClick={() => scroller()}
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
          </div>
          <div className="hidden group-hover:flex absolute top-[50%] -translate-x-0 translate-y-[-50%] left-1 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
            <ChevronLeft onClick={prevSlide} size={20} />
          </div>
          <div className="hidden group-hover:flex absolute top-[50%] -translate-x-0 translate-y-[-50%] right-1 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
            <ChevronRight onClick={nextSlide} size={20} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Slider;
