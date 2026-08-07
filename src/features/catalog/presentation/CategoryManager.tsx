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
import { Edit, Trash2, List } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '@/features/catalog/data/category-service';
import type { Category } from '@/features/catalog/domain/catalog';
import { getErrorMessage } from '@/core/errors/get-error-message';
import { useToast } from '@/context/ToastContext';
import DeleteConfirmDialog from '@/components/dialogs/DeleteConfirmDialog';
import { Pagination } from "@mui/material";


export function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [openForm, setOpenForm] = useState(false);
  const { showToast } = useToast();
  const router = useRouter();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const fetchCategories = async (newPage = 1) => {
    try {
      setLoading(true);
      const { items, totalCount } = await getCategories(newPage, 5);
      setCategories(items);
      setTotalPages(Math.ceil((totalCount || 0) / 5) || 1);
    } catch (error: unknown) {
      showToast(getErrorMessage(error, "Erro ao buscar categorias."), "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories(page);
  }, [page]);

  const handleSuccess = () => {
    fetchCategories();
    setOpenForm(false);
    setEditing(null);
  };



  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h5" fontWeight={600}>
          Gerenciar Categorias
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenForm(true)}
        >
          + Nova Categoria
        </Button>
      </Box>


      {loading && <Typography>Carregando categorias...</Typography>}

     
      {!loading && categories.length === 0 && (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ textAlign: 'center', mt: 3 }}
        >
          Nenhuma categoria cadastrada até o momento.
        </Typography>
      )}

     
      {!loading &&
        categories.length > 0 &&
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
             
              <Tooltip title="Ver Itens da Categoria">
                <IconButton
                  color="primary"
                  onClick={() => router.push(`/dashboard/categorias/${cat.id}`)}
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
                <IconButton
                  color="error"
                  onClick={() => {
                    setDeleteId(cat.id);
                    setOpenDelete(true);
                  }}
                >
                  <Trash2 size={20} />
                </IconButton>
              </Tooltip>
            </Box>
          </Paper>
        ))}

      {/* 🟢 Modal de confirmação de exclusão */}
      <DeleteConfirmDialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={async () => {
          if (!deleteId) return;
          try {
            const result = await deleteCategory(deleteId);
            showToast(result.message, 'success');
            setCategories((prev) => prev.filter((cat) => cat.id !== deleteId));
          } catch (error: unknown) {
            showToast(getErrorMessage(error, 'Erro ao excluir categoria'), 'error');
          } finally {
            setDeleteId(null);
          }
        }}
        title="Excluir categoria"
        message="Tem certeza que deseja excluir esta categoria? Essa ação não pode ser desfeita."
      />
      {!loading && categories.length > 0 && (
        <Box display="flex" justifyContent="center" mt={3}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
            shape="rounded"
          />
        </Box>
      )}

      {/* 🟢 Modal de criação/edição */}
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
  initialData?: Category | null;
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
    } catch (error: unknown) {
      showToast(getErrorMessage(error, 'Erro ao salvar categoria'), 'error');
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
