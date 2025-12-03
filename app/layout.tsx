import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import SmoothScroll from "@/components/smooth-scroll";
import CookieConsent from "@/components/cookie-consent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fantasia Asia | Premium Tours & Travel Experiences",
  description: "Discover the beauty of Asia with Fantasia Asia. We offer exclusive tour packages, custom itineraries, and unforgettable travel experiences across Thailand, Vietnam, Laos, and more.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SmoothScroll />
        <Navbar />
        <div className="w-full h-[1px] bg-[#C5C5C5]" />
        {children}
        <Footer />
        <CookieConsent />
        <Toaster />
      </body>
    </html>
  );
}
