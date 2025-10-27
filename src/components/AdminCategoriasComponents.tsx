'use client';
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Switch,
  FormControlLabel,
  IconButton,
  Paper,
  Typography,
  Tooltip,
} from '@mui/material';
import { styled } from '@mui/system';
import { Edit, Trash2, PlusCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

// ---------- COMPONENTE: CategoryList ----------
const CategoryCard = styled(Paper)(({ theme }) => ({
  padding: '1rem',
  marginBottom: '1rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderRadius: 10,
  border: `1px solid ${theme.palette.divider}`,
}));

export function CategoryList() {
  const router = useRouter();
  const categorias = [
    { id: 1, nome: 'Lanches' },
    { id: 2, nome: 'Bebidas' },
    { id: 3, nome: 'Sobremesas' },
  ];

  return (
    <>
      {categorias.map((cat) => (
        <CategoryCard key={cat.id}>
          <Typography variant="body1">{cat.nome}</Typography>
          <div>
            <Tooltip title="Ver produtos">
              <IconButton
                color="primary"
                onClick={() => router.push(`/dashboard/categorias/${cat.id}`)}
              >
                <PlusCircle size={20} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Editar categoria">
              <IconButton color="primary">
                <Edit size={20} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Excluir categoria">
              <IconButton color="error">
                <Trash2 size={20} />
              </IconButton>
            </Tooltip>
          </div>
        </CategoryCard>
      ))}
    </>
  );
}

// ---------- COMPONENTE: CategoryForm ----------
export function CategoryForm({ onClose }: { onClose: () => void }) {
  const [nome, setNome] = useState('');

  const handleSubmit = () => {
    console.log('Nova categoria:', nome);
    onClose();
  };

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Cadastrar Categoria</DialogTitle>
      <DialogContent>
        <TextField
          label="Nome da categoria"
          fullWidth
          margin="normal"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ---------- COMPONENTE: ProductForm ----------
export function ProductForm({
  onClose,
  produto,
}: {
  onClose: () => void;
  produto?: any;
}) {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [emPromocao, setEmPromocao] = useState(false);
  const [esgotado, setEsgotado] = useState(false);

  useEffect(() => {
    if (produto) {
      setNome(produto.nome || '');
      setPreco(produto.preco?.toString() || '');
      setEmPromocao(!!produto.promocao);
      setEsgotado(!!produto.esgotado);
    }
  }, [produto]);

  const handleSubmit = () => {
    const data = { nome, preco, emPromocao, esgotado };
    console.log(produto ? 'Atualizando produto:' : 'Novo produto:', data);
    onClose();
  };

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {produto ? 'Editar Produto' : 'Cadastrar Produto'}
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Nome do produto"
          fullWidth
          margin="normal"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <TextField
          label="Preço (R$)"
          type="number"
          fullWidth
          margin="normal"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
        />

        <FormControlLabel
          control={
            <Switch
              checked={emPromocao}
              onChange={() => setEmPromocao(!emPromocao)}
            />
          }
          label="Está em promoção?"
        />

        <FormControlLabel
          control={
            <Switch
              checked={esgotado}
              onChange={() => setEsgotado(!esgotado)}
            />
          }
          label="Produto esgotado"
        />

        <TextField
          type="file"
          fullWidth
          margin="normal"
          inputProps={{ accept: 'image/*' }}
          helperText="Adicione uma imagem do produto"
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {produto ? 'Salvar Alterações' : 'Salvar Produto'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
