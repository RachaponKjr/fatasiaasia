import Image from "next/image";
import React from "react";

const BaseService = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <h4 className="font-bold text-4xl text-[#333333]">
        We Offer Best Services
      </h4>
      <div className="grid grid-cols-4 justify-between w-full min-h-[324px]">
        {Array.from({ length: 4 }).map((_, i) => (
          <div className="flex flex-col items-center max-w-[275px] justify-start rounded-4xl  gap-6 p-9 duration-300 hover:shadow-[0px_10px_20px_0px_rgba(0,_0,_0,_0.06)]">
            {/* <Image /> */}
            <div className="w-20 aspect-square bg-neutral-100" />
            <h4 className="text-[#333333] font-semibold text-base">
              Best Flights Options
            </h4>
            <p className="text-sm text-center font-medium text-[#7D7D7D]">
              sunt qui repellat saepe quo velit aperiam id aliquam placeat.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BaseService;
