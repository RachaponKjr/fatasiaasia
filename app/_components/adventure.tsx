import React from "react";
import LayoutSection from "./layout-section";
import Link from "next/link";

import adventure from "@/assets/images/adventure/adventure.png";
import culture from "@/assets/images/adventure/culture.png";
import beach from "@/assets/images/adventure/beach.png";
import rest from "@/assets/images/adventure/rest.png";
import luxury from "@/assets/images/adventure/luxury.png";
import wellness from "@/assets/images/adventure/wellness.png";
import Image from "next/image";

type Props = {
  headline?: string;
  description?: string;
  iconOverrides?: Record<string, string | undefined>;
};

const Adventure = ({ headline, description, iconOverrides = {} }: Props = {}) => {
  const adventureList = [
    {
      name: "Sea, beaches and islands",
      icon: iconOverrides.beach || adventure.src,
      slug: "beach",
    },
    {
      name: "Culture, History and Traditions",
      icon: iconOverrides.culture || culture.src,
      slug: "culture",
    },
    {
      name: "Nature",
      icon: iconOverrides.nature || beach.src,
      slug: "nature",
    },
    {
      name: "Local Experiences",
      icon: iconOverrides.local || rest.src,
      slug: "local",
    },
    {
      name: "Cities and modernity",
      icon: iconOverrides.cities || luxury.src,
      slug: "cities",
    },
    {
      name: "Wellness and spirituality",
      icon: iconOverrides.wellness || wellness.src,
      slug: "wellness",
    },
  ];

  return (
    <LayoutSection
      title={headline || "Adventure & Activity"}
      description={description}
      link="/tours"
    >
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
        {adventureList.map((item, i) => (
          <Link
            key={i}
            href={`/tours?category=${item.slug}`}
            className="bg-white rounded-3xl grow py-4 xl:py-10 flex flex-col items-center justify-center gap-4 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <div className="w-[120px] relative aspect-square flex items-end justify-center">
              <Image
                src={item.icon}
                alt={item.name}
                fill
                sizes="120px"
                className="object-contain"
                unoptimized={Boolean(iconOverrides[item.slug])}
              />
            </div>
            <span className="text-[#333333] font-semibold text-sm text-center">
              {item.name.includes("islands") ? (
                <>Sea, beaches and <br />islands</>
              ) : item.name.includes("modernity") ? (
                <>Cities and <br />modernity</>
              ) : item.name.includes("spirituality") ? (
                <>Wellness and <br />spirituality</>
              ) : (
                item.name
              )}
            </span>
          </Link>
        ))}
      </div>
    </LayoutSection>
  );
};

export default Adventure;
