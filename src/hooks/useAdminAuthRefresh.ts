// src/hooks/useAdminAuthRefresh.ts

import { useEffect } from "react";
import { refreshAdminToken, logoutAdmin } from "@/services/authAdmin";

export function useAdminAuthRefresh() {
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        await refreshAdminToken();
        console.log("🔁 Token renovado automaticamente");
      } catch (err) {
        console.error("❌ Falha ao renovar token:", err);
        logoutAdmin();
        window.location.href = "/login";
      }
    }, 14 * 60 * 1000); 

    return () => clearInterval(interval);
  }, []);
}

