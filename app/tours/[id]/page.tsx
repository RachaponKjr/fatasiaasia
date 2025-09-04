import React from "react";
import Backstep from "./_components/backstep";
import JoinNewSletter from "@/components/join-newsletter";
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
import HereHelp from "@/app/_components/here-help";
import AlsoLike from "./_components/also-like";

import map from "@/assets/images/map.png";
import Booking from "./_components/booking";

import imagetest from "@/assets/imagetest.jpg";

const page = () => {
  return (
    <>
      <div className="container mx-auto px-4 xl:px-0 py-10 xl:py-20 flex gap-4 xl:gap-8 flex-col 2xl:px-20">
        <Backstep />
        <div className="flex flex-col xl:flex-row gap-8 xl:gap-16">
          {/* ข้อมูล booking */}
          <div className="w-full max-w-4xl flex flex-col items-start gap-2 xl:gap-5">
            <h1 className="font-bold text-xl xl:text-4xl text-[#333333]">
              Bali on a Shoestring 7 Days 6 nights
            </h1>
            <div className="grid grid-cols-3 gap-x-4 gap-y-2 xl:gap-0 xl:grid-cols-5">
              <div className="flex gap-2 items-center">
                <Image src={duration} alt="" width={59} height={59} />
                <div>
                  <h6 className="text-[#333333] font-normal text-xs xl:text-xs">
                    Duration
                  </h6>
                  <span className="text-xs xl:text-sm font-normal text-nowrap text-[#717171]">
                    7 days
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
                    Max 10 people
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
                    18-99 yrs
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
                    English,Italiano
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
                    Adventure
                  </span>
                </div>
              </div>
            </div>
            {/* Images */}
            <div className="w-full flex flex-col gap-2 xl:gap-4">
              <div className="w-full aspect-[16/12] overflow-hidden rounded-[12px] relative">
                <Image
                  src={imagetest}
                  alt=""
                  fill
                  objectFit="cover"
                  objectPosition="center"
                />
              </div>
              <div className="grid grid-cols-3 gap-2 xl:gap-4">
                <div className="w-full aspect-[16/10] rounded-[12px] relative overflow-hidden">
                  <Image
                    src={imagetest}
                    alt=""
                    fill
                    objectFit="cover"
                    objectPosition="center"
                  />
                </div>
                <div className="w-full aspect-[16/10] rounded-[12px] relative overflow-hidden">
                  <Image
                    src={imagetest}
                    alt=""
                    fill
                    objectFit="cover"
                    objectPosition="center"
                  />
                </div>
                <div className="w-full aspect-[16/10] rounded-[12px] relative overflow-hidden">
                  <Image
                    src={imagetest}
                    alt=""
                    fill
                    objectFit="cover"
                    objectPosition="center"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 xl:gap-14 xl:my-14">
              {/* Tour Overview */}
              <div className="flex flex-col gap-2 xl:gap-6 text-[#333333]">
                <h4 className="font-bold text-xl xl:text-3xl">Tour Overview</h4>
                <p className="font-normal text-xs xl:text-sm leading-loose">
                  Experience the essence of Bali in this 7-day cultural journey.
                  From ancient temples and traditional villages to stunning
                  landscapes and vibrant performances, immerse yourself in the
                  rich heritage and natural beauty of the Island of Gods
                </p>
              </div>
              {/* Tour Highlights */}
              <div className="flex flex-col gap-2 xl:gap-6 text-[#333333]">
                <h4 className="font-bold text-xl xl:text-3xl">
                  Tour Highlights
                </h4>
                <p className="font-normal text-xs xl:text-sm leading-loose">
                  Experience the thrill of a speedboat to the stunning Phi Phi
                  Islands <br />
                  Be amazed by the variety of marine life in the archepelago
                  <br />
                  Enjoy relaxing in paradise with white sand beaches and azure
                  turquoise water
                  <br />
                  Feel the comfort of a tour limited to 35 passengers
                  <br />
                  Catch a glimpse of the wild monkeys around Monkey Beach
                </p>
              </div>
            </div>
            {/* ltinerary */}
            <div className="flex flex-col gap-2 xl:gap-6 text-[#333333] w-full">
              <h4 className="font-bold text-xl xl:text-3xl">Itinerary</h4>
              <div className="w-full ">
                <Accordion
                  type="multiple"
                  className="gap-5 flex flex-col w-full"
                >
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Day 1: Airport Pick Up</AccordionTrigger>
                    <AccordionContent>
                      Phang Nga Bay Sea Cave Canoeing & James Bond Island w/
                      Buffet Lunch by Big Boat cancellation policy: For a full
                      refund, cancel at least 24 hours in advance of the start
                      date of the experience. Discover and book Phang Nga Bay
                      Sea Cave Canoeing & James Bond Island w/ Buffet Lunch by
                      Big Boat
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Day 1: Airport Pick Up</AccordionTrigger>
                    <AccordionContent>
                      Phang Nga Bay Sea Cave Canoeing & James Bond Island w/
                      Buffet Lunch by Big Boat cancellation policy: For a full
                      refund, cancel at least 24 hours in advance of the start
                      date of the experience. Discover and book Phang Nga Bay
                      Sea Cave Canoeing & James Bond Island w/ Buffet Lunch by
                      Big Boat
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Day 1: Airport Pick Up</AccordionTrigger>
                    <AccordionContent>
                      Phang Nga Bay Sea Cave Canoeing & James Bond Island w/
                      Buffet Lunch by Big Boat cancellation policy: For a full
                      refund, cancel at least 24 hours in advance of the start
                      date of the experience. Discover and book Phang Nga Bay
                      Sea Cave Canoeing & James Bond Island w/ Buffet Lunch by
                      Big Boat
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>Day 1: Airport Pick Up</AccordionTrigger>
                    <AccordionContent>
                      Phang Nga Bay Sea Cave Canoeing & James Bond Island w/
                      Buffet Lunch by Big Boat cancellation policy: For a full
                      refund, cancel at least 24 hours in advance of the start
                      date of the experience. Discover and book Phang Nga Bay
                      Sea Cave Canoeing & James Bond Island w/ Buffet Lunch by
                      Big Boat
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
            {/* Download BTN */}
            <Button className=" rounded-full bg-[#BD3E2B] hover:bg-[#BD3E2B] h-14 font-semibold px-8 cursor-pointer my-4 xl:my-14">
              Download Brochure
            </Button>
            {/* Tour Map */}
            <div className="flex flex-col gap-6 text-[#333333] w-full">
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
            </div>
          </div>
          {/* booking */}
          <Booking />
        </div>
        <div className="my-10 xl:my-[100px]">
          <HereHelp />
        </div>
        <div className="mb-28">
        <AlsoLike />
        </div>
      </div>
      <JoinNewSletter />
    </>
  );
};

export default page;
