import api from "@/server";
import Profile from "./_components/profile";
import Tour from "./_components/tour";
import PastTours from "./_components/pasttours";
import WishList from "./_components/wishlist";

export const dynamic = "force-dynamic";

export default async function Page() {
  const { data: wishlist } = await api.wistlist.getTourWishlist();

  return (
    <div className="container mx-auto max-w-7xl pt-[72px] flex flex-col gap-20">
      <Profile />
      <Tour />
      <PastTours />
      <WishList wishlist={wishlist} />
    </div>
  );
}
