// Fonte única do estado do carrinho. Requer CartProvider no layout raiz.
export { useCart } from "@/context/CartContext";
export type { CartItem } from "@/features/cart/domain/cart";
