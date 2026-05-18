import { Button } from "@/components/ui/button";
import React, { Dispatch, SetStateAction } from "react";
import imagetest from "@/assets/imagetest.webp";
import Image from "next/image";
import { TourDetail } from "@/types/tour.type";
import api from "@/server";
import { useBooking } from "@/store/booking-store";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = {
  setStep?: Dispatch<SetStateAction<number>>;
  tourDetail: TourDetail;
};

const ConBooking = ({ setStep, tourDetail }: Props) => {
  const { booking } = useBooking();
  const router = useRouter();

  const validateBooking = () => {
    const errors: string[] = [];

    if (!booking.startDate || booking.startDate === 0) {
      errors.push("Please select a visit date");
    }
    if (
      !booking.adultTickets &&
      !booking.childTickets &&
      !booking.infantTickets
    ) {
      errors.push("Please select at least one ticket");
    }
    if (!booking.bookingFirstname?.trim()) {
      errors.push("Please enter your first name");
    }
    if (!booking.bookingSurname?.trim()) {
      errors.push("Please enter your surname");
    }
    if (!booking.bookingEmail?.trim()) {
      errors.push("Please enter your email");
    }
    if (!booking.bookingPhone?.trim()) {
      errors.push("Please enter your phone number");
    }
    if (!booking.bookingAddress?.trim()) {
      errors.push("Please enter your address");
    }

    return errors;
  };

  const submitBooking = async () => {
    // Validate first
    const validationErrors = validateBooking();
    if (validationErrors.length > 0) {
      toast.error(validationErrors[0], {
        className: "!text-red-500",
      });
      return;
    }

    try {
      // Ensure visitTime has a default if not set
      const bookingPayload = {
        ...booking,
        visitTime: booking.visitTime || Date.now(), // Default to current time if not set
      };

      const bookingRes = await api.booking.booking({
        tourId: tourDetail.tourId,
        payload: bookingPayload,
      });

      if (bookingRes.code === 2000) {
        setStep?.(4);
        toast.success("Booking submitted successfully!");
      } else if (bookingRes.code === 401 || bookingRes.code === 4001) {
        // Only redirect to login for authentication errors
        toast.error("Please log in to complete your booking", {
          className: "!text-red-500",
        });
        router.push("/login");
      } else {
        // Show the actual error message for other errors
        toast.error(
          bookingRes.message || "Failed to submit booking. Please try again.",
          {
            className: "!text-red-500",
          }
        );
      }
    } catch (err) {
      console.error("Booking error:", err);
      toast.error("An error occurred. Please try again.", {
        className: "!text-red-500",
      });
    }
  };

  return (
    <div className="w-full bg-white col-span-2 p-4 lg:p-8 rounded-xl border border-[#E7E6E6] flex flex-col gap-4 lg:gap-9 shadow-[0px_10px_40px_0px_#000000]/5">
      <span className="font-bold text-2xl text-[#333333]">
        Your Tickets Overview
      </span>
      <div className="flex flex-row gap-4 lg:gap-16">
        <div className="w-full aspect-[16/14] basis-md rounded-[24px] relative overflow-hidden">
          <Image
            src={tourDetail.galleryUrls[0]}
            alt=""
            fill
            objectFit="cover"
            objectPosition="center"
          />
        </div>
        <div className="text-[#333333] text-lg flex flex-col justify-evenly">
          <div className="flex flex-col gap-2 lg:gap-4">
            <h6 className="text-base lg:text-2xl font-bold text-[#2F2F2F] line-clamp-2 lg:line-clamp-none">
              {tourDetail.title}
            </h6>
            <span className="text-xs lg:text-lg">
              Duration : {tourDetail.itineraries?.length || 1} Day
              {(tourDetail.itineraries?.length || 1) > 1 ? "s" : ""}{" "}
              {Math.max(0, (tourDetail.itineraries?.length || 1) - 1)} Night
              {Math.max(0, (tourDetail.itineraries?.length || 1) - 1) !== 1
                ? "s"
                : ""}
            </span>
          </div>
          <div>
            <span className="text-xs lg:text-lg">
              Start Date:{" "}
              {booking.startDate
                ? new Date(booking.startDate * 1000).toLocaleDateString(
                    "en-US",
                    { day: "numeric", month: "long", year: "numeric" }
                  )
                : "Not selected"}
            </span>
          </div>
          <div>
            <span className="text-xs lg:text-lg">
              {(booking.adultTickets || 0) +
                (booking.childTickets || 0) +
                (booking.infantTickets || 0)}{" "}
              Traveller
              {(booking.adultTickets || 0) +
                (booking.childTickets || 0) +
                (booking.infantTickets || 0) !==
              1
                ? "s"
                : ""}
            </span>
          </div>
          <span className="text-xs lg:text-lg">
            You will be receiving a confirmation email with order details.
          </span>
        </div>
      </div>
      <div className="flex justify-between gap-4 mt-4 lg:mt-14">
        <Button
          onClick={() => setStep?.(2)}
          className="bg-[#EFEFEF] flex-1 hover:bg-[#EFEFEF] text-xl font-bold cursor-pointer lg:w-[160px] h-[60px] rounded-full text-[#333333]"
        >
          Back
        </Button>
        <Button
          onClick={submitBooking}
          className="bg-[#BD3E2B] flex-1 hover:bg-[#BD3E2B] text-xl font-bold cursor-pointer lg:w-[473px] h-[60px] rounded-full text-white"
        >
          Submit Booking
        </Button>
      </div>
    </div>
  );
};

export default ConBooking;
