"use client";
import { useEffect } from "react";
import ComboModal from "../components/ComboModal";
import { Product } from "@/types/Product";

export default function ComboHandler({ selectedCombo, setSelectedCombo, addToCart }: any) {
  useEffect(() => {
    const handleOpenCombo = (e: CustomEvent<Product>) => setSelectedCombo(e.detail);
    window.addEventListener("open-combo-modal", handleOpenCombo as EventListener);
    return () => window.removeEventListener("open-combo-modal", handleOpenCombo as EventListener);
  }, [setSelectedCombo]);

  if (!selectedCombo) return null;

  return (
    <ComboModal
      combo={selectedCombo}
      onConfirm={(selectedItems) => {
        const comboDescription = selectedItems.map((i) => `• ${i.quantity}x ${i.name} (R$ ${i.price.toFixed(2)})`).join("\n");
        const totalCombo = selectedItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
        addToCart({
          id: Date.now() + Math.random(),
          name: "Combo Personalizado 🍱",
          description: comboDescription,
          price: totalCombo,
          image: "/combo.jpg",
          category: "Combos",
        });
        setSelectedCombo(null);
      }}
      onClose={() => setSelectedCombo(null)}
    />
  );
}
