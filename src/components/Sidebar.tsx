// components/SiderBar.tsx

'use client';
import React, { useEffect, useState } from 'react';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import { useTheme } from '@/context/ThemeContext';
import {
  Menu,
  ChevronLeft,
  BarChart2,
  Folder,
  LayoutGrid,
  Settings,
  LogOut,
  Sun,
  Moon,
} from 'lucide-react';
import { IconButton, Tooltip } from '@mui/material';
import { styled } from '@mui/system';
import { useRouter, usePathname } from 'next/navigation';

// ====== STYLES ======
const SidebarContainer = styled('aside')<{ isOpen: boolean }>(({ theme, isOpen }) => ({
  position: 'fixed', // ✅ fixa na lateral
  top: 0,
  left: 0,
  width: isOpen ? 230 : 70,
  height: '100vh',
  backgroundColor: theme.palette.background.paper,
  borderRight: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  transition: 'all 0.3s ease',
  zIndex: 1200, // ✅ garante que fique acima do conteúdo
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 0 10px rgba(0,0,0,0.5)'
      : '0 0 10px rgba(0,0,0,0.1)',
}));


const NavSection = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyContent: 'flex-start',
  paddingLeft: 6,
  marginTop: 20,
  flexGrow: 1,
});

const NavItem = styled('div')<{ active?: boolean; isOpen?: boolean }>(
  ({ theme, active, isOpen }) => ({
    display: 'grid',
    gridTemplateColumns: isOpen ? '28px 1fr' : '1fr',
    alignItems: 'center',
    columnGap: isOpen ? '10px' : 0,
    padding: '10px 8px',
    minHeight: 44,
    borderRadius: 8,
    cursor: 'pointer',
    backgroundColor: active ? theme.palette.primary.main : 'transparent',
    color: active ? theme.palette.primary.contrastText : theme.palette.primary.main,
    boxShadow: active ? `inset 3px 0 ${theme.palette.primary.dark}` : 'none', // 🔥 filete lateral ativo
    transition: 'background-color .2s ease, transform .2s ease',
    '&:hover': {
      backgroundColor: active
        ? theme.palette.primary.light
        : `${theme.palette.primary.main}15`,
      transform: 'translateX(2px)',
    },
  })
);

const IconSlot = styled('div')({
  width: 24,
  height: 24,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  '& svg': {
    width: 22,
    height: 22,
    display: 'block',
  },
});

const NavLabel = styled('span')<{ isOpen: boolean }>(({ isOpen }) => ({
  display: isOpen ? 'inline' : 'none',
  fontSize: '0.95rem',
  fontWeight: 500,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));

// ====== COMPONENT ======
export default function Sidebar({
  isOpen,
  onToggle,
}: {
  isOpen: boolean;
  onToggle: () => void;
}) {
  const { darkMode, toggleTheme } = useTheme();
  const muiTheme = useMuiTheme();
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  useEffect(() => {
    // Só fecha o menu ao entrar no mobile pela primeira vez, não ao abrir manualmente
    if (isMobile && isOpen && window.innerWidth > 500) {
      onToggle();
    }
  }, [])

  const ICON_SIZE = 22;
  const iconColor = muiTheme.palette.primary.main;

  // ====== MENU ITEMS ======
  const items = [
    { label: 'Relatório', icon: BarChart2, path: '/dashboard' },
    { label: 'Categoria', icon: Folder, path: '/dashboard/categorias' },
    { label: 'Gerenciamento', icon: Settings, path: '/dashboard/gerenciamento' },
  ];

  // ====== RETURN ======
  return (
    <SidebarContainer isOpen={isOpen}>
      {/* TOPO */}
      <div style={{ textAlign: isOpen ? 'right' : 'center', padding: '1rem' }}>
        <IconButton onClick={onToggle} size="small" color="inherit">
          {isOpen ? (
            <ChevronLeft size={ICON_SIZE} color={iconColor} />
          ) : (
            <Menu size={ICON_SIZE} color={iconColor} />
          )}
        </IconButton>
      </div>

      {/* ITENS DO MENU */}
      <NavSection>
        {items.map(({ label, icon: Icon, path }) => {
          const isActive = pathname === path;
          return (
            <Tooltip key={label} title={!isOpen ? label : ''} placement="right">
              <NavItem
                isOpen={isOpen}
                active={isActive}
                onClick={() => router.push(path)}
              >
                <IconSlot>
                  <Icon
                    size={ICON_SIZE}
                    color={isActive ? muiTheme.palette.primary.contrastText : iconColor}
                    strokeWidth={2}
                  />
                </IconSlot>
                <NavLabel isOpen={isOpen}>{label}</NavLabel>
              </NavItem>
            </Tooltip>
          );
        })}
      </NavSection>

      {/* RODAPÉ */}
      <div style={{ marginBottom: '1rem', paddingLeft: 6 }}>
        <Tooltip title="Trocar tema" placement="right">
          <NavItem isOpen={isOpen} onClick={toggleTheme}>
            <IconSlot>
              {darkMode ? (
                <Sun size={20} color={muiTheme.palette.secondary.main} />
              ) : (
                <Moon size={20} color={muiTheme.palette.secondary.main} />
              )}
            </IconSlot>
            <NavLabel isOpen={isOpen}>
              {darkMode ? 'Tema Claro' : 'Tema Escuro'}
            </NavLabel>
          </NavItem>
        </Tooltip>

        <Tooltip title={!isOpen ? 'Sair' : ''} placement="right">
          <NavItem isOpen={isOpen}>
            <IconSlot>
              <LogOut size={20} color={iconColor} />
            </IconSlot>
            <NavLabel isOpen={isOpen}>Sair</NavLabel>
          </NavItem>
        </Tooltip>
      </div>
    </SidebarContainer>
  );
}
