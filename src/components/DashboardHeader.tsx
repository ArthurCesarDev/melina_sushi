'use client';

import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import { Avatar, Typography, IconButton } from '@mui/material';
import { Menu } from 'lucide-react';

const HeaderContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '1rem 2rem',
  borderBottom: `1px solid ${theme.palette.divider}`,
  position: 'sticky',
  top: 0,
  zIndex: 1100,
  backgroundColor: theme.palette.background.paper,
}));

export default function DashboardHeader({
  onMenuClick,
}: {
  onMenuClick?: () => void;
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <HeaderContainer>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {isMobile && (
          <IconButton onClick={onMenuClick} color="primary">
            <Menu size={24} />
          </IconButton>
        )}
        <Typography variant="h6">Painel de Controle</Typography>
      </div>

      <Avatar
        src="/logo.jpeg"
        alt="Lanchonete"
        sx={{ width: 40, height: 40, borderRadius: 2 }}
      />
    </HeaderContainer>
  );
}
