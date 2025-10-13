import Image from "next/image"
import { Product } from "@/types/Product"

type Props = {
  product: Product
  onAdd: (product: Product) => void
}

export default function ProductCard({ product, onAdd }: Props) {
  return (
    <div className="rounded-2xl shadow-md p-4 flex flex-col items-center">
      <Image src={product.image} alt={product.name} width={200} height={200} className="rounded-xl" />
      <h3 className="font-semibold text-lg mt-2">{product.name}</h3>
      <p className="text-sm text-gray-500 text-center">{product.description}</p>
      <span className="text-[#a89050] font-bold mt-2">R$ {product.price.toFixed(2)}</span>
      <button
        className="mt-3 bg-[#a89050] text-white px-4 py-2 rounded-full hover:opacity-90"
        onClick={() => onAdd(product)}
      >
        Adicionar
      </button>
    </div>
  )
}
