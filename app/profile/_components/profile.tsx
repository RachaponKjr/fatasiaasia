"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useProfile } from "@/hooks/useProfile";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Calendar,
  Settings,
  LogOut,
  Heart,
  Plane,
  Clock,
  ChevronRight
} from "lucide-react";

const Profile = () => {
  const { user, logout, isLoading } = useProfile();
  const router = useRouter();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  // Load avatar from localStorage
  useEffect(() => {
    if (user?.userId) {
      const savedAvatar = localStorage.getItem(`avatar_${user.userId}`);
      if (savedAvatar) {
        setAvatarUrl(savedAvatar);
      }
    }
  }, [user?.userId]);

  const getInitials = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    if (user?.name) {
      return user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
    return "U";
  };

  const quickLinks = [
    {
      icon: Plane,
      label: "My Bookings",
      href: "#tours",
      description: "View your upcoming tours",
      color: "bg-blue-500"
    },
    {
      icon: Heart,
      label: "Wishlist",
      href: "#wishlist",
      description: "Tours you've saved",
      color: "bg-pink-500"
    },
    {
      icon: Clock,
      label: "Past Tours",
      href: "#past-tours",
      description: "Your travel history",
      color: "bg-green-500"
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/profile/accountsetting",
      description: "Manage your account",
      color: "bg-gray-500"
    },
  ];

  const profileInfo = [
    { icon: Mail, label: "Email", value: user?.email },
    { icon: Phone, label: "Phone", value: user?.phoneNumber || "Not provided" },
    { icon: MapPin, label: "Address", value: user?.address || "Not provided" },
    { icon: Globe, label: "Country", value: user?.country || "Not provided" },
    { icon: Calendar, label: "Birthday", value: user?.birthday || "Not provided" },
  ];

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="bg-gradient-to-r from-[#BD3E2B] to-[#e05a47] rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-32 h-32 rounded-full bg-white/20"></div>
            <div className="space-y-3 text-center md:text-left">
              <div className="h-8 w-48 bg-white/20 rounded"></div>
              <div className="h-4 w-32 bg-white/20 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero Section with Gradient Background */}
      <div className="bg-gradient-to-r from-[#BD3E2B] to-[#e05a47] rounded-2xl p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Avatar */}
          <div className="relative">
            <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
              <AvatarImage src={avatarUrl || undefined} />
              <AvatarFallback className="text-3xl font-bold bg-white text-[#BD3E2B]">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-3 border-white flex items-center justify-center">
              <span className="sr-only">Online</span>
            </div>
          </div>

          {/* User Info */}
          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {user?.firstName && user?.lastName
                ? `${user.firstName} ${user.lastName}`
                : user?.name || "Welcome!"}
            </h1>
            <p className="text-white/80 text-lg mb-4">{user?.email}</p>

            {/* Location Badge */}
            {(user?.country || user?.timezone) && (
              <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm">
                <MapPin className="w-4 h-4" />
                <span>
                  {[user?.timezone, user?.country].filter(Boolean).join(", ")}
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <Link
              href="/profile/accountsetting"
              className="flex items-center gap-2 bg-white text-[#BD3E2B] px-6 py-3 rounded-full font-semibold hover:bg-white/90 transition-all shadow-md"
            >
              <Settings className="w-4 h-4" />
              Edit Profile
            </Link>
            <button
              onClick={logout}
              className="flex items-center gap-2 bg-white/20 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/30 transition-all"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Quick Links Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickLinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="group bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all border border-gray-100 hover:border-[#BD3E2B]/20"
          >
            <div className={`${link.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <link.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">{link.label}</h3>
            <p className="text-sm text-gray-500">{link.description}</p>
          </Link>
        ))}
      </div>

      {/* Profile Information Card */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <User className="w-5 h-5 text-[#BD3E2B]" />
            Personal Information
          </h2>
          <Link
            href="/profile/accountsetting"
            className="text-[#BD3E2B] text-sm font-medium flex items-center gap-1 hover:underline"
          >
            Edit <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="divide-y divide-gray-100">
          {profileInfo.map((info, index) => (
            <div key={index} className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#BD3E2B]/10 flex items-center justify-center flex-shrink-0">
                <info.icon className="w-5 h-5 text-[#BD3E2B]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-500">{info.label}</p>
                <p className="font-medium text-gray-900 truncate">
                  {info.value || "Not provided"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
