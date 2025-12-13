export const dynamic = "force-dynamic";

import React, { Suspense } from "react";
import HeroLayout from "../about/_components/hero-about";
import destinationhero from "@/assets/images/destination/destination-hero.webp";
import JoinNewSletter from "@/components/join-newsletter";
import TourCard from "@/components/tour-card";
import api from "@/server";

const BeachToursPage = async () => {
    let beachTours: any[] = [];

    try {
        const { data: tour } = await api.tour.getTour();

        if (tour && tour.length > 0) {
            // Fetch tour details to check for beach tour flag
            const detailPromises = tour.map(async (t) => {
                try {
                    const { data } = await api.tour.getTourDetail({ tourId: t.tourId });
                    return data;
                } catch {
                    return null;
                }
            });

            const tourDetails = await Promise.all(detailPromises);

            // Filter for beach tours only
            beachTours = tour.filter((t, index) => {
                const detail = tourDetails[index];
                if (!detail || !detail.tourDetails?.included) return false;
                return detail.tourDetails.included.some(
                    (item: { text: string }) => item.text === "META_BEACHTOUR:true"
                );
            });
        }
    } catch (error) {
        console.error("Error fetching beach tours:", error);
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <HeroLayout image={destinationhero.src} title="Beach Tours" />
            <div className="container mx-auto xl:pt-[150px] xl:pb-[200px] py-10 px-4 xl:px-0">
                {/* Title and Description Section */}
                <div className="flex flex-col items-center mb-16">
                    <h3 className="font-bold text-xl md:text-4xl mb-9 text-center">
                        Discover Our Beach Tour Packages
                    </h3>
                    <p className="font-light text-lg md:text-2xl text-[#585858] leading-relaxed text-center max-w-5xl">
                        Escape to paradise with our exclusive beach tour packages. From the pristine shores of
                        Thailand to the tropical islands of Indonesia, experience the most beautiful beaches
                        Asia has to offer. Crystal clear waters, white sandy beaches, and unforgettable
                        sunsets await you on these handpicked beach adventures.
                    </p>
                </div>

                {beachTours.length > 0 ? (
                    <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-16">
                        {beachTours.map((tour, i) => (
                            <TourCard wishlist={tour} key={i} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-xl text-[#7D7D7D]">
                            No beach tours available at the moment. Please check back soon!
                        </p>
                    </div>
                )}
            </div>
            <JoinNewSletter />
        </Suspense>
    );
};

export default BeachToursPage;
