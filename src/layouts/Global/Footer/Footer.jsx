// import footerData from "../../../assets/Data/FooterData.json";

// const Footer = () => {
//   return (
//     <div className="bg-gray-100 ">
//       <div className="grid w-full h-full grid-cols-5 p-6 py-10 gap-x-4 ">
//         {footerData.slice(0, -1).map((item, index) => (
//           <div key={index} className="p-4 bg-white shadow-2xl ">
//             {item.category && (
//               <div>
//                 <div className="text-lg font-bold rounded-xl">
//                   {item.category}
//                 </div>
//                 <div className="mt-2 ">
//                   {item.subcategories &&
//                     item.subcategories.map((subItem, subIndex) => (
//                       <div key={subIndex} className="flex">
//                         <div className="w-fit hover:text-gray-400">
//                           {subItem}
//                         </div>
//                       </div>
//                     ))}
//                 </div>
//               </div>
//             )}
//             {item.communication && (
//               <div className="">
//                 <div className="text-lg font-bold">{item.communication}</div>
//                 <div className="flex mt-2 gap-x-3">
//                   {item.communicationLinks.map((subItem, subIndex) => (
//                     <a
//                       key={subIndex}
//                       href={subItem.comLinks}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       <div className="p-1 bg-gray-200 rounded-full hover:bg-gray-300">
//                         <div
//                           className="w-6 h-6 overflow-hidden"
//                           style={{
//                             backgroundImage: `url(${subItem.comImgSVG})`,
//                             backgroundSize: "cover",
//                           }}
//                         ></div>
//                       </div>
//                     </a>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//       <div className="text-center text-white bg-black">
//         {footerData
//           .filter((item) => item.hasOwnProperty("copyrightsDetails"))
//           .map((item, index) => (
//             <div key={index} className="p-4 ">
//               <div className="text-lg font-bold ">
//                 {item.hasOwnProperty("copyrightsDetails") &&
//                   item.copyrightsDetails}
//               </div>
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// };

// export default Footer;

// import footerData from "../../../assets/Data/FooterData.json";

// const Footer = () => {
//   return (
//     <div className="bg-gray-100">
//       <div className="grid grid-cols-1 gap-6 p-6 bg-white shadow-2xl sm:grid-cols-2 md:grid-cols-4">
//         {footerData.map((item, index) => (
//           <div key={index} className="p-4">
//             {item.category && (
//               <div>
//                 <div className="mb-4 text-lg font-bold">{item.category}</div>
//                 {item.subcategories && (
//                   <ul className="space-y-2">
//                     {item.subcategories.map((subItem, subIndex) => (
//                       <li key={subIndex} className="hover:text-gray-500">
//                         {subItem}
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </div>
//             )}
//             {item.communication && (
//               <div className="mt-6">
//                 <div className="mb-2 text-lg font-bold">
//                   {item.communication}
//                 </div>
//                 <div className="flex space-x-4">
//                   {item.communicationLinks.map((subItem, subIndex) => (
//                     <a
//                       key={subIndex}
//                       href={subItem.comLinks}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300"
//                     >
//                       <img
//                         src={subItem.comImgSVG}
//                         alt={`icon-${subIndex}`}
//                         className="w-5 h-5"
//                       />
//                     </a>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//       <div className="py-4 text-center text-white bg-black">
//         {footerData
//           .filter((item) => item.hasOwnProperty("copyrightsDetails"))
//           .map((item, index) => (
//             <div key={index}>
//               <div className="text-sm">{item.copyrightsDetails}</div>
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// };

// export default Footer;

// import footerData from "../../../assets/Data/FooterData.json";

// const Footer = () => {
//   // Extracting the sections to make the code cleaner
//   const usefulLinksSection = footerData.find(
//     (item) => item.category === "Useful Links"
//   );
//   const followUsSection = footerData.find(
//     (item) => item.communication === "Follow Us"
//   );

//   return (
//     <div className="bg-gray-100">
//       <div className="flex flex-wrap justify-between p-6 bg-white shadow-2xl">
//         {footerData.map(
//           (item, index) =>
//             item.category !== "Useful Links" &&
//             item.communication !== "Follow Us" && (
//               <div key={index} className="p-4 min-w-[150px]">
//                 {item.category && (
//                   <div>
//                     <div className="mb-4 text-lg font-bold">
//                       {item.category}
//                     </div>
//                     {item.subcategories && (
//                       <ul className="space-y-2">
//                         {item.subcategories.map((subItem, subIndex) => (
//                           <li key={subIndex} className="hover:text-gray-500">
//                             {subItem}
//                           </li>
//                         ))}
//                       </ul>
//                     )}
//                   </div>
//                 )}
//               </div>
//             )
//         )}
//         {/* Useful Links Section */}
//         {usefulLinksSection && (
//           <div className="p-4 min-w-[150px]">
//             <div className="mb-4 text-lg font-bold">
//               {usefulLinksSection.category}
//             </div>
//             {usefulLinksSection.subcategories && (
//               <ul className="space-y-2">
//                 {usefulLinksSection.subcategories.map((subItem, subIndex) => (
//                   <li key={subIndex} className="hover:text-gray-500">
//                     {subItem}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         )}
//         {/* Follow Us Section */}
//         {followUsSection && (
//           <div className="p-4 min-w-[150px]">
//             <div className="mb-2 text-lg font-bold">
//               {followUsSection.communication}
//             </div>
//             <div className="flex space-x-4">
//               {followUsSection.communicationLinks.map((subItem, subIndex) => (
//                 <a
//                   key={subIndex}
//                   href={subItem.comLinks}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300"
//                 >
//                   <img
//                     src={subItem.comImgSVG}
//                     alt={`icon-${subIndex}`}
//                     className="w-5 h-5"
//                   />
//                 </a>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//       <div className="py-4 text-center text-white bg-black">
//         {footerData
//           .filter((item) => item.hasOwnProperty("copyrightsDetails"))
//           .map((item, index) => (
//             <div key={index}>
//               <div className="text-sm">{item.copyrightsDetails}</div>
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// };

// export default Footer;

import footerData from "../../../assets/Data/FooterData.json";

const Footer = () => {
  const followUsSection = footerData.find(
    (item) => item.communication === "Follow Us"
  );

  return (
    <div className="bg-gray-100 border-t-2 border-gray-200 cursor-default">
      <div className="flex xs:py-5 lg:py-10 xs:justify-between lg:justify-around xs:flex-row lg:p-6 lg:flex-wrap xs:p-1">
        {footerData.map(
          (item, index) =>
            item.communication !== "Follow Us" &&
            item.category !== "copyrights" && (
              <div
                key={index}
                className="xs:p-1 lg:p-4 lg:min-w-[220px] xs:min-w-max "
              >
                {item.category && (
                  <div className="">
                    <div className="font-bold lg:mb-4 xs:mb-1 xs:text-xs lg:text-xl">
                      {item.category}
                    </div>
                    {item.subcategories && (
                      <ul className="space-y-1">
                        {item.subcategories.map((subItem, subIndex) => (
                          <li
                            key={subIndex}
                            className="cursor-not-allowed xs:text-[9px] lg:text-sm  hover:text-gray-500 hover:scale-[1.02] transition-all"
                          >
                            {subItem}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            )
        )}
        {followUsSection && (
          <div className="p-4 xs:hidden lg:block xs:min-w-[100px] lg:min-w-[220px] ">
            <div className="mb-2 font-bold xs:text-sm lg:text-lg">
              {followUsSection.communication}
            </div>
            <div className="flex xs:space-x-2 lg:space-x-4">
              {followUsSection.communicationLinks.map((subItem, subIndex) => (
                <a
                  key={subIndex}
                  href={subItem.comLinks}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300"
                >
                  <img
                    src={subItem.comImgSVG}
                    alt={`icon-${subIndex}`}
                    className="w-5 h-5"
                  />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="py-4 text-center text-white bg-black">
        {footerData
          .filter((item) => item.hasOwnProperty("copyrightsDetails"))
          .map((item, index) => (
            <div key={index}>
              <div className="xs:text-xs lg:text-sm">
                {item.copyrightsDetails}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Footer;
