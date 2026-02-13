"use client";

import {
  ChevronDown,
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

  const handleLogout = (e: any) => {
    // token/loggedInUser data remove
    e.stopPropagation;
    localStorage.removeItem("loggedInUser");

    // menu close
    setIsUserMenuOpen(false);

    // redirect
    router.push("/login");
    console.log("LOGOUT BUTTON CLICKED!");
  };

  /* ------------------ UI ------------------ */

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between gap-2 h-16">
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
                className="text-sm font-medium text-foreground/90 hover:text-primary"
              >
                Shop
              </Link>
              <Link
                href="/collections"
                className="text-sm font-medium text-foreground/90 hover:text-primary "
              >
                Collections
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-foreground/90 hover:text-primary "
              >
                About
              </Link>
            </nav>
          </div>

          {/* Search */}
          <div className="relative hidden sm:flex flex-1 justify-center max-w-xl">
            <Search className="absolute lg:left-16 xl:left-26 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="   Search for Bags"
              onChange={(e) => onSearch?.(e.target.value)}
              className="w-2/3 pl-10 pr-4 py-2 border rounded-lg outline-none ring-1 ring-primary border-primary"
            />
          </div>

          {/* Right */}
          <div className="flex items-center ml-auto gap-4">
            {/* Store Locator */}
            <div className="p-2">
              <div
                onClick={openStoreLocator}
                className="flex items-center gap-2 text-sm cursor-pointer"
              >
                <MapPin className="w-5 h-5" />
                <span className="hidden sm:inline">Store Locator</span>
              </div>
            </div>

            {/* Login */}
            <div
              className="relative flex items-center py-2 rounded-md cursor-pointer"
              onClick={() => router.push("/login")}
              onMouseEnter={() => setIsUserMenuOpen(true)}
              onMouseLeave={() => setIsUserMenuOpen(false)}
              ref={userMenuRef}
            >
              <button
                aria-expanded={isUserMenuOpen}
                className="flex items-center justify-center px-2"
              >
                <CircleUserRound className="w-5 h-5" />
              </button>

              <div className="flex gap-1 items-center pr-2">
                <div className="text-sm">Login</div>
                <ChevronDown
                  className={`h-4 w-4 transition-all duration-300 ${
                    isUserMenuOpen ? "rotate-180 scale-110" : ""
                  }`}
                />
              </div>
              {/* Login Dropdown */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-48 w-46 p-1 bg-white border rounded-xl z-50">
                  <ul className="py-1 text-sm px-2">
                    {/* <li> <Link href="/signup" className="flex items-center justify-between px-4 py-2 rounded-lg" onClick={() => setIsUserMenuOpen(false)} > New Customer? <span className="text-primary">Sign Up</span> </Link> </li> */}
                    <li>
                      <Link
                        href="/profile"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-linear-to-r from-primary/20 to-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsUserMenuOpen(false);
                        }}
                      >
                        <CircleUserRound className="w-4 h-4 text-primary" /> My
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/my-orders"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-linear-to-r from-primary/20 to-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsUserMenuOpen(false);
                        }}
                      >
                        <ShoppingBag className="w-4 h-4 text-primary" />
                        Orders History
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/wishlist"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-linear-to-r from-primary/20 to-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsUserMenuOpen(false);
                        }}
                      >
                        <Heart className="w-4 h-4 text-primary" />
                        <span>My Wishlist</span>
                        {wishlist.length > 0 && (
                          <span className="ml-auto bg-primary text-white text-[10px] rounded-lg h-4 min-w-4 px-1 flex items-center justify-center">
                            {wishlist.length}
                          </span>
                        )}
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full text-left px-4 py-2 rounded-lg hover:bg-linear-to-r from-primary/20 to-white"
                      >
                        <Power className="w-4 h-4 text-primary" /> Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Cart */}
            <div
              onClick={openCart}
              className="relative flex items-center gap-2 text-sm px-2 py-2 cursor-pointer"
            >
              <ShoppingCart className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
              Cart
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
