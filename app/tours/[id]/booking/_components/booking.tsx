"use client";
import { StepProgress } from "@/components/step-progress";
import React, { useState } from "react";
import FormBooking from "../../_components/form-booking";
import CalenderIcon from "@/assets/icons/calender";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import InfoUser from "./info-user";
import ConBooking from "./con-booking";
import CompleteBooking from "./complete-booking";
import Image from "next/image";

import imagetest from "@/assets/imagetest.jpg";
import { useBooking } from "@/store/booking-store";

const BookingPage = () => {
  const [step, setStep] = useState<number>(1);
  const { booking, setBooking } = useBooking();
  const steps = [
    { id: 1, title: "Booking Details" },
    { id: 2, title: "Your Details" },
    { id: 3, title: "Complete" },
  ];
  return (
    <div className="flex flex-col w-full gap-[130px]">
      <div className="max-w-3xl mx-auto w-full">
        <StepProgress currentStep={step} steps={steps} />
      </div>
      <div className="grid grid-cols-2 gap-[120px]">
        {step === 1 && (
          <FormBooking booking={booking} setBooking={setBooking} />
        )}
        {step === 2 && <InfoUser setStep={setStep} />}
        {step === 3 && <ConBooking setStep={setStep} />}
        {step === 4 && <CompleteBooking />}
        {step < 3 && (
          <div className="border p-8 rounded-3xl flex flex-col justify-between">
            <h5 className="font-bold text-2xl text-[#333333]">
              Your Tickets Overview
            </h5>
            <div className="flex flex-col">
              <div className="flex flex-row gap-6 border-b border-[#EFEFEF] py-5">
                <div className="w-[150px] aspect-[16/12] overflow-hidden rounded-[11px] relative">
                  <Image
                    src={imagetest}
                    alt=""
                    fill
                    objectFit="cover"
                    objectPosition="center"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-4">
                  <h4 className="font-bold text-2xl text-[#333333]">
                    Bali on a Shoestring 7 Days 6 nights
                  </h4>
                  <div className="flex items-center gap-[14]">
                    <CalenderIcon opacity={1} color="#BD3E2B" size={24} />
                    <span className="font-semibold text-lg text-[#333333]">
                      FRI, 05 FEB 2025{" "}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Clock color="#BD3E2B" strokeWidth={1} size={24} />
                    <span className="font-semibold text-lg text-[#333333]">
                      15:00
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col border-b border-[#EFEFEF]">
                <div className="flex items-center gap-2 py-4">
                  <div className="bg-[#EFEFEF] w-10 aspect-square rounded-full grid place-content-center">
                    <span className="font-semibold text-[#333333]/80 text-lg">
                      2
                    </span>
                  </div>
                  <span>Adult (18+)</span>
                </div>
                <div className="flex items-center gap-2 py-4">
                  <div className="bg-[#EFEFEF] w-10 aspect-square rounded-full grid place-content-center">
                    <span className="font-semibold text-[#333333]/80 text-lg">
                      0
                    </span>
                  </div>
                  <span>Child (6-17)</span>
                </div>
                <div className="flex items-center gap-2 py-4">
                  <div className="bg-[#EFEFEF] w-10 aspect-square rounded-full grid place-content-center">
                    <span className="font-semibold text-[#333333]/80 text-lg">
                      2
                    </span>
                  </div>
                  <span>Infant (0-5)</span>
                </div>
              </div>
            </div>
            <Button
              onClick={() => setStep(step + 1)}
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
