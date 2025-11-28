"use client";
import { Globe, Heart, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Cookies from "js-cookie";

import { useRouter } from "next/navigation";

import profile from "@/assets/icons/menu/profile.png";
import logouticon from "@/assets/icons/menu/logout.png";
import past from "@/assets/icons/menu/past.png";
import setting from "@/assets/icons/menu/setting.png";
import tour from "@/assets/icons/menu/tour.png";
import wishlist from "@/assets/icons/menu/wishlist.png";
import { useProfile } from "@/hooks/useProfile";

const LinkList = [
  { link: "Home", path: "/" },
  { link: "About", path: "/about" },
  { link: "Tours", path: "/tours" },
  { link: "Destinations", path: "/destinations" },
  { link: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authStatus, setAuthStatus] = useState<string | null>(null);
  const { logout } = useProfile();
  const router = useRouter();

  useEffect(() => {
    // อ่าน cookie ตอน component mount
    const status = Cookies.get("authStatus");
    setAuthStatus(status as string);

    // ถ้าต้องการฟังการเปลี่ยนแปลง cookie ก็สามารถใช้ interval หรือ event listener
    const interval = setInterval(() => {
      const updatedStatus = Cookies.get("authStatus");
      if (updatedStatus !== authStatus) {
        setAuthStatus(updatedStatus as string);
      }
    }, 1000); // ตรวจทุก 1 วินาที (สามารถปรับลด)

    return () => clearInterval(interval);
  }, [authStatus]);
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
        <Link
          href={"mailto:enquiry@fantasiaasia.com"}
          className="font-semibold"
        >
          Become an Agency
        </Link>
        <Globe size={18} />
        <div className="px-3 py-2 cursor-pointer rounded-full border border-[#EBEBEB] flex items-center gap-2">
          <Heart color="#EBEBEB" size={20} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src="/user.jpg" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-72 mt-4 text-[#333333] p-6 flex flex-col"
              align="end"
            >
              {authStatus === "true" ? (
                <>
                  <DropdownMenuLabel className="font-bold text-xl">
                    Hello, User
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

                  {/* Logout */}
                  <DropdownMenuItem
                    onClick={logout}
                    className="cursor-pointer w-full h-full flex gap-2 items-center"
                  >
                    <Image src={logouticon} alt="" width={20} height={20} />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </>
              ) : (
                <div className="flex flex-col gap-4">
                  <Link
                    href={"/login"}
                    className="bg-[#BD3E2B] hover:bg-[#BD3E2B] text-white flex justify-center items-center h-12 rounded-full shadow-[0px_23px_40px_0_#DF695126]"
                  >
                    Log in
                  </Link>
                  <Link
                    href={"/signup"}
                    className="border-[#BD3E2B] border bg-white text-[#BD3E2B] flex justify-center items-center h-12 rounded-full shadow-[0px_23px_40px_0_#DF695126]"
                  >
                    Sign up
                  </Link>
                </div>
              )}
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

          {authStatus === "true" ? (
            <div className="flex flex-col gap-3 mt-4 border-t pt-4">
              {[
                { href: "/profile", icon: profile, label: "My Profile" },
                { href: "/profile/tour", icon: tour, label: "Tours" },
                { href: "/profile/pasttour", icon: past, label: "Past Tours" },
                {
                  href: "/profile/wishlist",
                  icon: wishlist,
                  label: "Wishlist",
                },
                {
                  href: "/profile/accountsetting",
                  icon: setting,
                  label: "Account Setting",
                },
              ].map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  className="flex items-center gap-2"
                  onClick={() => setMobileMenuOpen(false)} // ✅ ปิดเมนูทุกครั้ง
                >
                  <Image src={item.icon} alt="" width={20} height={20} />
                  {item.label}
                </Link>
              ))}

              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false); // ✅ ปิดเมนูตอน logout ด้วย
                }}
                className="flex items-center gap-2 text-left"
              >
                <Image src={logouticon} alt="" width={20} height={20} />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4 mt-4 border-t pt-4">
              <Link
                href={"/login"}
                className="bg-[#BD3E2B] hover:bg-[#BD3E2B] text-white flex justify-center items-center h-12 rounded-full shadow-[0px_23px_40px_0_#DF695126]"
                onClick={() => setMobileMenuOpen(false)} // ✅ ปิดด้วย
              >
                Log in
              </Link>
              <Link
                href={"/signup"}
                className="border-[#BD3E2B] border bg-white text-[#BD3E2B] flex justify-center items-center h-12 rounded-full shadow-[0px_23px_40px_0_#DF695126]"
                onClick={() => setMobileMenuOpen(false)} // ✅ ปิดด้วย
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
