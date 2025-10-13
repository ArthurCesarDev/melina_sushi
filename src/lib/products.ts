import { Product } from "@/types/Product"

export const products: Product[] = [
  {
    id: 1,
    name: "Hot Roll Salmão",
    description: "8 unidades com salmão, cream cheese e cebolinha.",
    price: 24.90,
    image: "/hotroll.jpg",
    category: "Temaki e Hots"
  },
  {
    id: 2,
    name: "Temaki Salmão",
    description: "Temaki com salmão fresco e cream cheese.",
    price: 29.90,
    image: "/temaki.jpg",
    category: "Temaki e Hots"
  },
  // ...
]
