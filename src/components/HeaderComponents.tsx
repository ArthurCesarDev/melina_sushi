'use client';
import { AppBar, Toolbar, IconButton, Typography, useMediaQuery } from '@mui/material';
import { Menu } from 'lucide-react';
import { useTheme } from '@mui/material/styles';

export default function Header({
  onMenuClick,
  leftOffset = 0,
}: {
  onMenuClick: () => void;
  leftOffset?: number; 
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar
      position="fixed"
      elevation={1}
      sx={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderBottom: `1px solid ${theme.palette.divider}`,
        ml: { xs: 0, sm: `${leftOffset}px` },
        width: { xs: '100%', sm: `calc(100% - ${leftOffset}px)` },
        transition: 'margin-left 0.3s ease, width 0.3s ease',
      }}
    >
      <Toolbar sx={{ gap: 1 }}>
        {isMobile && (
          <IconButton color="primary" onClick={onMenuClick} edge="start" sx={{ mr: 1 }}>
            <Menu size={22} />
          </IconButton>
        )}
        <Typography
          variant="h6"
          fontWeight={700}
          noWrap
          sx={{ display: 'block' }} 
        >
         Cardápio Virtual
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
