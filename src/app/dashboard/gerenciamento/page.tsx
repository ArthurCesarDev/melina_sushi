'use client';

import { Typography, Button, Grid } from '@mui/material';
import {
  LogoUploader,
  BannerUploader,
  EmpresaForm,
  HorariosForm,
} from '@/components/AdminGerenciamentoComponents';
import { useStoreProfile } from '@/hooks/useStoreProfile';
import { useToast } from '@/context/ToastContext';

export default function GerenciamentoPage() {
  const { empresa, setEmpresa, hasProfile, loading, save } = useStoreProfile();
  const { showToast } = useToast();

  if (loading) return null;

  const handleSave = async () => {
  try {
    if (empresa.logoFile) {
      const formData = new FormData();
      formData.append('file', empresa.logoFile);

      if (empresa.logo) {
        const oldClean = String(empresa.logo).split('?')[0];
        formData.append('oldImageUrl', oldClean);
      }

      const res = await fetch('/api/logo', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Erro ao enviar logo');
      }

      empresa.logo = data.fileUrl;
    }

    if (empresa.bannerFile) {
      const formData = new FormData();
      formData.append('file', empresa.bannerFile);

      if (empresa.banner) {
        const oldClean = String(empresa.banner).split('?')[0];
        formData.append('oldImageUrl', oldClean);
      }

      const res = await fetch('/api/banner', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Erro ao enviar banner');
      }

      empresa.banner = data.fileUrl;
    }

    const response = await save();
    showToast(
      response?.message || 'Operação realizada com sucesso.',
      'success'
    );
  } catch (err: any) {
    showToast(err?.message || 'Erro ao salvar informações', 'error');
  }
};

  return (
    <>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
        Gerenciamento
      </Typography>

      <Grid container spacing={3}>
        <Grid>
          <LogoUploader empresa={empresa} setEmpresa={setEmpresa} />
        </Grid>

        <Grid>
          <BannerUploader empresa={empresa} setEmpresa={setEmpresa} />
        </Grid>

        <Grid>
          <EmpresaForm empresa={empresa} setEmpresa={setEmpresa} />
        </Grid>

        <Grid>
          <HorariosForm empresa={empresa} setEmpresa={setEmpresa} />
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
