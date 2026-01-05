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
import { Edit, Trash2, PlusCircle, ArrowLeft } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { getCategoryById } from '@/services/categoryService';
import { deleteProduct } from '@/services/productService';
import { useToast } from '@/context/ToastContext';
import ProductForm from '@/components/AdminProductForm';
import DeleteConfirmModal from '@/components/UI/DeleteConfirmModal';

export default function CategoriaPage() {
  const { id } = useParams() as Record<string, string>;
  const router = useRouter();
  const { showToast } = useToast();

  const [category, setCategory] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [openDelete, setOpenDelete] = useState(false);

  const fetchCategory = async () => {
    try {
      setLoading(true);
      const data = await getCategoryById(id as string);
      setCategory(data);
    } catch (err: any) {
      console.error('Erro ao buscar categoria:', err);
      showToast(err.message || 'Erro ao carregar categoria', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!category) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">Categoria não encontrada.</Typography>
      </Box>
    );
  }

  const produtos = category.products?.items || [];

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          mb: 3,
        }}
      >
        {/* Esquerda: nome + voltar */}
        <Box>
          <Typography variant="h5" fontWeight={600}>
            {category.name}
          </Typography>

          <Button
            variant="text"
            color="primary"
            startIcon={<ArrowLeft size={27} />}
            onClick={() => router.push('/dashboard/categorias')}
            sx={{ mt: 1, p: 1, minWidth: 'auto' }}
          >
            Voltar
          </Button>
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<PlusCircle size={20} />}
          onClick={() => {
            setEditingProduct(null);
            setShowProductForm(true);
          }}
        >
          Novo Produto
        </Button>
      </Box>
      {produtos.length === 0 && (
        <Typography color="text.secondary" sx={{ mt: 2 }}>
          Nenhum produto cadastrado nesta categoria.
        </Typography>
      )}

      {produtos.map((p: any) => (
        <Paper
          key={p.id}
          sx={{
            p: 2,
            mb: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
            border: '1px solid #e0e0e0',
            borderRadius: 2,
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            transition: 'all 0.2s',
            '&:hover': { boxShadow: '0 4px 8px rgba(0,0,0,0.08)' },
          }}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Box
              sx={{
                width: 70,
                height: 70,
                borderRadius: 2,
                overflow: 'hidden',
                backgroundColor: '#f8f8f8',
                border: '1px solid #eee',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img
                src={p.imageUrl || '/no-image.png'}
                alt={p.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Box>

            <Box>
              <Typography variant="subtitle1" fontWeight={600}>
                {p.name}
              </Typography>
              <Typography variant="body2">
                R$ {p.price?.toFixed(2) || '0.00'}{' '}
                {p.isOnSale && (
                  <span style={{ color: 'red', fontWeight: 600, marginLeft: 6 }}>
                    (Promoção)
                  </span>
                )}
                {p.isOutOfStock && (
                  <span style={{ color: '#ff9800', fontWeight: 600, marginLeft: 6 }}>
                    (Esgotado)
                  </span>
                )}
              </Typography>
            </Box>
          </Box>

          <Box>
            <Tooltip title="Editar produto">
              <IconButton
                color="primary"
                onClick={() => {
                  setEditingProduct(p);
                  setShowProductForm(true);
                }}
              >
                <Edit size={20} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Excluir produto">
              <IconButton
                color="error"
                onClick={() => {
                  setDeleteId(p.id);
                  setOpenDelete(true);
                }}
              >
                <Trash2 size={20} />
              </IconButton>
            </Tooltip>
          </Box>
        </Paper>
      ))}
      {showProductForm && (
        <ProductForm
          categoryId={id as string}
          produto={editingProduct}
          onClose={() => {
            setShowProductForm(false);
            setEditingProduct(null);
          }}
          onSuccess={fetchCategory}
        />
      )}
      <DeleteConfirmModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={async () => {
          if (!deleteId) return;
          try {
            const result = await deleteProduct(deleteId);
            showToast(result.message || 'Produto excluído com sucesso!', 'success');
            await fetchCategory(); 
          } catch (err: any) {
            console.error('Erro ao excluir produto:', err);
            showToast(err.message || 'Erro ao excluir produto', 'error');
          } finally {
            setDeleteId(null);
          }
        }}
        title="Excluir Produto"
        message="Tem certeza que deseja excluir este produto? Essa ação não pode ser desfeita."
      />
    </Box>
  );
}
