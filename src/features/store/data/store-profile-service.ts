import { apiRequest } from "@/core/http/api-client";
import type { StoreProfileDto } from "@/features/store/domain/store-profile";

export type StoreProfileMutation = { message: string; profile: StoreProfileDto };

export function getStoreProfile(): Promise<StoreProfileDto | null> {
  return apiRequest<StoreProfileDto | null>("/api/StoreProfile");
}

export async function createStoreProfile(profile: StoreProfileDto): Promise<StoreProfileMutation> {
  const data = await apiRequest<StoreProfileDto>("/api/StoreProfile", {
    method: "POST",
    body: JSON.stringify(profile),
  });
  return { profile: data, message: "Perfil criado com sucesso." };
}

export async function updateStoreProfile(profile: StoreProfileDto): Promise<StoreProfileMutation> {
  const data = await apiRequest<StoreProfileDto>("/api/StoreProfile", {
    method: "PUT",
    body: JSON.stringify(profile),
  });
  return { profile: data, message: "Perfil atualizado com sucesso." };
}
