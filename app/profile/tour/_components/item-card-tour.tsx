import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";
import imagetest from "@/assets/imagetest.jpg";
import Image from "next/image";

const ItemCardTour = ({ active = false }: { active?: boolean }) => {
  return (
    <div className="bg-white p-10 rounded-[12px] border border-[#E7E6E6] flex gap-14 h-max shadow-[0px_10px_40px_0px_#000000]/5">
      <div className="w-[374px] h-[350px] rounded-[24px] bg-neutral-100 relative overflow-hidden">
        <Badge className="text-white bg-[#666666] rounded-full font-medium absolute top-4 right-4">
          In Progress
        </Badge>
        <Image
          src={imagetest}
          alt=""
          fill
          objectFit="cover"
          objectPosition="center"
        />
      </div>
      <div
        className={cn(
          active ? "justify-start gap-5" : "justify-evenly",
          "flex-1 text-[#333333] text-lg flex flex-col "
        )}
      >
        <span className="font-semibold">Durations : 7 Days 6 Nights</span>
        <h4 className="text-2xl font-bold">
          Bali on a Shoestring 7 Days 6 nights
        </h4>
        <div className="text-base">
          <span>Start at 5 -14 Febuary 2025</span>
        </div>
        <div className="text-base">
          <span>Durations : 7 Days 6 Nights</span>
        </div>
        <div className="text-base">
          <span>3 Travellers</span>
        </div>
        {!active && (
          <div className="flex justify-between text-base items-center">
            <span>
              You will be receiving a confirmation email with order details.
            </span>
            <Button className="text-[#ED021A] bg-[#FEE9EE] cursor-pointer hover:bg-[#FEE9EE] rounded-full !py-6 px-6 font-normal">
              Cancel Booking
            </Button>
          </div>
        )}
        {active && (
          <>
            <h4 className="font-bold text-2xl">Price breakdown</h4>
            <div className="flex flex-col text-base font-semibold text-[#333333]">
              <span>Adult</span>
              <div className="flex justify-between">
                <span>2 x USD 1,998.00</span>
                <span>USD 3,996.00</span>
              </div>
            </div>
            <div className="flex flex-col text-base font-semibold text-[#333333]">
              <span>Children</span>
              <div className="flex justify-between">
                <span>1 x USD 0.00</span>
                <span>USD 3,996.00</span>
              </div>
            </div>
            {/* Divider */}
            <div className="w-full h-[1px] border border-[#7D7D7D]" />

            <div className="font-bold text-2xl text-black flex justify-between">
              <h5>Total price</h5>
              <h5>$3,996.00</h5>
            </div>
            <div className="flex gap-6 justify-end items-center">
              <Button className="text-[#ED021A] bg-[#FEE9EE] cursor-pointer hover:bg-[#FEE9EE] rounded-full !py-6 px-6 font-normal">
                Cancel Booking
              </Button>
              <Button className="text-[#FFFFFF] font-bold bg-[#4992E1] cursor-pointer hover:bg-[#4992E1] rounded-full !py-6 px-6 min-w-[160px]">
                Book Now
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ItemCardTour;
