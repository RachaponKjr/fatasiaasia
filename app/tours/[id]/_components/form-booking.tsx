import { BookingCounter } from "@/components/booking-counter";
import { DatePicker } from "@/components/date.picker";
import { TimePicker } from "@/components/time.picker";
import { BookingReq } from "@/types/booking.type";
import React, { Dispatch, SetStateAction } from "react";

type Props = {
  setStep?: Dispatch<SetStateAction<number>>;
  booking: BookingReq;
  setBooking: Dispatch<SetStateAction<BookingReq>>;
};

const FormBooking = ({ setStep, booking, setBooking }: Props) => {
  if (!booking) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-10">
      <DatePicker
        value={booking.startDate}
        onChange={(timestamp) =>
          setBooking((prev) => ({
            ...prev,
            startDate: timestamp,
          }))
        }
        label="When you will visit?"
      />
      <TimePicker
        value={booking.visitTime}
        onChange={(timestamp) =>
          setBooking((prev) => ({
            ...prev,
            visitTime: timestamp,
          }))
        }
        label="Which time?"
      />
      <div className="flex flex-col gap-[28px]">
        <h5 className="px-1 font-semibold text-2xl text-[#333333]">
          Select Your Tickets
        </h5>
        <div className="flex flex-col gap-[22px]">
          <BookingCounter
            onChange={(v) =>
              setBooking((prev) => ({
                ...prev,
                adultTickets: Number(v),
              }))
            }
            value={booking.adultTickets ?? 0}
            label="Adult (12+)"
          />
          <BookingCounter
            onChange={(v) =>
              setBooking((prev) => ({
                ...prev,
                childTickets: Number(v),
              }))
            }
            value={booking.childTickets ?? 0}
            label="Child (3-11)"
          />
          <BookingCounter
            onChange={(v) =>
              setBooking((prev) => ({
                ...prev,
                infantTickets: Number(v),
              }))
            }
            value={booking.infantTickets ?? 0}
            label="Infant (0-3)"
          />
        </div>
      </div>
    </div>
  );
};

export default FormBooking;
