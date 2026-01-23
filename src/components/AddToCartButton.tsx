"use client";

import { useCart } from "@/src/context/CartContext";

export default function AddToCartButton({ productId }: { productId: string }) {
  const { addToCart, openCart } = useCart();

  return (
    <button
      onClick={() => {
        addToCart(productId);
        openCart();
      }}
      className="flex items-center justify-center gap-2 w-1/2 text-sm font-semibold uppercase transition duration-300 ease-in-out hover:bg-primary text-primary hover:text-white px-20 sm:px-12 py-3 border border-primary cursor-pointer"
    >
      Add to Cart
    </button>
  );
}
