import InputWithLabel from "@/components/input-with-lable";
import { Button } from "@/components/ui/button";
import React from "react";

const InfoUser = () => {
  return (
    <div className="flex flex-col justify-around">
      <div className="flex flex-col gap-4">
        <h5 className=" font-semibold text-[#333333] text-2xl">
          Who shall we send these tickets to?
        </h5>
        <div className="grid grid-cols-2 gap-[55px]">
          <InputWithLabel
            id={"name"}
            className="h-[70px]"
            placeholder="Enter your name "
            label="Name"
          />
          <InputWithLabel
            id={"surname"}
            className="h-[70px]"
            placeholder="Enter your surname"
            label="Surname"
          />
          <InputWithLabel
            id={"telephone"}
            className="h-[70px]"
            placeholder="Enter your telephone number"
            label="Telephone Number"
          />
          <InputWithLabel
            id={"email"}
            className="h-[70px]"
            placeholder="Enter your email address"
            label="Email"
          />
          <InputWithLabel
            id={"address"}
            className="col-span-2 h-[70px]"
            placeholder="Enter your telephone number"
            label="Address"
          />
        </div>
      </div>
      <Button className="bg-[#EFEFEF] hover:bg-[#EFEFEF] text-xl font-bold cursor-pointer w-[160px] h-[60px] rounded-full text-[#333333]">
        Back
      </Button>
    </div>
  );
};

export default InfoUser;
