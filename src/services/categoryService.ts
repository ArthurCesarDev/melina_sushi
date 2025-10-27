import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// 🔹 Modelo de categoria
export interface Category {
  id?: string;
  name: string;
  createdAtUtc?: string;
  updatedAtUtc?: string;
}

// 🔸 Função utilitária para pegar o token JWT atual
function getAuthHeader() {
  const token = Cookies.get("admin_token") || Cookies.get("user_token");
  if (!token) throw new Error("Token não encontrado");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

// 🔹 Buscar todas as categorias
export async function getCategories() {
  const response = await fetch(`${API_URL}/api/Category`, {
    method: "GET",
    headers: getAuthHeader(),
  });

  const data = await response.json();
  if (!response.ok || !data.success) {
    console.error("❌ Erro ao buscar categorias:", data);
    throw new Error(data.message || "Falha ao buscar categorias");
  }

  return data.data.items;
}

// 🔹 Criar nova categoria
export async function createCategory(category: { name: string }) {
  const response = await fetch(`${API_URL}/api/Category`, {
    method: "POST",
    headers: getAuthHeader(),
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
  const response = await fetch(`${API_URL}/api/Category/update`, {
    method: "PUT",
    headers: getAuthHeader(),
    body: JSON.stringify(category),
  });

  const data = await response.json();
  if (!response.ok || !data.success) {
    console.error("❌ Erro ao atualizar categoria:", data);
    throw new Error(data.message || "Falha ao atualizar categoria");
  }

  return data.data;
}

// 🔹 Excluir categoria
export async function deleteCategory(id: string) {
  const response = await fetch(`${API_URL}/api/Category/${id}`, {
    method: "DELETE",
    headers: getAuthHeader(),
  });

  const data = await response.json();
  if (!response.ok || !data.success) {
    console.error("❌ Erro ao excluir categoria:", data);
    throw new Error(data.message || "Falha ao excluir categoria");
  }

  return data.data;
}

// 🔹 Buscar categoria por ID (👈 novo método)
export async function getCategoryById(id: string) {
  const response = await fetch(`${API_URL}/api/Category/${id}`, {
    method: "GET",
    headers: getAuthHeader(),
  });

  const data = await response.json();
  if (!response.ok || !data.success) {
    console.error("❌ Erro ao buscar categoria:", data);
    throw new Error(data.message || "Falha ao buscar categoria");
  }

  return data.data; // retorna o objeto completo da categoria
}
