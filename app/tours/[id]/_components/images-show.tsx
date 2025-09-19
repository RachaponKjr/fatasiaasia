"use client";

import React from "react";
import Image from "next/image";
import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

import imagetest from "@/assets/imagetest.jpg";
import Link from "next/link";

import img1 from "@/assets/images/tour/thailand/image1.jpg";
import img2 from "@/assets/images/tour/thailand/image2.jpg";
import img3 from "@/assets/images/tour/thailand/image3.jpg";
import img4 from "@/assets/images/tour/thailand/image4.jpg";
import img5 from "@/assets/images/tour/thailand/image5.jpg";
import img6 from "@/assets/images/tour/thailand/image6.jpg";
import img7 from "@/assets/images/tour/thailand/image7.jpg";
import img8 from "@/assets/images/tour/thailand/image8.jpg";
import img9 from "@/assets/images/tour/thailand/image9.jpg";
import img10 from "@/assets/images/tour/thailand/image10.jpg";
import img11 from "@/assets/images/tour/thailand/image11.jpg";
import img12 from "@/assets/images/tour/thailand/image12.jpg";
import img13 from "@/assets/images/tour/thailand/image13.jpg";
import img14 from "@/assets/images/tour/thailand/image14.jpg";
import img15 from "@/assets/images/tour/thailand/image15.jpg";
import img16 from "@/assets/images/tour/thailand/image16.jpg";
import img17 from "@/assets/images/tour/thailand/image17.jpg";
import img18 from "@/assets/images/tour/thailand/image18.jpg";
import img19 from "@/assets/images/tour/thailand/image19.jpg";
import img20 from "@/assets/images/tour/thailand/image20.jpg";
import img21 from "@/assets/images/tour/thailand/image21.jpg";
import img22 from "@/assets/images/tour/thailand/image22.jpg";

const images = [
  img1.src,
  img2.src,
  img3.src,
  img4.src,
  img5.src,
  img6.src,
  img7.src,
  img8.src,
  img9.src,
  img10.src,
  img11.src,
  img12.src,
  img13.src,
  img14.src,
  img15.src,
  img16.src,
  img17.src,
  img18.src,
  img19.src,
  img20.src,
  img21.src,
  img22.src,
];

export default function Gallery() {
  return (
    <div className="w-full">
      <LightGallery speed={500} plugins={[lgThumbnail, lgZoom]}>
        {/* รูปใหญ่ */}
        <Link
          href={images[0]}
          className="w-full aspect-[16/12] overflow-hidden rounded-[12px] relative block"
        >
          <Image
            src={images[0]}
            alt="main"
            fill
            className="object-cover object-center"
          />
        </Link>

        {/* 3 รูปเล็ก */}
        <div className="grid grid-cols-3 gap-2 xl:gap-4 mt-2">
          {images.slice(1, 4).map((src, i) => (
            <a
              key={i}
              href={src}
              className="w-full aspect-[16/10] rounded-[12px] relative overflow-hidden block"
            >
              <Image
                src={src}
                alt={`thumb-${i}`}
                fill
                className="object-cover object-center"
              />
            </a>
          ))}
        </div>

        {/* ซ่อนรูปอื่นๆ แต่ให้ดูได้ใน LightGallery */}
        {images.slice(5).map((src, i) => (
          <Link key={i} href={src} style={{ display: "none" }}>
            <Image src={src} alt={`image-${i}`} width={200} height={150} />
          </Link>
        ))}
      </LightGallery>
    </div>
  );
}
