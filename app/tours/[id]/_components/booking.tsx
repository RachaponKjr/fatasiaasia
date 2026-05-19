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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import FormBooking from "./form-booking";

// Images
import calendar2 from "@/assets/images/calendar2.png";
import { useRouter } from "next/navigation";
import { useBooking } from "@/store/booking-store";
import { TourDetail } from "@/types/tour.type";
import { useWishlist } from "@/hooks/useWishlist";
import { useProfile } from "@/hooks/useProfile";
import { formatNumber, currencySymbol } from "@/utils/format";
import { computeBookingTotal, parseTourMeta } from "@/utils/tour-meta";

const Booking = ({
  tourId,
  tourdetail,
}: {
  tourId: number;
  tourdetail: TourDetail;
}) => {
  const router = useRouter();
  const { addToWishlist, removeFromWishlist, fetchWishlist } = useWishlist();
  const { user } = useProfile();
  // Backend swaps `estimateCostPerPerson` (and `currency`) to the tour-operator
  // price/currency for `tour_agency` users. Client reads `currency` to pick the symbol.
  const isAgency = user?.userType === "tour_agency";
  const sym = currencySymbol(tourdetail?.currency);
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
      addToWishlist({
        tourId: tourdetail!.tourId,
        title: tourdetail!.title,
        country: tourdetail!.country,
        estimateCostPerPerson: tourdetail!.estimateCostPerPerson,
        thumbnail: tourdetail!.galleryUrls?.[0] || "",
        itinerariesDays: tourdetail!.itineraries?.length || 0,
        isWishlist: true,
      });
      setIsWishlisted(true);
    }
  };

  if (!tourdetail) {
    return (
      <div className="p-7 border grow h-[30rem] shrink-0 sticky top-10 border-[#E7E6E6] rounded-[12px] text-[#333333] shadow-[0px_10px_40px_0px_#000000]/5"></div>
    );
  }

  const meta = parseTourMeta(tourdetail?.tourDetails?.included);
  const basePrice = Number(tourdetail?.estimateCostPerPerson) || 0;
  const priceTiers = isAgency && Array.isArray(tourdetail?.priceTiers)
    ? (tourdetail.priceTiers || []).slice().sort((a, b) => a.minPax - b.minPax)
    : [];
  const totalPax =
    (booking.adultTickets || 0) +
    (booking.childTickets || 0) +
    (booking.infantTickets || 0);
  // Pick the tier whose [minPax, maxPax] contains total pax (agency only).
  const matchedTier = priceTiers.find(
    (t) => totalPax >= t.minPax && totalPax <= t.maxPax,
  );
  const tierPrice = matchedTier ? Number(matchedTier.pricePerPerson) || 0 : 0;
  const perPersonPrice = matchedTier ? tierPrice : basePrice;
  // Lowest tier price (for "from {X}/person" headline).
  const fromTierPrice = priceTiers.length
    ? Math.min(...priceTiers.map((t) => Number(t.pricePerPerson) || 0))
    : 0;
  const headlinePrice =
    isAgency && priceTiers.length
      ? matchedTier
        ? tierPrice
        : fromTierPrice
      : basePrice;
  const total = isAgency
    ? perPersonPrice * Math.max(totalPax, 1)
    : computeBookingTotal({
        adultTickets: booking.adultTickets || 0,
        childTickets: booking.childTickets || 0,
        adultPrice: basePrice,
        childPrice: meta.childPrice,
      });

  return (
    <div className="p-7 border shrink-0 sticky top-10 border-[#E7E6E6] rounded-[12px] text-[#333333] h-max shadow-[0px_10px_40px_0px_#000000]/5">
      <h6 className="text-sm">
        {isAgency && priceTiers.length && !matchedTier ? "From " : "Estimated cost "}
        <strong className="text-lg">
          {sym}{formatNumber(headlinePrice)}{" "}
        </strong>
        /per person
      </h6>
      {isAgency && (
        <div className="mt-1 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#0a0a0a] bg-[#FEF3C7] border border-[#FDE68A] rounded-full px-2 py-[2px]">
          Tour-operator price ({(tourdetail?.currency || "").toUpperCase() || "THB"})
          {matchedTier && (
            <span> · {matchedTier.minPax}–{matchedTier.maxPax} pax tier</span>
          )}
        </div>
      )}
      <span className="text-xs block mt-1">
        *Please note that prices may vary based on circumstances.
      </span>
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="border border-[#DDDDDD] rounded-[12px] p-[10px] flex gap-[10px] my-4 w-full text-left hover:border-[#BD3E2B] transition-colors cursor-pointer"
          >
            <div className="w-[50px] aspect-square rounded-[12px] bg-[#F5F5F5] grid place-content-center">
              <Image src={calendar2} alt="" width={30} height={30} />
            </div>
            <div className="flex flex-col justify-center">
              <h6 className="text-base font-medium">Availability</h6>
              <span className="text-sm font-normal text-[#319E8B]">
                {booking.startDate
                  ? new Date(booking.startDate * 1000).toLocaleDateString(
                      "en-US",
                      { weekday: "short", month: "short", day: "numeric", year: "numeric" }
                    )
                  : "Flexible dates available"}
              </span>
            </div>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={
              booking.startDate ? new Date(booking.startDate * 1000) : undefined
            }
            onSelect={(d) => {
              if (!d) return;
              const ts = Math.floor(d.getTime() / 1000);
              setBooking((prev) => ({
                ...prev,
                startDate: ts,
                visitTime: ts,
              }));
            }}
            disabled={(date) => {
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              if (date < today) return true;
              const disabledWeekdays = [0, 1, 2, 3, 4, 5, 6].filter(
                (d) => !meta.availableWeekdays.includes(d)
              );
              if (disabledWeekdays.includes(date.getDay())) return true;
              return false;
            }}
            captionLayout="dropdown"
          />
        </PopoverContent>
      </Popover>
      <h6 className="text-lg font-medium">Tickets</h6>
      <div className="flex flex-col gap-4 my-[24px]">
        <div className="flex items-center ">
          <span className="text-sm min-w-[150px]">Adult (12+ years)</span>
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
          <span className="text-sm min-w-[150px]">Child (3-11 years)</span>
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
          <span className="text-sm min-w-[150px]">Infant (0-3 years)</span>
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
          {sym}{formatNumber(total)}
        </h6>
      </div>
      {meta.childPrice !== undefined && !isAgency && (
        <p className="text-xs text-[#585858] -mt-3 mb-3">
          Child price: ${formatNumber(meta.childPrice)} per child
        </p>
      )}

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
            <FormBooking
              booking={booking}
              setBooking={setBooking}
              availableWeekdays={meta.availableWeekdays}
            />
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
