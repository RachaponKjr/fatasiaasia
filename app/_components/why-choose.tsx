import Image from "next/image";
import React from "react";

const defaultWhyChoose = "/NewATT.png";

import attractions from "@/assets/icons/chooseus/attractions.png";
import great from "@/assets/icons/chooseus/great.png";
import best from "@/assets/icons/chooseus/best.png";
import super1 from "@/assets/icons/chooseus/super.png";

type TextOverride = {
  headline?: string;
  description?: string;
};

type Props = {
  /** Admin override URL for slot `home.why_choose.image`. */
  imageUrl?: string;
  headline?: string;
  description?: string;
  iconOverrides?: Record<string, string | undefined>;
  itemText?: Record<string, TextOverride | undefined>;
};

const WhyChoose = ({
  imageUrl,
  headline,
  description,
  iconOverrides = {},
  itemText = {},
}: Props = {}) => {
  const src = imageUrl || defaultWhyChoose;
  const isRemote = Boolean(imageUrl);
  return (
    <div className="flex flex-col xl:flex-row gap-4 xl:gap-0 px-4 xl:px-0 min-h-max justify-between">
      <div className="flex flex-col gap-4 max-w-md break-words">
        <h5 className="text-[#333333] font-bold text-3xl xl:text-4xl">
          {headline || "Why Choose Us?"}
        </h5>
        {description && (
          <p className="text-sm xl:text-lg text-[#585858]">{description}</p>
        )}
        <div className="flex flex-col gap-4 xl:gap-0 justify-evenly grow">
          <BoxWhyChoose
            icon={iconOverrides.attractions || attractions.src}
            isRemote={Boolean(iconOverrides.attractions)}
            title={itemText.attractions?.headline || "Wide Range of Attractions"}
            description={
              itemText.attractions?.description ||
              "Discover unique experiences and iconic destinations across the whole of Asia with our curated tours."
            }
          />
          <BoxWhyChoose
            icon={iconOverrides.support || great.src}
            isRemote={Boolean(iconOverrides.support)}
            title={
              itemText.support?.headline || "Exceptional Customer Support"
            }
            description={
              itemText.support?.description ||
              "Questions or doubts? Our dedicated support team is available 24/7 and always ready to help you!"
            }
          />
          <BoxWhyChoose
            icon={iconOverrides.value || best.src}
            isRemote={Boolean(iconOverrides.value)}
            title={itemText.value?.headline || "Best Value for Money"}
            description={
              itemText.value?.description ||
              "Get the most out of your budget with our tours. We guarantee the best quality and value for your money."
            }
          />
          <BoxWhyChoose
            icon={iconOverrides.booking || super1.src}
            isRemote={Boolean(iconOverrides.booking)}
            title={itemText.booking?.headline || "Hassle-Free Booking"}
            description={
              itemText.booking?.description ||
              "Select and secure your perfect trip easily and efficiently, letting us handle the logistics."
            }
          />
        </div>
      </div>
      <div className="relative w-full max-w-[700px] aspect-square">
        <Image
          src={src}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 700px"
          className="object-contain"
          unoptimized={isRemote}
        />
      </div>
    </div>
  );
};

const BoxWhyChoose = ({
  title,
  description,
  icon,
  isRemote,
}: {
  title: string;
  description: string;
  icon: string;
  isRemote?: boolean;
}) => {
  return (
    <div className="flex items-center gap-8">
      <div
        className={`w-max shrink-0 aspect-square rounded-2xl grid place-content-center`}
      >
        <div className="relative w-[120px] aspect-square">
          <Image
            src={icon}
            alt="icon"
            fill
            sizes="120px"
            className="object-contain"
            unoptimized={isRemote}
          />
        </div>
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
