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
    <div className="p-12 mx-2">
      {items.length === 0 ? (
        <div className="flex gap-2 items-center justify-center text-lg text-primary/60">
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
