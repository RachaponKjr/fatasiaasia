import JoinNewSletter from "@/components/join-newsletter";
import PaginationComponent from "@/components/pagination";
import SearchComponent from "@/components/search";
import TourCard from "@/components/tour-card";
import React from "react";

const page = () => {
  return (
    <>
      <div className="container mx-auto py-20 flex flex-col items-center gap-[60px] 2xl:px-20">
        <h2 className="text-[40px] font-medium text-[#333333]">
          Uncover your next adventure with our tours
        </h2>
        {/* Search */}
        <SearchComponent />
        <div className="grid grid-cols-3 gap-24 my-10">
          <TourCard />
          <TourCard />
          <TourCard />
          <TourCard />
          <TourCard />
          <TourCard />
        </div>
        <div className="my-10">
          <PaginationComponent />
        </div>
      </div>
      <JoinNewSletter />
    </>
  );
};

export default page;
