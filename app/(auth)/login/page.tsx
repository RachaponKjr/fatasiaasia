import React from "react";
import FormLogin from "./_components/form-login";

const page = () => {
  return (
    <>
      <div className="w-full min-h-screen bg-[#FFF3E1] flex items-center relative px-4 py-8">
        <div className="max-w-lg bg-white h-max w-full z-20 mx-auto p-5 sm:p-10 lg:p-16 rounded-2xl flex flex-col gap-8 lg:gap-12">
          <span className="font-semibold text-[28px] text-center">Login</span>
          <FormLogin />
        </div>
      </div>
    </>
  );
};

export default page;
