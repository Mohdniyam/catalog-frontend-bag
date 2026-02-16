import { Heart, X } from "lucide-react";

export default function WishlistHeader({
  count,
  onClear,
}: {
  count: number;
  onClear: () => void;
}) {
  return (
    <div className="flex justify-between items-center mx-auto max-w-7xl px-6">
      <h1 className="flex items-center gap-2 text-primary font-semibold text-xl">
        <Heart className="fill-primary" />
        {count === 0 ? "My Wishlist" : `My Wishlist (${count})`}
      </h1>

      {count > 0 && (
        <button
          className="hover:text-primary hover:scale-110 duration-200 cursor-pointer"
          onClick={onClear}
        >
          <X />
        </button>
      )}
    </div>
  );
}
