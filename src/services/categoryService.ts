import { apiRequest } from "@/core/http/api-client";

export interface Category {
  id?: string;
  name: string;
  createdAtUtc?: string;
  updatedAtUtc?: string;
}

type PaginatedCategories = { items: Category[]; totalCount?: number };
type MutationResult<T> = { message: string; data: T };

export async function getCategories(page = 1, pageSize = 5) {
  const data = await apiRequest<PaginatedCategories>(`/api/Category?page=${page}&pageSize=${pageSize}`);
  return { items: data.items, totalCount: data.totalCount ?? data.items.length };
}

export async function createCategory(category: Pick<Category, "name">): Promise<MutationResult<Category>> {
  const data = await apiRequest<Category>("/api/Category", {
    method: "POST",
    body: JSON.stringify(category),
  });
  return { data, message: "Categoria criada com sucesso!" };
}

export async function updateCategory(category: Required<Pick<Category, "id" | "name">>): Promise<MutationResult<Category>> {
  const data = await apiRequest<Category>("/api/Category/update", {
    method: "PUT",
    body: JSON.stringify(category),
  });
  return { data, message: "Categoria atualizada com sucesso!" };
}

export async function deleteCategory(id: string) {
  const data = await apiRequest<unknown>(`/api/Category/${id}`, { method: "DELETE" });
  return { message: "Categoria excluída com sucesso!", data };
}

export function getCategoryById(id: string) {
  return apiRequest<Category>(`/api/Category/${id}`);
}
