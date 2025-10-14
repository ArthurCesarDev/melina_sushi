"use client"
import { products } from "@/lib/products"
import CategorySection from "@/components/CategorySection"
import CartDrawer from "@/components/CartDrawer"
import { useCart } from "@/hooks/useCart"
import { useState } from "react"

export default function Home() {
  const { cart, addToCart, removeFromCart, total } = useCart()
  const [isCartOpen, setCartOpen] = useState(false)

  const handleFinish = () => {
    const message = encodeURIComponent(
      `🍣 *Novo Pedido:*\n\n${cart
        .map(p => `• ${p.name} - R$ ${p.price.toFixed(2)}`)
        .join("\n")}\n\n*Total:* R$ ${total.toFixed(2)}`
    )
    window.open(`https://wa.me/5511988536110?text=${message}`, "_blank")

  }

  return (
    <main className="max-w-5xl mx-auto py-8 px-4 flex flex-col items-center">
      {/* 🔥 Logo centralizada */}
      <div className="w-36 h-36 rounded-full overflow-hidden mb-6 shadow-lg">
        <img
          src="/logo_melina.jpg"
          alt="Logo Sushi"
          className="w-full h-full object-cover"
        />
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center text-[#a89050]">
        Cardápio
      </h1>
      <CategorySection
        title="Pratos Quentes 🔥"
        products={products.filter(p => p.category === "Pratos Quentes")}
        onAdd={addToCart}
      />
      <CategorySection
        title="Pratos Crus"
        products={products.filter(p => p.category === "Pratos Crus")}
        onAdd={addToCart}
      />
      <CategorySection
        title="Monte seu Combo 🍱"
        products={products.filter(p => p.category === "Combos")}
        onAdd={addToCart}
      />

      {/* 🔥 ID importante pro efeito funcionar */}
      <button
        id="cart-button"
        onClick={() => setCartOpen(true)}
        className="fixed bottom-5 right-5 bg-[#a89050] text-white px-5 py-3 rounded-full shadow-lg text-lg hover:opacity-90 transition-transform transform hover:scale-105"
      >
        🛒 ({cart.length})
      </button>

      <CartDrawer
        cart={cart}
        total={total}
        onRemove={removeFromCart}
        onFinish={handleFinish}
        isOpen={isCartOpen}
        toggle={() => setCartOpen(false)}
      />
    </main>
  )
}
