import WishlistItem from "./WishlistItem";
import { Product } from "../types";

export default function WishlistList({
  items,
  toggleWishlist,
}: {
  items: Product[];
  toggleWishlist: (id: string) => void;
}) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      {items.length === 0 ? (
        <div className="min-h-40 flex justify-center items-center text-lg font-medium text-primary/90">
          Your wishlist is empty!
        </div>
      ) : (
        <div className="flex flex-col">
          {items.map((item) => (
            <WishlistItem
              key={item.ProductId}
              item={item}
              toggleWishlist={toggleWishlist}
            />
          ))}
        </div>
      )}
    </div>
  );
}
