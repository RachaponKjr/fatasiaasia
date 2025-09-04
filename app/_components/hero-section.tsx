import React from "react";
import banner from "@/assets/images/banner/herobanner.jpg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus } from "lucide-react";
import LocationIcon from "@/assets/icons/location";
import { Button } from "@/components/ui/button";
import SearchComponent from "@/components/search";
const HeroSection = () => {
  return (
    <section
      className="w-full min-h-[876px] px-4 xl:px-0 bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${banner.src})` }}
    >
      <div className="max-w-6xl flex flex-col items-center gap-9">
        <h2 className="text-white text-2xl xl:text-7xl font-bold text-center">
          No matter where you’re going to, we’ll take you there
        </h2>

        {/* Search */}
        <SearchComponent />

        {/* Avatar */}
        <div className="text-white flex flex-col xl:flex-row items-center font-medium gap-6">
          <div className="*:data-[slot=avatar]:ring-background *:data-[slot=avatar]:size-10 flex -space-x-2 *:data-[slot=avatar]:ring-3">
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
            <Avatar>
              <AvatarFallback className="!bg-[#BD3E2B]">
                <Plus color="white" size={18} />
              </AvatarFallback>
            </Avatar>
          </div>
          <span>200 people booked Tour in last 24 hours</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
