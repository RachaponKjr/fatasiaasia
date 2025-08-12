import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import React from "react";

const Profile = () => {
  return (
    <div className="flex flex-col gap-10">
      <h5 className="text-4xl font-bold text-[#333333]">Profile</h5>
      <div className="flex gap-10 items-center">
        <Avatar className=" size-[170px]">
          <AvatarFallback>M</AvatarFallback>
        </Avatar>
        <div className="text-[#333333] flex flex-col gap-2">
          <div className="flex items-center gap-10">
            <h6 className="text-4xl font-bold">Hello, Your name</h6>
            <Button size={"sm"} className="bg-[#EFEFEF] cursor-pointer hover:bg-[#EFEFEF] text-[#333333] rounded-full px-6">
              Edit
            </Button>
          </div>
          <span className="text-2xl font-light">Yourname@gmail.com</span>
          <div>
            <span className="text-[#33333]/50 text-2xl font-light">
              Bangkok, Thailand
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
