// hooks/usecart.ts

"use client"
import { useState } from "react"
import { Product } from "@/types/Product"

export type CartItem = Product & { quantity: number }

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id)
      if (existing) {
        return prev.map(p =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const decreaseFromCart = (id: number) => {
    setCart(prev =>
      prev
        .map(p =>
          p.id === id ? { ...p, quantity: p.quantity - 1 } : p
        )
        .filter(p => p.quantity > 0)
    )
  }

  const total = cart.reduce((acc, p) => acc + p.price * p.quantity, 0)

  return { cart, addToCart, decreaseFromCart, total }
}
