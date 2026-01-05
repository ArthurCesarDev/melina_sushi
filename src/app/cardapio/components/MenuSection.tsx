import CategorySection from "../components/CategorySection";
import { products } from "@/lib/products";

export default function MenuSection() {
  return (
    <>
      <CategorySection
        title="Pratos Empanados 🔥"
        products={products.filter((p) => p.category === "Pratos Quentes")}
      />

      <CategorySection
        title="Pratos Crus"
        products={products.filter((p) => p.category === "Pratos Crus")}
      />

      <CategorySection
        title="Monte seu Combo 🍱"
        products={products.filter((p) => p.category === "Combos")}
      />
    </>
  );
}
