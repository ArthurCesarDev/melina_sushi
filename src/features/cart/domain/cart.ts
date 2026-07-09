import type { Product } from "@/features/menu/domain/product";

export type CartItem = Product & { quantity: number };

export type CartState = { items: CartItem[] };

export type CartAction =
  | { type: "add"; product: Product }
  | { type: "decrease"; productId: number }
  | { type: "remove"; productId: number };

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "add": {
      const item = state.items.find(({ id }) => id === action.product.id);
      return {
        items: item
          ? state.items.map((current) => current.id === item.id ? { ...current, quantity: current.quantity + 1 } : current)
          : [...state.items, { ...action.product, quantity: 1 }],
      };
    }
    case "decrease":
      return {
        items: state.items
          .map((item) => item.id === action.productId ? { ...item, quantity: item.quantity - 1 } : item)
          .filter((item) => item.quantity > 0),
      };
    case "remove":
      return { items: state.items.filter((item) => item.id !== action.productId) };
  }
}

export function calculateCartTotal(items: CartItem[]) {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}
