"use client";

import { useEffect, useState } from "react";
import { useWishlist } from "@/src/context/WishlistContext";
import { Heart, X } from "lucide-react";
import { getMrpPrice, getOffPercentage } from "@/src/utils/pricing";
import Link from "next/link";

interface Product {
  ProductId: string;
  name: string;
  image: string;
  price: string;
}

export default function WishlistPage() {
  const { wishlist, toggleWishlist, clearWishlist } = useWishlist();
  const [products, setProducts] = useState<Product[]>([]);
  const [mounted, setMounted] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetch("https://api.newgeebags.com/api/v1/admin/getProducts")
      .then((res) => res.json())
      .then((data: Product[]) => setProducts(data));
  }, []);

  //  Hydration-safe guard
  if (!mounted) return null;

  const wishlistProducts = (products || []).filter((product) =>
    wishlist.includes(product.ProductId),
  );

  const confirmClearWishlist = () => {
    clearWishlist();
    setShowConfirm(false);
  };
  const cancelClearWishlist = () => {
    setShowConfirm(false);
  };

  return (
    <div className="min-h-screen">
      <div className="flex justify-between items-center mt-12 ">
        {/* HEADER */}
        <h1 className="flex justify-center items-center gap-2 text-primary font-semibold text-xl px-8">
          <Heart className="fill-primary" />
          {wishlistProducts.length == 0
            ? "My Wishlist"
            : `My Wishlist (${wishlistProducts.length})`}
        </h1>
        <button
          className="px-8 cursor-pointer"
          onClick={() => setShowConfirm(true)}
        >
          <X />
        </button>
      </div>

      {/* CONTENT */}
      <div className=" p-12 mx-2">
        {wishlistProducts.length === 0 ? (
          <div className="flex gap-2 items-center justify-center text-lg text-primary/60">
            Your wishlist is empty!
            {/* <span>
              <Heart className="h-5 w-5 fill-primary text-primary" />
            </span> */}
          </div>
        ) : (
          <div className="flex flex-col">
            {wishlistProducts.map((item) => (
              <div
                key={item.ProductId}
                className="flex justify-between items-center py-4 border-b first:border-t min-h-35 "
              >
                <Link
                  href={`/products/${item.ProductId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  <div className="flex gap-5  cursor-pointer">
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
            ))}
          </div>
        )}
      </div>
      {/* CONFIRM CLEAR WISHLIST MODAL */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-md p-6 w-[90%] max-w-sm">
            <h2 className="text-lg font-semibold mb-2">Clear wishlist?</h2>
            <p className="text-sm text-gray-600 mb-4">
              This will remove all items from your wishlist.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={cancelClearWishlist}
                className="px-4 py-2 text-sm border rounded cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmClearWishlist}
                className="px-4 py-2 text-sm bg-primary text-white rounded cursor-pointer"
              >
                Yes, clear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
