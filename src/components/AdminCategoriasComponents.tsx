'use client';
import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Paper,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Edit, Trash2, List } from 'lucide-react'; // 👈 adiciona o ícone de lista
import { useRouter } from 'next/navigation'; // 👈 adiciona o hook de navegação
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '@/services/categoryService';
import { useToast } from '@/context/ToastContext';

// 🔹 LISTAGEM DE CATEGORIAS
export function CategoryList() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [openForm, setOpenForm] = useState(false);

  const { showToast } = useToast();
  const router = useRouter(); // ✅ necessário pra navegar entre páginas

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const items = await getCategories();
      setCategories(items);
    } catch (err: any) {
      console.error('Erro ao buscar categorias:', err);
      showToast('Erro ao buscar categorias.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta categoria?')) {
      try {
        const result = await deleteCategory(id);
        showToast(result.message || 'Categoria excluída com sucesso!', 'success');
        fetchCategories();
      } catch (err: any) {
        console.error('Erro ao excluir categoria:', err);
        showToast(err.message || 'Erro ao excluir categoria', 'error');
      }
    }
  };

  const handleSuccess = () => {
    fetchCategories();
    setOpenForm(false);
    setEditing(null);
  };

  return (
    <Box>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenForm(true)}
        sx={{ mb: 3 }}
      >
        + Nova Categoria
      </Button>

      {loading && <Typography>Carregando categorias...</Typography>}

      {!loading &&
        categories.map((cat) => (
          <Paper
            key={cat.id}
            sx={{
              p: 2,
              mb: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="subtitle1" fontWeight={600}>
              {cat.name}
            </Typography>

            <Box>
              {/* ✅ NOVO BOTÃO PARA IR AOS ITENS */}
              <Tooltip title="Ver Itens da Categoria">
                <IconButton
                  color="primary"
                  onClick={() => router.push(`/dashboard/categorias/${encodeURIComponent(cat.name)}`)}
                >
                  <List size={20} />
                </IconButton>
              </Tooltip>

              <Tooltip title="Editar">
                <IconButton
                  color="primary"
                  onClick={() => {
                    setEditing(cat);
                    setOpenForm(true);
                  }}
                >
                  <Edit size={20} />
                </IconButton>
              </Tooltip>

              <Tooltip title="Excluir">
                <IconButton color="error" onClick={() => handleDelete(cat.id)}>
                  <Trash2 size={20} />
                </IconButton>
              </Tooltip>
            </Box>
          </Paper>
        ))}

      {openForm && (
        <CategoryForm
          initialData={editing}
          onClose={() => {
            setOpenForm(false);
            setEditing(null);
          }}
          onSuccess={handleSuccess}
        />
      )}
    </Box>
  );
}

// 🔹 FORMULÁRIO DE CRIAÇÃO/EDIÇÃO
export function CategoryForm({
  initialData,
  onClose,
  onSuccess,
}: {
  initialData?: any;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [name, setName] = useState(initialData?.name || '');
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async () => {
    try {
      setLoading(true);

      let result;
      if (initialData) {
        result = await updateCategory({ id: initialData.id, name });
      } else {
        result = await createCategory({ name });
      }

      showToast(result.message || 'Operação realizada com sucesso.', 'success');
      onSuccess(); // atualiza lista e fecha modal
    } catch (err: any) {
      console.error('Erro ao salvar categoria:', err);
      showToast(err.message || 'Erro ao salvar categoria', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>
        {initialData ? 'Editar Categoria' : 'Nova Categoria'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <TextField
            label="Nome da Categoria"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Box sx={{ display: 'flex', justifyContent: 'end', mt: 3, gap: 1 }}>
            <Button onClick={onClose} color="inherit">
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={loading || !name.trim()}
            >
              {loading
                ? 'Salvando...'
                : initialData
                ? 'Salvar Alterações'
                : 'Cadastrar'}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
