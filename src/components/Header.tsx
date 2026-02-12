"use client";

import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ChevronUp,
  CircleUserRound,
  Heart,
  MapPin,
  Power,
  Search,
  ShoppingBag,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import { useWishlist } from "@/src/context/WishlistContext";
import { useCart } from "@/src/context/CartContext";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  /* ------------------ handlers ------------------ */

  const openStoreLocator = useCallback(() => {
    window.open(
      "https://www.google.com/maps/search/?api=1&query=New+Generations+Bag+8771%2F14-B+New+Rohtak+Road+Sidipura+New+Delhi+110005",
      "_blank",
    );
  }, []);

  const { wishlist } = useWishlist();
  const { cart, openCart } = useCart();

  /* ------------------ user menu ------------------ */

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const router = useRouter();

  const handleLogout = () => {
    // token/loggedInUser data remove
    localStorage.removeItem("loggedInUser");

    // menu close
    setIsUserMenuOpen(false);

    // redirect
    router.push("/login");
  };

  /* ------------------ UI ------------------ */

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left */}
          <div className="flex items-center gap-12">
            <Link href="/" className="flex items-center gap-2">
              <ShoppingBag className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">
                NG<span className="text-primary">BAG</span>
              </h1>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="/shop"
                className="text-sm font-medium hover:text-muted-foreground"
              >
                Shop
              </Link>
              <Link
                href="/collections"
                className="text-sm font-medium hover:text-muted-foreground"
              >
                Collections
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium hover:text-muted-foreground"
              >
                About
              </Link>
            </nav>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search bags..."
                onChange={(e) => onSearch?.(e.target.value)}
                className="pl-10 pr-4 py-2 bg-secondary border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring w-64"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <Button
                onClick={openStoreLocator}
                variant="ghost"
                className="flex items-center gap-2 cursor-pointer"
              >
                <MapPin className="h-4 w-4" />
                <span className="hidden sm:inline">Store Locator</span>
              </Button>

              {/* User button bg-[#f2f2f2] */}
              <div
                className="relative flex py-2 rounded-md cursor-pointer "
                // onClick={() => setIsUserMenuOpen((p) => !p)}
                onMouseEnter={() => setIsUserMenuOpen(true)}
                onMouseLeave={() => setIsUserMenuOpen(false)}
                ref={userMenuRef}
              >
                {/* Profile Icon */}
                <button
                  aria-expanded={isUserMenuOpen}
                  className="flex items-center justify-center  px-2 "
                >
                  <CircleUserRound className="w-5 h-5" />
                </button>

                {/* Name + Arrow */}
                <div className="flex gap-1 items-center justify-center pr-2">
                  <div className="text-sm">{"Login"}</div>
                  <ChevronDown
                    className={`h-4 w-4 transition-all duration-300 ease-in-out ${
                      isUserMenuOpen
                        ? "rotate-180 scale-110"
                        : "rotate-0 scale-100"
                    }`}
                  />
                </div>

                {/* User Dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-6 w-44 bg-white border rounded-md shadow-lg z-50">
                    <ul className="py-1 text-sm">
                      <li>
                        <Link
                          href="/profile"
                          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <CircleUserRound className="w-4 h-4 text-primary" />
                          My Profile
                        </Link>
                      </li>

                      <li>
                        <Link
                          href="/my-orders"
                          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <ShoppingBag className="w-4 h-4 text-primary" />
                          Orders History
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/wishlist"
                          className="relative flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Heart className="w-4 h-4 text-primary" />
                          <span>My Wishlist</span>

                          {wishlist.length > 0 && (
                            <span className="ml-auto bg-primary text-white text-[10px] rounded-full h-4 min-w-4 px-1 flex items-center justify-center">
                              {wishlist.length}
                            </span>
                          )}
                        </Link>
                      </li>

                      <li className="border-t">
                        <button
                          className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-100 cursor-pointer"
                          onClick={handleLogout}
                        >
                          <Power className="w-4 h-4 text-primary" />
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              {/* Cart */}
              <button
                onClick={openCart}
                className="relative px-2 cursor-pointer"
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
