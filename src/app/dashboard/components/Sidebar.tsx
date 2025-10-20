'use client';
import React, { useEffect, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import {
  Menu,
  ChevronLeft,
  Home,
  LayoutGrid,
  User,
  LogOut,
  Sun,
  Moon,
} from 'lucide-react';
import { IconButton, Tooltip } from '@mui/material';
import { styled } from '@mui/system';



const SidebarContainer = styled('aside')<{ isOpen: boolean }>(({ theme, isOpen }) => ({
  width: isOpen ? 230 : 70,
  backgroundColor: theme.palette.background.paper,
  borderRight: `1px solid ${theme.palette.divider}`,
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  transition: 'all 0.3s ease',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 0 10px rgba(0,0,0,0.5)'
    : '0 0 10px rgba(0,0,0,0.1)',
}));

const NavItem = styled('div')<{ active?: boolean }>(({ theme, active }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  padding: '0.8rem 1.2rem',
  borderRadius: 8,
  cursor: 'pointer',
  backgroundColor: active ? theme.palette.primary.main : 'transparent',
  color: active ? '#fff' : theme.palette.primary.main,
  transition: '0.2s ease',
  '&:hover': {
    backgroundColor: active
      ? theme.palette.primary.light
      : `${theme.palette.primary.main}15`,
  },
}));

const NavLabel = styled('span')<{ isOpen: boolean }>(({ isOpen }) => ({
  display: isOpen ? 'inline' : 'none',
  fontSize: '0.95rem',
  fontWeight: 500,
}));

export default function Sidebar({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) {
  const { darkMode, toggleTheme } = useTheme();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile && isOpen) onToggle(); // fecha no mobile por padrão
  }, [isMobile]);

   const iconColor = '#FF5722';
  const iconSize = 22

  const items = [
    { label: 'Gerenciar', icon: <Home size={iconSize} color={iconColor} /> },
    { label: 'Categorias', icon: <LayoutGrid size={iconSize} color={iconColor} /> },
    { label: 'Perfil', icon: <User size={iconSize} color={iconColor} /> },
  ];

  return (
    <SidebarContainer isOpen={isOpen}>
      <div>
        {/* Topo - botão de abrir/fechar */}
        <div style={{ textAlign: isOpen ? 'right' : 'center', padding: '1rem' }}>
          <IconButton onClick={onToggle} size="small" color="inherit">
            {isOpen ? (
              <ChevronLeft size={22} color="#FF5722" /> 
            ) : (
              <Menu size={22} color="#FF5722" />
            )}
          </IconButton>
        </div>

        {/* Itens do menu */}
        {items.map((item) => (
          <Tooltip key={item.label} title={!isOpen ? item.label : ''} placement="right">
            <NavItem>
              {React.cloneElement(item.icon, { color: '#FF5722' })} {/* cor laranja */}
              <NavLabel isOpen={isOpen}>{item.label}</NavLabel>
            </NavItem>
          </Tooltip>
        ))}
      </div>

      {/* Parte inferior - tema + sair */}
      <div>
        <Tooltip title="Trocar tema" placement="right">
          <NavItem onClick={toggleTheme}>
            {darkMode ? (
              <Sun size={20} color="#FF9800" />
            ) : (
              <Moon size={20} color="#FF9800" />
            )}
            <NavLabel isOpen={isOpen}>
              {darkMode ? 'Tema Claro' : 'Tema Escuro'}
            </NavLabel>
          </NavItem>
        </Tooltip>

        <Tooltip title={!isOpen ? 'Sair' : ''} placement="right">
          <NavItem>
            <LogOut size={20} color="#FF5722" />
            <NavLabel isOpen={isOpen}>Sair</NavLabel>
          </NavItem>
        </Tooltip>
      </div>
    </SidebarContainer>
  );
}
