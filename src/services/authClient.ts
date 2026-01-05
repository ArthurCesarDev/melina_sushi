// src/services/authClient.ts

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface LoginResponse {
  success: boolean;
  data: {
    id: string;
    name: string;
    phone: string;
  };
  message: string;
}

export async function loginUser(name: string, phone: string): Promise<LoginResponse> {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, phone }),
    credentials: "include", 
  });

  const data: LoginResponse = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Falha no login");
  }

  return data;
}


export async function refreshUserToken() {
  const response = await fetch(`${API_URL}/api/auth/refresh`, {
    method: "POST",
    credentials: "include", 
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Falha ao renovar token");
  }

  return data.data.token;
}


export async function checkUserSession(): Promise<boolean> {
  try {
    const resp = await fetch(`${API_URL}/api/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });

    return resp.ok; 
  } catch {
    return false;
  }
}


export function logoutUser() {
  fetch(`${API_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
}


export function getUserToken() {
  return null;
}
