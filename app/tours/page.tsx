import JoinNewSletter from "@/components/join-newsletter";
import PaginationComponent from "@/components/pagination";
import SearchComponent from "@/components/search";
import TourCard, { TourCardProps } from "@/components/tour-card";
import React from "react";

import thai from "@/assets/images/country/thai.png";
import indo from "@/assets/images/country/indo.png";

import tourthai1 from "@/assets/images/tour/tourthai1.jpg";
import tourthai2 from "@/assets/images/tour/tourthai2.jpg";
import tourindo1 from "@/assets/images/tour/tourindo1.jpg";

const page = () => {
  const packagesInfo: TourCardProps[] = [
    {
      country: thai.src,
      countrytitle: "Thailand",
      image: tourthai1.src,
      price: 771,
      title: "Unveiled Bangkok and Northern Thailand",
      totalday: 10,
    },
    {
      country: indo.src,
      countrytitle: "Indonesia",
      image: tourindo1.src,
      price: 771,
      title: "Enchanting Indonesia from Ancient Temples to Pristine Islands",
      totalday: 10,
    },
    {
      country: thai.src,
      countrytitle: "Thailand",
      image: tourthai2.src,
      price: 771,
      title: "4 island tour by speed boat in krabi",
      totalday: 10,
    },
  ];
  return (
    <>
      <div className="container mx-auto py-10 xl:py-20 px-4 xl:px-0 flex flex-col items-center gap-6 xl:gap-[60px] 2xl:px-20">
        <h2 className="text-3xl xl:text-[40px] font-medium text-[#333333]">
          Uncover your next adventure with our tours
        </h2>
        {/* Search */}
        <SearchComponent />
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-24 xl:my-10">
          {packagesInfo.map((item, i) => (
            <TourCard
              country={item.country}
              countrytitle={item.countrytitle}
              image={item.image}
              price={item.price}
              title={item.title}
              totalday={item.totalday}
              key={i}
            />
          ))}
        </div>
        <div className="my-4 xl:my-10">
          <PaginationComponent />
        </div>
      </div>
      <JoinNewSletter />
    </>
  );
};

export default page;
