import RemoveIcon from "@/assets/icons/remove";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import React from "react";

import setting from "@/assets/icons/menu/setting.png";
import FormProfile from "./_components/form-profile";

const page = () => {
  return (
    <div className="container mx-auto max-w-7xl py-[72px] flex flex-col gap-14">
      <div className="flex flex-col gap-10">
        <div className="flex gap-2 items-center">
          <Image src={setting} alt="" width={40} height={40} />
          <h5 className="text-4xl font-bold text-[#333333]">Account Setting</h5>
        </div>
      </div>
      <div className="flex flex-col gap-8 max-w-3xl">
        <div className="flex items-center gap-9">
          <Avatar className="size-[120px]">
            <AvatarFallback>M</AvatarFallback>
          </Avatar>
          <div className="text-[#333333] flex gap-3 items-center">
            <Badge className="bg-[#EFEFEF] text-lg font-light rounded-full text-[#333333] px-4">
              Update
            </Badge>
            <div className="flex gap-1 text-lg cursor-pointer">
              <RemoveIcon size={24} />
              <span className="font-normal text-lg">Remove</span>
            </div>
          </div>
        </div>
        <FormProfile />
      </div>
    </div>
  );
};

export default page;
