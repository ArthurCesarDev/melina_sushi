'use client';
import { Avatar, Card, CardContent, Typography } from '@mui/material';
import { UploadBox } from './styles';
import { Upload } from 'lucide-react';

export default function LogoUploader({ empresa, setEmpresa }: any) {
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
                <UploadBox component="label">
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
