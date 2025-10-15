"use client"
import Image from "next/image"
import { Product } from "@/types/Product"
import { motion } from "framer-motion"
import { useCart } from "@/context/CartContext"
import { useFlyToCart } from "@/hooks/useFlyToCart"

type Props = {
  product: Product
  onAdd: (product: Product) => void
}

export default function ProductCard({ product }: Props) {
  const { cart, addToCart, decreaseFromCart } = useCart()
  const { fly } = useFlyToCart()

  const itemInCart = cart.find(p => p.id === product.id)
  const quantity = itemInCart?.quantity ?? 0

  const handleAdd = (e: React.MouseEvent) => {
    // encontra o card inteiro
    const card = (e.currentTarget as HTMLElement).closest(".product-card")
    const img = card?.querySelector("img") as HTMLImageElement | null
    const cartBtn = document.getElementById("cart-button")

    if (img && cartBtn) {
      fly(img, cartBtn)
    }

    addToCart(product)
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="product-card rounded-2xl shadow-lg p-4 bg-white flex flex-col justify-between h-[400px] dark:bg-[#1a1a1a] transition"
    >
      {/* 🖼️ Imagem */}
      <div className="w-full h-48 rounded-xl overflow-hidden flex items-center justify-center">
        <Image
          src={product.image}
          alt={product.name}
          width={220}
          height={220}
          className="object-cover w-full h-full"
        />
      </div>

      {/* 📜 Texto */}
      <div className="flex flex-col flex-grow justify-between mt-3 text-center">
        <div>
          <h3 className="font-semibold text-lg">{product.name}</h3>
          <p className="text-sm text-gray-500">{product.description}</p>
        </div>

        {/* 💰 Preço + Botão */}
        <div className="mt-3">
          {product.category !== "Combos" && product.price !== undefined && (
            <span className="block text-[#a89050] font-bold mb-2">
              R$ {product.price.toFixed(2)}
            </span>
          )}

          {/* Se for um combo → abre modal */}
          {product.category === "Combos" ? (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const event = new CustomEvent("open-combo-modal", { detail: product })
                window.dispatchEvent(event)
              }}
              className="bg-[#a89050] text-white px-4 py-2 rounded-full shadow-md hover:opacity-90 w-full dark:bg-[#d4b660] dark:text-[#0a0a0a] dark:hover:bg-[#c4a840]"
            >
              Montar Combo 🍱
            </motion.button>
          ) : quantity === 0 ? (
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="bg-[#a89050] text-white px-4 py-2 rounded-full shadow-md hover:opacity-90 w-full dark:bg-[#d4b660] dark:text-[#0a0a0a] dark:hover:bg-[#c4a840]"
              onClick={handleAdd}
            >
              Adicionar
            </motion.button>
          ) : (
            <div className="flex justify-center items-center gap-3">
              <button
                onClick={() => decreaseFromCart(product.id)}
                className="w-8 h-8 flex items-center justify-center text-lg font-bold
                   rounded-full border border-[#a89050] text-[#a89050]
                   hover:bg-[#a89050] hover:text-white
                   dark:border-[#d4b660] dark:text-[#d4b660]
                   dark:hover:bg-[#d4b660] dark:hover:text-[#0a0a0a]"
              >
                −
              </button>
              <span className="text-lg font-semibold">{quantity}</span>
              <button
                onClick={handleAdd}
                className="w-8 h-8 flex items-center justify-center text-lg font-bold
                   rounded-full bg-[#a89050] text-white hover:bg-[#917c3f]
                   dark:bg-[#d4b660] dark:text-[#0a0a0a]
                   dark:hover:bg-[#c4a840]"
              >
                ＋
              </button>
            </div>
          )}
        </div>

      </div>
    </motion.div>
  )
}
