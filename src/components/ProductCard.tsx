import { Heart } from "lucide-react"
import type { Product } from "../types"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-square bg-secondary rounded-lg overflow-hidden mb-4">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button className="absolute top-4 right-4 p-2 bg-card rounded-full hover:bg-accent transition-colors">
          <Heart className="h-5 w-5" />
        </button>
        {product.isNew && (
          <span className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-full">
            New
          </span>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-medium text-lg group-hover:text-muted-foreground transition-colors">{product.name}</h3>
          <span className="font-semibold text-lg whitespace-nowrap">${product.price}</span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        <div className="flex items-center gap-2 pt-1">
          {product.colors.map((color) => (
            <div
              key={color}
              className="h-6 w-6 rounded-full border-2 border-border"
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
