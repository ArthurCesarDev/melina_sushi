"use client";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Header from "./components/Header";
import MenuSection from "./components/MenuSection";
import FloatingCartButton from "./components/FloatingCartButton";
import ComboHandler from "./components/ComboHandler";
import CartDrawer from "../cardapio/components/CartDrawer";
import Footer from "@/components/Footer";

export default function CardapioPage() {
  const { cart, addToCart, removeFromCart, total } = useCart();
  const [isCartOpen, setCartOpen] = useState(false);
  const [selectedCombo, setSelectedCombo] = useState(null);

  const handleFinish = (address: string, paymentMethod: string, obs: string) => {
    if (total < 14.99) {
      alert("⚠️ O pedido mínimo é de R$ 14,99.");
      return;
    }

    let message = `🍣 *Novo Pedido - Melina Sushi:*\n\n${cart
      .map(
        (p) =>
          `• ${p.name}${p.description ? `\n  ${p.description}` : ""}\n  ${p.quantity}x R$ ${(p.price * p.quantity).toFixed(
            2
          )}`
      )
      .join("\n\n")}\n\n*Total:* R$ ${total.toFixed(2)}\n\n🏠 *Endereço:* ${address}\n💳 *Pagamento:* ${paymentMethod}`;

    if (obs.trim()) message += `\n📝 *Observações:* ${obs}`;
    if (paymentMethod === "Pix") message += `\n\n💰 *Pagamento via PIX*\n🔑 *Chave:* 11988536110\n👤 *Nome:* Arthur Cesar`;

    window.open(`https://wa.me/5511988536110?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto py-8 px-4 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6 text-center text-[#a89050]">Cardápio</h1>

        <MenuSection onAdd={addToCart} />

        <FloatingCartButton cart={cart} onClick={() => setCartOpen(true)} />

        <CartDrawer
          cart={cart}
          total={total}
          onRemove={removeFromCart}
          onFinish={handleFinish}
          isOpen={isCartOpen}
          toggle={() => setCartOpen(false)}
        />

        <ComboHandler
          selectedCombo={selectedCombo}
          setSelectedCombo={setSelectedCombo}
          addToCart={addToCart}
        />
      </main>
      <Footer />
    </>
  );
}
