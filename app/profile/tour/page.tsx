import React from "react";
import ItemCardTour from "./_components/item-card-tour";

const page = () => {
  return (
    <div className="container mx-auto max-w-7xl py-[72px] flex flex-col gap-20">
      <div className="flex flex-col gap-10">
        <h5 className="text-4xl font-bold text-[#333333]">Tours</h5>
        <div className="flex flex-col gap-20">
          <ItemCardTour/>
          <ItemCardTour active/>
        </div>
      </div>
    </div>
  );
};

export default page;
