export type CatalogProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isOnSale: boolean;
  salePercentage: number;
  isOutOfStock: boolean;
  isActive: boolean;
  categoryId: string;
};

export type ProductPayload = Omit<CatalogProduct, "id">;

export type Category = {
  id: string;
  name: string;
  createdAtUtc?: string;
  updatedAtUtc?: string;
  products?: { items: CatalogProduct[] };
};
