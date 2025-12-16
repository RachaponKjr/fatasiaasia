import api from "@/server";
import Profile from "./_components/profile";
import Tour from "./_components/tour";
import PastTours from "./_components/pasttours";
import WishList from "./_components/wishlist";

export const dynamic = "force-dynamic";

export default async function Page() {
  const [wishlist, mybooking] = await Promise.all([
    api.wistlist.getTourWishlist(),
    api.booking.getMyBooking(),
  ]);

  const wishlistData = wishlist.data;
  const mybookingData = mybooking.data;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-6xl py-8 md:py-12 px-4">
        {/* Profile Section */}
        <Profile />

        {/* Content Sections */}
        <div className="mt-12 space-y-12">
          {/* My Bookings */}
          <Tour myBooking={mybookingData ?? []} />

          {/* Past Tours */}
          <PastTours tour={[]} />

          {/* Wishlist */}
          <WishList wishlist={wishlistData ?? []} />
        </div>
      </div>
    </div>
  );
}
