import api from "@/server";
import Profile from "./_components/profile";
import Tour from "./_components/tour";
import PastTours from "./_components/pasttours";
import WishList from "./_components/wishlist";
import { MyBooking } from "@/types/booking.type";

export const dynamic = "force-dynamic";

export default async function Page() {
  const { data: wishlist } = await api.wistlist.getTourWishlist();
  const { data: mybooking } = await api.booking.getMyBooking()
  return (
    <div className="container mx-auto max-w-7xl md:pt-[72px] px-4 md:p-0 flex flex-col gap-20">
      <Profile />
      <Tour myBooking={mybooking ?? []} />
      <PastTours tour={[]} />
      <WishList wishlist={wishlist} />
    </div>
  );
}
