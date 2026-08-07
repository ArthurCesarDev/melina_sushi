const API_URL = process.env.NEXT_PUBLIC_API_URL;

let refreshPromise: Promise<void> | null = null;

async function refreshAccessToken(): Promise<void> {
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

  try {
    await refreshAccessToken();
  } catch {
    throw new Error("Sessão expirada");
  }

  return fetch(input, {
    ...init,
    credentials: "include",
  });
}
