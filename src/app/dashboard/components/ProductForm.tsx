'use client';

import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Switch,
  FormControlLabel,
} from '@mui/material';

export default function ProductForm({
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

  // 🔹 se for edição, preencher os dados
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
    if (produto) {
      console.log('Atualizando produto:', data);
    } else {
      console.log('Novo produto:', data);
    }
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
