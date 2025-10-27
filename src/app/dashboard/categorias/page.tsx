'use client';
import { useState } from 'react';
import { Button, Typography, Box } from '@mui/material';
import { CategoryList, CategoryForm } from '@/components/AdminCategoriasComponents';

export default function CategoriasPage() {
  const [showCategoryForm, setShowCategoryForm] = useState(false);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
        Gerenciar Categorias 
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowCategoryForm(true)}
        sx={{ mb: 3 }}
      >
        + Nova Categoria
      </Button>

      <CategoryList />

      {showCategoryForm && (
        <CategoryForm onClose={() => setShowCategoryForm(false)} />
      )}
    </Box>
  );
}
