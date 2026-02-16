"use client";

import { X, Plus, Minus } from "lucide-react";
import { useCart } from "@/src/context/CartContext";
import { useEffect, useState, useRef } from "react";
import { getMrpPrice, getOffPercentage } from "../utils/pricing";

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

  const cartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("https://api.newgeebags.com/api/v1/admin/getProducts")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // 3. Click Outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Agar cart open hai aur click cartRef ke bahar hua hai
      if (
        isCartOpen &&
        cartRef.current &&
        !cartRef.current.contains(event.target as Node)
      ) {
        closeCart();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Cleanup listener on unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCartOpen, closeCart]);

  // --- Subtotal Calculation Logic ---
  const subtotal = cart.reduce((acc, item) => {
    const product = products.find((p) => p.ProductId === item.productId);
    const price = product ? parseFloat(product.price) : 0;
    return acc + price * item.quantity;
  }, 0);

  if (!isCartOpen) return null;
  const isCartEmpty = cart.length === 0;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40">
      <div ref={cartRef} className="w-96 bg-white h-full p-4 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-lg font-semibold text-primary">Cart</h2>
          <button
            onClick={closeCart}
            className="hover:text-primary hover:scale-110 duration-200 cursor-pointer"
          >
            <X />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto mt-4">
          {isCartEmpty ? (
            <div className="h-full flex flex-col items-center justify-center ">
              <p className="text-lg font-medium text-primary">
                Your cart is empty
              </p>
              <p className="text-sm mt-1 text-primary/60">
                Add items to get started
              </p>
            </div>
          ) : (
            <div className="space-y-4">
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
                      <p className="font-medium text-primary mb-1">
                        {product.name}
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-primary mb-1">
                          ₹{product.price}
                        </p>
                        <span className="font-medium text-primary mb-1">
                          ₹<del>{getMrpPrice(Number(product.price))}</del>
                        </span>
                        <span className="text-primary font-semibold text-sm mb-1">
                          {getOffPercentage(product.price)}% off
                        </span>
                      </div>

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
          )}
        </div>

        {/* Subtotal */}
        {!isCartEmpty && (
          <div className="flex justify-between text-primary">
            <span>Subtotal:</span>
            <span>₹{subtotal.toLocaleString("en-IN")}</span>
          </div>
        )}

        {/* Footer */}
        {!isCartEmpty && (
          <button className="mt-4 bg-primary text-white py-3 rounded font-semibold cursor-pointer">
            Checkout
          </button>
        )}
      </div>
    </div>
  );
}
