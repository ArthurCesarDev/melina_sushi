'use client';

import { Typography, Button, Grid } from '@mui/material';
import {
  LogoUploader,
  BannerUploader,
  StoreDetailsForm,
  BusinessHoursForm,
} from '@/features/store/presentation/StoreProfileEditor';
import { useStoreProfile } from '@/hooks/useStoreProfile';
import { useToast } from '@/context/ToastContext';
import { getErrorMessage } from '@/core/errors/get-error-message';

export default function GerenciamentoPage() {
  const { profile, setProfile, hasProfile, loading, save } = useStoreProfile();
  const { showToast } = useToast();

  if (loading) return null;

  const handleSave = async () => {
  try {
    const response = await save();
    showToast(
      response?.message || 'Operação realizada com sucesso.',
      'success'
    );
  } catch (error: unknown) {
    showToast(getErrorMessage(error, 'Erro ao salvar informações'), 'error');
  }
};

  return (
    <>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
        Gerenciamento
      </Typography>

      <Grid container spacing={3}>
        <Grid>
          <LogoUploader profile={profile} setProfile={setProfile} />
        </Grid>

        <Grid>
          <BannerUploader profile={profile} setProfile={setProfile} />
        </Grid>

        <Grid>
          <StoreDetailsForm profile={profile} setProfile={setProfile} />
        </Grid>

        <Grid>
          <BusinessHoursForm profile={profile} setProfile={setProfile} />
        </Grid>

        <Grid>
          <Button
            variant="contained"
            size="large"
            onClick={handleSave}
          >
            {hasProfile ? 'Atualizar Perfil' : 'Criar Perfil'}
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
