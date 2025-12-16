import React from "react";
import TourItem from "./tour-item";
import { Clock, ChevronRight, Camera } from "lucide-react";
import Link from "next/link";

const PastTours = ({ tour }: { tour: any[] }) => {
  return (
    <div id="past-tours" className="scroll-mt-24">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Past Tours</h2>
            <p className="text-gray-500 text-sm">Your travel memories</p>
          </div>
        </div>
        {tour && tour.length > 0 && (
          <Link
            href="/profile/pasttour"
            className="text-[#BD3E2B] font-medium flex items-center gap-1 hover:underline"
          >
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      {/* Empty State */}
      {(!tour || tour.length === 0) ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-50 flex items-center justify-center">
            <Camera className="w-10 h-10 text-green-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Past Tours Yet</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Once you complete a tour, your travel memories will appear here.
          </p>
          <Link
            href="/tours"
            className="inline-flex items-center gap-2 bg-[#BD3E2B] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#a5352a] transition-colors"
          >
            Start Your Journey
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tour.slice(0, 6).map((item, index) => (
            <TourItem key={index} booking={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PastTours;
