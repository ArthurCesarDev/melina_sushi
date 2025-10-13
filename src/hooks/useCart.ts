import { useState } from "react"
import { Product } from "@/types/Product"

export function useCart() {
  const [cart, setCart] = useState<Product[]>([])

  const addToCart = (product: Product) => {
    setCart(prev => [...prev, product])
  }

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(p => p.id !== id))
  }

  const total = cart.reduce((acc, p) => acc + p.price, 0)

  return { cart, addToCart, removeFromCart, total }
}
