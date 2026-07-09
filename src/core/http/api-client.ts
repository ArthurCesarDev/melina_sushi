import { ApiError } from "./api-error";
import { fetchWithAuth } from "@/services/fetchWithAuth";

type ApiEnvelope<T> = {
  success: boolean;
  message?: string;
  data: T;
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

function toUrl(path: string) {
  if (!apiUrl) {
    throw new ApiError("NEXT_PUBLIC_API_URL não foi configurada.");
  }

  return `${apiUrl}${path}`;
}

export async function apiRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetchWithAuth(toUrl(path), {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init.headers,
    },
  });

  const payload = (await response.json().catch(() => null)) as ApiEnvelope<T> | null;

  if (!response.ok || !payload?.success) {
    throw new ApiError(payload?.message ?? "Não foi possível concluir a solicitação.", response.status);
  }

  return payload.data;
}
