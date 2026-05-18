"use client";
import { StepProgress } from "@/components/step-progress";
import React, { useState } from "react";
import FormBooking from "../../_components/form-booking";
import CalenderIcon from "@/assets/icons/calender";
import { Button } from "@/components/ui/button";
import InfoUser from "./info-user";
import ConBooking from "./con-booking";
import CompleteBooking from "./complete-booking";
import Image from "next/image";

import { useBooking } from "@/store/booking-store";
import { TourDetail } from "@/types/tour.type";
import { formatDate } from "@/utils/format";
import { parseTourMeta } from "@/utils/tour-meta";
import { toast } from "sonner";

const BookingPage = ({ tourDetail }: { tourDetail: TourDetail }) => {
  const [step, setStep] = useState<number>(1);
  const { booking, setBooking } = useBooking();
  const meta = parseTourMeta(tourDetail?.tourDetails?.included);
  const steps = [
    { id: 1, title: "Booking Details" },
    { id: 2, title: "Your Details" },
    { id: 3, title: "Complete" },
  ];

  const validateStep1 = () => {
    const errors: string[] = [];

    if (!booking.startDate || booking.startDate === 0) {
      errors.push("Please select a visit date");
    }

    const totalTickets = (booking.adultTickets || 0) + (booking.childTickets || 0) + (booking.infantTickets || 0);
    if (totalTickets === 0) {
      errors.push("Please select at least one ticket");
    }

    return errors;
  };

  const validateStep2 = () => {
    const errors: string[] = [];

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

  const handleNextStep = () => {
    if (step === 1) {
      const errors = validateStep1();
      if (errors.length > 0) {
        toast.error(errors[0], { className: "!text-red-500" });
        return;
      }
    }
    setStep(step + 1);
  };

  return (
    <div className="flex flex-col w-full p-4 lg:p-0 gap-[20px] lg:gap-[130px]">
      <div className="max-w-3xl mx-auto w-full">
        <StepProgress currentStep={step} steps={steps} />
      </div>
      <div className="grid grid-cols-1 p-4 lg:p-0 lg:grid-cols-2 gap-[20px] lg:gap-[120px]">
        {step === 1 && (
          <FormBooking
            booking={booking}
            setBooking={setBooking}
            availableWeekdays={meta.availableWeekdays}
          />
        )}
        {step === 2 && <InfoUser setStep={setStep} />}
        {step === 3 && <ConBooking tourDetail={tourDetail} setStep={setStep} />}
        {step === 4 && <CompleteBooking tourDetail={tourDetail} />}
        {step < 3 && (
          <div className="border p-4 lg:p-8 rounded-3xl flex flex-col justify-between">
            <h5 className="font-bold text-2xl text-[#333333]">
              Your Tickets Overview
            </h5>
            <div className="flex flex-col">
              <div className="flex flex-row gap-4 lg:gap-6 border-b border-[#EFEFEF] py-5">
                <div className="w-[150px] aspect-[16/12] overflow-hidden rounded-[11px] relative">
                  <Image
                    src={tourDetail.galleryUrls[0]}
                    alt=""
                    fill
                    objectFit="cover"
                    objectPosition="center"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-2 lg:gap-4">
                  <h4 className="font-bold text-2xl text-[#333333]">
                    {tourDetail.title}
                  </h4>
                  <div className="flex items-center gap-[14]">
                    <CalenderIcon opacity={1} color="#BD3E2B" size={24} />
                    <span className="font-semibold text-xs lg:text-lg text-[#333333]">
                      {booking.startDate ? formatDate(booking.startDate) : "Select a date"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col border-b border-[#EFEFEF]">
                <div className="flex items-center gap-2 py-4">
                  <div className="bg-[#EFEFEF] w-10 aspect-square rounded-full grid place-content-center">
                    <span className="font-semibold text-[#333333]/80 text-lg">
                      {booking.adultTickets}
                    </span>
                  </div>
                  <span>Adult (12+)</span>
                </div>
                <div className="flex items-center gap-2 py-4">
                  <div className="bg-[#EFEFEF] w-10 aspect-square rounded-full grid place-content-center">
                    <span className="font-semibold text-[#333333]/80 text-lg">
                      {booking.childTickets}
                    </span>
                  </div>
                  <span>Child (3-11)</span>
                </div>
                <div className="flex items-center gap-2 py-4">
                  <div className="bg-[#EFEFEF] w-10 aspect-square rounded-full grid place-content-center">
                    <span className="font-semibold text-[#333333]/80 text-lg">
                      {booking.infantTickets}
                    </span>
                  </div>
                  <span>Infant (0-3)</span>
                </div>
              </div>
            </div>
            <Button
              onClick={handleNextStep}
              className="bg-[#BD3E2B] hover:bg-[#BD3E2B] w-full h-[60px] rounded-full cursor-pointer text-white font-black text-lg"
            >
              Go to the Next Step
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
