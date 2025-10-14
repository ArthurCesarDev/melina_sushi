"use client"
import Image from "next/image"
import { Product } from "@/types/Product"
import { motion } from "framer-motion"
import { useFlyToCart } from "@/hooks/useFlyToCart"

type Props = {
  product: Product
  onAdd: (product: Product) => void
}

export default function ProductCard({ product, onAdd }: Props) {
  const { fly } = useFlyToCart()

  const handleAdd = (e: React.MouseEvent) => {
    const img = (e.currentTarget.parentElement?.querySelector("img") as HTMLImageElement) || null
    const cartBtn = document.getElementById("cart-button")
    if (img && cartBtn) fly(img, cartBtn)
    onAdd(product)
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="rounded-2xl shadow-lg p-4 bg-white flex flex-col items-center justify-between h-full"
    >
      {/* 🔥 imagem com altura fixa e recorte centralizado */}
      <div className="w-full h-56 overflow-hidden rounded-xl flex items-center justify-center">
        <Image
          src={product.image}
          alt={product.name}
          width={240}
          height={240}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Conteúdo */}
      <div className="flex flex-col flex-1 justify-between w-full text-center mt-3">
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{product.description}</p>
        <span className="text-[#a89050] font-bold">R$ {product.price.toFixed(2)}</span>
      </div>

      {/* Botão sempre alinhado */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        className="mt-3 bg-[#a89050] text-white px-5 py-2 rounded-full shadow-md w-full hover:opacity-90 transition"
        onClick={handleAdd}
      >
        Adicionar
      </motion.button>
    </motion.div>
  )
}
