"use client"

import { Search } from "lucide-react"

interface HeaderProps {
  onSearch: (query: string) => void
}

export default function Header({ onSearch }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-12">
            <a href="/" className="text-2xl font-bold tracking-tight">
              BAGSMITH
            </a>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#" className="text-sm font-medium hover:text-muted-foreground transition-colors">
                Shop
              </a>
              <a href="#" className="text-sm font-medium hover:text-muted-foreground transition-colors">
                Collections
              </a>
              <a href="#" className="text-sm font-medium hover:text-muted-foreground transition-colors">
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
                onChange={(e) => onSearch(e.target.value)}
                className="pl-10 pr-4 py-2 bg-secondary border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring w-64"
              />
            </div>
            <button className="text-sm font-medium">Cart (0)</button>
          </div>
        </div>
      </div>
    </header>
  )
}
