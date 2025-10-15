
"use client"
import { useState } from "react"
import { Product } from "@/types/Product"

type Props = {
  combo: Product
  onConfirm: (selectedItems: { name: string; price: number; quantity: number }[]) => void
  onClose: () => void
}

export default function ComboModal({ combo, onConfirm, onClose }: Props) {
  const [selected, setSelected] = useState<
    { name: string; price: number; quantity: number }[]
  >([])

  const handleQuantity = (item: { name: string; price: number }, delta: number) => {
    const exists = selected.find(s => s.name === item.name)

    if (exists) {
      const newQty = exists.quantity + delta
      if (newQty <= 0) {
        setSelected(selected.filter(s => s.name !== item.name))
      } else {
        setSelected(
          selected.map(s =>
            s.name === item.name ? { ...s, quantity: newQty } : s
          )
        )
      }
    } else if (delta > 0) {
      setSelected([...selected, { ...item, quantity: 1 }])
    }
  }

  const total = selected.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const hasSelection = selected.length > 0 // ✅ verifica se tem algo selecionado

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-96 shadow-xl">
        <h2 className="text-xl font-bold text-[#a89050] mb-3">{combo.name}</h2>
        <p className="text-gray-600 text-sm mb-4">{combo.description}</p>

        <div className="space-y-2 max-h-60 overflow-y-auto">
          {combo.options?.map((opt, i) => {
            const item = selected.find(s => s.name === opt.name)
            return (
              <div
                key={i}
                className="flex justify-between items-center p-2 bg-gray-100 rounded-lg"
              >
                <div>
                  <span className="font-medium">{opt.name}</span>
                  <p className="text-xs text-gray-500">R$ {opt.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  {/* Botão de diminuir */}
                  <button
                    onClick={() => handleQuantity(opt, -1)}
                    className="w-7 h-7 flex items-center justify-center text-lg font-bold
               rounded-full border border-[#a89050] text-[#a89050]
               hover:bg-[#a89050] hover:text-white
               dark:border-[#d4b660] dark:text-[#d4b660] dark:hover:bg-[#d4b660] dark:hover:text-[#0a0a0a]
               transition-colors"
                  >
                    −
                  </button>

                  <span className="w-6 text-center">{item ? item.quantity : 0}</span>

                  {/* Botão de aumentar */}
                  <button
                    onClick={() => handleQuantity(opt, 1)}
                    className="w-7 h-7 flex items-center justify-center text-lg font-bold
               rounded-full bg-[#a89050] text-white
               hover:bg-[#917c3f]
               dark:bg-[#d4b660] dark:text-[#0a0a0a] dark:hover:bg-[#c4a840]
               transition-colors"
                  >
                    +
                  </button>
                </div>

              </div>
            )
          })}
        </div>

        <div className="mt-4 border-t pt-3">
          <p className="font-semibold text-[#a89050]">
            Total: R$ {total.toFixed(2)}
          </p>
          <div className="flex justify-end mt-3 gap-2">
            <div className="flex justify-end gap-3 mt-6">
              {/* 🔹 Botão Cancelar — neutro, elegante */}
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-[#a89050] text-[#a89050] hover:bg-[#a89050] hover:text-white transition-colors dark:text-[#d4b660] dark:border-[#d4b660] dark:hover:bg-[#d4b660] dark:hover:text-[#0a0a0a]"
              >
                Cancelar
              </button>

              {/* 🔸 Botão Confirmar — destaque principal */}
              <button
                onClick={() => hasSelection && onConfirm(selected)}
                disabled={!hasSelection}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${hasSelection
                  ? "bg-[#a89050] text-white hover:bg-[#917c3f] dark:bg-[#d4b660] dark:text-[#0a0a0a] dark:hover:bg-[#c4a840]"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
                  }`}
              >
                Confirmar
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
