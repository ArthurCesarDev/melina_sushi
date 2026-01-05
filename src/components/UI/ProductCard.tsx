"use client";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useRef } from "react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types/Product";

type Props = {
  product: Product;
  onAdd: (p: Product) => void;
  onOpenCombo: (p: Product) => void;
};

export default function ProductCard({ product, onAdd, onOpenCombo }: Props) {
  const { cart, decreaseFromCart } = useCart();
  const item = cart.find((i) => i.id === product.id);
  const quantity = item?.quantity ?? 0;

  const controls = useAnimation();
  const imgRef = useRef<HTMLDivElement>(null);

  const handleAddWithEffect = () => {
    const img = imgRef.current;
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
      document.body.appendChild(clone);

      // Calcula o deslocamento até o carrinho
      const translateX = cartRect.left - imgRect.left;
      const translateY = cartRect.top - imgRect.top;

      requestAnimationFrame(() => {
        clone.style.transform = `translate(${translateX}px, ${translateY}px) scale(0.1)`;
        clone.style.opacity = "0";
      });

      setTimeout(() => clone.remove(), 800);
    }

    onAdd(product);
  };


  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 250, damping: 15 }}
      className="group bg-white/95 backdrop-blur-md border border-[#FF5722]/10 rounded-2xl shadow-sm hover:shadow-lg overflow-hidden transition-all flex flex-col justify-between"
    >
      {/* Imagem */}
      <div ref={imgRef} className="relative w-full h-44 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Conteúdo */}
      <div className="flex-1 flex flex-col justify-between text-center px-4 py-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
          <p className="text-sm text-gray-500 line-clamp-2 mt-1">
            {product.description}
          </p>

          {product.category !== "Combos" && (
            <p className="font-bold text-[#FF5722] mt-2">
              R$ {product.price.toFixed(2)}
            </p>
          )}
        </div>

        {/* Botões */}
        <div className="mt-4">
          {product.category === "Combos" ? (
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => onOpenCombo(product)}
              className="w-full py-2 rounded-full bg-gradient-to-r from-[#FF5722] to-[#FFC107] text-white font-medium shadow-md hover:shadow-lg transition-all"
            >
              Montar Combo 🍱
            </motion.button>
          ) : quantity === 0 ? (
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleAddWithEffect}
              animate={controls}
              className="w-full py-2 rounded-full bg-gradient-to-r from-[#FF5722] to-[#FFC107] text-white font-medium shadow-md hover:shadow-lg transition-all"
            >
              Adicionar
            </motion.button>
          ) : (
            <div className="flex items-center justify-center gap-3">
              {/* Botão - */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => decreaseFromCart(product.id)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-[#FF5722] to-[#FFC107] text-white font-bold shadow-md hover:shadow-lg transition-all"
              >
                −
              </motion.button>

              {/* Quantidade */}
              <span className="text-gray-900 font-semibold text-base w-6 text-center">
                {quantity}
              </span>



              {/* Botão + */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleAddWithEffect}
                animate={controls}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-[#FF5722] to-[#FFC107] text-white font-bold shadow-md hover:shadow-lg transition-all"
              >
                +
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
