'use client';
import { Typography, Box } from '@mui/material';
import { CategoryList } from '@/components/AdminCategoriasComponents';

export default function CategoriasPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
        Gerenciar Categorias
      </Typography>
      <CategoryList />
    </Box>
  );
}
