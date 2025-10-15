"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { CartItem } from "@/hooks/useCart"

type Props = {
  cart: CartItem[]
  total: number
  onRemove: (id: number) => void
  onFinish: (address: string, paymentMethod: string) => void
  isOpen: boolean
  toggle: () => void
}

export default function CartDrawer({ cart, total, onRemove, onFinish, isOpen, toggle }: Props) {
  const [address, setAddress] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleFinish = () => {
    if (!address.trim()) {
      setError("🏠 Por favor, insira o endereço de entrega.")
      return
    }
    if (!paymentMethod) {
      setError("💳 Selecione a forma de pagamento.")
      return
    }

    onFinish(address, paymentMethod)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="fixed top-0 right-0 w-80 h-full bg-white dark:bg-[#1a1a1a] shadow-2xl p-6 z-50 flex flex-col text-gray-900 dark:text-gray-100"
        >
          <h2 className="text-xl font-bold mb-4">🛒 Seu Pedido</h2>

          {cart.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">Carrinho vazio</p>
          ) : (
            <>
              <ul className="flex-1 overflow-y-auto">
                {cart.map(p => (
                  <li
                    key={p.id}
                    className="border-b border-gray-200 dark:border-gray-700 py-2 flex justify-between items-start gap-2"
                  >
                    <div className="flex-1">
                      <span className="font-medium text-[#a89050]">{p.name}</span>
                      {p.description && (
                        <pre className="text-xs text-gray-500 dark:text-gray-400 whitespace-pre-wrap mt-1">
                          {p.description}
                        </pre>
                      )}
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
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

              {/* 🏠 Endereço */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Endereço de entrega:
                </label>
                <textarea
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  rows={2}
                  placeholder="Ex: Bloco B 3001"
                  className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#a89050] bg-gray-50 dark:bg-[#2a2a2a] text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>

              {/* 💳 Pagamento */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Forma de pagamento:
                </label>
                <select
                  value={paymentMethod}
                  onChange={e => setPaymentMethod(e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#a89050] bg-gray-50 dark:bg-[#2a2a2a] text-gray-900 dark:text-gray-100"
                >
                  <option value="">Selecione...</option>
                  <option value="Pix">Pix</option>
                  <option value="Cartão">Cartão</option>
                  <option value="Dinheiro">Dinheiro</option>
                </select>
              </div>

              {/* 🟢 Botão Finalizar */}
              <div className="mt-5">
                <p className="font-semibold mb-2">Total: R$ {total.toFixed(2)}</p>
                <button
                  onClick={handleFinish}
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                >
                  Finalizar Pedido
                </button>
              </div>
            </>
          )}

          {/* ❌ Fechar Drawer */}
          <button
            onClick={toggle}
            className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
          >
            ✕
          </button>

          {/* ⚠️ Modal de erro */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]"
              >
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.8 }}
                  className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-2xl p-6 w-72 text-center text-gray-900 dark:text-gray-100"
                >
                  <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-3">
                    ⚠️ Atenção
                  </h3>
                  <p className="text-sm mb-4">{error}</p>
                  <button
                    onClick={() => setError(null)}
                    className="bg-[#a89050] text-white px-4 py-2 rounded-lg hover:opacity-90"
                  >
                    OK
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
