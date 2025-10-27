'use client';
import React from 'react';
import {
  Drawer,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Divider,
} from '@mui/material';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import { useTheme } from '@/context/ThemeContext';
import { useRouter, usePathname } from 'next/navigation';
import {
  ChevronLeft,
  ChevronRight,
  BarChart2,
  Folder,
  Settings,
  Sun,
  Moon,
  LogOut,
} from 'lucide-react';

export default function Sidebar({
  open,
  onClose,
  variant = 'temporary',
  collapsed = false,
  onToggleCollapse,
}: {
  open: boolean;
  onClose: () => void;
  variant?: 'temporary' | 'permanent';
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}) {
  const muiTheme = useMuiTheme();
  const { darkMode, toggleTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const items = [
    { label: 'Relatório', icon: BarChart2, path: '/dashboard' },
    { label: 'Categoria', icon: Folder, path: '/dashboard/categorias' },
    { label: 'Gerenciamento', icon: Settings, path: '/dashboard/gerenciamento' },
  ];

  const drawerWidth = collapsed ? 70 : 230;
  const hoverBg = `${muiTheme.palette.secondary.main}22`;

  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      PaperProps={{
        sx: {
          width: drawerWidth,
          bgcolor: muiTheme.palette.background.paper,
          color: muiTheme.palette.text.primary,
          borderRight: `1px solid ${muiTheme.palette.divider}`,
          transition: 'width 0.3s ease',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        },
      }}
      sx={{ zIndex: 1300 }}
    >
      {/* TOPO */}
      <Box display="flex" alignItems="center" justifyContent="space-between" p={2}>
        {variant === 'permanent' ? (
          <IconButton onClick={onToggleCollapse}>
            {collapsed ? <ChevronRight size={22} /> : <ChevronLeft size={22} />}
          </IconButton>
        ) : (
          <IconButton onClick={onClose}>
            <ChevronLeft size={22} />
          </IconButton>
        )}
      </Box>

      {/* LISTA PRINCIPAL */}
      <List sx={{ px: 1, flexGrow: 1, overflowY: 'auto' }}>
        {items.map(({ label, icon: Icon, path }) => {
          const active = pathname === path;
          return (
            <ListItem key={label} disablePadding sx={{ display: 'block' }}>
              <Tooltip title={collapsed ? label : ''} placement="right">
                <ListItemButton
                  selected={active}
                  onClick={() => {
                    router.push(path);
                    if (variant === 'temporary') onClose();
                  }}
                  sx={{
                    justifyContent: collapsed ? 'center' : 'flex-start',
                    px: collapsed ? 1.25 : 2,
                    borderRadius: 2,
                    my: 0.5,
                    '&:hover': { backgroundColor: hoverBg },
                    '&.Mui-selected': {
                      backgroundColor: muiTheme.palette.primary.main,
                      color: muiTheme.palette.primary.contrastText,
                      '& .MuiListItemIcon-root': {
                        color: muiTheme.palette.primary.contrastText,
                      },
                      '&:hover': { backgroundColor: muiTheme.palette.primary.main },
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: collapsed ? 0 : 1.5,
                      justifyContent: 'center',
                      color: active
                        ? muiTheme.palette.primary.main
                        : muiTheme.palette.text.secondary,
                    }}
                  >
                    <Icon size={20} />
                  </ListItemIcon>

                  {!collapsed && (
                    <ListItemText
                      primary={label}
                      sx={{
                        '& .MuiListItemText-primary': { fontWeight: 500 },
                      }}
                    />
                  )}
                </ListItemButton>
              </Tooltip>
            </ListItem>
          );
        })}
      </List>

      {/* RODAPÉ */}
      <Box sx={{ px: 1, pb: 1 }}>
        <Divider sx={{ mb: 1, opacity: 0.3 }} />

        {/* alternar tema */}
        <Tooltip title={collapsed ? 'Alternar tema' : ''} placement="right">
          <ListItemButton
            onClick={toggleTheme}
            sx={{
              justifyContent: collapsed ? 'center' : 'flex-start',
              px: collapsed ? 1.25 : 2,
              borderRadius: 2,
              my: 0.5,
              '&:hover': { backgroundColor: hoverBg },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: collapsed ? 0 : 1.5,
                justifyContent: 'center',
                color: muiTheme.palette.text.secondary,
              }}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </ListItemIcon>
            {!collapsed && <ListItemText primary="Alternar tema" />}
          </ListItemButton>
        </Tooltip>

        {/* sair */}
        <Tooltip title={collapsed ? 'Sair' : ''} placement="right">
          <ListItemButton
            onClick={() => alert('Sair')}
            sx={{
              justifyContent: collapsed ? 'center' : 'flex-start',
              px: collapsed ? 1.25 : 2,
              borderRadius: 2,
              my: 0.5,
              '&:hover': { backgroundColor: hoverBg },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: collapsed ? 0 : 1.5,
                justifyContent: 'center',
                color: muiTheme.palette.text.secondary,
              }}
            >
              <LogOut size={20} />
            </ListItemIcon>
            {!collapsed && (
              <ListItemText
                primary="Sair"
                sx={{ '& .MuiListItemText-primary': { fontWeight: 500 } }}
              />
            )}
          </ListItemButton>
        </Tooltip>
      </Box>
    </Drawer>
  );
}
