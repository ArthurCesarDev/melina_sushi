// src/services/logoutService.ts

import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function logoutUser() {
  try {
    const token =
      Cookies.get("admin_token") ||
      Cookies.get("user_token") ||
      Cookies.get("access_token");

    const refreshToken =
      Cookies.get("admin_refreshToken") ||
      Cookies.get("user_refreshToken") ||
      Cookies.get("refreshToken");

    // 🔹 Faz logout na API (se o token existir)
    if (token) {
      await fetch(`${API_URL}/api/Auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ refreshToken }), // opcional, caso backend use
      });
    }

    // 🔹 Remove todos os cookies possíveis
    const cookieNames = [
      "admin_token",
      "admin_refreshToken",
      "user_token",
      "user_refreshToken",
      "access_token",
      "refreshToken",
    ];

    cookieNames.forEach((name) => {
      Cookies.remove(name, { path: "/" });
      Cookies.remove(name, { path: "/", domain: window.location.hostname });
    });

    return true;
  } catch (error) {
    console.error("❌ Erro no logout:", error);


    const cookieNames = [
      "admin_token",
      "admin_refreshToken",
      "user_token",
      "user_refreshToken",
      "access_token",
      "refreshToken",
    ];
    cookieNames.forEach((name) => {
      Cookies.remove(name, { path: "/" });
      Cookies.remove(name, { path: "/", domain: window.location.hostname });
    });

    return false;
  }
}
