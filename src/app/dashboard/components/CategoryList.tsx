'use client';
import React from 'react';
import { styled } from '@mui/system';
import { IconButton, Paper, Typography, Tooltip } from '@mui/material';
import { Edit, Trash2, PlusCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

const CategoryCard = styled(Paper)(({ theme }) => ({
  padding: '1rem',
  marginBottom: '1rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderRadius: 10,
  border: `1px solid ${theme.palette.divider}`,
}));

export default function CategoryList() {
  const router = useRouter();

  const categorias = [
    { id: 1, nome: 'Lanches' },
    { id: 2, nome: 'Bebidas' },
    { id: 3, nome: 'Sobremesas' },
  ];

  return (
    <div>
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
    </div>
  );
}
