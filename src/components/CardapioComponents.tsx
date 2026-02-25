// components/CardapioComponents.tsx
"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { products } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/UI/ProductCard";
import ComboModal from "@/components/UI/ComboModal";
import CartDrawer from "@/components/UI/CartDrawer";
import FloatingCartButton from "@/components/UI/FloatingCartButton";
import AuthModal from "@/components/UI/AuthModal";
import { checkUserSession } from "@/services/authClient";
import type { Product } from "@/types/Product";
import { AnimatePresence, motion } from "framer-motion";
export default function CardapioComponents() {
  const { cart, addToCart, removeFromCart, decreaseFromCart, total } = useCart();

  const [selectedCombo, setSelectedCombo] = useState<Product | null>(null);
  const [isCartOpen, setCartOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isOpenNow = useMemo(() => {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    const diasPermitidos = [4, 5, 6];




    return diasPermitidos.includes(day) && hour >= 19 && hour < 22;
  }, []);
  const handleFinish = (address: string, paymentMethod: string, obs: string) => {
    if (!address.trim()) {
      alert("🏠 Informe o endereço de entrega.");
      return;
    }


    let message = `🍣 *Novo Pedido - Melina Sushi*\n\n`;

    message += cart
      .map((item) => {
        let block = `*${item.name}*\n`;

        // 🔥 quantidade + subtotal
        block += `${item.quantity}x • Subtotal: R$ ${(item.price * item.quantity).toFixed(2)}\n`;

        // 🔥 descrição (normal ou combo)
        if (item.description) {
          block += `${item.description}\n`;
        }

        return block;
      })
      .join("\n");

    message += `\n💰 *Total:* R$ ${total.toFixed(2)}`;
    message += `\n🏠 *Endereço:* ${address}`;
    message += `\n💳 *Pagamento:* ${paymentMethod}`;

    // ✅ SE FOR PIX, ADICIONA OS DADOS
    if (paymentMethod.toLowerCase().includes("pix")) {
      message += `\n\n🔑 *Dados para PIX:*`;
      message += `\n📱 *Chave:* 11988536110`;
      message += `\n👤 *Nome:* Arthur Cesar Santos de Araujo`;
    }

    if (obs.trim()) {
      message += `\n📝 *Observações:* ${obs}`;
    }

    const phone = "5511988536110";

    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };


  return (
    <>
      {/* HEADER PREMIUM */}
      <header className="w-full relative">
        {/* Banner */}
        <div className="relative w-full h-56 md:h-80 lg:h-[420px] overflow-hidden">
          <Image
            src="/banner.png"
            alt="Banner Melina Sushi"
            fill
            priority
            className="object-cover"
          />

          {/* overlays pra sofisticar */}
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/35 to-[#0b0b0b]" />

          {/* glow dourado */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[520px] h-[220px] bg-[#a89050]/20 blur-3xl rounded-full" />
        </div>

        {/* Conteúdo do header */}
        <div className="max-w-6xl mx-auto px-4 -mt-16 md:-mt-20 relative z-10">
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-xl">
            <div className="p-5 md:p-7 flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
              {/* Logo + nome */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[#a89050]/70 to-transparent blur-md" />
                  <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border border-white/15 bg-black/30">
                    <Image
                      src="/melina.png"
                      alt="Logo Melina Sushi"
                      fill
                      sizes="96px"
                      className="object-cover"
                    />

                  </div>
                </div>

                <div>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                    <span className="text-white">Melina</span>{" "}
                    <span className="text-[#a89050]">Sushi</span>
                  </h2>
                  <p className="text-sm text-gray-300">
                    Delivery artesanal com amor e sabor 🍣
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {isOpenNow ? (
                      <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200">
                        <span className="h-2 w-2 rounded-full bg-emerald-400" />
                        Aberto agora
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2 rounded-full border border-rose-400/20 bg-rose-500/10 px-3 py-1 text-xs text-rose-200">
                        <span className="h-2 w-2 rounded-full bg-rose-400" />
                        Fechado
                      </span>
                    )}

                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-200">
                      🕒 19h às 22h
                    </span>
                  </div>
                </div>
              </div>

              {/* Cards info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full md:w-[420px]">
                <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                  <p className="text-xs text-gray-400">Funcionamento</p>
                  <p className="text-sm text-gray-200 mt-1">
                    Quin a Sáb • 19h às 22h
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Cardápio virtual
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                  <p className="text-xs text-gray-400">Pagamentos</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-gray-200">
                      💳 Crédito
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-gray-200">
                      💸 Pix
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-gray-200">
                      💸 Dinheiro
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* linha fina */}
            <div className="h-px w-full bg-white/10" />

            {/* endereço / extra */}
            <div className="p-5 md:p-6 flex flex-col md:flex-row gap-2 md:items-center md:justify-between">
              <p className="text-sm text-gray-300">
                📍 Rua Manoel Soares de Oliveira 51 — Itacolomi, São Paulo/SP
              </p>

              <p className="text-xs text-gray-500">
                Taxa de entrega conforme região
              </p>
            </div>
          </div>
        </div>
      </header>


      {/* CONTEÚDO */}
      <main className="max-w-5xl mx-auto py-8 px-4 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6 text-[#a89050]">Cardápio</h1>

        {["Pratos Quentes", "Pratos Crus", "Combos"].map((category) => (
          <section key={category} className="mb-10 w-full">
            <h2 className="text-2xl font-bold mb-4 text-[#a89050]">{category}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products
                .filter((p) => p.category === category)
                .map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAdd={(p) => {
                      if (!isOpenNow) {
                        setError("⏰ Estamos fechados. Aberto de quinta a sábado, das 19h às 22h.");
                        return;
                      }
                      addToCart(p);
                    }}
                    onOpenCombo={setSelectedCombo}
                  />
                ))}
            </div>
          </section>
        ))}
      </main>

      {/* CARRINHO */}
      <FloatingCartButton cart={cart} onClick={() => setCartOpen(true)} />

      <CartDrawer
        cart={cart}
        total={total}
        isOpen={isCartOpen}
        onClose={() => setCartOpen(false)}
        onRemove={removeFromCart}
        onDecrease={decreaseFromCart}
        onFinish={handleFinish}
      />

      {/* COMBO */}
      {selectedCombo && (
        <ComboModal
          combo={selectedCombo}
          onClose={() => setSelectedCombo(null)}
          onConfirm={(items, totalCombo) => {
            addToCart({
              id: Date.now(),
              name: "Combo Personalizado 🍱",
              description: items.map((i) => `${i.quantity}x ${i.name}`).join("\n"),
              image: "/combo.jpg",
              category: "Combos",
              price: totalCombo,
            });
            setSelectedCombo(null);
          }}
        />
      )}
      <AnimatePresence>
  {error && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center p-4"
      onClick={() => setError(null)}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
        className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl border border-orange-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-lg font-extrabold text-[#FF5722]">Atenção</p>
            <p className="text-sm text-gray-700 mt-1">{error}</p>
          </div>

          <button
            type="button"
            onClick={() => setError(null)}
            className="text-gray-400 hover:text-gray-600 text-lg"
          >
            ✕
          </button>
        </div>

        <button
          type="button"
          onClick={() => setError(null)}
          className="mt-4 w-full py-2.5 rounded-xl font-semibold text-white bg-gradient-to-r from-[#FF5722] to-[#FFC107] shadow-md hover:shadow-lg transition-all"
        >
          OK
        </button>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
    </>
  );
}
