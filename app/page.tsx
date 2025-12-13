"use client"

import { useEffect, useState } from "react"
import { Search, Heart, ShoppingBag, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const categories = ["All", "Backpacks", "Totes", "Messenger", "Travel", "Laptop"]

const product = [
  {
    id: 1,
    name: "Urban Explorer Backpack",
    category: "Backpacks",
    price: 89.99,
    image: "/modern-black-backpack.jpg",
    colors: ["#000000", "#1e3a8a", "#4b5563"],
    description: "Durable backpack with laptop compartment",
  },
  {
    id: 2,
    name: "Classic Leather Tote",
    category: "Totes",
    price: 129.99,
    image: "/brown-leather-tote-bag.jpg",
    colors: ["#8b4513", "#000000", "#d4a574"],
    description: "Elegant leather tote for everyday use",
  },
  {
    id: 3,
    name: "Tech Messenger Bag",
    category: "Messenger",
    price: 99.99,
    image: "/grey-messenger-bag.jpg",
    colors: ["#4b5563", "#000000", "#1e3a8a"],
    description: "Professional messenger with padded compartments",
  },
  {
    id: 4,
    name: "Weekend Travel Duffel",
    category: "Travel",
    price: 149.99,
    image: "/navy-travel-duffel-bag.jpg",
    colors: ["#1e3a8a", "#000000", "#4b5563"],
    description: "Spacious duffel for weekend getaways",
  },
  {
    id: 5,
    name: "Minimalist Laptop Bag",
    category: "Laptop",
    price: 79.99,
    image: "/black-minimalist-laptop-bag.jpg",
    colors: ["#000000", "#4b5563", "#1e3a8a"],
    description: "Sleek protection for your laptop",
  },
  {
    id: 6,
    name: "Canvas Tote Shopper",
    category: "Totes",
    price: 49.99,
    image: "/beige-canvas-tote-bag.jpg",
    colors: ["#d4a574", "#ffffff", "#4b5563"],
    description: "Eco-friendly canvas shopping tote",
  },
  {
    id: 7,
    name: "Professional Briefcase",
    category: "Messenger",
    price: 179.99,
    image: "/black-leather-briefcase.jpg",
    colors: ["#000000", "#8b4513", "#1e3a8a"],
    description: "Executive briefcase with premium finish",
  },
  {
    id: 8,
    name: "Outdoor Hiking Pack",
    category: "Backpacks",
    price: 119.99,
    image: "/green-hiking-backpack.jpg",
    colors: ["#065f46", "#1e3a8a", "#000000"],
    description: "Rugged pack for outdoor adventures",
  },
  {
    id: 9,
    name: "Wheeled Carry-On",
    category: "Travel",
    price: 199.99,
    image: "/grey-wheeled-luggage.jpg",
    colors: ["#4b5563", "#000000", "#1e3a8a"],
    description: "Convenient wheeled luggage for travel",
  },
]

interface Product {
  id: number
  name: string
  category: string
  price: number
  image: string
  colors: string[]
  description: string
}

export default function BagCatalog() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [wishlist, setWishlist] = useState<number[]>([])
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://api.newgeebags.com/api/v1/admin/getProducts")
        const data = await response.json()
        console.log(data)
        // Ensure data is an array before setting it, or trust the API (better to handle safely if possible, but keeping it simple for now)
        setProducts(data)
      } catch (error) {
        console.error("Failed to fetch products:", error)
      }
    }
    fetchProducts()
  }, [])

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const toggleWishlist = (id: number) => {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">BagShop</h1>
            </div>

            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search bags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Button variant="outline" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Discover Your Perfect Bag
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            From everyday essentials to travel companions, find quality bags designed for your lifestyle
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="border-b border-border bg-background">
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

      {/* Product Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.ProductId}
              className="group bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-square overflow-hidden bg-muted">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-background/80 backdrop-blur hover:bg-background transition-colors"
                >
                  <Heart
                    className={`h-5 w-5 ${wishlist.includes(product.id) ? "fill-destructive text-destructive" : "text-muted-foreground"
                      }`}
                  />
                </button>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-card-foreground text-lg leading-tight">{product.name}</h3>
                  <span className="text-lg font-bold text-primary whitespace-nowrap">${product.price}</span>
                </div>

                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {/* {product.colors.map((color, idx) => (
                      <button
                        key={idx}
                        className="w-6 h-6 rounded-full border-2 border-border hover:border-primary transition-colors"
                        style={{ backgroundColor: color }}
                        aria-label={`Color option ${idx + 1}`}
                      />
                    ))} */}
                  </div>

                  <Button size="sm">Add to Cart</Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No bags found matching your criteria</p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-muted mt-12 py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">© 2025 BagShop. Quality bags for every journey.</p>
        </div>
      </footer>
    </div>
  )
}
