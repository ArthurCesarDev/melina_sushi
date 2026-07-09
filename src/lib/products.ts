import type { MenuCategory, Product } from "@/features/menu/domain/product";

/** Ordem em que as seções aparecem no cardápio. */
export const MENU_CATEGORIES = ["Pratos Quentes", "Pratos Crus", "Combos"] as const satisfies readonly MenuCategory[];

/**
 * Modelo usado para cadastrar itens do cardápio local.
 * Não informe `id` nem `category`: ambos são definidos automaticamente.
 */
type ProductInput = Omit<Product, "id" | "category">;

/**
 * Para adicionar um produto, cole-o na lista da categoria desejada.
 * Exemplo:
 * { name: "Hot Roll Especial", description: "8 unidades...", price: 22.9, image: "/hot-especial.jpeg" }
 */
export const productsByCategory: Record<MenuCategory, ProductInput[]> = {
  "Pratos Quentes": [
    {
      name: "Hot Roll Salmão",
      description: "8 unidades com salmão, cream cheese e cebolinha.",
      price: 17.99,
      image: "/rotroll.jpeg",
    },
    {
      name: "Temaki Empanado 120g",
      description: "Clássico temaki grelhado com cream cheese e cebolinha.",
      price: 19.99,
      image: "/temakifrito.jpeg",
    },
    {
      name: "Temaki Skin",
      description: "Clássico temaki skin com salmão grelhado e cream cheese e cebolinha.",
      price: 19.99,
      image: "/temaki-skin.png",
      isNew: true,
    },
  ],
  "Pratos Crus": [
    {
      name: "Sashimi de Salmão Maçaricado",
      description: "9 unidades de salmão maçaricado com arroz.",
      price: 29.99,
      image: "/sashimimacaricado.png",
      isNew: true,
    },
    
    {
      name: "Niguiri de Salmão Maçaricado",
      description: "6 unidades de salmão maçaricado com arroz.",
      price: 23.99,
      image: "/niguira-massaricado.png",
      isNew: true,
    },
    {
      name: "Temaki de Salmão 100g",
      description: "Temaki com salmão.",
      price: 17.99,
      image: "/temaki-cru-salmao.jpeg",
    },
    {
      name: "Temaki Philadelphia 120g",
      description: "Temaki com salmão, cream cheese e cebolinha.",
      price: 19.99,
      image: "/temakicru.jpeg",
    },
    {
      name: "Uramaki Filadélfia",
      description: "8 unidades com salmão, cream cheese e arroz.",
      price: 19.99,
      image: "/uramakifiladefia.jpeg",
    },
    {
      name: "Uramaki Skin",
      description: "8 unidades com salmão grelhado, cream cheese, arroz e cebolinha.",
      price: 19.99,
      image: "/uramakskin.jpeg",
    },
    {
      name: "Niguiri Jô",
      description: "8 unidades com salmão, cream cheese, arroz e cebolinha.",
      price: 23.99,
      image: "/jo.jpeg",
    },
    {
      name: "Niguiri Salmão",
      description: "6 unidades com salmão e arroz.",
      price: 19.99,
      image: "/nigiri.jpeg",
    },
    {
      name: "Sashimi Salmão",
      description: "9 unidades de salmão.",
      price: 26.99,
      image: "/sashimi.jpeg",
    },
    {
      name: "Sunomono 100g",
      description: "Pepino ralado com molho.",
      price: 7.99,
      image: "/sonomono.jpeg",
    },
    {
      name: "Combinado de Salmão",
      description: "12 peças: 1 temaki 70g, 2 Jô, 2 uramaki filadélfia, 3 sashimi, 2 niguiri e 2 hossomaki.",
      price: 39.99,
      image: "/combinado.jpeg",
    },
  ],
  Combos: [
    {
      name: "Monte seu Combo",
      description: "Monte seu combo personalizado escolhendo seus itens favoritos!",
      price: 0,
      image: "/sashimi1.jpeg",
      options: [
        { name: "Sashimi", price: 2.78 },
        { name: "Niguiri Jô", price: 2.99 },
        { name: "Uramaki Filadélfia", price: 2.5 },
        { name: "Hossomaki", price: 1.77 },
        { name: "Niguiri Salmão", price: 3.33 },
        { name: "Uramaki Skin", price: 2.5 },
      ],
    },
  ],
};

// ID estável para o carrinho; é calculado a partir de categoria e nome.
function createId(value: string): number {
  return Array.from(value).reduce((hash, char) => ((hash * 31) + char.charCodeAt(0)) | 0, 0) >>> 0;
}

export const products: Product[] = MENU_CATEGORIES.flatMap((category) =>
  productsByCategory[category].map((product) => ({
    ...product,
    category,
    id: createId(`${category}:${product.name}`),
  })),
);
