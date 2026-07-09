export type MenuCategory = "Pratos Quentes" | "Pratos Crus" | "Combos";

export type ProductOption = {
  id?: number;
  name: string;
  price: number;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: MenuCategory;
  /** Destaca o produto recém-lançado no cardápio. */
  isNew?: boolean;
  options?: ProductOption[];
};
