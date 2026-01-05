"use client";
import type { Product } from "@/types/Product";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function ComboModal({
  combo,
  onConfirm,
  onClose,
}: {
  combo: Product;
  onClose: () => void;
  onConfirm: (
    items: { name: string; quantity: number; price: number }[],
    totalPrice: number
  ) => void;
}) {
  const [items, setItems] = useState<
    { name: string; price: number; quantity: number }[]
  >([]);

  const totalPrice = items.reduce((acc, i) => acc + i.price * i.quantity, 0);

  // ref para capturar a imagem do combo (pra fazer o voo)
  const comboImgRef = useRef<HTMLDivElement>(null);

  const handleConfirmWithEffect = () => {
    const img = comboImgRef.current;
    const cartButton = document.getElementById("floating-cart");

    if (img && cartButton) {
      const imgRect = img.getBoundingClientRect();
      const cartRect = cartButton.getBoundingClientRect();

      const clone = img.cloneNode(true) as HTMLDivElement;
      clone.style.position = "fixed";
      clone.style.left = `${imgRect.left}px`;
      clone.style.top = `${imgRect.top}px`;
      clone.style.width = `${imgRect.width}px`;
      clone.style.height = `${imgRect.height}px`;
      clone.style.zIndex = "9999";
      clone.style.transition = "all 0.8s cubic-bezier(0.25, 1, 0.5, 1)";
      clone.style.borderRadius = "12px";
      clone.style.overflow = "hidden";
      clone.style.opacity = "1";
      document.body.appendChild(clone);

      // movimento até o carrinho flutuante
      const translateX = cartRect.left - imgRect.left;
      const translateY = cartRect.top - imgRect.top;

      requestAnimationFrame(() => {
        clone.style.transform = `translate(${translateX}px, ${translateY}px) scale(0.1)`;
        clone.style.opacity = "0";
      });

      setTimeout(() => clone.remove(), 800);
    }

    // executa a ação de confirmação normal
    onConfirm(items, totalPrice);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="relative bg-white/95 backdrop-blur-md border border-orange-100 rounded-2xl shadow-2xl w-full max-w-sm p-6 text-gray-800"
        >
          {/* Botão Fechar */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
          >
            ✕
          </button>

          {/* Imagem e título */}
          <div ref={comboImgRef} className="relative w-full h-32 rounded-xl overflow-hidden mb-4">
            <Image
              src={combo.image || "/combo.jpg"}
              alt={combo.name}
              fill
              className="object-cover"
            />
          </div>

          <h3 className="text-2xl font-bold text-[#FF5722] text-center mb-1">
            {combo.name}
          </h3>
          <p className="text-center text-gray-500 text-sm mb-4">
            {combo.description}
          </p>

          {/* Opções do combo */}
          <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
            {combo.options?.map((opt) => {
              const selected = items.find((i) => i.name === opt.name);
              const quantity = selected?.quantity ?? 0;

              return (
                <div
                  key={opt.name}
                  className="flex items-center justify-between bg-white/80 border border-gray-100 rounded-lg p-3 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{opt.name}</span>
                    <span className="text-xs text-gray-500">
                      R$ {opt.price.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setItems((prev) =>
                          prev
                            .map((i) =>
                              i.name === opt.name
                                ? { ...i, quantity: i.quantity - 1 }
                                : i
                            )
                            .filter((i) => i.quantity > 0)
                        )
                      }
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-[#FF5722] to-[#FFC107] text-white font-bold shadow hover:shadow-md transition-all"
                    >
                      −
                    </button>
                    <span className="font-semibold w-5 text-center text-gray-700">
                      {quantity}
                    </span>
                    <button
                      onClick={() =>
                        setItems((prev) => [
                          ...prev.filter((i) => i.name !== opt.name),
                          { ...opt, quantity: quantity + 1 },
                        ])
                      }
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-[#FF5722] to-[#FFC107] text-white font-bold shadow hover:shadow-md transition-all"
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Total e ações */}
          <div className="mt-5 border-t border-gray-200 pt-3">
            <p className="font-semibold text-lg text-gray-800 text-right mb-3">
              Total: <span className="text-[#FF5722]">R$ {totalPrice.toFixed(2)}</span>
            </p>

            <motion.button
              whileTap={{ scale: 0.97 }}
              disabled={items.length === 0}
              onClick={handleConfirmWithEffect}
              className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[#FF5722] to-[#FFC107] shadow-md hover:shadow-lg transition-all disabled:opacity-50"
            >
              Confirmar Combo 🍱
            </motion.button>

            <button
              onClick={onClose}
              className="w-full py-2 mt-2 text-gray-500 font-medium hover:text-red-500 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
