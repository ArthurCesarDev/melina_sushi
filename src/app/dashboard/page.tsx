'use client';
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import DashboardHeader from './components/DashboardHeader';
import { Container, Content } from './components/styles';
import CategoryList from './components/CategoryList';
import CategoryForm from './components/CategoryForm';
import ProductForm from './components/ProductForm';
import { Button } from '@mui/material';

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);

  return (
    <Container>
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <Content>
        <DashboardHeader />
        <div style={{ padding: '2rem' }}>
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

          {/* Modal de Categoria */}
          {showCategoryForm && (
            <CategoryForm onClose={() => setShowCategoryForm(false)} />
          )}

          {/* Modal de Produto */}
          {showProductForm && (
            <ProductForm onClose={() => setShowProductForm(false)} />
          )}
        </div>
      </Content>
    </Container>
  );
}
