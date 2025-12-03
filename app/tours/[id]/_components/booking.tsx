"use client";
import { Counter } from "@/components/counter";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormBooking from "./form-booking";

// Images
import calendar2 from "@/assets/images/calendar2.png";
import { useRouter } from "next/navigation";
import { useBooking } from "@/store/booking-store";
import { TourDetail } from "@/types/tour.type";
import { useWishlist } from "@/hooks/useWishlist";
import { formatNumber } from "@/utils/format";

const Booking = ({
  tourId,
  tourdetail,
}: {
  tourId: number;
  tourdetail: TourDetail;
}) => {
  const router = useRouter();
  const { addToWishlist, removeFromWishlist, fetchWishlist } = useWishlist();
  const [dialogBooking, setDialogBooking] = useState<boolean>(false);
  const { setBooking, booking, resetBooking } = useBooking();
  const [isWishlisted, setIsWishlisted] = useState(tourdetail?.isWishlist);

  useEffect(() => {
    void resetBooking();
  }, []);

  useEffect(() => {
    setIsWishlisted(tourdetail?.isWishlist);
  }, [tourdetail?.isWishlist]);

  const clickWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(tourdetail?.tourId);
      setIsWishlisted(false);
    } else {
      addToWishlist(tourdetail?.tourId);
      setIsWishlisted(true);
    }
  };

  if (!tourdetail) {
    return (
      <div className="p-7 border grow h-[30rem] shrink-0 sticky top-10 border-[#E7E6E6] rounded-[12px] text-[#333333] shadow-[0px_10px_40px_0px_#000000]/5"></div>
    );
  }

  return (
    <div className="p-7 border shrink-0 sticky top-10 border-[#E7E6E6] rounded-[12px] text-[#333333] h-max shadow-[0px_10px_40px_0px_#000000]/5">
      <h6 className="text-sm">
        Estimated cost{" "}
        <strong className="text-lg">
          ${formatNumber(tourdetail?.estimateCostPerPerson)}{" "}
        </strong>
        /per person
      </h6>
      <span className="text-xs">
        *Please note that prices may vary based on circumstances.
      </span>
      <div className="border border-[#DDDDDD] rounded-[12px] p-[10px] flex gap-[10px] my-4">
        <div className="w-[50px] aspect-square rounded-[12px] bg-[#F5F5F5] grid place-content-center">
          <Image src={calendar2} alt="" width={30} height={30} />
        </div>
        <div className="flex flex-col justify-center">
          <h6 className="text-base font-medium">From</h6>
          <span className="text-sm font-normal">February 05 ~ February 12</span>
        </div>
      </div>
      <h6 className="text-lg font-medium">Tickets</h6>
      <div className="flex flex-col gap-4 my-[24px]">
        <div className="flex items-center ">
          <span className="text-sm min-w-[150px]">Adult (18+ years)</span>
          <Counter
            initialValue={booking.adultTickets}
            onChange={(v) =>
              setBooking((prev) => ({
                ...prev,
                adultTickets: Number(v),
              }))
            }
          />
        </div>
        <div className="flex items-center">
          <span className="text-sm min-w-[150px]">Child (6-12 years) </span>
          <Counter
            initialValue={booking.childTickets}
            onChange={(v) =>
              setBooking((prev) => ({
                ...prev,
                childTickets: Number(v),
              }))
            }
          />
        </div>
        <div className="flex items-center">
          <span className="text-sm min-w-[150px]">Infant (0-6 years)</span>
          <Counter
            initialValue={booking.infantTickets}
            onChange={(v) =>
              setBooking((prev) => ({
                ...prev,
                infantTickets: Number(v),
              }))
            }
          />
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h6 className="text-lg font-medium">Total</h6>
        <h6 className="text-2xl font-bold text-[#BD3E2B]">
          $
          {formatNumber(
            (booking.adultTickets + booking.childTickets) *
            (tourdetail?.estimateCostPerPerson || 0)
          )}
        </h6>
      </div>

      <div className="h-[1px] w-full bg-[#E7E6E6]" />
      <div className="flex items-center gap-6 mt-4">
        <div
          onClick={clickWishlist}
          className="w-10 aspect-square rounded-full cursor-pointer border border-[#E7E6E6] grid place-content-center"
        >
          <Heart
            fill={isWishlisted ? "#E0211D" : "transparent"}
            color={isWishlisted ? "#E0211D" : "#E7E6E6"}
            size={24}
          />
        </div>

        <Dialog open={dialogBooking} onOpenChange={setDialogBooking}>
          <DialogTrigger asChild className="flex-1">
            <Button className="h-[60px] rounded-[12px] w-full bg-[#BD3E2B] hover:bg-[#BD3E2B] cursor-pointer">
              Book Now
            </Button>
          </DialogTrigger>
          <DialogContent className="!max-w-3xl max-h-11/12 lg:p-[75px] p-[20px] overflow-hidden overflow-y-auto rounded-3xl">
            <DialogTitle className="text-3xl text-[#333333] font-bold">
              Bali on a Shoestring 7 Days 6 nights
            </DialogTitle>
            {/* Form */}
            <FormBooking booking={booking} setBooking={setBooking} />
            <DialogFooter className="h-14 flex flex-row lg:flex-col  font-medium [&>button]:rounded-[12px]">
              <Button
                onClick={() => setDialogBooking(false)}
                className="h-full flex-1 lg:w-[144px] bg-[#EFEFEF] hover:bg-[#ADADAD] text-[#ADADAD] hover:text-[#EFEFEF] cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                onClick={() => router.push(`/tours/${tourId}/booking`)}
                className="h-full flex-1 lg:w-[200px] bg-[#BD3E2B] hover:bg-[#BD3E2B] text-white cursor-pointer"
              >
                Book Now
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Booking;
