type ImageUploadKind = "logo" | "banner" | "upload";

type UploadResponse = {
  success: boolean;
  fileUrl?: string;
  message?: string;
};

export async function uploadImage(
  kind: ImageUploadKind,
  file: File,
  previousImageUrl?: string,
): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  if (previousImageUrl) {
    formData.append("oldImageUrl", previousImageUrl.split("?")[0]);
  }

  const response = await fetch(`/api/${kind}`, { method: "POST", body: formData });
  const payload = (await response.json().catch(() => null)) as UploadResponse | null;

  if (!response.ok || !payload?.success || !payload.fileUrl) {
    throw new Error(payload?.message ?? "Não foi possível enviar a imagem.");
  }

  return payload.fileUrl;
}
