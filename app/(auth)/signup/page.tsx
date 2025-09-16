import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <>
      <div className="w-full h-screen bg-[#FFF3E1] flex items-center relative">
        <div className="max-w-lg bg-white h-max w-full z-20 mx-auto p-16 rounded-2xl flex flex-col gap-12">
          <span className="font-semibold text-[28px] text-center">Sign up</span>
          <div className="flex flex-col gap-4 [&>input]:bg-[#F2F2F2] [&>input]:h-12 [&>input]:rounded-[6px] [&>input]:border-[#E5E5E5]">
            <Input placeholder="Enter your name" />
            <Input placeholder="Enter your email" />
            <Input type="password" placeholder="Create password" />
            <Input type="password" placeholder="Confirm password" />
            <Button
              size={"lg"}
              className="bg-[#BD3E2B] hover:bg-[#BD3E2B] font-bold cursor-pointer"
            >
              Sign up
            </Button>
          </div>
          <p className="text-xs text-center">
            By logging in, you accept our{" "}
            <Link href={"#"} className="text-[#007AFF]">
              Terms of Use,
            </Link>
            <br /> and{" "}
            <Link href={"#"} className="text-[#007AFF]">
              Privacy & Cookies
            </Link>
            Statement.
          </p>
          <div className="text-xs justify-center flex gap-2">
            <span>Already have account?</span>
            <Link href={"#"} className="text-[#007AFF]">
              Log in here
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
