"use client"
import { useState } from "react"
import { Product } from "@/types/Product"
import ComboModal from "./ComboModal"

type Props = {
  product: Product
  onAdd: (product: Product) => void
}

export default function ProductCard({ product, onAdd }: Props) {
  const [open, setOpen] = useState(false)

  const handleConfirm = (selectedItems: { name: string; price: number; quantity: number }[]) => {
    // 🎯 Efeito só quando confirma o combo
    const cart = document.getElementById("cart-button")
    const img = document.querySelector(`img[alt='${product.name}']`)

    if (img && cart) {
      const imgClone = img.cloneNode(true) as HTMLElement
      const rect = img.getBoundingClientRect()
      imgClone.style.position = "fixed"
      imgClone.style.left = `${rect.left}px`
      imgClone.style.top = `${rect.top}px`
      imgClone.style.width = `${rect.width}px`
      imgClone.style.height = `${rect.height}px`
      imgClone.style.transition = "all 0.8s ease-in-out"
      imgClone.style.zIndex = "1000"
      document.body.appendChild(imgClone)

      const cartRect = cart.getBoundingClientRect()
      requestAnimationFrame(() => {
        imgClone.style.left = `${cartRect.left + cartRect.width / 2 - rect.width / 4}px`
        imgClone.style.top = `${cartRect.top + cartRect.height / 2 - rect.height / 4}px`
        imgClone.style.width = "40px"
        imgClone.style.height = "40px"
        imgClone.style.opacity = "0.3"
      })

      setTimeout(() => imgClone.remove(), 800)
    }

    // 🧾 Soma e adiciona o combo no carrinho
    const totalPrice = selectedItems.reduce((sum, i) => sum + i.price * i.quantity, 0)
    const comboProduct: Product = {
      ...product,
      name: `Combo Personalizado (${selectedItems
        .map(i => `${i.quantity}x ${i.name}`)
        .join(", ")})`,
      price: totalPrice,
      description: `${selectedItems.length} itens escolhidos`,
    }
    onAdd(comboProduct)
    setOpen(false)
  }
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white">
      <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md" />
      <h2 className="text-lg font-bold mt-2">{product.name}</h2>
      <p className="text-sm text-gray-600">{product.description}</p>

      {product.price > 0 && (
        <p className="font-semibold mt-1 text-[#a89050]">R$ {product.price.toFixed(2)}</p>
      )}

      <button
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          if (product.options) {
            setOpen(true)
          } else {
            const img = (e.currentTarget.parentNode as HTMLElement).querySelector("img")
            const cart = document.getElementById("cart-button")

            if (img && cart) {
              const imgClone = img.cloneNode(true) as HTMLElement
              const rect = img.getBoundingClientRect()
              imgClone.style.position = "fixed"
              imgClone.style.left = `${rect.left}px`
              imgClone.style.top = `${rect.top}px`
              imgClone.style.width = `${rect.width}px`
              imgClone.style.height = `${rect.height}px`
              imgClone.style.transition = "all 0.8s ease-in-out"
              imgClone.style.zIndex = "1000"
              document.body.appendChild(imgClone)

              const cartRect = cart.getBoundingClientRect()
              requestAnimationFrame(() => {
                imgClone.style.left = `${cartRect.left + cartRect.width / 2 - rect.width / 4}px`
                imgClone.style.top = `${cartRect.top + cartRect.height / 2 - rect.height / 4}px`
                imgClone.style.width = "40px"
                imgClone.style.height = "40px"
                imgClone.style.opacity = "0.3"
              })

              setTimeout(() => imgClone.remove(), 800)
            }

            onAdd(product)
          }
        }}
        className="mt-4 w-full bg-[#a89050] text-white py-2 rounded-lg hover:bg-[#917c3f] transition"
      >
        {product.options ? "Montar Combo" : "Adicionar"}
      </button>



      {open && (
        <ComboModal
          combo={product}
          onConfirm={handleConfirm}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  )
}
