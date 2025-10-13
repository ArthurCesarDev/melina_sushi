"use client"
import { products } from "@/lib/products"
import ProductCard from "@/components/ProductCard"
import { useCart } from "@/hooks/useCart"

export default function Home() {
  const { cart, addToCart, removeFromCart, total } = useCart()

  const handleFinish = () => {
    const message = encodeURIComponent(
      `🍣 *Novo Pedido:*\n\n${cart
        .map(p => `• ${p.name} - R$ ${p.price.toFixed(2)}`)
        .join("\n")}\n\n*Total:* R$ ${total.toFixed(2)}`
    )
    window.open(`https://wa.me/5581999999999?text=${message}`, "_blank")
  }

  return (
    <main className="max-w-5xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">🍱 Cardápio</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map(p => (
          <ProductCard key={p.id} product={p} onAdd={addToCart} />
        ))}
      </div>

      {cart.length > 0 && (
        <div className="fixed bottom-4 left-0 right-0 flex justify-center">
          <button
            className="bg-green-600 text-white px-8 py-3 rounded-full shadow-lg text-lg"
            onClick={handleFinish}
          >
            Finalizar Pedido ({cart.length}) – R$ {total.toFixed(2)}
          </button>
        </div>
      )}
    </main>
  )
}
