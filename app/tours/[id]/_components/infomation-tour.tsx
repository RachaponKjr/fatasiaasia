"use client";
import React, { useCallback, useEffect, useState } from "react";

import table from "@/assets/images/table-test.png";

import { Check, X } from "lucide-react";

import Image from "next/image";

import duration from "@/assets/images/calendar.png";
import tour from "@/assets/images/trekking.png";
import ages from "@/assets/icons/svg/ages.svg";
import group from "@/assets/icons/svg/group-size.svg";
import languages from "@/assets/icons/svg/languages.svg";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Gallery from "./images-show";
import Booking from "./booking";
import { TourDetail } from "@/types/tour.type";
const InfomationTour = ({
  tourDetail,
  id,
}: {
  tourDetail: TourDetail;
  id: string;
}) => {
  const included = tourDetail?.tourDetails?.included || [];
  let durationVal = "Half-Day";
  let groupSizeVal = "Max 10 people";
  let agesVal = "18-65 yrs";
  let languagesVal = "English,Italiano";
  let tourCategoryVal = "Adventure";

  const filteredIncluded = included.filter((item) => {
    if (item.text.startsWith("META_DURATION:")) {
      durationVal = item.text.replace("META_DURATION:", "");
      return false;
    }
    if (item.text.startsWith("META_GROUPSIZE:")) {
      groupSizeVal = item.text.replace("META_GROUPSIZE:", "");
      return false;
    }
    if (item.text.startsWith("META_AGES:")) {
      agesVal = item.text.replace("META_AGES:", "");
      return false;
    }
    if (item.text.startsWith("META_LANGUAGES:")) {
      languagesVal = item.text.replace("META_LANGUAGES:", "");
      return false;
    }
    if (item.text.startsWith("META_CATEGORY:")) {
      tourCategoryVal = item.text.replace("META_CATEGORY:", "");
      return false;
    }
    return true;
  });

  return (
    <div className="flex flex-col xl:flex-row gap-8 xl:gap-16">
      {/* ข้อมูล booking */}
      <div className="w-full max-w-4xl flex flex-col items-start gap-2 xl:gap-5">
        <h1 className="font-bold text-xl xl:text-4xl text-[#333333]">
          {tourDetail?.title}
        </h1>
        <div className="grid grid-cols-3 gap-x-4 gap-y-2 xl:gap-0 xl:grid-cols-5">
          <div className="flex gap-2 items-center">
            <Image src={duration} alt="" width={59} height={59} />
            <div>
              <h6 className="text-[#333333] font-normal text-xs xl:text-xs">
                Duration
              </h6>
              <span className="text-xs xl:text-sm font-normal text-nowrap text-[#717171]">
                {durationVal}
              </span>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <Image src={group} alt="" width={45} height={45} />
            <div>
              <h6 className="text-[#333333] font-normal text-xs xl:text-sm text-nowrap">
                Group Size
              </h6>
              <span className="text-xs xl:text-sm font-normal text-nowrap text-[#717171]">
                {groupSizeVal}
              </span>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <Image src={ages} alt="" width={40} height={40} />
            <div>
              <h6 className="text-[#333333] font-normal text-xs xl:text-sm text-nowrap">
                Ages
              </h6>
              <span className="text-xs xl:text-sm font-normal text-nowrap text-[#717171]">
                {agesVal}
              </span>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <Image src={languages} alt="" width={35} height={35} />
            <div>
              <h6 className="text-[#333333] font-normal text-xs xl:text-sm text-nowrap">
                Languages
              </h6>
              <span className="text-xs xl:text-sm font-normal text-nowrap text-[#717171]">
                {languagesVal}
              </span>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <Image src={tour} alt="" width={50} height={50} />
            <div>
              <h6 className="text-[#333333] font-normal text-xs xl:text-sm text-nowrap">
                Tour Category
              </h6>
              <span className="text-xs xl:text-sm font-normal text-nowrap text-[#717171]">
                {tourCategoryVal}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 xl:gap-14 xl:my-14">
          {/* Tour Overview */}
          <div className="flex flex-col gap-2 xl:gap-6 text-[#333333]">
            <h4 className="font-bold text-xl xl:text-3xl">Tour Overview</h4>
            <div
              className="font-normal text-xs xl:text-sm leading-loose"
              dangerouslySetInnerHTML={{ __html: tourDetail?.overview || "" }}
            />
          </div>
          {/* Tour Highlights */}
          <div className="flex flex-col gap-2 xl:gap-6 text-[#333333]">
            <h4 className="font-bold text-xl xl:text-3xl">Tour Highlights</h4>
            <div
              className="font-normal text-xs xl:text-sm leading-loose"
              dangerouslySetInnerHTML={{ __html: tourDetail?.highlight || "" }}
            />
          </div>
        </div>
        {/* Images */}
        {tourDetail && <Gallery galleryUrls={tourDetail?.galleryUrls} />}
        {/* ltinerary */}
        <div className="flex flex-col gap-2 xl:gap-6 text-[#333333] w-full">
          <h4 className="font-bold text-xl xl:text-3xl">Itinerary</h4>
          <div className="w-full ">
            <Accordion type="multiple" className="gap-5 flex flex-col w-full">
              {tourDetail?.itineraries.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`itineraries-${index}`}
                  className="cursor-pointer"
                >
                  <AccordionTrigger>
                    Day {index + 1}: {item.title.replace(/^Day\s*\d+[:\s-]*\s*/i, "")}
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    <div dangerouslySetInnerHTML={{ __html: item.detail }} />
                    <div className="flex flex-col gap-2 text-[#333333]">
                      <h6 className="font-bold">DEPARTURE TIME :</h6>
                      <p>
                        07:30/08:30. To be reconfirmed depending on the hotel
                        location.
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 text-[#333333]">
                      <h6 className="font-bold">NOTE :</h6>
                      <p>
                        The program is subject to changes due to weather
                        conditions, tides, or unforeseen events beyond our
                        control.
                      </p>
                    </div>
                    {item.images && item.images.length > 0 && (
                      <div>
                        {item.images.filter((img) => img && img.trim() !== "").map((image, index) => (
                          <Image
                            key={index}
                            src={`${image}`}
                            alt=""
                            width={500}
                            height={500}
                          />
                        ))}
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
        {/* Download BTN */}
        <Button
          className="rounded-full bg-[#BD3E2B] hover:bg-[#BD3E2B] h-14 font-semibold px-8 cursor-pointer my-4 xl:my-14"
          asChild
        >
          <a href={tourDetail?.brochureUrl} download>
            Download Brochure
          </a>
        </Button>

        <div className="flex">
          <div className="flex flex-col gap-10 flex-1">
            <h4 className="text-[30px] text-[#333333] font-bold">
              What's included
            </h4>
            <div className="font-semibold flex flex-col gap-8">
              {filteredIncluded.map((item, index) => (
                <div key={index} className="flex gap-3 items-center">
                  {item.iconUrl && item.iconUrl.trim() !== "" && (
                    <Image src={item.iconUrl} alt="" width={40} height={40} />
                  )}
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <h6 className="font-bold text-xl text-[#ED021A]">Not included</h6>
              {tourDetail?.tourDetails.notIncluded.map((item, index) => (
                <div key={index} className="flex gap-6 items-center">
                  <div className="px-2 rounded-full bg-[#ED021A]">
                    <X color="white" size={18} />
                  </div>
                  <p className="text-[#333333]">{item}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              <h6 className="font-bold text-xl text-[#319E8B]">
                What to bring
              </h6>
              <div className="flex gap-6 items-center">
                <div className="px-2 rounded-full bg-[#319E8B]">
                  <Check color="white" size={18} />
                </div>
                <p className="text-[#333333]">
                  {tourDetail?.tourDetails.whatToBring}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tour Map */}
        {/* <div className="flex flex-col gap-6 text-[#333333] w-full">
              <h4 className="font-bold text-2xl xl:text-3xl">Tour Map</h4>
              <div className="w-full aspect-[16/10] bg-neutral-100 rounded-3xl relative overflow-hidden">
                <Image
                  src={map}
                  alt=""
                  fill
                  objectFit="cover"
                  className="bg-contain"
                />
              </div>
            </div> */}
      </div>
      {/* booking */}
      <Booking tourId={Number(id)} tourdetail={tourDetail as TourDetail} />
    </div>
  );
};

export default InfomationTour;
