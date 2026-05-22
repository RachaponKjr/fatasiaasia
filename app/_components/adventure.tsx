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

type TextOverride = {
  headline?: string;
  description?: string;
};

type Props = {
  headline?: string;
  description?: string;
  iconOverrides?: Record<string, string | undefined>;
  itemText?: Record<string, TextOverride | undefined>;
};

const renderAdventureTitle = (title: string) => {
  if (title === "Sea, beaches and islands") {
    return <>Sea, beaches and <br />islands</>;
  }
  if (title === "Cities and modernity") {
    return <>Cities and <br />modernity</>;
  }
  if (title === "Wellness and spirituality") {
    return <>Wellness and <br />spirituality</>;
  }
  return title;
};

const Adventure = ({
  description,
  headline,
  iconOverrides = {},
  itemText = {},
}: Props = {}) => {
  const adventureList = [
    {
      description: itemText.beach?.description || "",
      icon: iconOverrides.beach || adventure.src,
      name: itemText.beach?.headline || "Sea, beaches and islands",
      slug: "beach",
    },
    {
      description: itemText.culture?.description || "",
      icon: iconOverrides.culture || culture.src,
      name:
        itemText.culture?.headline || "Culture, History and Traditions",
      slug: "culture",
    },
    {
      description: itemText.nature?.description || "",
      icon: iconOverrides.nature || beach.src,
      name: itemText.nature?.headline || "Nature",
      slug: "nature",
    },
    {
      description: itemText.local?.description || "",
      icon: iconOverrides.local || rest.src,
      name: itemText.local?.headline || "Local Experiences",
      slug: "local",
    },
    {
      description: itemText.cities?.description || "",
      icon: iconOverrides.cities || luxury.src,
      name: itemText.cities?.headline || "Cities and modernity",
      slug: "cities",
    },
    {
      description: itemText.wellness?.description || "",
      icon: iconOverrides.wellness || wellness.src,
      name: itemText.wellness?.headline || "Wellness and spirituality",
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
              {renderAdventureTitle(item.name)}
            </span>
            {item.description && (
              <span className="text-[#7D7D7D] font-medium text-xs text-center leading-snug">
                {item.description}
              </span>
            )}
          </Link>
        ))}
      </div>
    </LayoutSection>
  );
};

export default Adventure;
