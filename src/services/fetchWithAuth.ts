const API_URL = process.env.NEXT_PUBLIC_API_URL;

let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;

async function refreshToken() {
  if (!refreshPromise) {
    refreshPromise = fetch(`${API_URL}/api/auth/refresh-admin`, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Refresh token inválido");
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}

export async function fetchWithAuth(
  input: RequestInfo,
  init: RequestInit = {}
): Promise<Response> {
  const response = await fetch(input, {
    ...init,
    credentials: "include",
  });

  if (response.status !== 401) {
    return response;
  }

  // 🔄 tenta renovar token
  try {
    if (!isRefreshing) {
      isRefreshing = true;
      await refreshToken();
      isRefreshing = false;
    } else {
      await refreshPromise;
    }
  } catch {
    isRefreshing = false;
    throw new Error("Sessão expirada");
  }

  // 🔁 refaz a requisição original
  return fetch(input, {
    ...init,
    credentials: "include",
  });
}
