"use client"
import { products } from "@/lib/products"
import CategorySection from "@/components/CategorySection"
import CartDrawer from "@/components/CartDrawer"
import ComboModal from "@/components/ComboModal"
import { Product } from "@/types/Product"
import { useCart } from "@/context/CartContext"
import { useState, useEffect } from "react"

export default function Home() {
  const { cart, addToCart, removeFromCart, total } = useCart()
  const [isCartOpen, setCartOpen] = useState(false)
  const [selectedCombo, setSelectedCombo] = useState<Product | null>(null)

  // 🕒 Status de funcionamento (opcional)
  const isOpen = (() => {
    const now = new Date()
    const hour = now.getHours()
    return hour >= 18 && hour < 23 // aberto das 18h às 23h
  })()

  // 🧩 Escuta o evento do botão “Montar Combo 🍱”
  useEffect(() => {
    const handleOpenCombo = (e: CustomEvent<Product>) => setSelectedCombo(e.detail)
    window.addEventListener("open-combo-modal", handleOpenCombo as EventListener)
    return () => window.removeEventListener("open-combo-modal", handleOpenCombo as EventListener)
  }, [])

  // ⚙️ Enviar pedido com verificação de valor mínimo
  const handleFinish = () => {
    if (total < 14.99) {
      alert("⚠️ O pedido mínimo é de R$ 14,99.")
      return
    }

    const message = encodeURIComponent(
      `🍣 *Novo Pedido - Melina Sushi:*\n\n${cart
        .map(
          p =>
            `• ${p.name}${p.description ? `\n  ${p.description}` : ""}\n  ${p.quantity}x R$ ${(p.price * p.quantity).toFixed(2)}`
        )
        .join("\n\n")}\n\n*Total:* R$ ${total.toFixed(2)}`
    )

    window.open(`https://wa.me/5511988536110?text=${message}`, "_blank")
  }

  return (
    <>
      {/* 🧧 Cabeçalho com banner, logo e status */}
      <header className="w-full mb-8 relative">
        {/* 📸 Banner */}
        <div className="relative h-48 w-full">
          <img
            src="/banner.png"
            alt="Banner Melina Sushi"
            className="w-full h-full object-cover"
            
          />

          {/* 🟢 / 🔴 Status */}
          <div
            className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium shadow-md ${isOpen ? "bg-green-600" : "bg-red-600"
              } text-white`}
          >
            {isOpen ? "🟢 Aberto" : "🔴 Fechado"}
          </div>
        </div>

        {/* 🥢 Logo + nome + descrição */}
        <div className="bg-white dark:bg-[#1a1a1a] flex flex-col items-center py-5 border-t border-gray-200 dark:border-gray-700 relative z-10">
          {/* 🥢 Logo sobreposta (mesma posição, só na frente) */}
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md -mt-12 bg-white relative z-20">
            <img
              src="/logo_melina.jpg"
              alt="Logo Melina Sushi"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-bold mt-3 text-[#a89050]">Melina Sushi</h2>
          <p className="text-gray-500 text-sm">
            Delivery artesanal com amor e sabor 🍣
          </p>
        </div>
      </header>


      {/* 🍱 Conteúdo principal */}
      <main className="max-w-5xl mx-auto py-8 px-4 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6 text-center text-[#a89050]">
          Cardápio
        </h1>

        {/* 🧾 Seções */}
        <CategorySection
          title="Pratos Empanados 🔥"
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

        {/* 🛒 Botão do Carrinho */}
        <button
          id="cart-button"
          onClick={() => setCartOpen(true)}
          className="fixed bottom-5 right-5 bg-[#a89050] text-white px-5 py-3 rounded-full shadow-lg text-lg hover:opacity-90 transition-transform transform hover:scale-105"
        >
          🛒 ({cart.reduce((acc, p) => acc + p.quantity, 0)})
        </button>

        {/* 🛍️ Drawer do Carrinho */}
        <CartDrawer
          cart={cart}
          total={total}
          onRemove={removeFromCart}
          onFinish={handleFinish}
          isOpen={isCartOpen}
          toggle={() => setCartOpen(false)}
        />

        {/* 🍣 Modal do Combo */}
        {selectedCombo && (
          <ComboModal
            combo={selectedCombo}
            onConfirm={(selectedItems) => {
              // 🧩 Monta descrição personalizada
              const comboDescription = selectedItems
                .map(i => `• ${i.quantity}x ${i.name} (R$ ${i.price.toFixed(2)})`)
                .join("\n")

              const totalCombo = selectedItems.reduce(
                (sum, i) => sum + i.price * i.quantity,
                0
              )

              // 🛒 Adiciona combo como item único no carrinho
              addToCart({
                id: Date.now() + Math.random(),
                name: "Combo Personalizado 🍱",
                description: comboDescription,
                price: totalCombo,
                image: "/combo.jpg",
                category: "Combos",
              })

              // 🔥 Efeito visual
              const cartBtn = document.getElementById("cart-button")
              const img = document.createElement("img")
              img.src = "/combo.jpg"
              img.style.position = "fixed"
              img.style.width = "80px"
              img.style.height = "80px"
              img.style.borderRadius = "50%"
              img.style.zIndex = "9999"
              img.style.transition = "all 0.8s cubic-bezier(0.45, 0, 0.55, 1)"
              img.style.top = "50%"
              img.style.left = "50%"
              img.style.transform = "translate(-50%, -50%)"
              document.body.appendChild(img)

              if (cartBtn) {
                const rect = cartBtn.getBoundingClientRect()
                setTimeout(() => {
                  img.style.top = rect.top + "px"
                  img.style.left = rect.left + "px"
                  img.style.width = "0px"
                  img.style.height = "0px"
                  img.style.opacity = "0"
                }, 50)
                setTimeout(() => img.remove(), 850)
              }

              setSelectedCombo(null)
            }}
            onClose={() => setSelectedCombo(null)}
          />
        )}
      </main>
    </>
  )
}
