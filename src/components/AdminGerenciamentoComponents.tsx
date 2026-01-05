'use client';

import {
  Card,
  CardContent,
  Typography,
  TextField,
  Box,
  Avatar,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { Upload } from 'lucide-react';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import { useTheme } from '@mui/material/styles';


const UploadBox = ({
  children,
  onChange,
  hasImage,
}: {
  children: React.ReactNode;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hasImage: boolean;
}) => (
  <Box
    sx={{
      position: 'relative',
      width: '100%',
      height: 140,
      borderRadius: 3,
      border: '2px dashed rgba(255,255,255,0.25)',
      cursor: 'pointer',
      overflow: 'hidden',
      background:
        'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
      transition: 'all 0.3s ease',

      '&:hover': {
        transform: 'translateY(-4px) scale(1.02)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
      },

      '&:hover .overlay': {
        opacity: hasImage ? 1 : 0,
      },
    }}
  >
    {children}

    {hasImage && (
      <Box
        className="overlay"
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.55)',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0,
          transition: 'opacity 0.25s',
          pointerEvents: 'none',
        }}
      >
        <Typography fontWeight={600}>Trocar imagem</Typography>
      </Box>
    )}

    <input
      type="file"
      accept="image/*"
      onChange={onChange}
      style={{
        position: 'absolute',
        inset: 0,
        opacity: 0,
        cursor: 'pointer',
      }}
    />
  </Box>
);

export function LogoUploader({ empresa, setEmpresa }: any) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);

    setEmpresa((p: any) => ({
      ...p,
      logoPreview: preview,
      logoFile: file,   
    }));
  };

  return (
    <Card sx={{ borderRadius: 4 }}>
      <CardContent>
        <Typography fontWeight={600}>Logo da Empresa</Typography>

        <UploadBox
          onChange={handleChange}
          hasImage={!!empresa.logoPreview || !!empresa.logo}
        >
          {empresa.logoPreview || empresa.logo ? (
            <Avatar
              src={empresa.logoPreview || empresa.logo}
              sx={{ width: 80, height: 80, m: 'auto', mt: 3 }}
            />
          ) : (
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
              }}
            >
              <Upload />
              <Typography>Selecionar logo</Typography>
            </Box>
          )}
        </UploadBox>
      </CardContent>
    </Card>
  );
}

export function BannerUploader({ empresa, setEmpresa }: any) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);

    setEmpresa((p: any) => ({
      ...p,
      bannerPreview: preview,
      bannerFile: file,
    }));
  };

  return (
    <Card sx={{ borderRadius: 4 }}>
      <CardContent>
        <Typography fontWeight={600}>Banner da Empresa</Typography>

        <UploadBox onChange={handleChange} hasImage={!!empresa.bannerPreview || !!empresa.banner}>
          {empresa.bannerPreview || empresa.banner ? (
            <Box
              sx={{
                width: '100%',
                height: '100%',
                backgroundImage: `url(${empresa.bannerPreview || empresa.banner})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          ) : (
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
              }}
            >
              <Upload />
              <Typography>Selecionar banner</Typography>
            </Box>
          )}
        </UploadBox>
      </CardContent>
    </Card>
  );
}

export function EmpresaForm({ empresa, setEmpresa }: any) {
  return (
    <Card sx={{ borderRadius: 4 }}>
      <CardContent>
        <Typography fontWeight={600} mb={2}>
          Informações da Empresa
        </Typography>

        <TextField
          fullWidth
          label="Nome da Empresa"
          value={empresa.nome}
          onChange={(e) =>
            setEmpresa((p: any) => ({ ...p, nome: e.target.value }))
          }
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          multiline
          rows={3}
          label="Descrição"
          value={empresa.descricao}
          onChange={(e) =>
            setEmpresa((p: any) => ({ ...p, descricao: e.target.value }))
          }
        />
      </CardContent>
    </Card>
  );
}

export function HorariosForm({ empresa, setEmpresa }: any) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const toggleDia = (index: number) => {
    setEmpresa((prev: any) => {
      const horarios = [...prev.horarios];
      horarios[index] = {
        ...horarios[index],
        ativo: !horarios[index].ativo,
      };
      return { ...prev, horarios };
    });
  };

  const handleHorarioChange = (
    index: number,
    campo: 'abertura' | 'fechamento',
    value: string
  ) => {
    setEmpresa((prev: any) => {
      const horarios = [...prev.horarios];
      horarios[index] = {
        ...horarios[index],
        [campo]: value,
      };
      return { ...prev, horarios };
    });
  };
  const pickerScrollbar = {
    '& *::-webkit-scrollbar': {
      width: '8px',
    },
    '& *::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '& *::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(255,109,44,0.6)',
      borderRadius: '10px',
    },
    '& *::-webkit-scrollbar-thumb:hover': {
      backgroundColor: 'rgba(255,109,44,0.9)',
    },
    '& *': {
      scrollbarWidth: 'thin',
      scrollbarColor: 'rgba(255,109,44,0.6) transparent',
    },
  };

  return (
    <Card sx={{ borderRadius: 4 }}>
      <CardContent>
        <Typography fontWeight={700} mb={3}>
          Horários de Funcionamento
        </Typography>

        {empresa.horarios.map((item: any, index: number) => (
          <Box
            key={item.dia}
            sx={{
              p: 3,
              mb: 2,
              borderRadius: 3,
              border: '1px solid',
              borderColor: item.ativo
                ? '#ff6d2c'
                : isDark
                  ? 'rgba(255,255,255,0.15)'
                  : 'rgba(0,0,0,0.12)',
              background: item.ativo
                ? isDark
                  ? 'linear-gradient(180deg, rgba(255,109,44,0.18), rgba(255,109,44,0.06))'
                  : 'linear-gradient(180deg, rgba(255,109,44,0.12), rgba(255,109,44,0.04))'
                : isDark
                  ? 'rgba(255,255,255,0.03)'
                  : '#fafafa',
            }}
          >
            {/* HEADER */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr auto auto',
                alignItems: 'center',
                gap: 3,
              }}
            >
              <Typography fontWeight={700} fontSize={16}>
                {item.dia}
              </Typography>

              <Typography
                fontSize={13}
                sx={{
                  color: item.ativo
                    ? '#ff6d2c'
                    : isDark
                      ? 'rgba(255,255,255,0.6)'
                      : 'rgba(0,0,0,0.6)',
                }}
              >
                {item.ativo ? 'Funcionando' : 'Fechado'}
              </Typography>

              <Switch
                checked={item.ativo}
                onChange={() => toggleDia(index)}
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': {
                    color: '#ff6d2c',
                  },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: '#ff6d2c',
                  },
                }}
              />
            </Box>

            {/* HORÁRIOS */}
            {item.ativo && (
              <Box mt={3} display="flex" gap={3}>
                {/* ABRE */}
                <TimePicker
                  label="Abre"
                  ampm={false}
                  minutesStep={5}
                  value={
                    item.abertura
                      ? dayjs(`2024-01-01T${item.abertura}`)
                      : null
                  }
                  onChange={(newValue) =>
                    handleHorarioChange(
                      index,
                      'abertura',
                      newValue ? newValue.format('HH:mm') : ''
                    )
                  }
                  slotProps={{
                    actionBar: { actions: [] }, 
                    textField: {
                      sx: {
                        width: 150,
                        '& input': { fontWeight: 600 },
                      },
                    },
                    popper: {
                      sx: {
                        '& .MuiPaper-root': {
                          background: isDark ? '#1c1c1c' : '#fff',
                          color: isDark ? '#fff' : '#111',
                          borderRadius: 3,
                          border: isDark
                            ? '1px solid rgba(255,255,255,0.15)'
                            : '1px solid rgba(0,0,0,0.12)',
                        },
                        '& .Mui-selected': {
                          backgroundColor:
                            '#ff6d2c !important',
                          color: '#000',
                        },
                        ...pickerScrollbar,
                      },
                    },
                  }}
                />
                <TimePicker
                  label="Fecha"
                  ampm={false}
                  minutesStep={5}
                  value={
                    item.fechamento
                      ? dayjs(
                        `2024-01-01T${item.fechamento}`
                      )
                      : null
                  }
                  onChange={(newValue) =>
                    handleHorarioChange(
                      index,
                      'fechamento',
                      newValue ? newValue.format('HH:mm') : ''
                    )
                  }
                  slotProps={{
                    actionBar: { actions: [] },
                    textField: {
                      sx: {
                        width: 150,
                        '& input': { fontWeight: 600 },
                      },
                    },
                    popper: {
                      sx: {
                        '& .MuiPaper-root': {
                          background: isDark ? '#1c1c1c' : '#fff',
                          color: isDark ? '#fff' : '#111',
                          borderRadius: 3,
                          border: isDark
                            ? '1px solid rgba(255,255,255,0.15)'
                            : '1px solid rgba(0,0,0,0.12)',
                        },
                        '& .Mui-selected': {
                          backgroundColor:
                            '#ff6d2c !important',
                          color: '#000',
                        },
                        ...pickerScrollbar,
                      },
                    },
                  }}
                />
              </Box>
            )}
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}
