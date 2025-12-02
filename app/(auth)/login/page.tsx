import React from "react";
import FormLogin from "./_components/form-login";

const page = () => {
  return (
    <>
      <div className="w-full h-[800px] lg:h-screen bg-[#FFF3E1] flex items-center relative p-4">
        <div className="max-w-lg bg-white h-max w-full z-20 mx-auto p-16 rounded-2xl flex flex-col gap-12">
          <span className="font-semibold text-[28px] text-center">Login</span>
          <FormLogin />
        </div>
      </div>
    </>
  );
};

export default page;
