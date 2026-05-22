import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import SmoothScroll from "@/components/smooth-scroll";
import CookieConsent from "@/components/cookie-consent";
import { getSiteImages } from "@/lib/site-images";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fantasia Asia: Tailor-Made Tours & Curated Journeys across Asia",
  description: "Discover the best of Asia, from Southeast to India and beyond. Book unique, tailor-made itineraries with 24/7 support and guaranteed best value.",
  icons: {
    icon: [
      { url: "/favicon-16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-32.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteImages = await getSiteImages();
  const logoUrl = siteImages["site.logo"]?.url;

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SmoothScroll />
        <Navbar logoUrl={logoUrl} />
        {children}
        <Footer
          footerBackgroundUrl={siteImages["site.footer.background"]?.url}
          logoUrl={logoUrl}
          paymentIcons={{
            mastercard: siteImages["site.payment.mastercard"]?.url,
            omise: siteImages["site.payment.omise"]?.url,
            paypal: siteImages["site.payment.paypal"]?.url,
            visa: siteImages["site.payment.visa"]?.url,
          }}
        />
        <CookieConsent />
        <Toaster />
      </body>
    </html>
  );
}
