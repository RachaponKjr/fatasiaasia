export const dynamic = "force-dynamic";

import JoinNewSletter from "@/components/join-newsletter";
import PaginationComponent from "@/components/pagination";
import SearchComponent from "@/components/search";
import TourCard from "@/components/tour-card";
import React from "react";

import api from "@/server";
import HeroLayout from "../about/_components/hero-about";
import tourImage from "@/assets/images/banner/tour.png";

const page = async () => {
  const { data: tour } = await api.tour.getTour();
  return (
    <>
      <HeroLayout
        image={tourImage.src}
        title="Uncover your next adventure with our tours"
      />
      <div className="container mx-auto py-10 xl:py-20 px-4 xl:px-0 flex flex-col items-center gap-6 xl:gap-[60px] 2xl:px-20">
        <h2 className="text-3xl xl:text-[40px]  font-medium text-[#333333]">
          Uncover your next adventure with our tours
        </h2>
        {/* Search */}
        {/* <SearchComponent /> */}
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-24 xl:my-10">
          {tour.map((item, i) => (
            <TourCard wishlist={item} key={i} />
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
