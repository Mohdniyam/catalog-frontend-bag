export default function Hero() {
  return (
    <section className="relative bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="max-w-3xl">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-balance">
            Crafted for the Modern Journey
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed">
            Discover our collection of premium bags designed for style, durability, and everyday adventures.
          </p>
          <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity">
            Explore Collection
          </button>
        </div>
      </div>

      <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block">
        <img src="/premium-leather-backpack-on-minimal-background.jpg" alt="Featured bag" className="h-full w-full object-cover" />
      </div>
    </section>
  )
}
