'use client';

import { useCallback, useEffect, useState } from 'react';
import { uploadImage } from '@/core/files/image-upload-service';
import {
  createStoreProfile,
  getStoreProfile,
  updateStoreProfile,
  type StoreProfileMutation,
} from '@/features/store/data/store-profile-service';
import {
  createEmptyStoreProfile,
  storeProfileFromDto,
  storeProfileToDto,
  type StoreProfileForm,
} from '@/features/store/domain/store-profile';

export function useStoreProfile() {
  const [profile, setProfile] = useState<StoreProfileForm>(createEmptyStoreProfile);
  const [hasProfile, setHasProfile] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadProfile() {
      try {
        const result = await getStoreProfile();
        if (!active) return;

        setProfile(result ? storeProfileFromDto(result) : createEmptyStoreProfile());
        setHasProfile(Boolean(result));
      } catch {
        if (!active) return;
        setProfile(createEmptyStoreProfile());
        setHasProfile(false);
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadProfile();
    return () => {
      active = false;
    };
  }, []);

  const save = useCallback(async (): Promise<StoreProfileMutation> => {
    const persistedProfile = { ...profile };

    if (profile.logoFile) {
      persistedProfile.logoUrl = await uploadImage('logo', profile.logoFile, profile.logoUrl);
    }
    if (profile.bannerFile) {
      persistedProfile.bannerUrl = await uploadImage('banner', profile.bannerFile, profile.bannerUrl);
    }

    const payload = storeProfileToDto(persistedProfile);
    const result = hasProfile
      ? await updateStoreProfile(payload)
      : await createStoreProfile(payload);

    setHasProfile(true);
    setProfile(storeProfileFromDto(payload));
    return result;
  }, [hasProfile, profile]);

  return { profile, setProfile, hasProfile, loading, save };
}
