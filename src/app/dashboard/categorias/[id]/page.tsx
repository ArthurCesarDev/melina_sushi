'use client';
import { useEffect, useState } from 'react';
import {
  Typography,
  Button,
  Paper,
  IconButton,
  Tooltip,
  Box,
  CircularProgress,
} from '@mui/material';
import { Edit, Trash2, PlusCircle } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { getCategoryById } from '@/services/categoryService';
import { ProductForm } from '@/components/AdminCategoriasComponents';

export default function CategoriaPage() {
  const { id } = useParams();
  const router = useRouter();

  const [category, setCategory] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);

  const produtos = [
    { id: 1, nome: 'X-Salada', preco: 15.9, esgotado: false, promocao: true },
    { id: 2, nome: 'Coca-Cola 350ml', preco: 6.0, esgotado: false, promocao: false },
  ];

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const data = await getCategoryById(id as string);
        setCategory(data);
      } catch (err) {
        console.error('Erro ao buscar categoria:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

  const handleEdit = (produto: any) => {
    setEditingProduct(produto);
    setShowProductForm(true);
  };

  const handleNew = () => {
    setEditingProduct(null);
    setShowProductForm(true);
  };

  if (loading) {
    return (
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => router.push('/dashboard/categorias')}
        sx={{ mb: 2 }}
      >
        ← Voltar
      </Button>

      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
        Categoria {category ? category.name : decodeURIComponent(id as string)}
      </Typography>


      <Button
        variant="contained"
        color="primary"
        onClick={handleNew}
        startIcon={<PlusCircle size={20} />}
        sx={{ mb: 3 }}
      >
        Novo Produto
      </Button>

      {produtos.map((p) => (
        <Paper
          key={p.id}
          sx={{
            padding: '1rem',
            mb: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <Typography variant="subtitle1" fontWeight={600}>
              {p.nome}
            </Typography>
            <Typography variant="body2">
              R$ {p.preco.toFixed(2)}{' '}
              {p.esgotado && <span style={{ color: 'red' }}>(Esgotado)</span>}
              {p.promocao && (
                <span style={{ color: 'green', marginLeft: 8 }}>(Promoção)</span>
              )}
            </Typography>
          </div>
          <div>
            <Tooltip title="Editar produto">
              <IconButton color="primary" onClick={() => handleEdit(p)}>
                <Edit size={20} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Excluir produto">
              <IconButton color="error">
                <Trash2 size={20} />
              </IconButton>
            </Tooltip>
          </div>
        </Paper>
      ))}

      {showProductForm && (
        <ProductForm
          onClose={() => setShowProductForm(false)}
          produto={editingProduct}
        />
      )}
    </Box>
  );
}
