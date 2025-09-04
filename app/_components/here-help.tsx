import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

import tourgroup from "@/assets/images/banner/tourgroup.png";
import woman from "@/assets/images/banner/woman.png";

const HereHelp = () => {
  return (
    <div className="container mx-auto">
      <div className="w-full aspect-video xl:aspect-[16/5] overflow-hidden relative flex items-center bg-gradient-to-r from-[#E76B58] to-[#BD3E2B] rounded-2xl">
        <div className="flex flex-col items-center grow px-4 xl:px-0">
          <div className="flex flex-col items-start gap-3 xl:gap-5">
            <h3 className="text-xl xl:text-5xl font-bold text-white leading-tight">
              Need b<br />
              We're Here to Help!
            </h3>
            <span className="max-w-lg text-[10px] xl:text-sm text-white leading-loose">
              Let us handle your transportation needs.
              <br /> Enjoy seamless transfers and explore with ease.
            </span>
            <Button className="bg-white hover:bg-white cursor-pointer font-semibold text-xs xl:text-xl text-[#BD3E2B] py-4 xl:py-7 px-4 xl:px-10 rounded-full">
              Contact us
            </Button>
          </div>
        </div>
        <div className="relative -bottom-2 right-0 xl:right-5">
          <Image
            src={tourgroup}
            alt=""
            className="w-[200px] h-[100px] xl:w-[700px] xl:h-[600px] xl:scale-110"
          />
          <Image
            src={woman}
            alt=""
            width={325}
            height={200}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </div>
    </div>
  );
};

export default HereHelp;
