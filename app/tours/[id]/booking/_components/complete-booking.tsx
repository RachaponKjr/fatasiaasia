import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const CompleteBooking = () => {
  const router = useRouter();
  return (
    <div className="col-span-2 flex flex-col gap-8 items-center">
      <svg
        width="93"
        height="92"
        viewBox="0 0 93 92"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clip-rule="evenodd"
          d="M46.5013 0.166687C21.1888 0.166687 0.667969 20.6875 0.667969 46C0.667969 71.3125 21.1888 91.8334 46.5013 91.8334C71.8138 91.8334 92.3346 71.3125 92.3346 46C92.3346 20.6875 71.8138 0.166687 46.5013 0.166687ZM66.368 38.25C66.7338 37.8319 67.0123 37.3448 67.1871 36.8174C67.3619 36.29 67.4294 35.733 67.3858 35.1791C67.3421 34.6252 67.1881 34.0857 66.9329 33.5922C66.6776 33.0987 66.3262 32.6613 65.8994 32.3056C65.4726 31.9499 64.979 31.6832 64.4475 31.5211C63.9161 31.359 63.3576 31.3049 62.805 31.3618C62.2523 31.4187 61.7166 31.5856 61.2294 31.8527C60.7422 32.1197 60.3133 32.4815 59.968 32.9167L42.0513 54.4125L32.7805 45.1375C31.9946 44.3785 30.9421 43.9585 29.8496 43.968C28.7571 43.9775 27.7121 44.4157 26.9396 45.1883C26.167 45.9608 25.7288 47.0059 25.7193 48.0983C25.7098 49.1908 26.1298 50.2433 26.8888 51.0292L39.3888 63.5292C39.7982 63.9383 40.2884 64.2577 40.828 64.4669C41.3677 64.6762 41.945 64.7707 42.5233 64.7444C43.1015 64.7181 43.6679 64.5717 44.1863 64.3144C44.7048 64.0571 45.164 63.6946 45.5346 63.25L66.368 38.25Z"
          fill="#BD3E2B"
        />
      </svg>
      <div className="flex flex-col items-center gap-2">
        <h4 className="font-bold text-[32px] text-black">
          Your Order is complete!
        </h4>
        <span className="font-normal text-xl text-[#333333]">
          You will be receiving a confirmation email with order details.
        </span>
      </div>
      <Button
        onClick={() => router.push("/profile/tour")}
        className="font-semibold cursor-pointer text-[#BD3E2B] text-xl border border-[#BD3E2B] rounded-full bg-transparent hover:bg-transparent h-[60px] w-[280px]"
      >
        Go to Your Tours
      </Button>
    </div>
  );
};

export default CompleteBooking;
