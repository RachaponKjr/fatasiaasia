import Image from "next/image";
import React from "react";

// icon
import guided from "@/assets/icons/baseservices/guided.png";
import base from "@/assets/icons/baseservices/base.png";
import religious from "@/assets/icons/baseservices/religious.png";
import medical from "@/assets/icons/baseservices/medical.png";

type Props = {
  headline?: string;
  description?: string;
  iconOverrides?: Record<string, string | undefined>;
};

const BaseService = ({ headline, description, iconOverrides = {} }: Props = {}) => {
  const bestservices = [
    {
      title: "24/7 Travel Support",
      image: iconOverrides.support || guided.src,
      overrideKey: "support",
    },
    {
      title: "Handpicked Accommodations",
      image: iconOverrides.accommodation || base.src,
      overrideKey: "accommodation",
    },
    {
      title: "Stress-Free Travel Planning",
      image: iconOverrides.planning || religious.src,
      overrideKey: "planning",
    },
    {
      title: "Tailor-Made Itineraries",
      image: iconOverrides.tailorMade || medical.src,
      overrideKey: "tailorMade",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center gap-8 xl:gap-10">
      <div className="flex flex-col items-center gap-2 text-center">
        <h4 className="font-bold text-3xl xl:text-4xl text-[#333333]">
          {headline || "We Offer Best Services"}
        </h4>
        {description && (
          <p className="text-sm xl:text-lg text-[#585858] max-w-3xl">
            {description}
          </p>
        )}
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-4 justify-between w-full min-h-[324px]">
        {bestservices.map((item, i) => (
          <div
            key={i + 1}
            className="flex flex-col items-center max-w-[275px] justify-start rounded-4xl  gap-2 xl:gap-6 p-4 xl:p-9 duration-300 hover:shadow-[0px_10px_20px_0px_rgba(0,_0,_0,_0.06)]"
          >
            <div className="relative w-[200px] aspect-square">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-contain object-center"
                unoptimized={Boolean(iconOverrides[item.overrideKey])}
              />
            </div>
            <h4 className="text-[#333333] font-semibold text-sm xl:text-base text-center">
              {item.title}
            </h4>
            {/* <p className="text-xs xl:text-sm text-center font-medium text-[#7D7D7D]">
              {item.detail}
            </p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BaseService;
