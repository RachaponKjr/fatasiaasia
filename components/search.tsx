import LocationIcon from "@/assets/icons/location";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";

import calendar from "@/assets/images/calendar3.png";
import b from "@/assets/images/b.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Counter } from "./counter";
import { Calendar } from "./ui/calendar";

const SearchComponent = () => {
  return (
    <div className="flex flex-col gap-4 w-full justify-center items-center">
      <div className="max-w-4xl px-8 xl:pl-10 xl:pr-5 py-4 text-sm xl:text-lg rounded-full bg-[#F3F3F3]/80 text-[#333333] grid grid-cols-3 xl:grid-cols-4 gap-4 w-full">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex gap-2 w-max items-center cursor-pointer">
              <LocationIcon size={18} />
              <span>Where to?</span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-52">
            <DropdownMenuItem>Thailand</DropdownMenuItem>
            <DropdownMenuItem>Laos</DropdownMenuItem>
            <DropdownMenuItem>Vietnam</DropdownMenuItem>
            <DropdownMenuItem>Malaysia</DropdownMenuItem>
            <DropdownMenuItem>Indonesia</DropdownMenuItem>
            <DropdownMenuItem>Malaysia</DropdownMenuItem>
            <DropdownMenuItem>Singapore</DropdownMenuItem>
            <DropdownMenuItem>India</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Popover>
          <PopoverTrigger>
            <div className="flex gap-2 w-max items-center cursor-pointer">
              <Image src={calendar} alt="" width={28} height={28} />
              <span>When?</span>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-max">
            <Calendar
              className="p-0"
              mode="single"
              // selected={date}
              // onSelect={setDate}
              captionLayout="dropdown"
            />
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger>
            <div className="flex gap-2 w-max items-center cursor-pointer">
              <Image src={b} alt="" width={28} height={28} />
              <span>Activity</span>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-max">
            <div className="flex flex-col gap-4">
              <div className="flex items-center ">
                <span className="text-sm min-w-[150px]">Adult (12+ years)</span>
                <Counter />
              </div>
              <div className="flex items-center">
                <span className="text-sm min-w-[150px]">
                  Child (3-11 years)
                </span>
                <Counter />
              </div>
              <div className="flex items-center">
                <span className="text-sm min-w-[150px]">
                  Infant (0-3 years)
                </span>
                <Counter />
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <Button className="bg-[#BD3E2B] hidden xl:block hover:bg-[#BD3E2B]/80 shadow-[0px_20px_35px_0px_#DF695126]/15 font-semibold cursor-pointer grow h-[50px] rounded-[50px]">
          Search
        </Button>
      </div>
      <Button className="bg-[#BD3E2B] xl:hidden block w-full hover:bg-[#BD3E2B]/80 shadow-[0px_20px_35px_0px_#DF695126]/15 font-semibold cursor-pointer grow h-[50px] rounded-[50px]">
        Search
      </Button>
    </div>
  );
};

export default SearchComponent;
