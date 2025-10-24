"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import React from "react";

import profile from "@/assets/icons/menu/profile.png";
import { useProfile } from "@/hooks/useProfile";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Profile = () => {
  const { user, refresh } = useProfile();
  const router = useRouter();

  // if (!user) {
  //   router.push("/login");
  // }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex gap-2 items-center">
        <Image src={profile} alt="" width={40} height={40} />
        <h5 className="text-4xl font-bold text-[#333333]">Profile</h5>
      </div>
      <div className="flex flex-col md:flex-row gap-10 items-center">
        <Avatar className=" size-[170px]">
          <AvatarFallback>M</AvatarFallback>
        </Avatar>
        <div className="text-[#333333] flex flex-col gap-2">
          <div className="flex items-center gap-10">
            <h6 className="text-4xl font-bold">
              Hello, {user ? user?.name : "Your name"}
            </h6>
            <Link
              href={"/profile/accountsetting"}
              className="bg-[#EFEFEF] cursor-pointer hover:bg-[#EFEFEF] text-[#333333] rounded-full px-6"
            >
              Edit
            </Link>
          </div>
          <span className="text-2xl font-light">{user?.email}</span>
          <div>
            <span className="text-[#33333]/50 text-2xl font-light">
              {user?.timezone}, {user?.country}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
