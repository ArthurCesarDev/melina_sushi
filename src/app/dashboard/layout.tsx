'use client';

import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { Container, Content } from '@/app/dashboard/categorias/components/styles';
import { Box } from '@mui/material';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Começa fechado por padrão
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detecta se é mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 🔥 Abre automaticamente no desktop, fecha no mobile
  useEffect(() => {
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);

  return (
    <Container>
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Conteúdo principal */}
      <Content
        sx={{
          marginLeft: isMobile ? 0 : isSidebarOpen ? '230px' : '70px',
          transition: 'margin-left 0.3s ease',
          minHeight: '100vh',
          overflowX: 'hidden',
          backgroundColor: 'background.default',
        }}
      >
        {/* Header controla o menu no mobile */}
        <DashboardHeader onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

        <Box sx={{ padding: '2rem' }}>{children}</Box>
      </Content>
    </Container>
  );
}
