"use client";
import InputWithLabel from "@/components/input-with-lable";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/store/booking-store";
import React, { Dispatch, SetStateAction } from "react";

type Props = {
  setStep?: Dispatch<SetStateAction<number>>;
};

const InfoUser = ({ setStep }: Props) => {
  const { booking, setBooking } = useBooking();
  return (
    <div className="flex flex-col justify-around">
      <div className="flex flex-col gap-4">
        <h5 className=" font-semibold text-[#333333] text-2xl">
          Who shall we send these tickets to?
        </h5>
        <div className="grid grid-cols-2 gap-[55px]">
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
      <Button
        onClick={() => {
          setStep?.(1);
        }}
        className="bg-[#EFEFEF] hover:bg-[#EFEFEF] text-xl font-bold cursor-pointer w-[160px] h-[60px] rounded-full text-[#333333]"
      >
        Back
      </Button>
    </div>
  );
};

export default InfoUser;
