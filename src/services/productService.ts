import { fetchWithAuth } from "./fetchWithAuth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// 🔹 Criar produto
export async function createProduct(product: {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isOnSale: boolean;
  salePercentage: number;
  isOutOfStock: boolean;
  isActive: boolean;
  categoryId: string;
}) {
  const response = await fetchWithAuth(`${API_URL}/api/Product`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    console.error("❌ Erro ao criar produto:", data);
    throw new Error(data.message || "Falha ao criar produto");
  }

  return data;
}

// 🔹 Atualizar produto
export async function updateProduct(
  productId: string,
  product: {
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    isOnSale: boolean;
    salePercentage: number;
    isOutOfStock: boolean;
    isActive: boolean;
    categoryId: string;
  }
) {
  const response = await fetchWithAuth(
    `${API_URL}/api/Product/${productId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    }
  );

  const data = await response.json();

  if (!response.ok || !data.success) {
    console.error("❌ Erro ao atualizar produto:", data);
    throw new Error(data.message || "Falha ao atualizar produto");
  }

  return data;
}

// 🔹 Deletar produto
export async function deleteProduct(productId: string) {
  const response = await fetchWithAuth(
    `${API_URL}/api/Product/${productId}`,
    {
      method: "DELETE",
    }
  );

  const data = await response.json();

  if (!response.ok || !data.success) {
    console.error("❌ Erro ao excluir produto:", data);
    throw new Error(data.message || "Falha ao excluir produto");
  }

  return data;
}
