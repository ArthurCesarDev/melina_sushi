// src/theme/index.ts
import { createTheme } from '@mui/material/styles';

export const baseTheme = (darkMode: boolean) =>
  createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#FF5722',   // 🍔 laranja principal
        light: '#FF8A50',  // 🍟 laranja hover mais claro
        dark: '#E64A19',   // 🔥 tom forte para modo dark
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: '#FFC107',   // amarelo cheddar
        contrastText: '#000000',
      },
      background: {
        default: darkMode ? '#121212' : '#FFFFFF',  // branco puro no claro
        paper: darkMode ? '#1E1E1E' : '#FFFFFF',    // fundo de cards
      },
      text: {
        primary: darkMode ? '#FFFFFF' : '#212121',
        secondary: darkMode ? '#BDBDBD' : '#757575',
      },
    },

    shape: {
      borderRadius: 12,
    },

    typography: {
      fontFamily: 'Inter, Roboto, sans-serif',
      button: {
        textTransform: 'none',
        fontWeight: 600,
        letterSpacing: 0.3,
      },
    },

    components: {
      MuiButton: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: 10,
            padding: '10px 18px',
            fontSize: '0.95rem',
            transition: 'all 0.2s ease-in-out',
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            '&:hover': {
              backgroundColor: theme.palette.primary.light, 
              transform: 'translateY(-2px)',
            },
          }),
        },
      },
    },
  });
