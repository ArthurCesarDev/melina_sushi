// context/Cartcontext.tsx

"use client"
import { createContext, useContext, useMemo, useReducer } from "react"
import type { Product } from "@/features/menu/domain/product"
import { calculateCartTotal, cartReducer, type CartItem } from "@/features/cart/domain/cart"

export type { CartItem } from "@/features/cart/domain/cart"

type CartContextType = {
  cart: CartItem[]
  addToCart: (product: Product) => void
  decreaseFromCart: (id: number) => void
  removeFromCart: (id: number) => void
  total: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })
  const cart = state.items
  const total = useMemo(() => calculateCartTotal(cart), [cart])
  const addToCart = (product: Product) => dispatch({ type: "add", product })
  const decreaseFromCart = (productId: number) => dispatch({ type: "decrease", productId })
  const removeFromCart = (productId: number) => dispatch({ type: "remove", productId })

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
