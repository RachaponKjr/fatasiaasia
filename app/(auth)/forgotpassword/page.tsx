import Image from "next/image";
import React from "react";

import keyforgot from "@/assets/images/keyforgot.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const page = () => {
  return (
    <div className="w-full h-screen bg-[#FFF3E1] flex items-center  relative">
      <div className="max-w-lg bg-white h-max w-full z-20 mx-auto p-16 rounded-2xl flex flex-col items-center gap-12">
        <Image src={keyforgot} alt="" width={170} height={170} />
        <div className="text-center flex flex-col gap-4 leading-none">
          <h5 className="font-bold text-[40px]">Forgot Password</h5>
          <span className="text-xs">
            No worries, we'll send you reset instructions.
          </span>
        </div>
        <div className="flex flex-col gap-4 items-stretch w-full">
          <Input
            placeholder="Email Address"
            className="bg-[#F2F2F2] h-[48px]"
          />
          <Button
            size={"lg"}
            className="bg-[#BD3E2B] hover:bg-[#BD3E2B] font-bold cursor-pointer w-full"
          >
            Request a reset link
          </Button>
        </div>
        <div className="flex gap-2 text-sm">
          <span>Back to</span>
          <Link href={"/login"} className="text-[#007AFF] cursor-pointer">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
