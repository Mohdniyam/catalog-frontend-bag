"use client";

import { Button } from "@/components/ui/button";
import { Heart, MapPin, Search, ShoppingBag, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useWishlist } from "@/src/context/WishlistContext";
import { useCart } from "@/src/context/CartContext";

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  const openStoreLocator = () => {
    window.open(
      "https://www.google.com/maps/search/?api=1&query=New+Generations+Bag+8771%2F14-B+New+Rohtak+Road+Sidipura+New+Delhi+110005",
      "_blank",
    );
  };

  const { wishlist } = useWishlist();
  const { cart, openCart } = useCart();

  // const scrollToContact = () => {
  //   const footer = document.querySelector("footer");
  //   footer?.scrollIntoView({ behavior: "smooth" });
  // };

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-12">
            <Link href={"/"} className="flex items-center gap-2">
              <ShoppingBag className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">
                NG<span className="text-primary">BAG</span>
              </h1>
            </Link>
            <nav className="hidden md:inline-flex items-center gap-8">
              <a
                href="#"
                className="text-sm font-medium hover:text-muted-foreground transition-colors"
              >
                Shop
              </a>
              <a
                href="#"
                className="text-sm font-medium hover:text-muted-foreground transition-colors"
              >
                Collections
              </a>
              <a
                href="#"
                className="text-sm font-medium hover:text-muted-foreground transition-colors"
              >
                About
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search bags..."
                onChange={(e) => onSearch?.(e.target.value)}
                className="pl-10 pr-4 py-2 bg-secondary border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring w-64"
              />
            </div>
            <div className="flex items-center gap-1">
              <Button
                onClick={openStoreLocator}
                className="flex items-center gap-2 bg-background text-foreground hover:text-white cursor-pointer"
              >
                <MapPin className="h-4 w-4" />
                <span className="hidden sm:inline-flex">Store Locator</span>
              </Button>
              <button className="relative text-sm font-medium px-2 cursor-pointer">
                <Heart className="w-5 h-5" />

                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>

              <button
                className="relative text-sm font-medium px-2 cursor-pointer"
                onClick={openCart}
              >
                <ShoppingCart className="w-5 h-5" />

                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                    {cart.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
