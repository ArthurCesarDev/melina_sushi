"use client"
import { createContext, useContext, useState } from "react"
import { Product } from "@/types/Product"

export type CartItem = Product & { quantity: number }

type CartContextType = {
  cart: CartItem[]
  addToCart: (product: Product) => void
  decreaseFromCart: (id: number) => void
  removeFromCart: (id: number) => void
  total: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
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

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(p => p.id !== id))
  }

  const total = cart.reduce((acc, p) => acc + p.price * p.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        decreaseFromCart,
        removeFromCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart deve ser usado dentro de CartProvider")
  }
  return context
}
