import React, { Suspense } from "react";
import Image from "next/image";
import HeroLayout from "../about/_components/hero-about";
import JoinNewSletter from "@/components/join-newsletter";
import destinationhero from "@/assets/images/destination/destination-hero.webp";
import { travelGuides } from "@/lib/guides-data";

export const metadata = {
  title: "Travel Guides | Fantasia Asia",
  description:
    "Downloadable destination guides curated by the Fantasia Asia team.",
};

const GuidesIndex = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeroLayout image={destinationhero.src} title="Travel Guides" />
      <div className="container mx-auto xl:pt-[120px] xl:pb-[160px] py-10 px-4 xl:px-0">
        <div className="flex flex-col items-center mb-12">
          <h3 className="font-bold text-xl md:text-4xl mb-6 text-center">
            Free Destination Guides
          </h3>
          <p className="font-light text-lg md:text-xl text-[#585858] leading-relaxed text-center max-w-3xl">
            Practical PDF guides written by our team — beaches, food, transport
            and what not to miss.
          </p>
        </div>

        {travelGuides.length === 0 ? (
          <p className="text-center text-[#585858]">
            New guides coming soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {travelGuides.map((guide) => (
              <div
                key={guide.slug}
                className="rounded-2xl overflow-hidden border border-[#E7E6E6] hover:shadow-lg transition flex flex-col"
              >
                <div className="relative w-full aspect-[16/10] bg-[#F5F5F5]">
                  <Image
                    src={guide.cover}
                    alt={guide.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="p-5 flex flex-col gap-2 flex-1">
                  <span className="text-xs uppercase tracking-wide text-[#BD3E2B] font-semibold">
                    {guide.destination}
                  </span>
                  <h4 className="text-lg font-bold text-[#333333]">
                    {guide.title}
                  </h4>
                  <p className="text-sm text-[#585858] line-clamp-3">
                    {guide.summary}
                  </p>
                  <div className="text-xs text-[#888] mt-2">
                    {guide.pages ? `${guide.pages} pages · ` : ""}
                    Updated{" "}
                    {new Date(guide.updatedAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                  <div className="mt-4">
                    {guide.pdfUrl ? (
                      <a
                        href={guide.pdfUrl}
                        download
                        className="inline-block bg-[#BD3E2B] hover:opacity-90 text-white text-sm font-semibold px-5 py-2 rounded-full"
                      >
                        Download PDF
                      </a>
                    ) : (
                      <span className="inline-block bg-[#EFEFEF] text-[#888] text-sm font-semibold px-5 py-2 rounded-full">
                        Coming soon
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <JoinNewSletter />
    </Suspense>
  );
};

export default GuidesIndex;
