import { Button } from "@/components/ui/button";
import React from "react";

const ConBooking = () => {
  return (
    <div className="w-full bg-white col-span-2 p-11 rounded-xl border border-[#E7E6E6] flex flex-col gap-9 shadow-[0px_10px_40px_0px_#000000]/5">
      <span className="font-bold text-2xl text-[#333333]">
        Your Tickets Overview
      </span>
      <div className="flex flex-row gap-16">
        <div className="w-full aspect-[16/14] basis-md rounded-[24px] bg-yellow-300" />
        <div className="text-[#333333] text-lg flex flex-col justify-evenly">
          <div className="flex flex-col gap-4">
            <h6 className="text-2xl font-bold text-[#2F2F2F]">
              Bali on a Shoestring 7 Days 6 nights
            </h6>
            <span>Durations : 7 Days 6 Nights</span>
          </div>
          <div>
            <span>Start at 5 -14 Febuary 2025</span>
          </div>
          <div>
            <span>Durations : 7 Days 6 Nights</span>
          </div>
          <div>
            <span>3 Travellers</span>
          </div>
          <span>
            You will be receiving a confirmation email with order details.
          </span>
        </div>
      </div>
      <div className="flex justify-between mt-14">
        <Button className="bg-[#EFEFEF] hover:bg-[#EFEFEF] text-xl font-bold cursor-pointer w-[160px] h-[60px] rounded-full text-[#333333]">
          Back
        </Button>
        <Button className="bg-[#BD3E2B] hover:bg-[#BD3E2B] text-xl font-bold cursor-pointer w-[473px] h-[60px] rounded-full text-white">
          submit booking
        </Button>
      </div>
    </div>
  );
};

export default ConBooking;
