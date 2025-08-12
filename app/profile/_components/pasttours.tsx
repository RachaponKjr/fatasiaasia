import React from "react";
import TourItem from "./tour-item";

const PastTours = () => {
  return (
    <div className="flex flex-col gap-10">
      <h5 className="text-4xl font-bold text-[#333333]">Past Tours</h5>
      <div className="grid grid-cols-3 gap-20 items-center">
        <TourItem />
        <TourItem />
        <TourItem />
      </div>
    </div>
  );
};

export default PastTours;
