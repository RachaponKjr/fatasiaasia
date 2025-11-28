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
    <div className="container mx-auto max-w-7xl md:pt-[72px] px-4 md:p-0 flex flex-col gap-20">
      <Profile />
      <Tour myBooking={mybookingData ?? []} />
      <PastTours tour={[]} />
      <WishList wishlist={wishlistData ?? []} />
    </div>
  );
}
