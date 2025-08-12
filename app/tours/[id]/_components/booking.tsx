import { Counter } from "@/components/counter";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Image from "next/image";
import React from "react";

// Images
import calendar2 from "@/assets/images/calendar2.png";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DatePicker } from "@/components/date.picker";

const Booking = () => {
  return (
    <div className="p-7 border sticky top-10 border-[#E7E6E6] rounded-[12px] text-[#333333] h-max shadow-[0px_10px_40px_0px_#000000]/5">
      <h6 className="text-sm">
        Estimated cost <strong className="text-lg">$1,200-2,000 </strong>
        /per person
      </h6>
      <span className="text-xs">
        *Please note that prices may vary based on circumstances.
      </span>
      <div className="border border-[#DDDDDD] rounded-[12px] p-[10px] flex gap-[10px] my-4">
        <div className="w-[50px] aspect-square rounded-[12px] bg-[#F5F5F5] grid place-content-center">
          <Image src={calendar2} alt="" width={30} height={30} />
        </div>
        <div className="flex flex-col justify-center">
          <h6 className="text-base font-medium">From</h6>
          <span className="text-sm font-normal">February 05 ~ February 12</span>
        </div>
      </div>
      <h6 className="text-lg font-medium">Tickets</h6>
      <div className="flex flex-col gap-4 my-[24px]">
        <div className="flex items-center ">
          <span className="text-sm min-w-[150px]">Adult (18+ years)</span>
          <Counter />
        </div>
        <div className="flex items-center">
          <span className="text-sm min-w-[150px]">Child (6-17 years) </span>
          <Counter />
        </div>
        <div className="flex items-center">
          <span className="text-sm min-w-[150px]">Infant (0-5 years)</span>
          <Counter />
        </div>
      </div>
      <div className="h-[1px] w-full bg-[#E7E6E6]" />
      <div className="flex items-center gap-6 mt-4">
        <div className="w-10 aspect-square rounded-full border border-[#E7E6E6] grid place-content-center">
          <Heart color="#E7E6E6" />
        </div>
        <Dialog>
          <DialogTrigger className="flex-1">
            <Button className="h-[60px] rounded-[12px] w-full bg-[#BD3E2B] hover:bg-[#BD3E2B] cursor-pointer">
              Book Now
            </Button>
          </DialogTrigger>
          <DialogContent className="!max-w-3xl p-[75px] rounded-3xl">
            <DialogTitle className="text-3xl text-[#333333] font-bold">
              Bali on a Shoestring 7 Days 6 nights
            </DialogTitle>
            {/* Form */}
            <div className="flex flex-col gap-10">
              <DatePicker label="When you will visit?" />
            </div>
            <DialogFooter className="h-14 font-medium [&>button]:rounded-[12px]">
              <Button className="h-full w-[144px] bg-[#EFEFEF] hover:bg-[#ADADAD] text-[#ADADAD] hover:text-[#EFEFEF] cursor-pointer">
                Cancel
              </Button>
              <Button className="h-full w-[200px] bg-[#BD3E2B] hover:bg-[#BD3E2B] text-white cursor-pointer">
                Book Now
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Booking;
