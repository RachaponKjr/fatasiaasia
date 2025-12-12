"use client";
import React, { useState, useEffect, useMemo } from "react";
import TourCard from "@/components/tour-card";
import { Tour } from "@/types/tour.type";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TOURS_PER_PAGE = 15;

const tourCategories = [
    { name: "All Tours", slug: "" },
    { name: "Sea, Beaches and Islands", slug: "beach" },
    { name: "Culture, History and Traditions", slug: "culture" },
    { name: "Nature", slug: "nature" },
    { name: "Local Experiences", slug: "local" },
    { name: "Cities and Modernity", slug: "cities" },
    { name: "Wellness and Spirituality", slug: "wellness" },
];

const durationFilters = [
    { name: "All Durations", slug: "" },
    { name: "Half-Day", slug: "half" },
    { name: "Full-Day", slug: "full" },
    { name: "Multi-Day", slug: "multi" },
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
    tourDetails,
}: {
    tours: Tour[];
    tourDetails: any[];
}) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const categoryParam = searchParams.get("category") || "";
    const durationParam = searchParams.get("duration") || "";
    const pageParam = parseInt(searchParams.get("page") || "1", 10);

    const [selectedCategory, setSelectedCategory] = useState(categoryParam);
    const [selectedDuration, setSelectedDuration] = useState(durationParam);
    const [currentPage, setCurrentPage] = useState(pageParam);

    useEffect(() => {
        setSelectedCategory(categoryParam);
        setSelectedDuration(durationParam);
        setCurrentPage(pageParam);
    }, [categoryParam, durationParam, pageParam]);

    // Filter tours based on category and duration
    const filteredTours = useMemo(() => {
        let result = tours;

        // Filter by category
        if (selectedCategory) {
            result = result.filter((tour, index) => {
                const detail = tourDetails[index];
                if (!detail || !detail.tourDetails?.included) return false;

                const categoryValues = categoryMap[selectedCategory] || [];

                return detail.tourDetails.included.some((item: { text: string }) => {
                    if (selectedCategory === "beach" && item.text === "META_BEACHTOUR:true") {
                        return true;
                    }
                    if (item.text?.startsWith("META_CATEGORY:")) {
                        const tourCategory = item.text.replace("META_CATEGORY:", "");
                        return categoryValues.some((cat) =>
                            tourCategory.toLowerCase().includes(cat.toLowerCase())
                        );
                    }
                    return false;
                });
            });
        }

        // Filter by duration
        if (selectedDuration) {
            result = result.filter((tour, index) => {
                const detail = tourDetails[index];
                if (!detail || !detail.tourDetails?.included) return false;

                const durationItem = detail.tourDetails.included.find(
                    (item: { text: string }) => item.text?.startsWith("META_DURATION:")
                );

                if (!durationItem) return false;
                const duration = durationItem.text.replace("META_DURATION:", "");

                // Match exact values from admin dropdown
                if (selectedDuration === "half") return duration === "Half-Day";
                if (selectedDuration === "full") return duration === "Full-Day";
                if (selectedDuration === "multi") return duration === "Multi-Day";

                return true;
            });
        }

        return result;
    }, [tours, tourDetails, selectedCategory, selectedDuration]);

    // Pagination
    const totalPages = Math.ceil(filteredTours.length / TOURS_PER_PAGE);
    const paginatedTours = filteredTours.slice(
        (currentPage - 1) * TOURS_PER_PAGE,
        currentPage * TOURS_PER_PAGE
    );

    const currentCategoryName =
        tourCategories.find((c) => c.slug === selectedCategory)?.name || "All Tours";

    const buildUrl = (params: { category?: string; duration?: string; page?: number }) => {
        const newParams = new URLSearchParams();
        const cat = params.category !== undefined ? params.category : selectedCategory;
        const dur = params.duration !== undefined ? params.duration : selectedDuration;
        const pg = params.page !== undefined ? params.page : currentPage;

        if (cat) newParams.set("category", cat);
        if (dur) newParams.set("duration", dur);
        if (pg > 1) newParams.set("page", pg.toString());

        const queryString = newParams.toString();
        return queryString ? `/tours?${queryString}` : "/tours";
    };

    return (
        <div className="w-full flex flex-col xl:flex-row gap-6 xl:gap-8">
            {/* Sidebar Filters */}
            <div className="w-full xl:w-64 flex-shrink-0">
                <div className="bg-white rounded-2xl p-6 shadow-lg xl:sticky xl:top-24">
                    <h3 className="font-bold text-lg text-[#333] mb-4">Filter Tours</h3>

                    {/* Category Filter */}
                    <div className="mb-6">
                        <h4 className="font-semibold text-sm text-gray-600 mb-3">Category</h4>
                        <div className="flex flex-col gap-2">
                            {tourCategories.map((category) => (
                                <Link
                                    key={category.slug}
                                    href={buildUrl({ category: category.slug, page: 1 })}
                                    className={cn(
                                        "px-4 py-2 rounded-lg text-sm transition-all",
                                        selectedCategory === category.slug
                                            ? "bg-[#BD3E2B] text-white"
                                            : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                                    )}
                                >
                                    {category.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Duration Filter */}
                    <div className="mb-6">
                        <h4 className="font-semibold text-sm text-gray-600 mb-3">Duration</h4>
                        <div className="flex flex-col gap-2">
                            {durationFilters.map((duration) => (
                                <Link
                                    key={duration.slug}
                                    href={buildUrl({ duration: duration.slug, page: 1 })}
                                    className={cn(
                                        "px-4 py-2 rounded-lg text-sm transition-all",
                                        selectedDuration === duration.slug
                                            ? "bg-[#BD3E2B] text-white"
                                            : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                                    )}
                                >
                                    {duration.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Affiliate Banner Space */}
                    <div className="border-t pt-4 mt-4">
                        <div className="bg-gradient-to-br from-[#FFF3E1] to-[#FFE5C4] rounded-xl p-4 text-center">
                            <p className="text-xs text-gray-600 mb-2">Partner Offers</p>
                            <p className="text-sm font-semibold text-[#333]">Travel Insurance</p>
                            <p className="text-xs text-gray-500 mt-1">Protect your trip</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
                {/* Category Title */}
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-semibold text-[#333333]">
                        {currentCategoryName}
                        <span className="text-gray-500 text-lg ml-2">
                            ({filteredTours.length} tours)
                        </span>
                    </h3>
                </div>

                {/* Tours Grid */}
                {paginatedTours.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 xl:gap-8">
                            {paginatedTours.map((item, i) => (
                                <TourCard wishlist={item} key={i} />
                            ))}
                        </div>

                        {/* Pagination - only show if more than 1 page */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-2 mt-12">
                                <Link
                                    href={buildUrl({ page: Math.max(1, currentPage - 1) })}
                                    className={cn(
                                        "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                                        currentPage === 1
                                            ? "bg-gray-100 text-gray-400 pointer-events-none"
                                            : "bg-[#FFF3E1] text-[#BD3E2B] hover:bg-[#FFE5C4]"
                                    )}
                                >
                                    <ChevronLeft size={20} />
                                </Link>

                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <Link
                                        key={page}
                                        href={buildUrl({ page })}
                                        className={cn(
                                            "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all",
                                            currentPage === page
                                                ? "bg-[#BD3E2B] text-white"
                                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        )}
                                    >
                                        {page}
                                    </Link>
                                ))}

                                <Link
                                    href={buildUrl({ page: Math.min(totalPages, currentPage + 1) })}
                                    className={cn(
                                        "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                                        currentPage === totalPages
                                            ? "bg-gray-100 text-gray-400 pointer-events-none"
                                            : "bg-[#FFF3E1] text-[#BD3E2B] hover:bg-[#FFE5C4]"
                                    )}
                                >
                                    <ChevronRight size={20} />
                                </Link>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-xl text-[#7D7D7D]">
                            No tours found with current filters. Please try different options!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ToursClient;
