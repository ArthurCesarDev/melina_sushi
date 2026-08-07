"use client";

import type { CartItem } from "@/features/cart/domain/cart";

type FloatingCartButtonProps = {
  cart: CartItem[];
  onClick: () => void;
};

export default function FloatingCartButton({ cart, onClick }: FloatingCartButtonProps) {
  const totalItens = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <button
      id="floating-cart"
      onClick={onClick}
      className="fixed bottom-5 right-5 flex items-center gap-2 bg-gradient-to-r from-[#FF5722] to-[#FFC107] text-white font-semibold px-5 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 active:scale-95"
    >
      <span className="text-lg">🛒</span>
      <span className="text-sm">({totalItens})</span>
    </button>
  );
}
