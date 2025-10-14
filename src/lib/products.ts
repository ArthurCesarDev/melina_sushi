import { Product } from "@/types/Product"

export const products: Product[] = [
  {
    id: 1,
    name: "Hot Roll Salmão",
    description: "8 unidades com salmão, cream cheese e cebolinha.",
    price: 24.9,
    image: "/rotroll.jpg",
    category: "Pratos Quentes",
  },
  {
    id: 2,
    name: "Temaki Frito 120g",
    description: "Clássico temaki grelhado.",
    price: 32.9,
    image: "/temakifrito.jpg",
    category: "Pratos Quentes",
  },
  {
    id: 3,
    name: "Temaki Salmão",
    description: "Temaki com salmão fresco e cream cheese.",
    price: 29.9,
    image: "/temakicru.jpg",
    category: "Pratos Crus",
  },
  {
    id: 4,
    name: "Sashimi de Salmão",
    description: "12 fatias de salmão fresco cortadas na hora.",
    price: 34.9,
    image: "/sashimi.jpg",
    category: "Pratos Crus",
  },
]
