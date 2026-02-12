import { Heart, X } from "lucide-react";

export default function WishlistHeader({
  count,
  onClear,
}: {
  count: number;
  onClear: () => void;
}) {
  return (
    <div className="flex justify-between items-center mt-12 ">
      <h1 className="flex justify-center items-center gap-2 text-primary font-semibold text-xl px-8">
        <Heart className="fill-primary" />
        {count === 0 ? "My Wishlist" : `My Wishlist (${count})`}
      </h1>

      {count > 0 && (
        <button className="px-8 cursor-pointer" onClick={onClear}>
          <X />
        </button>
      )}
    </div>
  );
}
