'use client';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { UploadBox } from './styles';
import { Upload } from 'lucide-react';

export default function BannerUploader({ empresa, setEmpresa }: any) {
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
        <UploadBox component="label">
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
