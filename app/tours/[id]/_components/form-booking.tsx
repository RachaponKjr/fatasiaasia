import { BookingCounter } from "@/components/booking-counter";
import { DatePicker } from "@/components/date.picker";
import { BookingReq } from "@/types/booking.type";
import React, { Dispatch, SetStateAction } from "react";

type Props = {
  setStep?: Dispatch<SetStateAction<number>>;
  booking: BookingReq;
  setBooking: Dispatch<SetStateAction<BookingReq>>;
  /** Weekdays (0=Sun..6=Sat) on which this tour can be booked. Defaults to all 7. */
  availableWeekdays?: number[];
};

const ALL_WEEKDAYS = [0, 1, 2, 3, 4, 5, 6];
const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const FormBooking = ({ setStep, booking, setBooking, availableWeekdays }: Props) => {
  if (!booking) {
    return <div>Loading...</div>;
  }

  const allowedDays =
    availableWeekdays && availableWeekdays.length > 0
      ? availableWeekdays
      : ALL_WEEKDAYS;
  const disabledWeekdays = ALL_WEEKDAYS.filter((d) => !allowedDays.includes(d));
  const isRestricted = allowedDays.length < 7;

  return (
    <div className="flex flex-col gap-10">
      <DatePicker
        value={booking.startDate}
        onChange={(timestamp) =>
          setBooking((prev) => ({
            ...prev,
            startDate: timestamp,
            // Departure times are fixed per tour and arranged with us directly.
            visitTime: timestamp,
          }))
        }
        disabledWeekdays={disabledWeekdays}
        label="When you will visit?"
      />
      <p className="text-sm text-[#585858] -mt-6">
        Tours operate at fixed daily schedules. Departure time will be confirmed by our team after booking.
        {isRestricted && (
          <>
            <br />
            <span className="font-semibold text-[#BD3E2B]">
              Available on: {allowedDays.map((d) => DAY_LABELS[d]).join(", ")}
            </span>
          </>
        )}
      </p>
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
