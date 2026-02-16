"use client";

import { useState } from "react";
import { useWishlist } from "@/src/context/WishlistContext";
import WishlistHeader from "./components/WishlistHeader";
import WishlistList from "./components/WishlistList";
import ClearWishlistModal from "./components/ClearWishlistModal";
import { Product } from "./types";

export default function WishlistClient({ products }: { products: Product[] }) {
  const { wishlist, toggleWishlist, clearWishlist } = useWishlist();
  const [showConfirm, setShowConfirm] = useState(false);

  const wishlistProducts = products.filter((product) =>
    wishlist.includes(product.ProductId),
  );

  return (
    <div className="min-h-[calc(100vh-64px)] bg-background px-6 py-8">
      <WishlistHeader
        count={wishlistProducts.length}
        onClear={() => setShowConfirm(true)}
      />

      <WishlistList items={wishlistProducts} toggleWishlist={toggleWishlist} />

      {showConfirm && (
        <ClearWishlistModal
          onCancel={() => setShowConfirm(false)}
          onConfirm={() => {
            clearWishlist();
            setShowConfirm(false);
          }}
        />
      )}
    </div>
  );
}
