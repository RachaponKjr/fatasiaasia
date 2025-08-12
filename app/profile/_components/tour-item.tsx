import { Badge } from "@/components/ui/badge";
import React from "react";

const TourItem = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="w-full aspect-square bg-neutral-100 rounded-3xl relative">
        <Badge className="absolute top-5 right-5 text-white bg-[#666666] rounded-full">
          In Progress
        </Badge>
      </div>
      <div className="flex flex-col gap-2 px-4 text-2xl">
        <h4 className=" font-bold text-[#2F2F2F]">
          Bali on a Shoestring 7 Days 6 nights
        </h4>
        <span className="text-[#33333380]">5-12 FEB 2025</span>
      </div>
    </div>
  );
};

export default TourItem;
