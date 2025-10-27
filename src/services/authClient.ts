// src/services/authClient.ts
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface LoginResponse {
  success: boolean;
  data: {
    id: string;
    name: string;
    phone: string;
    token: string;
    refreshToken: string;
    refreshTokenExpiresAt: string;
  };
  message: string;
}

// 🔍 Verifica se o token JWT ainda é válido
export function isTokenValid(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const now = Math.floor(Date.now() / 1000);
    return payload.exp > now; // true se ainda estiver válido
  } catch {
    return false;
  }
}

// 🔹 LOGIN CLIENTE
export async function loginUser(name: string, phone: string): Promise<LoginResponse> {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, phone }),
  });

  const data: LoginResponse = await response.json();

  if (!response.ok || !data.success) {
    console.error("❌ Erro no loginUser:", data);
    throw new Error(data.message || "Falha no login");
  }

  const { token, refreshToken, refreshTokenExpiresAt } = data.data;

  // Salva em cookies separados
  Cookies.set("user_token", token, { expires: 1 / 96, secure: true }); // 15 minutos
  Cookies.set("user_refreshToken", refreshToken, {
    expires: new Date(refreshTokenExpiresAt), // 7 dias (ou conforme backend)
    secure: true,
  });

  return data;
}

// 🔄 REFRESH TOKEN CLIENTE
export async function refreshUserToken() {
  const refreshToken = Cookies.get("user_refreshToken");
  if (!refreshToken) throw new Error("Sem refresh token");

  const response = await fetch(`${API_URL}/api/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    console.error("❌ Erro ao renovar token:", data);
    throw new Error(data.message || "Falha ao renovar token");
  }

  const { token, refreshToken: newRefreshToken, refreshTokenExpiresAt } = data.data;

  // Atualiza cookies
  Cookies.set("user_token", token, { expires: 1 / 96, secure: true });
  Cookies.set("user_refreshToken", newRefreshToken, {
    expires: new Date(refreshTokenExpiresAt),
    secure: true,
  });

  return token;
}

// 🚪 LOGOUT CLIENTE
export function logoutUser() {
  Cookies.remove("user_token");
  Cookies.remove("user_refreshToken");
}

// 📦 PEGAR TOKEN ATUAL
export function getUserToken() {
  return Cookies.get("user_token") || null;
}
