import { fetchWithAuth } from "./fetchWithAuth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Category {
  id?: string;
  name: string;
  createdAtUtc?: string;
  updatedAtUtc?: string;
}

// 🔹 Listar categorias
export async function getCategories(page = 1, pageSize = 5) {
  const response = await fetchWithAuth(
    `${API_URL}/api/Category?page=${page}&pageSize=${pageSize}`,
    {
      method: "GET",
    }
  );

  const data = await response.json();

  if (!response.ok || !data.success) {
    console.error("❌ Erro ao buscar categorias:", data);
    throw new Error(data.message || "Falha ao buscar categorias");
  }

  return {
    items: data.data.items,
    totalCount: data.data.totalCount || data.data.items.length,
  };
}

// 🔹 Criar nova categoria
export async function createCategory(category: { name: string }) {
  const response = await fetchWithAuth(`${API_URL}/api/Category`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    console.error("❌ Erro ao criar categoria:", data);
    throw new Error(data.message || "Falha ao criar categoria");
  }

  return data.data;
}

// 🔹 Atualizar categoria
export async function updateCategory(category: { id: string; name: string }) {
  const response = await fetchWithAuth(
    `${API_URL}/api/Category/update`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    }
  );

  const data = await response.json();

  if (!response.ok || !data.success) {
    console.error("❌ Erro ao atualizar categoria:", data);
    throw new Error(data.message || "Falha ao atualizar categoria");
  }

  return data.data;
}

// 🔹 Excluir categoria
export async function deleteCategory(id: string) {
  const response = await fetchWithAuth(
    `${API_URL}/api/Category/${id}`,
    {
      method: "DELETE",
    }
  );

  const data = await response.json();

  if (!response.ok || !data.success) {
    console.error("❌ Erro ao excluir categoria:", data);
    throw new Error(data.message || "Falha ao excluir categoria");
  }

  return {
    message: data.message || "Categoria excluída com sucesso!",
    data: data.data,
  };
}

// 🔹 Buscar categoria por ID
export async function getCategoryById(id: string) {
  const response = await fetchWithAuth(
    `${API_URL}/api/Category/${id}`,
    {
      method: "GET",
    }
  );

  const data = await response.json();

  if (!response.ok || !data.success) {
    console.error("❌ Erro ao buscar categoria:", data);
    throw new Error(data.message || "Falha ao buscar categoria");
  }

  return data.data;
}
