// src/app/dashboard/layout.tsx
'use client';

import { useState, useEffect } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/HeaderComponents';
import { useRouter } from 'next/navigation';
import { checkAdminSession } from '@/services/authAdmin';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function CardapioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();

  const [authChecking, setAuthChecking] = useState(true);
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const drawerExpanded = 230;
  const drawerCollapsed = 70;
  const leftOffset = isMobile
    ? 0
    : collapsed
    ? drawerCollapsed
    : drawerExpanded;

  useEffect(() => {
    const run = async () => {
      const valid = await checkAdminSession();

      if (!valid) {
        router.push('/login');
        return;
      }

      setAuthChecking(false);
    };

    run();
  }, [router]);

  if (authChecking) return null;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: 'flex' }}>
        <Header
          onMenuClick={() => setOpen(true)}
          leftOffset={leftOffset}
        />

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
    </LocalizationProvider>
  );
}
