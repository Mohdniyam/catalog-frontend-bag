import Link from "next/link";
import { getMrpPrice, getOffPercentage } from "@/src/utils/pricing";
import { Product } from "../types";

export default function WishlistItem({
  item,
  toggleWishlist,
}: {
  item: Product;
  toggleWishlist: (id: string) => void;
}) {
  return (
    <div className="flex justify-between items-center py-3 border-b first:border-t ">
      <Link
        href={`/products/${item.ProductId}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="flex gap-5 cursor-pointer">
          <img
            src={item.image}
            alt={item.name}
            width={120}
            className="w-30 h-30 object-contain"
          />

          <div className="flex flex-col gap-2 justify-center">
            <h3 className="hover:text-primary">{item.name}</h3>

            <div className="flex items-center justify-center gap-2">
              <p className="text-xl font-bold">₹{item.price}</p>

              <span className="text-sm">
                ₹<del>{getMrpPrice(Number(item.price))}</del>
              </span>

              <span className="text-primary font-semibold text-sm">
                {getOffPercentage(item.price)}% off
              </span>
            </div>
          </div>
        </div>
      </Link>

      <button
        onClick={() => toggleWishlist(item.ProductId)}
        className="relative mx-2 cursor-pointer text-sm text-primary
        after:absolute after:left-0 after:bottom-0 after:h-px after:w-full
        after:bg-current after:transition-all after:duration-300
        hover:after:w-0 hover:after:left-1/2"
      >
        Remove
      </button>
    </div>
  );
}
