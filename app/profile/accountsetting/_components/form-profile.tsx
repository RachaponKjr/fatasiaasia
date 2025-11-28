"use client";
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
import { useProfile } from "@/hooks/useProfile";
import { Profile, ProfileEdit } from "@/types/profile.type";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import api from "@/server";
import { toast } from "sonner";

const FormProfile = () => {
  const router = useRouter();
  const { user, refresh } = useProfile();
  const [editUser, setEditUser] = useState<ProfileEdit | null>(null);

  // sync user -> editUser
  useEffect(() => {
    if (user) setEditUser(user);
  }, [user]);

  const updateProfile = async (e: FormEvent) => {
    e.preventDefault();
    if (!editUser) {
      toast.error("ไม่พบข้อมูล Update!", { className: "!text-red-500" });
      return;
    }
    try {
      const update = await api.user.updateProfile({ payload: editUser });
      if (update.code != 2000) {
        toast.error("อัพเดทไม่สำเร็จ!", { className: "!text-red-500" });
        return;
      }
      toast.success("อัพเดทสำเร็จ!", { className: "!text-green-500" });
      router.refresh();
      return;
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (field: keyof Profile, value: string) => {
    setEditUser((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  if (!editUser) return <p>Loading...</p>;

  return (
    <form onSubmit={updateProfile} className="flex flex-col gap-8">
      {/* Name */}
      <div className="flex flex-col gap-3 w-full">
        <label className="text-lg font-normal text-[#1A1A1A] ">FirstName</label>
        <div className="flex gap-8 items-center">
          <Input
            disabled
            name="firstName"
            value={editUser.firstName || ""}
            onChange={(e) => handleChange("firstName", e.target.value)}
            className="max-w-md h-[50px] rounded-[12px] border border-[#B2B2B2]"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3 w-full">
        <label className="text-lg font-normal text-[#1A1A1A] ">LastName</label>
        <div className="flex gap-8 items-center">
          <Input
            disabled
            name="lastName"
            value={editUser.lastName || ""}
            onChange={(e) => handleChange("lastName", e.target.value)}
            className="max-w-md h-[50px] rounded-[12px] border border-[#B2B2B2]"
          />
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-3 w-full">
        <label className="text-lg font-normal text-[#1A1A1A] ">
          Email address
        </label>
        <div className="flex gap-8 items-center">
          <Input
            disabled
            name="email"
            value={editUser.email || ""}
            onChange={(e) => handleChange("email", e.target.value)}
            className="max-w-md h-[50px] rounded-[12px] border border-[#B2B2B2]"
          />
        </div>
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-3 w-full">
        <label className="text-lg font-normal text-[#1A1A1A] ">
          Phone number
        </label>
        <div className="flex gap-8 items-center">
          <Input
            name="phoneNumber"
            value={editUser.phoneNumber || ""}
            onChange={(e) => handleChange("phoneNumber", e.target.value)}
            className="max-w-md h-[50px] rounded-[12px] border border-[#B2B2B2]"
          />
        </div>
      </div>

      {/* Language */}
      <div className="flex flex-col gap-3 w-full">
        <label className="text-lg font-normal text-[#1A1A1A] ">Language</label>
        <div className="flex gap-8 max-w-md w-full items-center">
          <Select
            value={editUser.language || ""}
            onValueChange={(val) => handleChange("language", val)}
          >
            <SelectTrigger className="w-full !h-[50px] rounded-[12px] border border-[#B2B2B2]">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Thai">Thai</SelectItem>
              <SelectItem value="Eng">Eng</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Country */}
      <div className="flex flex-col gap-3 w-full">
        <label className="text-lg font-normal text-[#1A1A1A] ">Country</label>
        <div className="flex gap-8 max-w-md w-full items-center">
          <Select
            value={editUser.country || ""}
            onValueChange={(val) => handleChange("country", val)}
          >
            <SelectTrigger className="w-full !h-[50px] rounded-[12px] border border-[#B2B2B2]">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Thailand">Thailand</SelectItem>
              <SelectItem value="England">England</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Timezone */}
      <div className="flex flex-col gap-3 w-full">
        <label className="text-lg font-normal text-[#1A1A1A] ">Time Zone</label>
        <div className="flex gap-8 max-w-md w-full items-center">
          <Select
            value={editUser.timezone || ""}
            onValueChange={(val) => handleChange("timezone", val)}
          >
            <SelectTrigger className="w-full !h-[50px] rounded-[12px] border border-[#B2B2B2]">
              <SelectValue placeholder="Select timezone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Asia/Bangkok">Asia/Bangkok</SelectItem>
              <SelectItem value="UTC">UTC</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button
            type="submit"
            className="text-[#FFFFFF] bg-[#4992E1] cursor-pointer hover:bg-[#357acc] rounded-full !py-6 px-6 font-bold"
          >
            Save Changes
          </Button>
          <Button
            type="button"
            onClick={router.back}
            className="text-[#1A1A1A] bg-transparent cursor-pointer hover:bg-gray-100 rounded-full !py-6 px-6 font-normal border border-[#1A1A1A]"
          >
            Cancel
          </Button>
        </div>
        <Button
          type="button"
          className="text-[#ED021A] bg-[#FEE9EE] cursor-pointer hover:bg-[#FDD6DE] rounded-full !py-6 px-6 font-normal"
        >
          Delete Account
        </Button>
      </div>
    </form>
  );
};

export default FormProfile;
