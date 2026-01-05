'use client';

import { useEffect, useState } from 'react';
import {
  getStoreProfile,
  createStoreProfile,
  updateStoreProfile,
  ApiResponse,
} from '@/services/storeProfileService';

const diasSemana = [
  'Domingo',
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado',
];

const horariosVazios = diasSemana.map((dia) => ({
  dia,
  ativo: false,
  abertura: '',
  fechamento: '',
}));

export function useStoreProfile() {
  const [empresa, setEmpresa] = useState<any>({
    nome: '',
    descricao: '',
    logo: '',
    banner: '',
    horarios: horariosVazios,
  });

  const [hasProfile, setHasProfile] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        const response = await getStoreProfile();

        if (response?.data) {
          setEmpresa(mapApiToState(response.data));
          setHasProfile(true);
        } else {
          setEmpresa({
            nome: '',
            descricao: '',
            logo: '',
            banner: '',
            horarios: horariosVazios,
          });
          setHasProfile(false);
        }
      } catch {
        setEmpresa({
          nome: '',
          descricao: '',
          logo: '',
          banner: '',
          horarios: horariosVazios,
        });
        setHasProfile(false);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);
  async function save(): Promise<ApiResponse> {
    const payload = mapStateToApi(empresa);

    if (hasProfile) {
      return await updateStoreProfile(payload);
    } else {
      const response = await createStoreProfile(payload);
      setHasProfile(true);
      return response;
    }
  }

  return {
    empresa,
    setEmpresa,
    hasProfile,
    loading,
    save,
  };
}

function mapStateToApi(empresa: any) {
  return {
    name: empresa.nome,
    description: empresa.descricao,
    profileImageUrl: empresa.logo,
    coverImageUrl: empresa.banner,
    workingHours: empresa.horarios.map((h: any, index: number) => ({
      dayOfWeek: index,
      openTime: h.ativo ? h.abertura : null,
      closeTime: h.ativo ? h.fechamento : null,
      isClosed: !h.ativo,
    })),
  };
}

function mapApiToState(profile: any) {
  return {
    nome: profile.name ?? '',
    descricao: profile.description ?? '',
    logo: profile.profileImageUrl ?? '',
    banner: profile.coverImageUrl ?? '',
    horarios: diasSemana.map((dia, index) => {
      const apiDay = profile.workingHours?.find(
        (h: any) => h.dayOfWeek === index
      );

      return {
        dia,
        ativo: apiDay ? !apiDay.isClosed : false,
        abertura: apiDay?.openTime ?? '',
        fechamento: apiDay?.closeTime ?? '',
      };
    }),
  };
}
