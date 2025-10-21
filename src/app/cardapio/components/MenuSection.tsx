import CategorySection from "../components/CategorySection";
import { products } from "@/lib/products";

export default function MenuSection({ onAdd }: { onAdd: any }) {
  return (
    <>
      <CategorySection
        title="Pratos Empanados 🔥"
        products={products.filter((p) => p.category === "Pratos Quentes")}
        onAdd={onAdd}
      />
      <CategorySection
        title="Pratos Crus"
        products={products.filter((p) => p.category === "Pratos Crus")}
        onAdd={onAdd}
      />
      <CategorySection
        title="Monte seu Combo 🍱"
        products={products.filter((p) => p.category === "Combos")}
        onAdd={onAdd}
      />
    </>
  );
}
