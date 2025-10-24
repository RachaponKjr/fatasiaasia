import { Badge } from "@/components/ui/badge";
import { MyBooking } from "@/types/booking.type";
import { formatTourDateRange } from "@/utils/format";
import Image from "next/image";
import React from "react";

const TourItem = ({ booking }: { booking: MyBooking }) => {
  // เช็คสถานะและเลือกสี
  const isConfirmed = booking?.bookingStatus === "confirmed";
  const badgeColor = isConfirmed ? "bg-[#28A745]" : "bg-[#666666]";
  const badgeText = isConfirmed ? "Confirmed" : "In Progress";

  return (
    <div className="flex flex-col gap-4 relative">
      <div className="w-full aspect-square bg-neutral-100 rounded-3xl relative overflow-hidden">
        <Badge
          className={`absolute z-20 top-5 right-5 text-white rounded-full ${badgeColor}`}
        >
          {badgeText}
        </Badge>
        <Image
          src={booking?.thumbnail}
          alt={booking?.tourTitle}
          fill
          className="object-cover object-center"
        />
      </div>
      <div className="flex flex-col gap-2 px-4 text-2xl">
        <h4 className="font-bold line-clamp-2 md:text-base text-[#2F2F2F]">
          {booking?.tourTitle}
        </h4>
        <span className="text-[#33333380] text-sm md:text-base">
          {formatTourDateRange(booking?.startDate, booking?.endDate)}
        </span>
      </div>
    </div>
  );
};

export default TourItem;
