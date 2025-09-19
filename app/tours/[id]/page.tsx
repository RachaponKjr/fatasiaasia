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
import table from "@/assets/images/table-test.png";

import icon1 from "@/assets/icons/icon-included/icon1.png";
import icon2 from "@/assets/icons/icon-included/icon2.png";
import icon3 from "@/assets/icons/icon-included/icon3.png";
import icon4 from "@/assets/icons/icon-included/icon4.png";
import icon5 from "@/assets/icons/icon-included/icon5.png";
import icon6 from "@/assets/icons/icon-included/icon6.png";
import icon7 from "@/assets/icons/icon-included/icon7.png";
import icon8 from "@/assets/icons/icon-included/icon8.png";
import { Check, X } from "lucide-react";
import Gallery from "./_components/images-show";

const page = () => {
  return (
    <>
      <div className="container mx-auto px-4 xl:px-0 py-10 xl:py-20 flex gap-4 xl:gap-8 flex-col 2xl:px-20">
        <Backstep />
        <div className="flex flex-col xl:flex-row gap-8 xl:gap-16">
          {/* ข้อมูล booking */}
          <div className="w-full max-w-4xl flex flex-col items-start gap-2 xl:gap-5">
            <h1 className="font-bold text-xl xl:text-4xl text-[#333333]">
              Four Islands Tour by Speedboat Half-Day Group Tour
            </h1>
            <div className="grid grid-cols-3 gap-x-4 gap-y-2 xl:gap-0 xl:grid-cols-5">
              <div className="flex gap-2 items-center">
                <Image src={duration} alt="" width={59} height={59} />
                <div>
                  <h6 className="text-[#333333] font-normal text-xs xl:text-xs">
                    Duration
                  </h6>
                  <span className="text-xs xl:text-sm font-normal text-nowrap text-[#717171]">
                    Half-Day
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
                    18-65 yrs
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
            <Gallery/>
            <div className="flex flex-col gap-4 xl:gap-14 xl:my-14">
              {/* Tour Overview */}
              <div className="flex flex-col gap-2 xl:gap-6 text-[#333333]">
                <h4 className="font-bold text-xl xl:text-3xl">Tour Overview</h4>
                <p className="font-normal text-xs xl:text-sm leading-loose">
                  A journey through the marine wonders of Krabi, discovering
                  dreamlike beaches, iconic rock formations, and crystal-clear
                  waters. An unforgettable experience blending relaxation,
                  unspoiled nature, and postcard-perfect scenery, ideal for
                  those wishing to fully embrace the tropical beauty of
                  Thailand.
                </p>
              </div>
              {/* Tour Highlights */}
              <div className="flex flex-col gap-2 xl:gap-6 text-[#333333]">
                <h4 className="font-bold text-xl xl:text-3xl">
                  Tour Highlights
                </h4>
                <p className="font-normal text-xs xl:text-sm leading-loose">
                  • Explore the famous Phra Nang Beach, one of the most
                  beautiful beaches in the world.
                  <br /> • Walk along the breathtaking Miracle Sandbank between
                  Chicken, Tup, and Mor Islands.
                  <br /> • Enjoy a scenic boat ride around the iconic Chicken
                  Island.
                  <br /> • Relax and have lunch on Poda Island, surrounded by
                  turquoise waters and white sands.
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
                    <AccordionTrigger>
                      Four Islands Tour by SpeedboatHalf-Day Group Tour
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <p>
                        In the late morning, after convenient pick-up from your
                        hotel, the journey begins with arrival at Nopparat Thara
                        Pier, the departure point for an unforgettable day at
                        sea. After check-in and meeting the local guide, you
                        will board the speedboat to explore some of Krabi’s most
                        iconic and scenic destinations. The first stop will be
                        the famous Phra Nang Beach, often ranked among the most
                        beautiful beaches in the world, a true slice of paradise
                        where turquoise waters meet powdery white sands framed
                        by towering limestone cliffs. It will feel like stepping
                        into a perfect tropical postcard. The journey continues
                        to the enchanting “Miracle Sandbank,” a natural wonder
                        that appears at low tide, allowing you to walk from one
                        island to another along a narrow white sand path. In
                        this magical spot, suspended between sea and sky, you
                        can take spectacular photos and enjoy the unique
                        experience of walking across the sea between Chicken,
                        Tup, and Mor Islands. Gently cruising through the clear
                        waters, you’ll reach Chicken Island, known for its
                        curious rock formation that resembles the head of a
                        chicken. This area is renowned for its beautiful seabed,
                        making it an ideal spot for snorkeling or simply soaking
                        in the breathtaking marine landscapes. Next, the boat
                        will head to the picturesque Poda Island, an authentic
                        gem surrounded by crystal-clear waters and soft white
                        sand. Here, a delicious lunch box will be served right
                        on the beach, while time drifts by in total freedom: you
                        can swim, stroll along the shore, sunbathe, or simply
                        relax listening to the gentle sound of the waves. In the
                        afternoon, return to Nopparat Thara Pier and transfer
                        back to your hotel, your heart filled with dreamlike
                        images and the memory of a day spent in a true corner of
                        paradise.
                      </p>
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
                      <div>
                        <h6 className="font-bold">PRICE IN US$ :</h6>
                        <Image src={table} alt="" width={500} height={500} />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
            {/* Download BTN */}
            <Button
              className="rounded-full bg-[#BD3E2B] hover:bg-[#BD3E2B] h-14 font-semibold px-8 cursor-pointer my-4 xl:my-14"
              asChild
            >
              <a href="/4IslandTour-Eng-TO.pdf" download>
                Download Brochure
              </a>
            </Button>

            <div className="flex">
              <div className="flex flex-col gap-10 flex-1">
                <h4 className="text-[30px] text-[#333333] font-bold">
                  What's included
                </h4>
                <div className="font-semibold flex flex-col gap-8">
                  <div className="flex gap-3 items-center">
                    <Image src={icon1} alt="" width={40} height={40} />
                    <span>English-speaking local guide</span>
                  </div>
                  <div className="flex gap-3 items-center">
                    <Image src={icon2} alt="" width={40} height={40} />
                    <span>Hotel transfers to/from</span>
                  </div>
                  <div className="flex gap-3 items-center">
                    <Image src={icon3} alt="" width={40} height={40} />
                    <span>Lunch box on the beach</span>
                  </div>
                  <div className="flex gap-3 items-center">
                    <Image src={icon4} alt="" width={40} height={40} />
                    <span>
                      National park entrance fees: <br />
                      Adults THB 200 – Children THB 100
                    </span>
                  </div>
                  <div className="flex gap-3 items-center">
                    <Image src={icon5} alt="" width={40} height={40} />
                    <span>Fruit and water on board</span>
                  </div>
                  <div className="flex gap-3 items-center">
                    <Image src={icon6} alt="" width={40} height={40} />
                    <span>Mask and snorkel</span>
                  </div>
                  <div className="flex gap-3 items-center">
                    <Image src={icon7} alt="" width={40} height={40} />
                    <span>Insurance</span>
                  </div>
                  <div className="flex gap-3 items-center">
                    <Image src={icon8} alt="" width={40} height={40} />
                    <span>Life jacket</span>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-10">
                <div className="flex flex-col gap-4">
                  <h6 className="font-bold text-xl text-[#ED021A]">
                    Not included
                  </h6>
                  <div className="flex gap-6 items-center">
                    <div className="px-2 rounded-full bg-[#ED021A]">
                      <X color="white" size={18} />
                    </div>
                    <p className="text-[#333333]">
                      Tips, personal expenses, and anything not mentioned in the
                      program..
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <h6 className="font-bold text-xl text-[#E06C27]">
                    Cancellation
                  </h6>
                  <div className="flex gap-6 items-center">
                    <div className="px-2 rounded-full bg-[#E06C27]">
                      <X color="white" size={18} />
                    </div>
                    <p className="text-[#333333]">
                      Free cancellation allowed up to 24 hours before the
                      excursion departure.
                    </p>
                  </div>
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
                      Sunscreen, swimsuit, beach towel.
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
