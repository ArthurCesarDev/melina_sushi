// src/hooks/useUserRefresh.ts

'use client';
import { useEffect } from "react";
import { refreshUserToken, logoutUser } from "@/services/authClient";

export function useUserRefresh() {
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        await refreshUserToken();
        console.log("🔁 Token do cliente renovado automaticamente");
      } catch (err) {
        console.error("❌ Falha ao renovar token do cliente:", err);
        logoutUser();
        window.location.href = "/login";
      }
    }, 14 * 60 * 1000); // a cada 14 minutos

    return () => clearInterval(interval);
  }, []);
}
