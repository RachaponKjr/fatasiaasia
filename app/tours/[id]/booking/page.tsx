import React from "react";
import BookingPage from "./_components/booking";

const page = () => {
  return (
    <div className="container mx-auto max-w-7xl flex flex-col gap-32 my-32">
      <div className="w-full">
        <BookingPage />
      </div>
    </div>
  );
};

export default page;
