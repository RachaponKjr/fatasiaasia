'use client'
import { Badge } from "@/components/ui/badge";
import { MyBooking } from "@/types/booking.type";
import { formatTourDateRange } from "@/utils/format";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import api from "@/server";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const TourItem = ({ booking }: { booking: MyBooking }) => {
  const router = useRouter();
  const status = (booking?.bookingStatus ?? "pending").toLowerCase();
  const statusStyle: Record<string, { color: string; label: string }> = {
    pending: { color: "bg-amber-500", label: "Pending" },
    confirmed: { color: "bg-[#28A745]", label: "Confirmed" },
    paid: { color: "bg-[#28A745]", label: "Paid" },
    completed: { color: "bg-[#666666]", label: "Completed" },
    declined: { color: "bg-red-500", label: "Declined" },
    cancelled: { color: "bg-red-500", label: "Cancelled" },
  };
  const { color: badgeColor, label: badgeText } =
    statusStyle[status] ?? statusStyle.pending;

  const handleCancel = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        const res = await api.booking.cancelBooking(booking.bookingId);
        if (res.code === 2000) {
          toast.success("Booking cancelled successfully");
          router.refresh();
        } else {
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
      <Link href={`/profile/booking/${booking.bookingId}`} className="flex flex-col gap-4">
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
      </Link>
      {status !== "cancelled" && status !== "declined" && status !== "completed" && (
        <button
          onClick={handleCancel}
          className="text-red-500 text-sm font-medium hover:underline text-left w-fit px-4"
        >
          Cancel Booking
        </button>
      )}
    </div>
  );
};

export default TourItem;
