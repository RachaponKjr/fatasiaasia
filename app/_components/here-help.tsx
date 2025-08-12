import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

import tourgroup from "@/assets/images/banner/tourgroup.png";
import woman from "@/assets/images/banner/woman.png";

const HereHelp = () => {
  return (
    <div className="container mx-auto">
      <div className="w-full aspect-[16/5] overflow-hidden relative flex items-center bg-gradient-to-r from-[#E76B58] to-[#BD3E2B] rounded-2xl">
        <div className="flex flex-col items-center grow">
          <div className="flex flex-col items-start gap-5">
            <h3 className="text-5xl font-bold text-white leading-tight">
              Need b<br />
              We're Here to Help!
            </h3>
            <span className="max-w-lg text-sm text-white leading-loose">
              Let us handle your transportation needs.
              <br /> Enjoy seamless transfers and explore with ease.
            </span>
            <Button className="bg-white hover:bg-white cursor-pointer font-semibold text-xl text-[#BD3E2B] py-7 px-10 rounded-full">
              Contact us
            </Button>
          </div>
        </div>
        <div className="relative -bottom-2 right-5">
          <Image
            src={tourgroup}
            alt=""
            width={700}
            height={600}
            className="scale-110"
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
