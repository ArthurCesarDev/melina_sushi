"use client"
import { motion, AnimatePresence } from "framer-motion"
import { CartItem } from "@/hooks/useCart"

type Props = {
  cart: CartItem[]
  total: number
  onRemove: (id: number) => void
  onFinish: () => void
  isOpen: boolean
  toggle: () => void
}

export default function CartDrawer({ cart, total, onRemove, onFinish, isOpen, toggle }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="fixed top-0 right-0 w-80 h-full bg-white shadow-2xl p-6 z-50 flex flex-col"
        >
          <h2 className="text-xl font-bold mb-4">🛒 Seu Pedido</h2>

          {cart.length === 0 ? (
            <p className="text-gray-500">Carrinho vazio</p>
          ) : (
            <>
              <ul className="flex-1 overflow-y-auto">
                {cart.map(p => (
                  <li key={p.id} className="border-b py-2 flex justify-between items-center">
                    <div>
                      <span className="font-medium">{p.name}</span>
                      <p className="text-sm text-gray-500">
                        {p.quantity}x R$ {p.price.toFixed(2)}
                      </p>
                    </div>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => onRemove(p.id)}
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-4">
                <p className="font-semibold mb-2">Total: R$ {total.toFixed(2)}</p>
                <button
                  onClick={onFinish}
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                >
                  Finalizar Pedido
                </button>
              </div>
            </>
          )}

          <button
            onClick={toggle}
            className="absolute top-4 right-4 text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
