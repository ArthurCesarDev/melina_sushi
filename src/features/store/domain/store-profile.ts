export type StoreWorkingHour = {
  dayOfWeek: number;
  openTime: string | null;
  closeTime: string | null;
  isClosed: boolean;
};

export type StoreProfileDto = {
  name: string;
  description: string;
  profileImageUrl: string;
  coverImageUrl: string;
  workingHours: StoreWorkingHour[];
};

export type BusinessHour = {
  day: string;
  enabled: boolean;
  opensAt: string;
  closesAt: string;
};

export type StoreProfileForm = {
  name: string;
  description: string;
  logoUrl: string;
  bannerUrl: string;
  logoPreviewUrl?: string;
  bannerPreviewUrl?: string;
  logoFile?: File;
  bannerFile?: File;
  hours: BusinessHour[];
};

export const WEEK_DAYS = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
] as const;

export function createEmptyStoreProfile(): StoreProfileForm {
  return {
    name: "",
    description: "",
    logoUrl: "",
    bannerUrl: "",
    hours: WEEK_DAYS.map((day) => ({
      day,
      enabled: false,
      opensAt: "",
      closesAt: "",
    })),
  };
}

export function storeProfileFromDto(profile: StoreProfileDto): StoreProfileForm {
  return {
    name: profile.name ?? "",
    description: profile.description ?? "",
    logoUrl: profile.profileImageUrl ?? "",
    bannerUrl: profile.coverImageUrl ?? "",
    hours: WEEK_DAYS.map((day, dayOfWeek) => {
      const apiHour = profile.workingHours?.find((hour) => hour.dayOfWeek === dayOfWeek);
      return {
        day,
        enabled: apiHour ? !apiHour.isClosed : false,
        opensAt: apiHour?.openTime ?? "",
        closesAt: apiHour?.closeTime ?? "",
      };
    }),
  };
}

export function storeProfileToDto(profile: StoreProfileForm): StoreProfileDto {
  return {
    name: profile.name,
    description: profile.description,
    profileImageUrl: profile.logoUrl,
    coverImageUrl: profile.bannerUrl,
    workingHours: profile.hours.map((hour, dayOfWeek) => ({
      dayOfWeek,
      openTime: hour.enabled ? hour.opensAt : null,
      closeTime: hour.enabled ? hour.closesAt : null,
      isClosed: !hour.enabled,
    })),
  };
}
