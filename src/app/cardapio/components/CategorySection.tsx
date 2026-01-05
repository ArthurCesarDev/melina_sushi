import ProductCard from "../components/ProductCard"
import { Product } from "@/types/Product"

type Props = {
  title: string
  products: Product[]
}

export default function CategorySection({ title, products }: Props) {
  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold mb-4 text-[#a89050]">
        {title}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  )
}
