"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { Star } from "lucide-react";
import ArrowLeft from "@/assets/icons/arrow-left";
import ArrowRight from "@/assets/icons/arrow-right";
import HereHelp from "./here-help";
import { getTestimonials, Testimonial } from "@/lib/testimonials-api";

// Default testimonials (always shown)
const defaultTestimonials = [
  {
    id: "default-1",
    name: "Walter Antonello",
    review: "During my vacation in Ao Nang, Alice and Pluto organized a nice 3 days tour in Koh Lanta, 4 days in Bangkok and a daily tour in Koh Yao. Thanks to them for the warm hospitality. It Is good to have people that speak Italian and can assist you. Hoping to come back soon, thanks for the good suggestions.",
    location: "Italy",
    createdAt: "2024-01-01"
  },
  {
    id: "default-2",
    name: "Nona Margareta",
    review: "Nothing to complain. It's the best tour experience we had. Safety first priority and hospitality. Alice and Silvia took us to the beach. Sent us with warm smile. Meanwhile Pluto treated us just like a long time friends. Definitely we left our heart here. Massive thanks to all team. We will come back again.",
    location: "Netherlands",
    createdAt: "2024-01-02"
  },
  {
    id: "default-3",
    name: "Marcin Maciaszczyk",
    review: "Most reliable local tour agency in Klong Muang, run by adorable owners Alice and Pluto. We absolutely enjoyed their tours (Mar 2020): private long boat trip to Hong Island and a tour to hot springs and Tiger Temple. Everything was perfectly …",
    location: "Poland",
    createdAt: "2024-01-03"
  },
  {
    id: "default-4",
    name: "Laura Cardonnet",
    review: "Always willing to help us, Pluto has not only been a great advisor for us to find the best beach tours according to our expectations, budget and needs, but also assisted us in overcoming some surprising obstacles along our journey. Totally recommended!",
    location: "France",
    createdAt: "2024-01-04"
  },
  {
    id: "default-5",
    name: "Stefano P.",
    review: "Brilliant bespoke service provided by skilled and fun-to-be-with staff in Krabi. Highly recommended for your trip!",
    location: "Italy",
    createdAt: "2024-01-05"
  },
  {
    id: "default-6",
    name: "daniel knights",
    review: "Great staff. Very knowledgeable about local hidden gems. Great trips at great prices. Highly recommend. English, Italian and Thai spoken",
    location: "United Kingdom",
    createdAt: "2024-01-06"
  },
  {
    id: "default-7",
    name: "Margherita Ducoli",
    review: "We used this agency for a trip/stay in Bangkok. They organized everything excellently, including transportation to and from the airport and the hotel. They also provided an Italian-speaking guide for the three days of sightseeing. Excellent …",
    location: "Italy",
    createdAt: "2024-01-07"
  },
  {
    id: "default-8",
    name: "Ivan Penz",
    review: "My heartfelt congratulations to Maya, a kind and thoughtful person. We spent four days in Krabi in the rain, a real drama. Keo saved us with some advice and alternatives, giving us a little optimism. Thank you, well done, and especially well done, Maya!",
    location: "Italy",
    createdAt: "2024-01-08"
  },
  {
    id: "default-9",
    name: "Franco Cere",
    review: "An Italian-speaking travel agency in Krabi, they organize tours to the most beautiful islands and can assist travelers with advice, bookings, and other information. Recommended!",
    location: "Italy",
    createdAt: "2024-01-09"
  },
  {
    id: "default-10",
    name: "Giorgio Staiti",
    review: "It is not easy to find people who know how to combine professional skill and human relationship and friendship. Simply fantastic. Highly recommended. Trust them. …",
    location: "Italy",
    createdAt: "2024-01-10"
  }
];

type ClientProps = {
  /** Optional admin override for the HereHelp banner rendered at the bottom
   *  of this testimonials block (slot key `home.here_help.image`). */
  hereHelpImageUrl?: string;
  hereHelpImageAlt?: string;
  headline?: string;
  description?: string;
};

const Client = ({
  description,
  headline,
  hereHelpImageAlt,
  hereHelpImageUrl,
}: ClientProps = {}) => {
  const [userTestimonials, setUserTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user testimonials from JSONBin
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const testimonials = await getTestimonials();
        setUserTestimonials(testimonials);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  // Combine user testimonials (first) with default testimonials
  const allTestimonials = [...userTestimonials, ...defaultTestimonials];

  return (
    <div className="container mx-auto flex flex-col items-start gap-6 px-4 sm:px-6 lg:px-8 xl:px-0">
      {/* Testimonials Badge */}
      <div className="border border-[#E4E6E8] rounded-full p-2 flex items-center gap-2">
        <div className="*:data-[slot=avatar]:ring-background *:data-[slot=avatar]:size-6 flex -space-x-2 *:data-[slot=avatar]:ring-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="https://github.com/leerob.png" alt="@leerob" />
            <AvatarFallback>LR</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage
              src="https://github.com/evilrabbit.png"
              alt="@evilrabbit"
            />
          </Avatar>
        </div>
        <span className="font-bold text-black text-[10px] sm:text-xs">
          Testimonials
        </span>
      </div>

      {/* Header Section */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 w-full">
        <div className="flex flex-col gap-4 lg:min-w-md">
          <h3 className="font-bold text-2xl sm:text-3xl lg:text-[40px] text-[#333333] leading-tight">
            {headline || "What our clients are saying about us?"}
          </h3>
          {description && (
            <p className="text-sm xl:text-lg text-[#585858]">
              {description}
            </p>
          )}
        </div>

        {/* Testimonials Swiper */}
        <div className="w-full lg:flex-1">
          <Swiper
            modules={[Autoplay, Navigation]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            navigation={{
              nextEl: ".client-next",
              prevEl: ".client-prev",
            }}
            loop
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 2.5,
                spaceBetween: 25,
              },
              1280: {
                slidesPerView: 2.5,
                spaceBetween: 25,
              },
            }}
          >
            {allTestimonials.map((item, i) => (
              <SwiperSlide key={item.id || i} className="p-2">
                <div className="p-6 sm:p-8 bg-white rounded-3xl min-h-[240px] max-h-[280px] sm:max-h-[240px] shadow-[0px_3px_10px_0px_rgba(0,_0,_0,_0.1)]">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-10 sm:size-12">
                        <AvatarFallback className="text-sm">{item.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="text-black leading-tight">
                        <h6 className="text-sm sm:text-base font-bold">
                          {item.name}
                        </h6>
                        <span className="font-medium text-[11px] sm:text-xs text-gray-500">
                          {item.location}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-[1px]">
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <Star
                          key={starIndex}
                          color="#FFC700"
                          fill="#FFC700"
                          size={10}
                          className="sm:w-3 sm:h-3"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="w-full h-[1px] bg-[#E4E6E8] my-4 sm:my-6" />

                  <p className="text-xs sm:text-sm text-[#737373] leading-relaxed line-clamp-4">
                    {item.review}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center sm:justify-end w-full gap-3 sm:gap-4 relative mt-4">
        {/* Prev Button */}
        <div className="client-prev w-12 sm:w-14 aspect-square rounded-full bg-[#FFF3E1] grid place-content-center cursor-pointer shadow-md hover:bg-[#FFE8CC] transition-colors">
          <ArrowLeft size={20} />
        </div>

        {/* Next Button */}
        <div className="client-next w-12 sm:w-14 aspect-square rounded-full bg-[#FFF3E1] grid place-content-center cursor-pointer shadow-md hover:bg-[#FFE8CC] transition-colors">
          <ArrowRight size={20} />
        </div>
      </div>

      {/* Help Section */}
      <div className="w-full mt-8 sm:mt-12 lg:mt-14">
        <HereHelp imageUrl={hereHelpImageUrl} imageAlt={hereHelpImageAlt} />
      </div>
    </div>
  );
};

export default Client;
