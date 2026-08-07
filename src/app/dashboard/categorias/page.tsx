'use client';

import { Typography, Box } from '@mui/material';
import { CategoryList } from '@/features/catalog/presentation/CategoryManager';

export default function CategoriasPage() {
  return (
    <Box sx={{ p: 3 }}>
      <CategoryList />
    </Box>
  );
}
