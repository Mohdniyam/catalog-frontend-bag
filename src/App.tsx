"use client"

import { useState } from "react"
import Header from "./components/Header"
import Hero from "./components/Hero"
import FilterBar from "./components/FilterBar"
import ProductGrid from "./components/ProductGrid"
import Footer from "./components/Footer"
import type { Product } from "./types"
import { products as initialProducts } from "./data/products"

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")

  const filteredProducts = initialProducts.filter((product: Product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen flex flex-col">
      <Header onSearch={setSearchQuery} />
      <Hero />
      <main className="flex-1">
        <FilterBar selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
        <ProductGrid products={filteredProducts} />
      </main>
      <Footer />
    </div>
  )
}

export default App
