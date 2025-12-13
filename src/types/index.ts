export interface Product {
  id: number
  name: string
  description: string
  price: number
  category: string
  image: string
  colors: string[]
  isNew?: boolean
}
