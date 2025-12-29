"use client"

import { useEffect, useState } from "react"
import { Search, Heart, ShoppingBag, Filter, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons"

const categories = ["All", "Backpacks", "Totes", "Messenger", "Travel", "Laptop"]



interface Product {
  ProductId: string
  name: string
  description: string
  price: string
  stock: number
  category: string
  image: string
  createdAt: string
  updatedAt: string
}


export default function BagCatalog() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [wishlist, setWishlist] = useState<string[]>([])
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

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const scrollToContact = () => {
    const footer = document.querySelector("footer")
    footer?.scrollIntoView({ behavior: "smooth" })
  }

  const openStoreLocator = () => {
    window.open(
      "https://www.google.com/maps/search/?api=1&query=New+Generations+Bag+8771%2F14-B+New+Rohtak+Road+Sidipura+New+Delhi+110005",
      "_blank",
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">NGBAG</h1>
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

            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={scrollToContact} className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span className="hidden sm:inline">Contact Us</span>
              </Button>
              <Button variant="ghost" onClick={openStoreLocator} className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span className="hidden sm:inline">Store Locator</span>
              </Button>
              <Button variant="outline" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
            </div>
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
              key={product?.ProductId}
              className="group bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-square overflow-hidden bg-muted">
                <img
                  src={product?.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={() => toggleWishlist(product?.ProductId)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-background/80 backdrop-blur hover:bg-background transition-colors"
                >
                  <Heart
                    className={`h-5 w-5 ${wishlist.includes(product?.ProductId) ? "fill-destructive text-destructive" : "text-muted-foreground"
                      }`}
                  />
                </button>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-card-foreground text-lg leading-tight">{product.name}</h3>
                  {/* <span className="text-lg font-bold text-primary whitespace-nowrap">Rs {product.price}</span> */}
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

                  <Button size="sm"> {product.stock > 0 ? "Stock :" + product.stock : "On Order"}</Button>

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
      <footer className="bg-muted mt-12 py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Contact Information */}
            <div>
              <h3 className="font-bold text-foreground text-lg mb-4">Contact Us</h3>
              <div className="space-y-3">
                <a
                  href="tel:9220774381"
                  className="flex items-start gap-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Phone className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>9220774381</span>
                </a>
                <a
                  href="tel:+917982230815"
                  className="flex items-start gap-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Phone className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>+91 79822 30815</span>
                </a>
              </div>
            </div>

            {/* Office Address */}
            <div>
              <h3 className="font-bold text-foreground text-lg mb-4">Office Address</h3>
              <div className="flex items-start gap-3 text-muted-foreground mb-4">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <address className="not-italic leading-relaxed">
                  Shop No. 2, 8771/14-B
                  <br />
                  Ground Floor, New Rohtak Road
                  <br />
                  Near Indian Gas, Sidipura
                  <br />
                  New Delhi, Central Delhi
                  <br />
                  Delhi - 110005
                </address>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=New+Generations+Bag+8771%2F14-B+New+Rohtak+Road+Sidipura+New+Delhi+110005"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                <MapPin className="h-4 w-4" />
                Get Directions
              </a>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="font-bold text-foreground text-lg mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-background hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-background hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-background hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-border text-center">
            <p className="text-muted-foreground">© 2025 NGBAG. Quality bags for every journey.</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919220774381?text=Hi%2C%20I%27m%20interested%20in%20your%20bags.%20Can%20you%20help%20me%20with%20product%20details%3F"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#20BA5A] hover:scale-110 transition-all duration-300 group"
        aria-label="Chat on WhatsApp"
      >


        <FontAwesomeIcon icon={faWhatsapp} size="2x" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Chat with us
        </span>
      </a>
    </div>
  )
}
