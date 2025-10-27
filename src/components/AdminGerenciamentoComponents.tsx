'use client';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Grid,
  Checkbox,
  FormControlLabel,
  Avatar,
  Box,
} from '@mui/material';
import { Upload } from 'lucide-react';

// 🔹 Estilo simples de upload
const UploadBox = (props: any) => (
  <Box
    component="label"
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      border: '2px dashed #ccc',
      borderRadius: 2,
      height: 120,
      width: '100%',
      cursor: 'pointer',
      gap: 1,
      '&:hover': { borderColor: '#666' },
    }}
    {...props}
  />
);

// 🔹 Logo da Empresa
export function LogoUploader({ empresa, setEmpresa }: any) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setEmpresa((prev: any) => ({ ...prev, logo: imageUrl }));
    }
  };

  return (
    <Card elevation={3} sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Logo da Empresa
        </Typography>
        <UploadBox>
          {empresa.logo ? (
            <Avatar src={empresa.logo} alt="Logo" sx={{ width: 80, height: 80 }} />
          ) : (
            <>
              <Upload size={26} />
              <Typography variant="body2" color="text.secondary">
                Enviar Logo
              </Typography>
            </>
          )}
          <input hidden accept="image/*" type="file" onChange={handleFileChange} />
        </UploadBox>
      </CardContent>
    </Card>
  );
}

// 🔹 Banner da Empresa
export function BannerUploader({ empresa, setEmpresa }: any) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setEmpresa((prev: any) => ({ ...prev, banner: imageUrl }));
    }
  };

  return (
    <Card elevation={3} sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Banner da Empresa
        </Typography>
        <UploadBox>
          {empresa.banner ? (
            <Box
              sx={{
                width: '100%',
                height: '100%',
                backgroundImage: `url(${empresa.banner})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: 2,
              }}
            />
          ) : (
            <>
              <Upload size={26} />
              <Typography variant="body2" color="text.secondary">
                Enviar Banner
              </Typography>
            </>
          )}
          <input hidden accept="image/*" type="file" onChange={handleFileChange} />
        </UploadBox>
      </CardContent>
    </Card>
  );
}

// 🔹 Formulário de dados da empresa
export function EmpresaForm({ empresa, setEmpresa }: any) {
  return (
    <Card elevation={3} sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Informações da Empresa
        </Typography>

        <Grid container spacing={2}>
          <Grid >
            <TextField
              label="Nome da Empresa"
              fullWidth
              value={empresa.nome}
              onChange={(e) => setEmpresa((p: any) => ({ ...p, nome: e.target.value }))}
            />
          </Grid>

          <Grid >
            <TextField
              label="Descrição"
              multiline
              rows={3}
              fullWidth
              value={empresa.descricao}
              onChange={(e) => setEmpresa((p: any) => ({ ...p, descricao: e.target.value }))}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

// 🔹 Formulário de horários
export function HorariosForm({ empresa, setEmpresa }: any) {
  const toggleDia = (index: number) => {
    setEmpresa((p: any) => {
      const horarios = [...p.horarios];
      horarios[index].ativo = !horarios[index].ativo;
      return { ...p, horarios };
    });
  };

  const handleHorarioChange = (index: number, campo: 'abertura' | 'fechamento', value: string) => {
    setEmpresa((p: any) => {
      const horarios = [...p.horarios];
      horarios[index][campo] = value;
      return { ...p, horarios };
    });
  };

  return (
    <Card elevation={3} sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Horários de Funcionamento
        </Typography>

        {empresa.horarios.map((item: any, index: number) => (
          <Box key={item.dia} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={item.ativo}
                  onChange={() => toggleDia(index)}
                  color="primary"
                />
              }
              label={item.dia}
              sx={{ minWidth: 120 }}
            />

            <TextField
              label="Abre"
              type="time"
              size="small"
              value={item.abertura}
              onChange={(e) => handleHorarioChange(index, 'abertura', e.target.value)}
              disabled={!item.ativo}
            />

            <TextField
              label="Fecha"
              type="time"
              size="small"
              value={item.fechamento}
              onChange={(e) => handleHorarioChange(index, 'fechamento', e.target.value)}
              disabled={!item.ativo}
            />
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}
