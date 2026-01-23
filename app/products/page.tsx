"use client";
import { Button } from "@/components/ui/button";
import { Product } from "@/src/types";
import { Filter, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import WhatsAppButton from "@/src/components/WhatsAppButton";
import Link from "next/link";
import { useWishlist } from "@/src/context/WishlistContext";

const categories = [
  "All",
  "Backpacks",
  "Totes",
  "Messenger",
  "Travel",
  "Laptop",
];
const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  const { wishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://api.newgeebags.com/api/v1/admin/getProducts",
        );
        const data = await response.json();
        console.log(data);
        // Ensure data is an array before setting it, or trust the API (better to handle safely if possible, but keeping it simple for now)
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* Filter Bar */}
      <section className="border-b border-border bg-[#fcf7f3]">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="h-5 w-5 text-muted-foreground" />
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>
      {/* Products grid */}
      <section className="p-6 bg-[#fcf7f3]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {filteredProducts.map((product) => (
            <div
              key={product?.ProductId}
              className="group bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-square overflow-hidden bg-muted">
                <Link
                  key={product.ProductId}
                  href={`/products/${product.ProductId}`}
                >
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
                  <Link
                    key={product.ProductId}
                    href={`/products/${product.ProductId}`}
                  >
                    <h3 className="font-semibold text-card-foreground text-lg leading-tight">
                      {product.name}
                    </h3>
                  </Link>
                  <span className="text-lg font-bold text-primary whitespace-nowrap">
                    Rs {product.price}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between">
                  {/* <Button size="sm">
                    {" "}
                    {product.stock > 0 ? "Stock :" + product.stock : "On Order"}
                  </Button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {filteredProducts.length === 0 && (
        <section className="container mx-auto p-6">
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No bags found matching your criteria
            </p>
          </div>
        </section>
      )}
      {/* Floating WhatsApp Button */}
      <WhatsAppButton />
    </>
  );
};

export default ProductsPage;
