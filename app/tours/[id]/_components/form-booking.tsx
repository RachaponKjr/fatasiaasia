import { BookingCounter } from "@/components/booking-counter";
import { DatePicker } from "@/components/date.picker";
import { TimePicker } from "@/components/time.picker";
import React, { Dispatch, SetStateAction } from "react";

type Props = {
  setStep?: Dispatch<SetStateAction<number>>;
};

const FormBooking = ({ setStep }: Props) => {
  return (
    <div className="flex flex-col gap-10">
      <DatePicker label="When you will visit?" />
      <TimePicker label="Which time?" />
      <div className="flex flex-col gap-[28px]">
        <h5 className="px-1 font-semibold text-2xl text-[#333333]">
          Select Your Tickets
        </h5>
        <div className="flex flex-col gap-[22px]">
          <BookingCounter label="Adult (18+)" />
          <BookingCounter label="Child (6-17)" />
          <BookingCounter label="Infant (0-5) " />
        </div>
      </div>
    </div>
  );
};

export default FormBooking;
