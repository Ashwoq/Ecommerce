import React, { useState } from "react";

const Pagination = ({
  currentPage,
  setCurrentPage,
  productsPerPage,
  totalProducts,
}) => {
  const pageNumber = [];
  const totalPages = totalProducts / productsPerPage;

  //   limit page no shown
  const [pageNumberlist, setPageNumberList] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumber.push(i);
  }

  //   paginattion
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // next page
  const paginateNext = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberlist);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberlist);
    }
  };

  // prev page
  const paginatePrev = () => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberlist == 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberlist);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberlist);
    }
  };

  return (
    <ul className="flex items-center justify-center gap-2 p-1 px-5 mx-auto bg-gray-300 rounded-lg cursor-default w-max ">
      <li
        onClick={paginatePrev}
        className={`${
          currentPage === pageNumber[0] ? "hidden" : "flex"
        } bg-gray-100 hover:scale-[1.04] transition-all p-1 px-2 rounded-lg cursor-pointer
        `}
      >
        Prev
      </li>
      {pageNumber.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
          return (
            <li
              key={number}
              onClick={() => paginate(number)}
              className={
                currentPage === number
                  ? " px-2  text-center text-sm rounded-full hover:scale-[1.04] cursor-pointer bg-gray-200 "
                  : " px-2  text-center text-sm rounded-full hover:scale-[1.04] cursor-pointer "
              }
            >
              {number}
            </li>
          );
        }
      })}
      <li
        onClick={paginateNext}
        className={`
         ${
           currentPage === pageNumber[pageNumber.length - 1] ? "hidden" : "flex"
         }
         bg-gray-100 hover:scale-[1.04] cursor-pointer transition-all p-1 px-2 rounded-lg 
        `}
      >
        Next
      </li>
      <div>
        Page
        <b className="p-1 px-2 mx-1 bg-gray-200 rounded-full ">{`${currentPage}`}</b>
        <span>{" of"}&nbsp;</span>
        <b>{` ${Math.ceil(totalPages)}`}</b>
      </div>
    </ul>
  );
};

export default Pagination;
