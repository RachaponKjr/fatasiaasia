'use client'
import { Badge } from "@/components/ui/badge";
import { MyBooking } from "@/types/booking.type";
import { formatTourDateRange } from "@/utils/format";
import Image from "next/image";
import React from "react";
import api from "@/server";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const TourItem = ({ booking }: { booking: MyBooking }) => {
  const router = useRouter();
  // เช็คสถานะและเลือกสี
  const isConfirmed = booking?.bookingStatus === "confirmed";
  const badgeColor = isConfirmed ? "bg-[#28A745]" : "bg-[#666666]";
  const badgeText = isConfirmed ? "Confirmed" : "In Progress";

  const handleCancel = async () => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        const res = await api.booking.cancelBooking(booking.bookingId);
        if (res.code === 2000) {
          toast.success("Booking cancelled successfully");
          router.refresh();
        } else {
          // Provide more specific error messages
          if (res.message?.includes("Database") || res.message?.includes("database")) {
            toast.error("Unable to cancel booking at this time. Please contact support.", { className: "!text-red-500" });
          } else {
            toast.error(res.message || "Failed to cancel booking", { className: "!text-red-500" });
          }
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred. Please try again later.", { className: "!text-red-500" });
      }
    }
  };

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
        <button
          onClick={handleCancel}
          className="text-red-500 text-sm font-medium hover:underline text-left w-fit"
        >
          Cancel Booking
        </button>
      </div>
    </div>
  );
};

export default TourItem;
