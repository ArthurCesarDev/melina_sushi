import { apiRequest } from "@/core/http/api-client";

type MutationResult<T = unknown> = { message: string; data: T };

export type ProductPayload = {
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

export async function createProduct(product: ProductPayload): Promise<MutationResult> {
  const data = await apiRequest<unknown>("/api/Product", {
    method: "POST",
    body: JSON.stringify(product),
  });
  return { data, message: "Produto criado com sucesso!" };
}

export async function updateProduct(productId: string, product: ProductPayload): Promise<MutationResult> {
  const data = await apiRequest<unknown>(`/api/Product/${productId}`, {
    method: "PATCH",
    body: JSON.stringify(product),
  });
  return { data, message: "Produto atualizado com sucesso!" };
}

export async function deleteProduct(productId: string): Promise<MutationResult> {
  const data = await apiRequest<unknown>(`/api/Product/${productId}`, { method: "DELETE" });
  return { data, message: "Produto excluído com sucesso!" };
}
