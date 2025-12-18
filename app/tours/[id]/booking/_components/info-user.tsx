"use client";
import InputWithLabel from "@/components/input-with-lable";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/store/booking-store";
import React, { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

type Props = {
  setStep?: Dispatch<SetStateAction<number>>;
};

const InfoUser = ({ setStep }: Props) => {
  const { booking, setBooking } = useBooking();

  const validateAndProceed = () => {
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

    if (errors.length > 0) {
      toast.error(errors[0], { className: "!text-red-500" });
      return;
    }

    setStep?.(3);
  };

  return (
    <div className="flex flex-col justify-around gap-4">
      <div className="flex flex-col gap-4">
        <h5 className=" font-semibold text-[#333333] text-2xl">
          Who shall we send these tickets to?
        </h5>
        <div className="grid grid-cols-2 gap-4 lg:gap-[55px]">
          <InputWithLabel
            id="name"
            value={booking.bookingFirstname}
            className="h-[70px]"
            placeholder="Enter your name"
            label="Name"
            onChange={(e) =>
              setBooking({ ...booking, bookingFirstname: e.target.value })
            }
          />

          <InputWithLabel
            id="surname"
            value={booking.bookingSurname}
            className="h-[70px]"
            placeholder="Enter your surname"
            label="Surname"
            onChange={(e) =>
              setBooking({ ...booking, bookingSurname: e.target.value })
            }
          />

          <InputWithLabel
            id="telephone"
            value={booking.bookingPhone}
            className="h-[70px]"
            placeholder="Enter your telephone number"
            label="Telephone Number"
            onChange={(e) =>
              setBooking({ ...booking, bookingPhone: e.target.value })
            }
          />

          <InputWithLabel
            id="email"
            value={booking.bookingEmail}
            className="h-[70px]"
            placeholder="Enter your email address"
            label="Email"
            onChange={(e) =>
              setBooking({ ...booking, bookingEmail: e.target.value })
            }
          />

          <InputWithLabel
            id="address"
            value={booking.bookingAddress}
            className="col-span-2 h-[70px]"
            placeholder="Enter your address"
            label="Address"
            onChange={(e) =>
              setBooking({ ...booking, bookingAddress: e.target.value })
            }
          />
        </div>
      </div>
      <div className="flex gap-4">
        <Button
          onClick={() => {
            setStep?.(1);
          }}
          className="bg-[#EFEFEF] hover:bg-[#EFEFEF] text-xl font-bold cursor-pointer w-[160px] h-[60px] rounded-full text-[#333333]"
        >
          Back
        </Button>
        <Button
          onClick={validateAndProceed}
          className="bg-[#BD3E2B] hover:bg-[#BD3E2B] text-xl font-bold cursor-pointer flex-1 h-[60px] rounded-full text-white"
        >
          Review & Confirm
        </Button>
      </div>
    </div>
  );
};

export default InfoUser;

