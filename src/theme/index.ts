// src/theme/index.ts
// src/theme/index.ts
import { createTheme } from '@mui/material/styles';

export const baseTheme = (darkMode: boolean) =>
  createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#FF5722',      
        light: '#FF7043',     
        dark: '#E64A19',      
        contrastText: '#ffffffff',
      },
      secondary: {
        main: '#FFC107',     
        contrastText: '#000000',
      },
      background: {
        default: darkMode ? '#121212' : '#ffffffff', 
        paper: darkMode ? '#1E1E1E' : '#FFFFFF',
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
          root: {
            borderRadius: 10,
            padding: '10px 18px',
            fontSize: '0.95rem',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              backgroundColor: '#FF7043', 
              transform: 'translateY(-2px)', 
            },
          },
        },
      },
    },
  });

