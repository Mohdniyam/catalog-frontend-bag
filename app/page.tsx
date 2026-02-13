"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Hero from "@/src/components/Hero";
import { Heart } from "lucide-react";
import WhatsAppButton from "@/src/components/WhatsAppButton";
import { useWishlist } from "@/src/context/WishlistContext";

interface Product {
  ProductId: string;
  name: string;
  description: string;
  price: string;
  stock: number;
  category: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export default function BagCatalog() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const { wishlist, toggleWishlist } = useWishlist();

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://api.newgeebags.com/api/v1/admin/getProducts",
        );
        const data = await response.json();
        console.log("API Response:", data);
        // Ensure data is an array before setting it, or trust the API (better to handle safely if possible, but keeping it simple for now)
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  // ONLY 6 PRODUCTS FOR FEATURED SECTION
  const featuredProducts = useMemo(
    () => filteredProducts.slice(0, 6),
    [filteredProducts],
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <Hero />
      {/* Featured collections section */}
      <section className="w-full bg-background pb-6 px-8">
        <div className="container mx-auto">
          <div className="relative flex items-center justify-center py-6">
            <h2 className="text-xl font-semibold text-primary">
              Featured Collections
            </h2>
            <Link
              href="/products"
              className="absolute right-0 text-sm text-blue-800 underline"
            >
              View All
            </Link>
          </div>
        </div>
        {/* ONE ROW ONLY */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-card rounded-lg border border-border overflow-hidden"
              >
                {/* Image skeleton */}
                <div className="aspect-square bg-muted animate-pulse" />

                {/* Content skeleton */}
                <div className="p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                    <div className="h-4 w-12 bg-muted animate-pulse rounded" />
                  </div>

                  <div className="space-y-2">
                    <div className="h-3 w-full bg-muted animate-pulse rounded" />
                    <div className="h-3 w-3/4 bg-muted animate-pulse rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {featuredProducts.map((product) => (
              <div
                key={product?.ProductId}
                className="group bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <Link href={`/products/${product.ProductId}`}>
                    <img
                      src={product?.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleWishlist(product.ProductId);
                    }}
                    className="absolute top-3 right-3 p-2 rounded-full bg-background/80 backdrop-blur hover:bg-background transition-colors"
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        wishlist.includes(product?.ProductId)
                          ? "fill-destructive text-destructive"
                          : "text-muted-foreground cursor-pointer"
                      }`}
                    />
                  </button>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Link href={`/products/${product.ProductId}`}>
                      <h3 className="font-semibold text-card-foreground leading-tight">
                        {product.name}
                      </h3>
                    </Link>

                    <span className=" font-bold text-primary whitespace-nowrap">
                      Rs {product.price}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-end">
                    {/* <Button size="sm">
                    {" "}
                    {product.stock > 0 ? "Stock :" + product.stock : "On Order"}
                  </Button> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Floating WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
}
