import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <>
      <div className="w-full h-screen bg-[#FFF3E1] flex items-center relative">
        <div className="max-w-lg bg-white h-max w-full z-20 mx-auto p-16 rounded-2xl flex flex-col gap-12">
          <span className="font-semibold text-[28px] text-center">Login</span>
          <div className="flex flex-col gap-4 [&>input]:bg-[#F2F2F2] [&>input]:h-12 [&>input]:rounded-[6px] [&>input]:border-[#E5E5E5]">
            <Input placeholder="Email or Username" />
            <Input placeholder="Enter password" type="password" />
            <div className="flex items-center justify-between text-xs font-medium my-4">
              <div className="flex items-center gap-2">
                <Switch className="" />
                <span>Remember me</span>
              </div>
              <Link
                href={"/forgotpassword"}
                className="text-[#007AFF] underline"
              >
                Forgot password?
              </Link>
            </div>
            <Button
              size={"lg"}
              className="bg-[#BD3E2B] hover:bg-[#BD3E2B] font-bold cursor-pointer"
            >
              Login
            </Button>
            <div className="w-full h-[1px] bg-neutral-100 my-4" />
            <div className="flex flex-col gap-3 items-center justify-center">
              <div className="flex gap-2 text-xs ">
                <span>Dont have an account?</span>
                <Link href={"/signup"} className="text-[#007AFF]">
                  Sign up here
                </Link>
              </div>
              <p className="text-[9px] text-center">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
