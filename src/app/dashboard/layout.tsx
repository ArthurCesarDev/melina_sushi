'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { Container, Content } from '@/app/dashboard/categorias/components/styles';
import { Box } from '@mui/material';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <Container>
      {/* Sidebar fixa */}
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Conteúdo principal */}
      <Content
        sx={{
          marginLeft: isSidebarOpen ? '230px' : '70px', // 👉 mesmo tamanho do Sidebar
          transition: 'margin 0.3s ease',
          minHeight: '100vh',
          overflowX: 'hidden',
        }}
      >
        <DashboardHeader />
        <Box sx={{ padding: '2rem' }}>{children}</Box>
      </Content>
    </Container>
  );
}
