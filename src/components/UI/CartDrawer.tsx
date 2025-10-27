"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2 } from "lucide-react"; // ícone leve e bonito

export default function CartDrawer({
  cart,
  total,
  isOpen,
  onClose,
  onRemove,
}: any) {
  const [obs, setObs] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("pix");

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Fundo escurecido */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="fixed top-0 right-0 w-80 sm:w-96 h-full bg-white/95 backdrop-blur-xl border-l border-orange-100 shadow-2xl z-50 flex flex-col p-6"
          >
            {/* Cabeçalho */}
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-2xl font-bold text-[#FF5722]">Seu Pedido 🛒</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-lg"
              >
                ✕
              </button>
            </div>

            {/* Itens */}
            {cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                <p className="text-sm">Carrinho vazio 😕</p>
              </div>
            ) : (
              <ul className="flex-1 overflow-y-auto pr-1">
                {cart.map((item: any) => (
                  <li
                    key={item.id}
                    className="mb-4 bg-white/80 rounded-lg shadow-sm p-3 border border-gray-100 hover:shadow-md transition-all flex items-start justify-between"
                  >
                    <div className="flex-1 pr-3">
                      <p className="font-semibold text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        {item.quantity}x R$ {item.price.toFixed(2)}
                      </p>
                      {item.description && (
                        <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                      )}
                    </div>

                    {/* Botão remover (ícone lixeira) */}
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onRemove(item.id)}
                      className="w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-r from-[#FF5722] to-[#FFC107] text-white shadow-md hover:shadow-lg transition-all"
                      title="Remover item"
                    >
                      <Trash2 size={16} />
                    </motion.button>
                  </li>
                ))}
              </ul>
            )}

            {/* Campos adicionais */}
            {cart.length > 0 && (
              <div className="mt-4 space-y-4">
                {/* Observações */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Observações ✍️
                  </label>
                  <textarea
                    value={obs}
                    onChange={(e) => setObs(e.target.value)}
                    placeholder="Ex: tirar o cream cheese, enviar shoyu..."
                    className="w-full border border-[#FF5722] rounded-lg p-2 text-sm 
             bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100
             focus:border-[#FF5722] focus:ring-2 focus:ring-[#FF5722]/40
             outline-none transition-all"
                    rows={2}
                  />

                </div>

                {/* Endereço */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Endereço de entrega 📍
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Rua, número, bairro..."
                    className="w-full border border-[#FF5722] rounded-lg p-2 text-sm 
             bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100
             focus:border-[#FF5722] focus:ring-2 focus:ring-[#FF5722]/40
             outline-none transition-all"
                  />
                </div>

                {/* Pagamento */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Forma de pagamento 💳
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {[
                      { id: "pix", label: "PIX" },
                      { id: "dinheiro", label: "Dinheiro" },
                      { id: "credito", label: "Crédito" },
                      { id: "debito", label: "Débito" },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setPayment(opt.id)}
                        className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-all ${payment === opt.id
                          ? "bg-gradient-to-r from-[#FF5722] to-[#FFC107] text-white shadow-md"
                          : "bg-white text-gray-600 border-gray-200 hover:border-[#FF5722]"
                          }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Total e botão */}
            {cart.length > 0 && (
              <div className="pt-4 border-t border-gray-200 mt-4">
                <p className="font-bold text-lg text-gray-800 flex justify-between mb-3">
                  <span>Total:</span>
                  <span>R$ {total.toFixed(2)}</span>
                </p>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[#FF5722] to-[#FFC107] shadow-md hover:shadow-lg transition-all"
                  onClick={() => {
                    console.log({
                      obs,
                      address,
                      payment,
                      cart,
                      total,
                    });
                    alert("Pedido confirmado! 🚀");
                  }}
                >
                  Confirmar Pedido
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
