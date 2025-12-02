import { Button } from "@/components/ui/button";
import React, { Dispatch, SetStateAction } from "react";
import imagetest from "@/assets/imagetest.jpg";
import Image from "next/image";
import { TourDetail } from "@/types/tour.type";
import api from "@/server";
import { useBooking } from "@/store/booking-store";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = {
  setStep?: Dispatch<SetStateAction<number>>;
  tourDetail: TourDetail;
};

const ConBooking = ({ setStep, tourDetail }: Props) => {
  const { booking } = useBooking();
  const router = useRouter();
  const submitBooking = async () => {
    try {
      const bookingRes = await api.booking.booking({
        tourId: tourDetail.tourId,
        payload: booking,
      });
      if (bookingRes.code === 2000) {
        setStep?.(4);
      } else {
        router.push("/login");
        toast.error("เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้ง", {
          className: "!text-red-500",
        });
      }
    } catch (err) {
      router.push("/login");
      toast.error("เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้ง", {
        className: "!text-red-500",
      });
      console.error(err);
    }
  };

  return (
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
              Durations : 7 Days 6 Nights
            </span>
          </div>
          <div>
            <span className="text-xs lg:text-lg">
              Start at 5 -14 Febuary 2025
            </span>
          </div>
          <div>
            <span className="text-xs lg:text-lg">
              Durations : 7 Days 6 Nights
            </span>
          </div>
          <div>
            <span className="text-xs lg:text-lg">3 Travellers</span>
          </div>
          <span className="text-xs lg:text-lg">
            You will be receiving a confirmation email with order details.
          </span>
        </div>
      </div>
      <div className="flex justify-between gap-4 mt-4 lg:mt-14">
        <Button
          onClick={() => setStep?.(2)}
          className="bg-[#EFEFEF] flex-1 hover:bg-[#EFEFEF] text-xl font-bold cursor-pointer lg:w-[160px] h-[60px] rounded-full text-[#333333]"
        >
          Back
        </Button>
        <Button
          onClick={submitBooking}
          className="bg-[#BD3E2B] flex-1 hover:bg-[#BD3E2B] text-xl font-bold cursor-pointer lg:w-[473px] h-[60px] rounded-full text-white"
        >
          Submit Booking
        </Button>
      </div>
    </div>
  );
};

export default ConBooking;
