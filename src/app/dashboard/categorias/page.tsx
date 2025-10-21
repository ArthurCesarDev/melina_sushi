'use client';
import { useState } from 'react';
import CategoryList from './components/CategoryList';
import CategoryForm from './components/CategoryForm';
import ProductForm from './components/ProductForm';
import { Button } from '@mui/material';

export default function CategoriasPage() {
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);

  return (
    <>
      <h2>Gerenciar Categorias</h2>

      <div style={{ display: 'flex', gap: '1rem', margin: '1.5rem 0' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowCategoryForm(true)}
        >
          + Nova Categoria
        </Button>
      </div>

      <CategoryList />

      {showCategoryForm && <CategoryForm onClose={() => setShowCategoryForm(false)} />}
      {showProductForm && <ProductForm onClose={() => setShowProductForm(false)} />}
    </>
  );
}
