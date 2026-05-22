import React from "react";

import joinsletter from "@/assets/images/banner/joinsletter.webp";
import Image from "next/image";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

type Props = {
  description?: string;
  headline?: string;
  imageUrl?: string;
};

const JoinNewSletter = ({ description, headline, imageUrl }: Props = {}) => {
  return (
    <div
      className="xl:min-h-[660px] py-20 xl:py-0 px-4 xl:px-0 relative overflow-hidden flex flex-col justify-center items-center gap-7"
    >
      <Image
        src={imageUrl || joinsletter.src}
        alt=""
        fill
        sizes="100vw"
        className="absolute inset-0 z-0 object-cover object-bottom"
        unoptimized={Boolean(imageUrl)}
      />
      <div className="relative z-10 text-white text-center space-y-1.5">
        <h3 className="text-4xl xl:text-6xl font-bold text-shadow-lg">
          {headline || "Join The Newsletter"}
        </h3>
        <span className="text-lg xl:text-xl">
          {description || "To receive our best monthly deals"}
        </span>
      </div>
      <div className="relative z-10 flex max-w-3xl w-full h-12 xl:h-16">
        <Input
          placeholder="Enter your email address..."
          className="bg-white text-[#100C0866] w-full h-full rounded-l-md xl:!rounded-l-xl !rounded-r-none border-[#BD3E2B] focus-within:outline-[#BD3E2B]"
        />
        <Button className="h-full aspect-square rounded-r-md xl:!rounded-r-xl !rounded-l-none bg-[#BD3E2B]">
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default JoinNewSletter;
