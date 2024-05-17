import React from "react";
import { Instagram } from "lucide-react";
import footerData from "../../../assets/Data/FooterData.json";

const Footer = () => {
  return (
    <div className="bg-gray-300 rounded-t-none rounded-xl">
      {/* bg-gradient-to-t from-gray-300 to-gray-300 */}
      {/* rounded-t-none shadow-2xl rounded-[3rem] mt-[-1px]
bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-gray-700 via-gray-100 to-gray-700 */}
      <div
        className="grid w-full h-full grid-cols-5 p-6 py-10 gap-x-4 "
        //  bg-black rounded-t-none shadow-2xl  rounded-[2rem] bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 "
      >
        {footerData.slice(0, -1).map((item, index) => (
          <div
            key={index}
            className="p-4 shadow-2xl rounded-2xl 
            bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-slate-900 via-purple-900 to-slate-900
            "
            // style={{
            //   backgroundColor: "rgb(30, 58, 138)",
            //   backgroundImage:
            //     "radial-gradient(at 20% 13%, rgb(129, 140, 248) 0, transparent 1%), radial-gradient(at 35% 64%, rgb(252, 231, 243) 0, transparent 75%), radial-gradient(at 36% 19%, rgb(245, 158, 11) 0, transparent 8%), radial-gradient(at 69% 44%, rgb(228, 228, 231) 0, transparent 35%), radial-gradient(at 2% 74%, rgb(134, 239, 172) 0, transparent 85%), radial-gradient(at 68% 10%, rgb(107, 114, 128) 0, transparent 31%)",
            // }}
          >
            {item.category && (
              <div>
                <div
                  className="inline p-2 px-4 text-lg font-bold text-white cursor-default
bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-indigo-200 via-slate-600 to-indigo-200
                   rounded-xl "
                >
                  {item.category}
                </div>
                <div className="mt-2 ">
                  {item.subcategories &&
                    item.subcategories.map((subItem, subIndex) => (
                      <div key={subIndex} className="flex">
                        {/* <div className="text-[3rem] text-white">&#8226;</div> */}
                        <div className="text-white cursor-pointer w-fit hover:text-gray-400">
                          {subItem}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
            {item.communication && (
              <div className="">
                <div className="text-lg font-bold text-white ">
                  {item.communication}
                </div>
                <div className="flex mt-2 gap-x-3">
                  {item.communicationLinks.map((subItem, subIndex) => (
                    <a
                      key={subIndex}
                      href={subItem.comLinks}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="p-1 bg-white rounded-full hover:text-gray-400">
                        {/* <img src={subItem.comImgSVG} alt={subItem.comName} /> */}
                        img
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="text-center text-white bg-black">
        {footerData
          .filter((item) => item.hasOwnProperty("copyrightsDetails"))
          .map((item, index) => (
            <div key={index} className="p-4 ">
              <div className="text-lg font-bold ">
                {item.hasOwnProperty("copyrightsDetails") &&
                  item.copyrightsDetails}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Footer;
