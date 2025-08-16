import Image from "next/image";
import React from "react";

import whychoose from "@/assets/images/who-choose.png";

import attractions from "@/assets/icons/chooseus/attractions.png";
import great from "@/assets/icons/chooseus/great.png";
import best from "@/assets/icons/chooseus/best.png";
import super1 from "@/assets/icons/chooseus/super.png";

const WhyChoose = () => {
  return (
    <div className="flex min-h-max justify-between">
      <div className="flex flex-col gap-4 max-w-md break-words">
        <h5 className="text-[#333333] font-bold text-4xl">Why Choose Us?</h5>
        <div className="flex flex-col justify-evenly grow">
          <BoxWhyChoose
            icon={attractions.src}
            background="bg-[#F0BB1F]"
            title="100s of Attractions"
            description="Discover all the great things from Cambodia, Laos, Thailand and Vietnam with us."
          />
          <BoxWhyChoose
            icon={great.src}
            background="bg-[#F15A2B]"
            title="Great Customer Support"
            description="Questions or doubts? Our customer support team is always ready to help you!"
          />
          <BoxWhyChoose
            icon={best.src}
            background="bg-[#4992E1]"
            title="Best Price In The Industry"
            description="Get the best value for your money with our tours. Best quality, guaranteed."
          />
          <BoxWhyChoose
            icon={super1.src}
            background="bg-[#68C163]"
            title="Super Fast Booking"
            description="Just a couple of clicks to select your favorite tour!"
          />
        </div>
      </div>
      <div className=" relative">
        <Image src={whychoose} alt="" width={700} height={700} />
      </div>
    </div>
  );
};

const BoxWhyChoose = ({
  background,
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  background: string;
  icon: string;
}) => {
  return (
    <div className="flex items-center gap-8">
      <div
        className={`w-16 shrink-0 aspect-square ${background} rounded-2xl grid place-content-center`}
      >
        <Image src={icon} alt="icon" width={40} height={40} />
      </div>
      <div className="flex flex-col gap-1 ">
        <h6 className="text-[#333333] font-bold text-lg">{title}</h6>
        <p className="text-lg text-[#7D7D7D] font-normal">{description}</p>
      </div>
    </div>
  );
};

export default WhyChoose;
