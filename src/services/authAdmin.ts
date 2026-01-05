// src/services/authAdmin.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface LoginResponse {
  success: boolean;
  data: {
    id: string;
    name: string;
    email: string;
  };
  message: string;
}

export async function loginAdmin(email: string, password: string) {
  const response = await fetch(`${API_URL}/api/auth/login-admin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  const data: LoginResponse = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Falha no login");
  }

  return data;
}

export async function refreshAdminToken() {
  const response = await fetch(`${API_URL}/api/auth/refresh-admin`, {
    method: "POST",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Falha ao renovar token");
  }

  return data.data.token;
}


export async function checkAdminSession(): Promise<boolean> {
  try {
    const resp = await fetch(`${API_URL}/api/auth/refresh-admin`, {
      method: "POST",
      credentials: "include",
    });

    return resp.ok;
  } catch {
    return false;
  }
}

export function logoutAdmin() {
  fetch(`${API_URL}/api/auth/logout-admin`, {
    method: "POST",
    credentials: "include",
  });
}

export function getAdminToken() {
  return null;
}
