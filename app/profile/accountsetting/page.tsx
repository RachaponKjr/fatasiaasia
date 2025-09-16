import RemoveIcon from "@/assets/icons/remove";
import InputWithLabel from "@/components/input-with-lable";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import React from "react";

import setting from "@/assets/icons/menu/setting.png";

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
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3 w-full">
            <label className="text-lg font-normal text-[#1A1A1A] ">Name</label>
            <div className="flex gap-8 items-center">
              <Input className="max-w-md h-[50px] rounded-[12px] border border-[#B2B2B2]" />
              <Badge className="bg-[#EFEFEF] text-[#333333] text-xl font-light px-8  rounded-full cursor-pointer">
                Edit
              </Badge>
            </div>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <label className="text-lg font-normal text-[#1A1A1A] ">
              Email address
            </label>
            <div className="flex gap-8 items-center">
              <Input className="max-w-md h-[50px] rounded-[12px] border border-[#B2B2B2]" />
              <Badge className="bg-[#EFEFEF] text-[#333333] text-xl font-light px-8  rounded-full cursor-pointer">
                Edit
              </Badge>
            </div>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <label className="text-lg font-normal text-[#1A1A1A] ">
              Phone number
            </label>
            <div className="flex gap-8 items-center">
              <Input className="max-w-md h-[50px] rounded-[12px] border border-[#B2B2B2]" />
              <Badge className="bg-[#EFEFEF] text-[#333333] text-xl font-light px-8  rounded-full cursor-pointer">
                Edit
              </Badge>
            </div>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <label className="text-lg font-normal text-[#1A1A1A] ">
              Language
            </label>
            <div className="flex gap-8 max-w-md w-full items-center">
              <Select>
                <SelectTrigger className="w-full !h-[50px] rounded-[12px] border border-[#B2B2B2]">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <label className="text-lg font-normal text-[#1A1A1A] ">
              Birthday
            </label>
            <div className="flex gap-8 max-w-md w-full items-center">
              <Select>
                <SelectTrigger className="w-1/2 !h-[50px] rounded-[12px] border border-[#B2B2B2]">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <label className="text-lg font-normal text-[#1A1A1A] ">
              Country
            </label>
            <div className="flex gap-8 max-w-md w-full items-center">
              <Select>
                <SelectTrigger className="w-full !h-[50px] rounded-[12px] border border-[#B2B2B2]">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <label className="text-lg font-normal text-[#1A1A1A] ">
              Time Zone
            </label>
            <div className="flex gap-8 max-w-md w-full items-center">
              <Select>
                <SelectTrigger className="w-full !h-[50px] rounded-[12px] border border-[#B2B2B2]">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-2">
              <Button className="text-[#FFFFFF] bg-[#4992E1] cursor-pointer hover:bg-[##4992E1] rounded-full !py-6 px-6 font-bold">
                Save Changes
              </Button>
              <Button className="text-[#1A1A1A] bg-transparent cursor-pointer hover:bg-transparent rounded-full !py-6 px-6 font-normal border border-[#1A1A1A]">
                Cancel
              </Button>
            </div>
            <Button className="text-[#ED021A] bg-[#FEE9EE] cursor-pointer hover:bg-[#FEE9EE] rounded-full !py-6 px-6 font-normal">
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
