import Image from "next/image";
import React from "react";

// icon
import guided from "@/assets/icons/baseservices/guided.png";
import base from "@/assets/icons/baseservices/base.png";
import religious from "@/assets/icons/baseservices/religious.png";
import medical from "@/assets/icons/baseservices/medical.png";

const BaseService = () => {
  const bestservices = [
    {
      title: "Guided Tours",
      detail: "sunt qui repellat saepe quo velit aperiam id aliquam placeat.",
      image: guided.src,
    },
    {
      title: "Best Flights Options",
      detail: "sunt qui repellat saepe quo velit aperiam id aliquam placeat.",
      image: base.src,
    },
    {
      title: "Religious Tours",
      detail: "sunt qui repellat saepe quo velit aperiam id aliquam placeat.",
      image: religious.src,
    },
    {
      title: "Medical insurance",
      detail: "sunt qui repellat saepe quo velit aperiam id aliquam placeat.",
      image: medical.src,
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center gap-8 xl:gap-10">
      <h4 className="font-bold text-3xl xl:text-4xl text-[#333333]">
        We Offer Best Services
      </h4>
      <div className="grid grid-cols-2 xl:grid-cols-4 justify-between w-full min-h-[324px]">
        {bestservices.map((item, i) => (
          <div
            key={i + 1}
            className="flex flex-col items-center max-w-[275px] justify-start rounded-4xl  gap-2 xl:gap-6 p-4 xl:p-9 duration-300 hover:shadow-[0px_10px_20px_0px_rgba(0,_0,_0,_0.06)]"
          >
            <Image src={item.image} alt={item.title} width={80} height={80} />
            <h4 className="text-[#333333] font-semibold text-sm xl:text-base">
              {item.title}
            </h4>
            <p className="text-xs xl:text-sm text-center font-medium text-[#7D7D7D]">
              {item.detail}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BaseService;
