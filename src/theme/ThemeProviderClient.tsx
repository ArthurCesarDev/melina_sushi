'use client';

import { ReactNode, useMemo } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { baseTheme } from './index';
import { useTheme } from '@/context/ThemeContext';

interface Props {
  children: ReactNode;
}

export default function ThemeProviderClient({ children }: Props) {
  const { darkMode } = useTheme();

  const theme = useMemo(() => baseTheme(darkMode), [darkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
