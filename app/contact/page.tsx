import LocationIcon from "@/assets/icons/location";
import Phone2Icon from "@/assets/icons/phone2";
import JoinNewSletter from "@/components/join-newsletter";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";
import whatapp from "@/assets/images/whatapp.png";
import Mail2Icon from "@/assets/icons/mail2";
import { Button } from "@/components/ui/button";
import HeroLayout from "../about/_components/hero-about";
import contactUs from "@/assets/images/banner/contactUs.png";

const page = () => {
  return (
    <>
      <HeroLayout image={contactUs.src} title="Contact Us" />
      <div className="overflow-hidden">
        <div className="py-10 xl:py-28 container mx-auto grid grid-cols-1 xl:grid-cols-2 px-4 xl:px-0 max-w-7xl gap-14 w-full h-max">
          <div className="text-[#333333] flex">
            <div className="flex flex-col justify-between gap-4 relative">
              <h2 className="text-2xl xl:text-4xl font-bold">
                Get in Touch With Us
              </h2>
              <p className=" text-lg xl:text-xl  max-w-sm md:max-w-full font-normal">
                Questions, comments, or suggestions? Simply fill out the form to the right, and we will be in touch shortly.
              </p>
              <div className="flex flex-col gap-2 xl:gap-4">
                <div className="flex flex-row gap-3">
                  <LocationIcon size={30} color="#BD3E2B" />
                  <span className="font-bold max-w-sm md:max-w-full text-lg xl:text-xl">
                    164/1 Moo 5, T. Ao Nang, A. Muang Krabi, Krabi 81180 Thailand
                  </span>
                </div>
                <div className="flex flex-row gap-3">
                  <Phone2Icon size={30} color="#BD3E2B" />
                  <span className="font-bold text-lg xl:text-xl">
                    +66 62 242 3997
                  </span>
                </div>
                <div className="flex flex-row gap-3">
                  <Mail2Icon size={30} color="#BD3E2B" />
                  <span className="font-bold text-lg xl:text-xl">
                    info@fantasiaasia.com
                  </span>
                </div>
                <div className="flex flex-row gap-3">
                  <Image src={whatapp} alt="" width={30} height={30} />
                  <span className="font-bold text-lg xl:text-xl">
                    +66 62 242 3997
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2 grow relative">
                <h5 className="font-bold text-xl xl:text-2xl text-[#333333]">
                  Map
                </h5>
                <div className="w-full grow rounded-2xl max-h-[235px] overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3950.425560150691!2d98.81995950000001!3d8.0579998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3051bfb79db8de05%3A0xffa6340c93d265b3!2sFantasia%20Asia%20Service%20Part%20Ltd!5e0!3m2!1sen!2sth!4v1758169216762!5m2!1sen!2sth"
                    width="600"
                    height="450"
                    className="rounded-2xl"
                    style={{ border: 0 }}
                    loading="lazy"
                  // referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white px-4 xl:px-12 py-10 xl:py-20 shadow-[0px_0px_25px_0px_#000000]/10  border border-[#BDBDBD] rounded-[8px] flex flex-col gap-[50px]">
            <div className="w-full [&>input]:rounded-xl [&>input]:h-[50px] h-max [&>input]:border [&>input]:border-[#828282] [&>input]:bg-[#F9F9F9] grid grid-cols-2 gap-6">
              <Input placeholder="Firet Name*" size={30} />
              <Input placeholder="Last Name*" />
              <Input placeholder="Email*" className="col-span-2" />
              <Input placeholder="Phone Number*" className="col-span-2" />
              <textarea
                placeholder="Your message..."
                className="w-full p-4 border border-[#828282] bg-[#F9F9F9] col-span-2 h-[176px] rounded-xl"
              />
            </div>
            <Button className="cursor-pointer bg-gradient-to-r from-[#FFBA0A] to-[#DF6951] text-xl text-white col-span-2 h-[50px] rounded-full">
              Send Message
            </Button>
          </div>
        </div>
        <JoinNewSletter />
      </div>
    </>
  );
};

export default page;
