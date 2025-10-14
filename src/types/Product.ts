export type Product = {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: "Pratos Quentes" | "Pratos Crus" | "Combos"
  options?: {
    id?: number
    name: string
    price: number
  }[]
}
