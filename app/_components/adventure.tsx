import React from "react";
import LayoutSection from "./layout-section";

import adventure from "@/assets/images/adventure/adventure.png";
import culture from "@/assets/images/adventure/culture.png";
import beach from "@/assets/images/adventure/beach.png";
import rest from "@/assets/images/adventure/rest.png";
import luxury from "@/assets/images/adventure/luxury.png";
import Image from "next/image";
const Adventure = () => {
  const adventureList = [
    {
      name: "Adventure",
      icon: adventure.src,
    },
    {
      name: "Culture and Heritage",
      icon: culture.src,
    },
    {
      name: "Beach Tour",
      icon: beach.src,
    },
    {
      name: "Rest and Relax",
      icon: rest.src,
    },
    {
      name: "Luxury",
      icon: luxury.src,
    },
  ];

  return (
    <LayoutSection title="Adventure & Activity">
      <div className="grid grid-cols-5 gap-10">
        {adventureList.map((item, i) => (
          <div className="bg-white rounded-3xl grow py-16 flex flex-col items-center justify-center gap-4 shadow-lg">
            <div className="w-[120px] aspect-square flex items-end justify-center">
              <Image src={item.icon} alt={item.name} width={120} height={120} />
            </div>
            <span className="text-[#333333] font-semibold text-sm">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </LayoutSection>
  );
};

export default Adventure;
