"use client";
import React, { useState, useEffect } from "react";
import TourCard from "@/components/tour-card";
import { Tour } from "@/types/tour.type";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

const tourCategories = [
    { name: "All Tours", slug: "" },
    { name: "Sea, Beaches and Islands", slug: "beach" },
    { name: "Culture, History and Traditions", slug: "culture" },
    { name: "Nature", slug: "nature" },
    { name: "Local Experiences", slug: "local" },
    { name: "Cities and Modernity", slug: "cities" },
    { name: "Wellness and Spirituality", slug: "wellness" },
];

// Map category slugs to META_CATEGORY values
const categoryMap: Record<string, string[]> = {
    beach: ["Beach Tour", "Sea, Beaches and Islands", "beach"],
    culture: ["Culture, History and Traditions", "Culture", "culture", "History"],
    nature: ["Nature", "nature", "Adventure"],
    local: ["Local Experiences", "local", "Local Experience"],
    cities: ["Cities and Modernity", "cities", "City"],
    wellness: ["Wellness and Spirituality", "wellness", "Wellness", "Spirituality"],
};

const ToursClient = ({
    tours,
    tourDetails
}: {
    tours: Tour[];
    tourDetails: any[]
}) => {
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get("category") || "";
    const [selectedCategory, setSelectedCategory] = useState(categoryParam);

    useEffect(() => {
        setSelectedCategory(categoryParam);
    }, [categoryParam]);

    // Filter tours based on category
    const filteredTours = selectedCategory
        ? tours.filter((tour, index) => {
            const detail = tourDetails[index];
            if (!detail || !detail.tourDetails?.included) return false;

            const categoryValues = categoryMap[selectedCategory] || [];

            // Check for META_CATEGORY or META_BEACHTOUR
            return detail.tourDetails.included.some((item: { text: string }) => {
                if (selectedCategory === "beach" && item.text === "META_BEACHTOUR:true") {
                    return true;
                }
                if (item.text?.startsWith("META_CATEGORY:")) {
                    const tourCategory = item.text.replace("META_CATEGORY:", "");
                    return categoryValues.some(cat =>
                        tourCategory.toLowerCase().includes(cat.toLowerCase())
                    );
                }
                return false;
            });
        })
        : tours;

    const currentCategoryName = tourCategories.find(c => c.slug === selectedCategory)?.name || "All Tours";

    return (
        <div className="w-full">
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
                {tourCategories.map((category) => (
                    <Link
                        key={category.slug}
                        href={category.slug ? `/tours?category=${category.slug}` : "/tours"}
                        className={cn(
                            "px-6 py-3 rounded-full text-sm font-medium transition-all",
                            selectedCategory === category.slug
                                ? "bg-[#BD3E2B] text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        )}
                    >
                        {category.name}
                    </Link>
                ))}
            </div>

            {/* Category Title */}
            <h3 className="text-2xl font-semibold text-[#333333] mb-8 text-center">
                {currentCategoryName}
                <span className="text-gray-500 text-lg ml-2">({filteredTours.length} tours)</span>
            </h3>

            {/* Tours Grid */}
            {filteredTours.length > 0 ? (
                <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-24 xl:my-10">
                    {filteredTours.map((item, i) => (
                        <TourCard wishlist={item} key={i} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <p className="text-xl text-[#7D7D7D]">
                        No tours found in this category. Please check back soon!
                    </p>
                </div>
            )}
        </div>
    );
};

export default ToursClient;
