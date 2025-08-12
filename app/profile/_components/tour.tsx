import { Badge } from "@/components/ui/badge";
import React from "react";
import TourItem from "./tour-item";

const Tour = () => {
  return (
    <div className="flex flex-col gap-10">
      <h5 className="text-4xl font-bold text-[#333333]">Tour</h5>
      <div className="grid grid-cols-3 gap-20 items-center">
        <TourItem />
        <TourItem />
        <TourItem />
      </div>
    </div>
  );
};

export default Tour;
