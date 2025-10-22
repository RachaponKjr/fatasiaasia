import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import PhoneIcon from "@/assets/icons/phone";
import MailIcon from "@/assets/icons/mail";
import Address from "@/assets/icons/address";

import omise from "@/assets/images/payment/omise.png";
import visa from "@/assets/images/payment/visa.png";
import mastercard from "@/assets/images/payment/mastercard.png";
import paypal from "@/assets/images/payment/paypal.png";

import footerBg from "@/assets/images/footer-bg.png";

const Footer = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="py-10 md:py-20 px-4 md:px-0 container mx-auto flex md:flex-row flex-col gap-8 md:gap-0 relative items-start z-10">
        <div className="max-w-xs flex flex-col items-start gap-6">
          <Image
            src={"/logo.png"}
            alt="logo-webside"
            width={280}
            height={280}
          />
          <h6 className="text-3xl font-semibold text-[#333333]">
            Want to Take Tour Packages?
          </h6>
          <Button className="bg-main rounded-full font-semibold">
            Book A Tour
          </Button>
        </div>
        <div className="flex flex-wrap md:flex-nowrap gap-2 md:gap-0 justify-between flex-1">
          <div className="flex flex-col gap-5">
            <span className="text-xl font-semibold">Quick Link</span>
            <ul className="flex flex-col gap-3 font-normal [&>li]:cursor-pointer">
              <li>About Us</li>
              <li>Destinations</li>
              <li>Tour Package</li>
              <li>Article</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div className="max-w-[16rem] md:max-w-[18rem] flex flex-col gap-7">
            <div className="flex flex-col gap-3">
              <div className="flex gap-2 items-center">
                <PhoneIcon size={18} />
                <span className="text-xl font-semibold">More Inquiry</span>
              </div>
              <span>tel: +66 62 242 3997</span>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex gap-2 items-center">
                <MailIcon size={18} />
                <span className="text-xl font-semibold">Send Mail</span>
              </div>
              <span>info@fantasiaasia.com</span>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex gap-2 items-center">
                <Address size={18} />
                <span className="text-xl font-semibold">Address</span>
              </div>
              <span>
                164/1 Moo 5, T. Ao Nang, A. Muang Krabi, Krabi 81180 Thailand
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="mmax-w-sm">
              <div className="flex flex-col gap-5">
                <span className="text-xl font-semibold">We Are Here</span>
                <p>
                  Quisque purus augue, facilisis andi neque idont accumsan
                  fringilla massa. Vivamusol id nibhom condimentum.
                </p>
              </div>
              <div className="flex flex-col gap-5">
                <span className="text-xl font-semibold">Payment method</span>
                <div className="flex gap-2 items-center">
                  <div className="w-[120px] h-[50px] relative ">
                    <Image
                      src={omise}
                      alt="omise"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <Image src={visa} alt="omise" width={40} height={40} />
                  <Image
                    src={mastercard}
                    alt="omise"
                    width={40}
                    height={40}
                    className="rounded"
                  />
                  <Image src={paypal} alt="omise" width={40} height={40} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Image
        src={footerBg}
        alt="footerbg"
        width={850}
        height={500}
        className="absolute -top-20 -right-55 z-0 opacity-[7%]"
      />
      <div className="w-full h-[1px] bg-[#C5C5C5]" />
      <div></div>
    </div>
  );
};

export default Footer;
