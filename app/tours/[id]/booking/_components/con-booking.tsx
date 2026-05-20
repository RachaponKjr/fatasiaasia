import { Button } from "@/components/ui/button";
import React, { Dispatch, SetStateAction, useState } from "react";
import imagetest from "@/assets/imagetest.webp";
import Image from "next/image";
import { TourDetail } from "@/types/tour.type";
import api from "@/server";
import { useBooking } from "@/store/booking-store";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import AuthDialog from "@/components/auth-dialog";

type Props = {
  setStep?: Dispatch<SetStateAction<number>>;
  tourDetail: TourDetail;
};

const ConBooking = ({ setStep, tourDetail }: Props) => {
  const { booking } = useBooking();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  // Auth dialog state — opened when the booking API returns an auth error.
  // After a successful login or signup we auto-retry the booking so the
  // customer doesn't have to re-fill the form.
  const [authDialogOpen, setAuthDialogOpen] = useState(false);

  const validateBooking = () => {
    const errors: string[] = [];

    const todayMidnight = (() => {
      const d = new Date();
      d.setHours(0, 0, 0, 0);
      return Math.floor(d.getTime() / 1000);
    })();

    if (!booking.startDate || booking.startDate === 0) {
      errors.push("Please select a visit date");
    } else if (booking.startDate < todayMidnight) {
      errors.push(
        "Please pick a future date — the selected date has already passed"
      );
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

  // performBookingRequest fires the actual API call. Split out so the
  // post-auth retry path can call it without re-running validation.
  const performBookingRequest = async (): Promise<"ok" | "auth" | "error"> => {
    const bookingPayload = {
      ...booking,
      visitTime: booking.visitTime || Date.now(),
    };
    try {
      const bookingRes = await api.booking.booking({
        tourId: tourDetail.tourId,
        payload: bookingPayload,
      });

      if (bookingRes.code === 2000) {
        toast.success("Booking submitted! Awaiting confirmation.");
        const newId = bookingRes.data?.bookingId;
        if (newId) {
          router.push(`/profile/booking/${newId}`);
        } else {
          setStep?.(4);
        }
        return "ok";
      }
      if (
        bookingRes.code === 401 ||
        bookingRes.code === 4001 ||
        bookingRes.code === 4010
      ) {
        return "auth";
      }
      toast.error(
        bookingRes.message || "Failed to submit booking. Please try again.",
        { className: "!text-red-500" }
      );
      return "error";
    } catch (err) {
      console.error("Booking error:", err);
      toast.error("An error occurred. Please try again.", {
        className: "!text-red-500",
      });
      return "error";
    }
  };

  const submitBooking = async () => {
    if (submitting) return;
    // Validate first
    const validationErrors = validateBooking();
    if (validationErrors.length > 0) {
      toast.error(validationErrors[0], {
        className: "!text-red-500",
      });
      return;
    }

    setSubmitting(true);
    const result = await performBookingRequest();
    if (result === "auth") {
      // Not logged in — open the in-page auth dialog instead of redirecting
      // away so the booking form stays filled.
      setAuthDialogOpen(true);
    }
    setSubmitting(false);
  };

  // Called once the customer finishes login or signup inside the dialog —
  // immediately retry the booking submit so they don't have to re-click.
  const handleAuthenticated = async () => {
    setSubmitting(true);
    const result = await performBookingRequest();
    if (result === "auth") {
      // Still unauthorised somehow (token didn't take). Surface the prompt
      // again rather than silently failing.
      toast.error("Still not authenticated — please try logging in again.", {
        className: "!text-red-500",
      });
      setAuthDialogOpen(true);
    }
    setSubmitting(false);
  };

  return (
    <>
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
          disabled={submitting}
          className="bg-[#EFEFEF] flex-1 hover:bg-[#EFEFEF] text-xl font-bold cursor-pointer lg:w-[160px] h-[60px] rounded-full text-[#333333] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          Back
        </Button>
        <Button
          onClick={submitBooking}
          disabled={submitting}
          className="bg-[#BD3E2B] flex-1 hover:bg-[#BD3E2B] text-xl font-bold cursor-pointer lg:w-[473px] h-[60px] rounded-full text-white disabled:opacity-70 disabled:cursor-wait"
        >
          {submitting ? (
            <span className="inline-flex items-center gap-2">
              <span
                className="inline-block w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"
                aria-hidden="true"
              />
              Submitting…
            </span>
          ) : (
            "Submit Booking"
          )}
        </Button>
      </div>
    </div>
    <AuthDialog
      open={authDialogOpen}
      onOpenChange={setAuthDialogOpen}
      onAuthenticated={handleAuthenticated}
      reason="to complete your booking"
    />
    </>
  );
};

export default ConBooking;
