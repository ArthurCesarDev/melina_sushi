// src/services/authAdmin.ts
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Tipagem do retorno da API
interface LoginResponse {
  success: boolean;
  data: {
    id: string;
    name: string;
    email: string;
    token: string;
    refreshToken: string;
    refreshTokenExpiresAt: string;
  };
  message: string;
}

// 🔹 LOGIN ADMIN
export async function loginAdmin(email: string, password: string) {
  const response = await fetch(`${API_URL}/api/auth/login-admin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data: LoginResponse = await response.json();

  if (!response.ok || !data.success) {
    console.error("❌ Erro no loginAdmin:", data);
    throw new Error(data.message || "Falha no login");
  }

  const { token, refreshToken, refreshTokenExpiresAt } = data.data;

  Cookies.set("admin_token", token, { expires: 1 / 96, secure: true });
  Cookies.set("admin_refreshToken", refreshToken, {
    expires: new Date(refreshTokenExpiresAt),
    secure: true,
  });

 
  return {
    ...data.data,
    message: data.message, 
  };
}
export async function refreshAdminToken() {
  const refreshToken = Cookies.get("admin_refreshToken");
  if (!refreshToken) throw new Error("Sem refresh token");

  const response = await fetch(`${API_URL}/api/auth/refresh-admin`, {
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


  Cookies.set("admin_token", token, { expires: 1 / 96, secure: true });
  Cookies.set("admin_refreshToken", newRefreshToken, {
    expires: new Date(refreshTokenExpiresAt),
    secure: true,
  });

  return token;
}


export function logoutAdmin() {
  Cookies.remove("admin_token");
  Cookies.remove("admin_refreshToken");
}

export function getAdminToken() {
  return Cookies.get("admin_token") || null;
}
