import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";
import Image from "next/image";
import { MyBooking } from "@/types/booking.type";
import { formatTourDateRange } from "@/utils/format";

const ItemCardTour = ({ active = false, tour }: { active?: boolean; tour: MyBooking }) => {
  // กำหนดสี Badge ตามสถานะ
  const isConfirmed = tour.bookingStatus === "confirmed";
  const badgeColor = isConfirmed ? "bg-green-600 text-white" : "bg-[#666666] text-white";
  const badgeText = isConfirmed ? "Confirmed" : "In Progress";

  return (
    <div className="bg-white p-4 md:p-10 rounded-[12px] border border-[#E7E6E6] flex flex-col md:flex-row gap-14 h-max shadow-[0px_10px_40px_0px_#000000]/5">
      <div className="md:w-[374px] md:h-[350px] w-full aspect-square rounded-[24px] bg-neutral-100 relative overflow-hidden">
        <Badge className={cn("rounded-full font-medium absolute top-4 right-4 z-10", badgeColor)}>
          {badgeText}
        </Badge>
        <Image
          src={tour.thumbnail || "/placeholder.jpg"}
          alt={tour.tourTitle}
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
        />
      </div>
      <div
        className={cn(
          active ? "justify-start gap-5" : "justify-evenly",
          "flex-1 text-[#333333] text-lg flex flex-col"
        )}
      >
        <span className="font-semibold">Duration: {tour.duration}</span>
        <h4 className="text-2xl font-bold">{tour.tourTitle}</h4>
        <div className="text-base">
          <span>Start at {formatTourDateRange(tour.startDate, tour.endDate)}</span>
        </div>
        <div className="text-base">
          <span>{tour.totalTravellers} Travellers</span>
        </div>

        {!active && (
          <div className="flex justify-between text-base items-center mt-auto">
            <span>You will be receiving a confirmation email with order details.</span>
            <Button className="text-[#ED021A] bg-[#FEE9EE] cursor-pointer hover:bg-[#FEE9EE] rounded-full md:!py-6 md:px-6 py-2 px-2 text-sm md:text-base font-normal">
              Cancel Booking
            </Button>
          </div>
        )}

        {active && (
          <>
            <h4 className="font-bold text-2xl mt-6">Price breakdown</h4>
            <div className="flex flex-col text-base font-semibold text-[#333333]">
              <span>Adult</span>
              <div className="flex justify-between">
                <span>2 x USD 1,998.00</span>
                <span>USD 3,996.00</span>
              </div>
            </div>
            <div className="flex flex-col text-base font-semibold text-[#333333]">
              <span>Children</span>
              <div className="flex justify-between">
                <span>1 x USD 0.00</span>
                <span>USD 0.00</span>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-[1px] border border-[#7D7D7D] my-4" />

            <div className="font-bold text-2xl text-black flex justify-between">
              <h5>Total price</h5>
              <h5>${tour.totalPrice.toFixed(2)}</h5>
            </div>

            <div className="flex gap-6 justify-end items-center mt-4">
              <Button className="text-[#ED021A] bg-[#FEE9EE] cursor-pointer hover:bg-[#FEE9EE] rounded-full md:!py-6 md:px-6 py-2 px-2 text-sm md:text-base font-normal">
                Cancel Booking
              </Button>
              <Button className="text-white font-bold bg-[#4992E1] cursor-pointer hover:bg-[#3671C6] rounded-full md:!py-6 md:px-6 py-2 px-2 text-sm md:text-base min-w-[160px]">
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
