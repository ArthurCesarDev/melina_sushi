'use client';

import { useState } from 'react';
import { Typography, Button, Grid } from '@mui/material';
import { LogoUploader, BannerUploader, EmpresaForm, HorariosForm } from '@/components/AdminGerenciamentoComponents';

export default function GerenciamentoPage() {
  const [empresa, setEmpresa] = useState({
    nome: 'Barbearia do Ricardo',
    descricao: 'A melhor experiência em cortes e cuidados masculinos.',
    logo: '',
    banner: '',
    horarios: [
      { dia: 'Segunda', ativo: true, abertura: '09:00', fechamento: '19:00' },
      { dia: 'Terça', ativo: true, abertura: '09:00', fechamento: '19:00' },
      { dia: 'Quarta', ativo: true, abertura: '09:00', fechamento: '19:00' },
      { dia: 'Quinta', ativo: true, abertura: '09:00', fechamento: '19:00' },
      { dia: 'Sexta', ativo: true, abertura: '09:00', fechamento: '19:00' },
      { dia: 'Sábado', ativo: false, abertura: '09:00', fechamento: '14:00' },
      { dia: 'Domingo', ativo: false, abertura: '', fechamento: '' },
    ],
  });

  return (
    <>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
        Gerenciamento da Empresa ⚙️
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
          <Button variant="contained" color="primary" size="large">
            Salvar Alterações
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
