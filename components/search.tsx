import LocationIcon from "@/assets/icons/location";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";

import calendar from "@/assets/images/calendar3.png";
import b from "@/assets/images/b.png";

const SearchComponent = () => {
  return (
    <div className="flex flex-col gap-4 w-full justify-center items-center">
      <div className="max-w-4xl px-8 xl:pl-10 xl:pr-5 py-4 text-sm xl:text-lg rounded-full bg-[#F3F3F3]/80 text-[#333333] grid grid-cols-3 xl:grid-cols-4 gap-4 w-full">
        <div className="flex gap-2 items-center grow">
          <LocationIcon size={18} />
          <span>Where to?</span>
        </div>
        <div className="flex gap-2 items-center grow">
          <Image src={calendar} alt="" width={28} height={28} />
          <span>When?</span>
        </div>
        <div className="flex gap-2 items-center grow">
          <Image src={b} alt="" width={28} height={28} />
          <span>Activity</span>
        </div>
        <Button className="bg-[#BD3E2B] hidden xl:block hover:bg-[#BD3E2B]/80 shadow-[0px_20px_35px_0px_#DF695126]/15 font-semibold cursor-pointer grow h-[50px] rounded-[50px]">
          Search
        </Button>
      </div>
      <Button className="bg-[#BD3E2B] xl:hidden block w-full hover:bg-[#BD3E2B]/80 shadow-[0px_20px_35px_0px_#DF695126]/15 font-semibold cursor-pointer grow h-[50px] rounded-[50px]">
        Search
      </Button>
    </div>
  );
};

export default SearchComponent;
