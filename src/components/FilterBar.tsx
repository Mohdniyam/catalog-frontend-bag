"use client"

interface FilterBarProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

const categories = [
  { id: "all", label: "All Bags" },
  { id: "backpacks", label: "Backpacks" },
  { id: "totes", label: "Tote Bags" },
  { id: "messenger", label: "Messenger" },
  { id: "travel", label: "Travel" },
  { id: "laptop", label: "Laptop Bags" },
]

export default function FilterBar({ selectedCategory, onCategoryChange }: FilterBarProps) {
  return (
    <div className="border-b border-border bg-background sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 py-4 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground hover:bg-accent"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
