import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";
import FormSignUp from "./_components/form-signup";

const page = () => {
  return (
    <>
      <div className="w-full h-[800px] lg:h-screen bg-[#FFF3E1] flex items-center relative p-4">
        <div className="max-w-lg bg-white h-max w-full z-20 mx-auto p-16 rounded-2xl flex flex-col gap-12">
          <FormSignUp />
        </div>
      </div>
    </>
  );
};

export default page;
