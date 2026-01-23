"use client";

import { X, Plus, Minus } from "lucide-react";
import { useCart } from "@/src/context/CartContext";
import { useEffect, useState } from "react";

interface Product {
  ProductId: string;
  name: string;
  image?: string;
  price: string;
}

export default function CartDrawer() {
  const { cart, isCartOpen, closeCart, addToCart, removeFromCart, removeItem } =
    useCart();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://api.newgeebags.com/api/v1/admin/getProducts")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40">
      <div className="w-96 bg-white h-full p-4 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button onClick={closeCart} className="cursor-pointer">
            <X />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto mt-4 space-y-4">
          {cart.map((item) => {
            const product = products.find(
              (p) => p.ProductId === item.productId,
            );

            if (!product) return null;

            return (
              <div key={item.productId} className="flex gap-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 object-contain bg-gray-100 rounded"
                />

                <div className="flex-1">
                  <p className="font-medium">{product.name}</p>

                  <div className="inline-flex items-center gap-5 mt-2 px-2 py-1 border">
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="cursor-pointer"
                    >
                      <Minus size={14} className="text-primary" />
                    </button>

                    <span className="text-sm">{item.quantity}</span>

                    <button
                      onClick={() => addToCart(item.productId)}
                      className="cursor-pointer"
                    >
                      <Plus size={14} className="text-primary" />
                    </button>
                  </div>
                  <span
                    onClick={() => removeItem(item.productId)}
                    className="
    relative ml-2 cursor-pointer text-sm text-primary
    after:absolute after:left-0 after:bottom-0 after:h-px after:w-full
    after:bg-current after:transition-all after:duration-300
    hover:after:w-0 hover:after:left-1/2
  "
                  >
                    Remove
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <button className="mt-4 bg-primary text-white py-3 rounded font-semibold cursor-pointer">
          Checkout
        </button>
      </div>
    </div>
  );
}
