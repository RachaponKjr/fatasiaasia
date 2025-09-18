"use client";
import { Globe, Heart, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import profile from "@/assets/icons/menu/profile.png";
import logout from "@/assets/icons/menu/logout.png";
import past from "@/assets/icons/menu/past.png";
import setting from "@/assets/icons/menu/setting.png";
import tour from "@/assets/icons/menu/tour.png";
import wishlist from "@/assets/icons/menu/wishlist.png";
import { useRouter } from "next/navigation";

const LinkList = [
  { link: "Home", path: "/" },
  { link: "About", path: "/about" },
  { link: "Tours", path: "/tours" },
  { link: "Destinations", path: "/destinations" },
  { link: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="flex items-center container mx-auto px-4 md:px-0 py-6 z-50 relative">
      {/* Logo */}
      <div className="flex-1">
        <Image
          src={"/logo.png"}
          alt="logo-webside"
          width={200}
          height={200}
          className="cursor-pointer"
          onClick={() => router.push("/")}
        />
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex flex-1 gap-14">
        {LinkList.map((path, index) => (
          <Link key={index} href={path.path} className="font-medium text-lg">
            {path.link}
          </Link>
        ))}
      </div>

      {/* Right Section */}
      <div className="hidden md:flex flex-1 justify-end items-center gap-4">
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
                <Link
                  href={"/profile"}
                  className="w-full h-full flex gap-2 items-center"
                >
                  <Image src={profile} alt="" width={20} height={20} />
                  <span>My Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href={"/profile/tour"}
                  className="w-full h-full flex gap-2 items-center"
                >
                  <Image src={tour} alt="" width={20} height={20} />
                  <span>Tours</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href={"/profile/pasttour"}
                  className="w-full h-full flex gap-2 items-center"
                >
                  <Image src={past} alt="" width={20} height={20} />
                  <span>Past Tours</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href={"/profile/wishlist"}
                  className="w-full h-full flex gap-2 items-center"
                >
                  <Image src={wishlist} alt="" width={20} height={20} />
                  <span>Wishlist</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href={"/profile/accountsetting"}
                  className="w-full h-full flex gap-2 items-center"
                >
                  <Image src={setting} alt="" width={20} height={20} />
                  <span>Account Setting</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href={"###"}
                  className="w-full h-full flex gap-2 items-center"
                >
                  <Image src={logout} alt="" width={20} height={20} />
                  <span>Logout</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center gap-4">
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col md:hidden p-6 gap-4 z-20">
          {LinkList.map((path, index) => (
            <Link
              key={index}
              href={path.path}
              className="font-medium text-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              {path.link}
            </Link>
          ))}
          <div className="flex flex-col gap-3 mt-4 border-t pt-4">
            <Link href={"/profile"} className="flex items-center gap-2">
              <Image src={profile} alt="" width={20} height={20} />
              My Profile
            </Link>
            <Link href={"/profile/tour"} className="flex items-center gap-2">
              <Image src={tour} alt="" width={20} height={20} />
              Tours
            </Link>
            <Link
              href={"/profile/pasttour"}
              className="flex items-center gap-2"
            >
              <Image src={past} alt="" width={20} height={20} />
              Past Tours
            </Link>
            <Link
              href={"/profile/wishlist"}
              className="flex items-center gap-2"
            >
              <Image src={wishlist} alt="" width={20} height={20} />
              Wishlist
            </Link>
            <Link
              href={"/profile/accountsetting"}
              className="flex items-center gap-2"
            >
              <Image src={setting} alt="" width={20} height={20} />
              Account Setting
            </Link>
            <Link href={"###"} className="flex items-center gap-2">
              <Image src={logout} alt="" width={20} height={20} />
              Logout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
