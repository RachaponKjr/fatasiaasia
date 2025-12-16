"use client";
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
import { countries } from "@/lib/countries";
import { languages } from "@/lib/languages";

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
      toast.error("No data to update!", { className: "!text-red-500" });
      return;
    }
    try {
      const update = await api.user.updateProfile({ payload: editUser });
      if (update.code != 2000) {
        toast.error("Update failed!", { className: "!text-red-500" });
        return;
      }
      toast.success("Profile updated successfully!", { className: "!text-green-500" });
      await refresh();
      router.refresh();
      return;
    } catch (err) {
      console.error(err);
      toast.error("An error occurred. Please try again.", { className: "!text-red-500" });
    }
  };

  const handleChange = (field: keyof Profile, value: string) => {
    setEditUser((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  if (!editUser) return <p>Loading...</p>;

  return (
    <form onSubmit={updateProfile} className="flex flex-col gap-8">
      {/* First Name */}
      <div className="flex flex-col gap-3 w-full">
        <label className="text-lg font-normal text-[#1A1A1A]">First Name</label>
        <div className="flex gap-8 items-center">
          <Input
            name="firstName"
            value={editUser.firstName || ""}
            onChange={(e) => handleChange("firstName", e.target.value)}
            placeholder="Enter your first name"
            className="max-w-md h-[50px] rounded-[12px] border border-[#B2B2B2]"
          />
        </div>
      </div>

      {/* Last Name */}
      <div className="flex flex-col gap-3 w-full">
        <label className="text-lg font-normal text-[#1A1A1A]">Last Name</label>
        <div className="flex gap-8 items-center">
          <Input
            name="lastName"
            value={editUser.lastName || ""}
            onChange={(e) => handleChange("lastName", e.target.value)}
            placeholder="Enter your last name"
            className="max-w-md h-[50px] rounded-[12px] border border-[#B2B2B2]"
          />
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-3 w-full">
        <label className="text-lg font-normal text-[#1A1A1A]">
          Email address
        </label>
        <div className="flex gap-8 items-center">
          <Input
            disabled
            name="email"
            value={editUser.email || ""}
            onChange={(e) => handleChange("email", e.target.value)}
            className="max-w-md h-[50px] rounded-[12px] border border-[#B2B2B2] bg-gray-50"
          />
          <span className="text-sm text-gray-500">Email cannot be changed</span>
        </div>
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-3 w-full">
        <label className="text-lg font-normal text-[#1A1A1A]">
          Phone number
        </label>
        <div className="flex gap-8 items-center">
          <Input
            name="phoneNumber"
            value={editUser.phoneNumber || ""}
            onChange={(e) => handleChange("phoneNumber", e.target.value)}
            placeholder="+1 234 567 8900"
            className="max-w-md h-[50px] rounded-[12px] border border-[#B2B2B2]"
          />
        </div>
      </div>

      {/* Language */}
      <div className="flex flex-col gap-3 w-full">
        <label className="text-lg font-normal text-[#1A1A1A]">Language</label>
        <div className="flex gap-8 max-w-md w-full items-center">
          <Select
            value={editUser.language || ""}
            onValueChange={(val) => handleChange("language", val)}
          >
            <SelectTrigger className="w-full !h-[50px] rounded-[12px] border border-[#B2B2B2]">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px] overflow-y-auto">
              {languages.sort().map((lang) => (
                <SelectItem key={lang} value={lang}>
                  {lang}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Country */}
      <div className="flex flex-col gap-3 w-full">
        <label className="text-lg font-normal text-[#1A1A1A]">Country</label>
        <div className="flex gap-8 max-w-md w-full items-center">
          <Select
            value={editUser.country || ""}
            onValueChange={(val) => handleChange("country", val)}
          >
            <SelectTrigger className="w-full !h-[50px] rounded-[12px] border border-[#B2B2B2]">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px] overflow-y-auto">
              {countries.sort().map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Timezone */}
      <div className="flex flex-col gap-3 w-full">
        <label className="text-lg font-normal text-[#1A1A1A]">Time Zone</label>
        <div className="flex gap-8 max-w-md w-full items-center">
          <Select
            value={editUser.timezone || ""}
            onValueChange={(val) => handleChange("timezone", val)}
          >
            <SelectTrigger className="w-full !h-[50px] rounded-[12px] border border-[#B2B2B2]">
              <SelectValue placeholder="Select timezone" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px] overflow-y-auto">
              <SelectItem value="Asia/Bangkok">Asia/Bangkok (UTC+7)</SelectItem>
              <SelectItem value="UTC">UTC (UTC+0)</SelectItem>
              <SelectItem value="America/New_York">America/New York (UTC-5)</SelectItem>
              <SelectItem value="America/Los_Angeles">America/Los Angeles (UTC-8)</SelectItem>
              <SelectItem value="Europe/London">Europe/London (UTC+0)</SelectItem>
              <SelectItem value="Europe/Paris">Europe/Paris (UTC+1)</SelectItem>
              <SelectItem value="Asia/Tokyo">Asia/Tokyo (UTC+9)</SelectItem>
              <SelectItem value="Asia/Shanghai">Asia/Shanghai (UTC+8)</SelectItem>
              <SelectItem value="Australia/Sydney">Australia/Sydney (UTC+11)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
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
