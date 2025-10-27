'use client';
import { useState } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/HeaderComponents';

export default function CardapioLayout({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // 🔹 mobile inicia fechado; desktop com controle (começa expandido)
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  // larguras do menu permanente (desktop)
  const drawerExpanded = 230;
  const drawerCollapsed = 70;
  const leftOffset = isMobile ? 0 : (collapsed ? drawerCollapsed : drawerExpanded);

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Header agora sabe o offset do menu */}
      <Header onMenuClick={() => setOpen(true)} leftOffset={leftOffset} />

      <Sidebar
        open={isMobile ? open : true}
        onClose={() => setOpen(false)}
        variant={isMobile ? 'temporary' : 'permanent'}
        collapsed={!isMobile && collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          ml: { xs: 0, sm: `${leftOffset}px` },
          transition: 'margin-left 0.3s ease',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
