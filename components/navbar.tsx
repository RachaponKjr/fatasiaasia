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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";

import { useRouter } from "next/navigation";

import profile from "@/assets/icons/menu/profile.png";
import logouticon from "@/assets/icons/menu/logout.png";
import past from "@/assets/icons/menu/past.png";
import setting from "@/assets/icons/menu/setting.png";
import tour from "@/assets/icons/menu/tour.png";
import wishlist from "@/assets/icons/menu/wishlist.png";
import { useProfile } from "@/hooks/useProfile";
import { useWishlist } from "@/hooks/useWishlist";

const LinkList = [
  { link: "Home", path: "/" },
  { link: "About", path: "/about" },
  { link: "Tours", path: "/tours" },
  { link: "Destinations", path: "/destinations" },
  { link: "Contact", path: "/contact" },
];

const countries = [
  "Thailand",
  "Vietnam",
  "Laos",
  "Cambodia",
  "Malaysia",
  "Indonesia",
  "Singapore",
  "India",
];

const tourCategories = [
  { name: "Popular", slug: "popular" },
  { name: "Sea, Beaches and Islands", slug: "beach" },
  { name: "Culture, History and Traditions", slug: "culture" },
  { name: "Nature", slug: "nature" },
  { name: "Local Experiences", slug: "local" },
  { name: "Cities and Modernity", slug: "cities" },
  { name: "Wellness and Spirituality", slug: "wellness" },
];

// Mobile Dropdown Component
interface MobileDropdownItem {
  label: string;
  href: string;
  isHeader?: boolean;
}

const MobileDropdown = ({
  title,
  items,
  onItemClick
}: {
  title: string;
  items: MobileDropdownItem[];
  onItemClick: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="font-medium text-lg flex items-center justify-between w-full"
      >
        {title}
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="flex flex-col pl-4 mt-2 gap-2 border-l-2 border-[#BD3E2B]/20">
          {items.map((item, idx) => {
            if (item.label === "---") {
              return <div key={idx} className="h-px bg-gray-200 my-1" />;
            }
            if (item.isHeader) {
              return (
                <span key={idx} className="text-xs font-semibold text-gray-500 uppercase tracking-wide mt-2">
                  {item.label}
                </span>
              );
            }
            return (
              <Link
                key={idx}
                href={item.href}
                className="text-gray-700 hover:text-[#BD3E2B] py-1"
                onClick={onItemClick}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

// Hover Dropdown Component for Desktop
const HoverDropdown = ({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  let timeoutId: NodeJS.Timeout;

  const handleMouseEnter = () => {
    clearTimeout(timeoutId);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setIsOpen(false);
    }, 150); // Small delay to allow moving to dropdown
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="font-medium text-lg cursor-pointer outline-none flex items-center gap-1">
        {title}
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-100 py-2 min-w-[260px] z-50">
          {children}
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authStatus, setAuthStatus] = useState<string | null>(null);
  const { logout } = useProfile();
  const { wishlist: wishlistItems } = useWishlist();
  const router = useRouter();

  useEffect(() => {
    // Read cookie on mount
    const status = Cookies.get("authStatus");
    setAuthStatus(status as string);

    // Poll for cookie changes
    const interval = setInterval(() => {
      const updatedStatus = Cookies.get("authStatus");
      setAuthStatus((prev) => {
        if (updatedStatus !== prev) {
          return updatedStatus as string;
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);
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
      <div className="hidden lg:flex flex-1 gap-14">
        {LinkList.map((item, index) =>
          item.link === "Tours" ? (
            <HoverDropdown key={index} title="Tours">
              <Link href="/tours" className="block px-4 py-2 font-semibold hover:bg-gray-50">
                All Tours
              </Link>
              <div className="h-px bg-gray-200 my-1" />
              <div className="px-4 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                By Category
              </div>
              {tourCategories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/tours?category=${category.slug}`}
                  className="block px-4 py-2 hover:bg-gray-50 text-gray-700"
                >
                  {category.name}
                </Link>
              ))}
              <div className="h-px bg-gray-200 my-1" />
              <div className="px-4 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                By Duration
              </div>
              <Link href="/tours?duration=half" className="block px-4 py-2 hover:bg-gray-50 text-gray-700">
                Half-Day
              </Link>
              <Link href="/tours?duration=full" className="block px-4 py-2 hover:bg-gray-50 text-gray-700">
                Full-Day
              </Link>
              <Link href="/tours?duration=multi" className="block px-4 py-2 hover:bg-gray-50 text-gray-700">
                Multi-Day
              </Link>
            </HoverDropdown>
          ) : item.link === "Destinations" ? (
            <HoverDropdown key={index} title="Destinations">
              <Link href="/destinations" className="block px-4 py-2 font-semibold hover:bg-gray-50">
                All Destinations
              </Link>
              <div className="h-px bg-gray-200 my-1" />
              {countries.map((country) => (
                <Link
                  key={country}
                  href={`/destinations/country?country=${country}`}
                  className="block px-4 py-2 hover:bg-gray-50 text-gray-700"
                >
                  {country}
                </Link>
              ))}
            </HoverDropdown>
          ) : (
            <Link key={index} href={item.path} className="font-medium text-lg">
              {item.link}
            </Link>
          )
        )}
      </div>

      {/* Right Section */}
      <div className="hidden lg:flex flex-1 justify-end items-center gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <span className="font-semibold cursor-pointer">Become an Agency</span>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-[#BD3E2B]">Become a Partner</DialogTitle>
              <DialogDescription className="text-[16px] pt-4">
                Join our network of tour operators and unlock exclusive benefits.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col gap-4 text-sm text-gray-600">
                <div className="flex gap-3 items-start">
                  <div className="bg-[#BD3E2B]/10 p-2 rounded-lg mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#BD3E2B"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="8.5" cy="7" r="4"></circle>
                      <line x1="20" y1="8" x2="20" y2="14"></line>
                      <line x1="23" y1="11" x2="17" y2="11"></line>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Exclusive Access</h4>
                    <p>Tour operators will receive their dedicated logins once approved by our team.</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="bg-[#BD3E2B]/10 p-2 rounded-lg mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#BD3E2B"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="12" y1="1" x2="12" y2="23"></line>
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Special Pricing</h4>
                    <p>Enjoy agency-specific pricing and benefits designed to help your business grow.</p>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button asChild className="w-full bg-[#BD3E2B] hover:bg-[#a5352a] text-white py-6 text-lg">
                <Link href="mailto:enquiry@fantasiaasia.com">
                  Send Email
                </Link>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Globe size={18} />
        <div className="px-3 py-2 cursor-pointer rounded-full border border-[#EBEBEB] flex items-center gap-2">
          <Link href="/profile/wishlist" className="relative flex items-center">
            <Heart
              color={wishlistItems.length > 0 ? "#EF4444" : "#EBEBEB"}
              size={20}
              className={wishlistItems.length > 0 ? "fill-red-500" : ""}
            />
            {wishlistItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full leading-none">
                {wishlistItems.length}
              </span>
            )}
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="bg-[#BD3E2B]">
                <AvatarImage src="/user.jpg" />
                <AvatarFallback className="bg-[#BD3E2B] text-white">CN</AvatarFallback>
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
      </div >

      {/* Mobile Hamburger */}
      < div className="lg:hidden flex items-center gap-4" >
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div >

      {/* Mobile Menu */}
      {
        mobileMenuOpen && (
          <div className="fixed top-0 left-0 w-full h-screen bg-white flex flex-col lg:hidden p-6 gap-4 z-40 overflow-y-auto">
            {/* Close button */}
            <div className="flex justify-between items-center mb-4">
              <Image
                src={"/logo.png"}
                alt="logo"
                width={150}
                height={50}
                className="cursor-pointer"
                onClick={() => {
                  setMobileMenuOpen(false);
                  router.push("/");
                }}
              />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={24} />
              </button>
            </div>
            {LinkList.map((path, index) => {
              if (path.link === "Tours") {
                return (
                  <MobileDropdown
                    key={index}
                    title="Tours"
                    items={[
                      { label: "All Tours", href: "/tours" },
                      { label: "---", href: "" },
                      { label: "By Category", href: "", isHeader: true },
                      ...tourCategories.map(cat => ({ label: cat.name, href: `/tours?category=${cat.slug}` })),
                      { label: "---", href: "" },
                      { label: "By Duration", href: "", isHeader: true },
                      { label: "Half-Day", href: "/tours?duration=half" },
                      { label: "Full-Day", href: "/tours?duration=full" },
                      { label: "Multi-Day", href: "/tours?duration=multi" },
                    ]}
                    onItemClick={() => setMobileMenuOpen(false)}
                  />
                );
              }
              if (path.link === "Destinations") {
                return (
                  <MobileDropdown
                    key={index}
                    title="Destinations"
                    items={[
                      { label: "All Destinations", href: "/destinations" },
                      { label: "---", href: "" },
                      ...countries.map(country => ({ label: country, href: `/destinations/country?country=${country}` })),
                    ]}
                    onItemClick={() => setMobileMenuOpen(false)}
                  />
                );
              }
              return (
                <Link
                  key={index}
                  href={path.path}
                  className="font-medium text-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {path.link}
                </Link>
              );
            })}

            {/* Become an Agency Mobile Item */}
            <Dialog>
              <DialogTrigger asChild>
                <span className="font-medium text-lg cursor-pointer text-gray-700 hover:text-[#BD3E2B]">Become an Agency</span>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-[#BD3E2B]">Become a Partner</DialogTitle>
                  <DialogDescription className="text-[16px] pt-4">
                    Join our network of tour operators and unlock exclusive benefits.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="flex flex-col gap-4 text-sm text-gray-600">
                    <div className="flex gap-3 items-start">
                      <div className="bg-[#BD3E2B]/10 p-2 rounded-lg mt-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#BD3E2B"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                          <circle cx="8.5" cy="7" r="4"></circle>
                          <line x1="20" y1="8" x2="20" y2="14"></line>
                          <line x1="23" y1="11" x2="17" y2="11"></line>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Exclusive Access</h4>
                        <p>Tour operators will receive their dedicated logins once approved by our team.</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-start">
                      <div className="bg-[#BD3E2B]/10 p-2 rounded-lg mt-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#BD3E2B"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="12" y1="1" x2="12" y2="23"></line>
                          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Special Pricing</h4>
                        <p>Enjoy agency-specific pricing and benefits designed to help your business grow.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button asChild className="w-full bg-[#BD3E2B] hover:bg-[#a5352a] text-white py-6 text-lg">
                    <Link href="mailto:enquiry@fantasiaasia.com">
                      Send Email
                    </Link>
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

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
        )
      }
    </div >
  );
};

export default Navbar;
