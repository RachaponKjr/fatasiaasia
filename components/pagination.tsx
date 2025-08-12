"use client";
import React, { useState } from "react";

const PaginationComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 6;

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex items-center gap-4">
      {Array.from({ length: totalPages }, (_, index) => {
        const pageNumber = index + 1;
        const isActive = pageNumber === currentPage;

        return (
          <button
            key={pageNumber}
            onClick={() => handlePageClick(pageNumber)}
            className={`
              w-[60px] aspect-square rounded-full text-3xl font-medium transition-all duration-200
              ${
                isActive
                  ? "bg-[#BD3E2B] text-white border-[#BD3E2B] cursor-pointer"
                  : "bg-white text-[#7D7D7D] hover:border-[#BD3E2B] hover:text-[#BD3E2B] cursor-pointer"
              }
            `}
          >
            {pageNumber}
          </button>
        );
      })}
    </div>
  );
};

export default PaginationComponent;
