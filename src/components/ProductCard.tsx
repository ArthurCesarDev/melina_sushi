"use client"
import Image from "next/image"
import { Product } from "@/types/Product"
import { motion } from "framer-motion"
import { useCart } from "@/context/CartContext"
import { useFlyToCart } from "@/hooks/useFlyToCart"

type Props = {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const { cart, addToCart, decreaseFromCart, removeFromCart } = useCart()
  const { fly } = useFlyToCart()

  const itemInCart = cart.find(p => p.id === product.id)
  const quantity = itemInCart?.quantity ?? 0

  // 🔸 agora vale tanto pra Temaki Empanado quanto Philadelphia
  const isPromoTemaki =
    product.name.includes("Temaki Empanado 120g") ||
    product.name.includes("Temaki Philadelphia 120g")

  const handleAdd = (e?: React.MouseEvent) => {
    const card = e ? (e.currentTarget as HTMLElement).closest(".product-card") : null
    const img = card?.querySelector("img") as HTMLImageElement | null
    const cartBtn = document.getElementById("cart-button")
    if (img && cartBtn) fly(img, cartBtn)

    // 🧠 regra especial para os dois temakis
    if (isPromoTemaki && quantity === 1) {
      removeFromCart(product.id)

      const promoItem = {
        ...product,
        id: Date.now() + Math.random(),
        description: "1x R$ 19,99 + 1x R$ 14,99",
        price: 34.98,
        quantity: 1,
      }

      addToCart(promoItem)
      return
    }

    addToCart(product)
  }

  const handleOpenCombo = () => {
    const event = new CustomEvent("open-combo-modal", { detail: product })
    window.dispatchEvent(event)
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

          {/* ⭐ destaque de promoção */}
          
          {(product.name.includes("Temaki Empanado 120g") ||
            product.name.includes("Temaki Philadelphia 120g")) && (
              <div className="mt-2 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 text-xs font-semibold rounded-lg py-1 px-2 inline-block">
                🎉 Promoção: O segundo sai por apenas R$ 14,99!
              </div>
            )}
        </div>

        {/* 💰 Preço + Botão */}
        <div className="mt-3">
          {product.category !== "Combos" && product.price !== undefined && (
            <span className="block text-[#a89050] font-bold mb-2">
              R$ {product.price.toFixed(2)}
            </span>
          )}

          {/* 🍱 Fluxo 1 - COMBOS */}
          {product.category === "Combos" ? (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenCombo}
              className="bg-[#a89050] text-white px-4 py-2 rounded-full shadow-md hover:opacity-90 w-full 
                         dark:bg-[#d4b660] dark:text-[#0a0a0a] dark:hover:bg-[#c4a840]"
            >
              Montar Combo 🍱
            </motion.button>
          ) : isPromoTemaki ? (
            /* 🍣 Fluxo 2 - Temakis promocionais */
            <>
              {quantity === 0 ? (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdd}
                  className="bg-[#a89050] text-white px-4 py-2 rounded-full shadow-md hover:opacity-90 w-full 
                             dark:bg-[#d4b660] dark:text-[#0a0a0a] dark:hover:bg-[#c4a840]"
                >
                  Adicionar
                </motion.button>
              ) : quantity === 1 ? (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdd}
                  className="bg-[#a89050] text-white px-4 py-2 rounded-full shadow-md hover:opacity-90 w-full 
                             dark:bg-[#d4b660] dark:text-[#0a0a0a] dark:hover:bg-[#c4a840]"
                >
                  Aplicar Promoção 🎉
                </motion.button>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdd}
                  className="bg-[#a89050] text-white px-4 py-2 rounded-full shadow-md hover:opacity-90 w-full 
                             dark:bg-[#d4b660] dark:text-[#0a0a0a] dark:hover:bg-[#c4a840]"
                >
                  Adicionar
                </motion.button>
              )}
            </>
          ) : (
            /* 🧩 Fluxo 3 - padrão (− 1 +) */
            <>
              {quantity === 0 ? (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdd}
                  className="bg-[#a89050] text-white px-4 py-2 rounded-full shadow-md hover:opacity-90 w-full 
                             dark:bg-[#d4b660] dark:text-[#0a0a0a] dark:hover:bg-[#c4a840]"
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
            </>
          )}
        </div>
      </div>
    </motion.div>
  )
}
