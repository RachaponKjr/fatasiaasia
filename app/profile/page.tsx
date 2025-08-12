import React from "react";
import Profile from "./_components/profile";
import Tour from "./_components/tour";
import PastTours from "./_components/pasttours";
import WishList from "./_components/wishlist";

const page = () => {
  return (
    <div className="container mx-auto max-w-7xl pt-[72px] flex flex-col gap-20">
      <Profile />
      <Tour />
      <PastTours />
      <WishList />
    </div>
  );
};

export default page;
