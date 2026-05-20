import Image from "next/image";
import React from "react";

const defaultWhyChoose = "/NewATT.png";

import attractions from "@/assets/icons/chooseus/attractions.png";
import great from "@/assets/icons/chooseus/great.png";
import best from "@/assets/icons/chooseus/best.png";
import super1 from "@/assets/icons/chooseus/super.png";

type Props = {
  /** Admin override URL for slot `home.why_choose.image`. */
  imageUrl?: string;
};

const WhyChoose = ({ imageUrl }: Props = {}) => {
  const src = imageUrl || defaultWhyChoose;
  const isRemote = Boolean(imageUrl);
  return (
    <div className="flex flex-col xl:flex-row gap-4 xl:gap-0 px-4 xl:px-0 min-h-max justify-between">
      <div className="flex flex-col gap-4 max-w-md break-words">
        <h5 className="text-[#333333] font-bold text-3xl xl:text-4xl">
          Why Choose Us?
        </h5>
        <div className="flex flex-col gap-4 xl:gap-0 justify-evenly grow">
          <BoxWhyChoose
            icon={attractions.src}
            title="Wide Range of Attractions"
            description="Discover unique experiences and iconic destinations across the whole of Asia with our curated tours."
          />
          <BoxWhyChoose
            icon={great.src}
            title="Exceptional Customer Support"
            description="Questions or doubts? Our dedicated support team is available 24/7 and always ready to help you!"
          />
          <BoxWhyChoose
            icon={best.src}
            title="Best Value for Money"
            description="Get the most out of your budget with our tours. We guarantee the best quality and value for your money."
          />
          <BoxWhyChoose
            icon={super1.src}
            title="Hassle-Free Booking"
            description="Select and secure your perfect trip easily and efficiently, letting us handle the logistics."
          />
        </div>
      </div>
      <div className=" relative">
        <Image src={src} alt="" width={700} height={700} unoptimized={isRemote} />
      </div>
    </div>
  );
};

const BoxWhyChoose = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) => {
  return (
    <div className="flex items-center gap-8">
      <div
        className={`w-max shrink-0 aspect-square rounded-2xl grid place-content-center`}
      >
        <Image src={icon} alt="icon" width={120} height={120} />
      </div>
      <div className="flex flex-col gap-1 leading-none">
        <h6 className="text-[#333333] font-bold text-base xl:text-lg">
          {title}
        </h6>
        <p className="text-base xl:text-lg text-[#7D7D7D] font-normal">
          {description}
        </p>
      </div>
    </div>
  );
};

export default WhyChoose;
