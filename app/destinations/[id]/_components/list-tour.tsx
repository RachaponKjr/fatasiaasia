import TourCard, { TourCardProps } from "@/components/tour-card";
import React from "react";

import thai from "@/assets/images/country/thai.png";
import indo from "@/assets/images/country/indo.png";

import tourthai1 from "@/assets/images/tour/tourthai1.jpg";
import tourthai2 from "@/assets/images/tour/tourthai2.jpg";
import tourindo1 from "@/assets/images/tour/tourindo1.jpg";

const ListTour = () => {
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
    <div className="grid grid-cols-3 gap-28">
      {packagesInfo.map((item: TourCardProps, i) => (
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
  );
};

export default ListTour;
