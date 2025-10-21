'use client';

import React from 'react';
import { styled } from '@mui/system';
import { Avatar, Typography } from '@mui/material';

const HeaderContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '1rem 2rem',
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export default function DashboardHeader() {
  return (
    <HeaderContainer>
      <Typography variant="h6">Painel de Controle</Typography>
      <Avatar
        src="/logo.jpeg"
        alt="Lanchonete"
        sx={{ width: 40, height: 40, borderRadius: 2 }}
      />
    </HeaderContainer>
  );
}
