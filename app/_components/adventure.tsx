import React from "react";
import LayoutSection from "./layout-section";

import adventure from "@/assets/images/adventure/adventure.png";
import culture from "@/assets/images/adventure/culture.png";
import beach from "@/assets/images/adventure/beach.png";
import rest from "@/assets/images/adventure/rest.png";
import luxury from "@/assets/images/adventure/luxury.png";
import wellness from "@/assets/images/adventure/wellness.png";
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
    {
      name: "Wellness and spirituality",
      icon: wellness.src,
    },
  ];

  return (
    <LayoutSection title="Adventure & Activity">
      <div className="grid grid-cols-2 xl:grid-cols-6 gap-4 xl:gap-6">
        {/* {adventureList.map((item, i) => (
          <div className="bg-white rounded-3xl grow py-4  xl:py-4 flex flex-col items-center justify-center gap-4 shadow-lg">
            <div className="w-[120px] relative aspect-square flex items-end justify-center">
              <Image src={item.icon} alt={item.name} fill objectFit="cover" objectPosition="center" />
            </div>
            <span className="text-[#333333] font-semibold text-sm">
              {item.name}
            </span>
          </div>
        ))} */}
        <div className="bg-white rounded-3xl grow py-4 xl:py-10 flex flex-col items-center justify-center gap-4 shadow-lg">
          <div className="w-[120px] relative aspect-square flex items-end justify-center">
            <Image src={adventure} alt={"Adventure"} width={120} height={120} />
          </div>
          <span className="text-[#333333] font-semibold text-sm text-center">
            Sea, beaches and <br /> islands
          </span>
        </div>
        <div className="bg-white rounded-3xl grow py-4  xl:py-10 flex flex-col items-center justify-center gap-4 shadow-lg">
          <div className="w-[120px] relative aspect-square flex items-end justify-center">
            <Image
              src={culture}
              alt={"ulture and Heritage"}
              width={120}
              height={120}
            />
          </div>
          <span className="text-[#333333] font-semibold text-sm text-center">
            Culture History and Traditions
          </span>
        </div>
        <div className="bg-white rounded-3xl grow py-4  xl:py-10 flex flex-col items-center justify-center gap-4 shadow-lg">
          <div className="w-[120px] relative aspect-square flex items-end justify-center">
            <Image
              src={beach}
              alt={""}
              className="scale-140"
              width={150}
              height={150}
            />
          </div>
          <span className="text-[#333333] font-semibold text-sm text-center">
            Nature
          </span>
        </div>
        <div className="bg-white rounded-3xl grow py-4  xl:py-10 flex flex-col items-center justify-center gap-4 shadow-lg">
          <div className="w-[120px] relative aspect-square flex items-end justify-center">
            <Image src={rest} alt={""} width={120} height={120} />
          </div>
          <span className="text-[#333333] font-semibold text-sm text-center">
            Local Experiences
          </span>
        </div>
        <div className="bg-white rounded-3xl grow py-4  xl:py-10 flex flex-col items-center justify-center shadow-lg">
          <div className="w-[120px] relative aspect-square flex items-end justify-center">
            <Image src={luxury} alt={""} width={100} height={100} />
          </div>
          <span className="text-[#333333] font-semibold text-sm text-center">
            Cities and <br />
            modernity
          </span>
        </div>
        <div className="bg-white rounded-3xl grow py-4  xl:py-10 flex flex-col items-center justify-center gap-4 shadow-lg">
          <div className="w-[120px] relative aspect-square flex items-end justify-center">
            <Image src={wellness} alt={""} width={120} height={120} />
          </div>
          <span className="text-[#333333] font-semibold text-sm text-center">
            Wellness and <br /> spirituality
          </span>
        </div>
      </div>
    </LayoutSection>
  );
};

export default Adventure;
