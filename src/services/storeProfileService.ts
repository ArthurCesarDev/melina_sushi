import { fetchWithAuth } from './fetchWithAuth';
import { safeJson } from './safeJson';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

export async function getStoreProfile(): Promise<ApiResponse> {
  const response = await fetchWithAuth(`${API_URL}/api/StoreProfile`, {
    method: 'GET',
  });

  const data = await safeJson(response);

  if (!response.ok) {
    throw new Error(data?.message || 'Erro ao buscar perfil');
  }

  return data;
}

export async function createStoreProfile(
  payload: any
): Promise<ApiResponse> {
  const response = await fetchWithAuth(`${API_URL}/api/StoreProfile`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await safeJson(response);

  if (!response.ok) {
    throw new Error(data?.message || 'Erro ao criar perfil');
  }

  return data; 
}

export async function updateStoreProfile(
  payload: any
): Promise<ApiResponse> {
  const response = await fetchWithAuth(`${API_URL}/api/StoreProfile`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await safeJson(response);

  if (!response.ok) {
    throw new Error(data?.message || 'Erro ao atualizar perfil');
  }

  return data; 
}
