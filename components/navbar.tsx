"use client";
import { Globe, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const LinkList = [
  {
    link: "Home",
    path: "/",
  },
  {
    link: "About",
    path: "/about",
  },
  {
    link: "Tours",
    path: "/tours",
  },
  {
    link: "Destinations",
    path: "/destinations",
  },
  {
    link: "Contact",
    path: "/contact",
  },
];

const Navbar = () => {
  return (
    <div className="flex flex-row items-center container mx-auto py-6 z-10">
      <div className="flex-1">
        <Image src={"/logo.png"} alt="logo-webside" width={200} height={200} />
      </div>
      <div className="flex-1 flex gap-14">
        {LinkList.map((path, index) => (
          <Link key={index} href={path.path} className="font-medium text-lg">
            {path.link}
          </Link>
        ))}
      </div>
      <div className="flex-1 flex justify-end items-center gap-4 ">
        <span className="font-semibold">Become an Agency</span>
        <Globe size={18} />
        <div className="px-3 py-2 cursor-pointer rounded-full border border-[#EBEBEB] flex items-center gap-2">
          <Heart color="#EBEBEB" size={20} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-64 mt-4 text-[#333333] p-6 flex flex-col"
              align="end"
            >
              <DropdownMenuLabel className="font-bold text-xl">
                Hello, Your name
              </DropdownMenuLabel>
              <DropdownMenuItem>
                <Link href={"/profile"} className="w-full h-full">
                  My Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={"/profile/tour"} className="w-full h-full">
                  Tours
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={"/profile/pasttour"} className="w-full h-full">
                  Past Tours
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={"/profile/wishlist"} className="w-full h-full">
                  Wishlist
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href={"/profile/accountsetting"}
                  className="w-full h-full"
                >
                  Account Setting
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={"###"} className="w-full h-full">
                  Logout
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
