'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { styled } from '@mui/material/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { toast, ToastContainer } from 'react-toastify';
import { Eye, EyeOff } from 'lucide-react';
import NextLink from 'next/link';
import MuiLink from '@mui/material/Link';
import { BRAND_TAGLINE } from '@/app/utils/copyRight';




interface DecodedToken {
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier': string;
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': 'Client' | 'Admin' | 'Barber';
  firstAccess?: boolean | string
  [key: string]: unknown;
}

function asBool(v: unknown): boolean {
  if (typeof v === 'boolean') return v;
  if (typeof v === 'string') {
    const s = v.trim().toLowerCase();
    return s === 'true' || s === '1';
  }
  return false;
}



// Estilização do container
const LoginContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundColor: theme.palette.mode === 'dark' ? '#121212' : '#f5f5f5',
  padding: theme.spacing(2),
}));

// Estilização do formulário
const FormContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: '2rem',
  borderRadius: '16px',
  boxShadow: theme.shadows[4],
  width: '100%',
  maxWidth: '450px',
  textAlign: 'center',
  border: theme.palette.mode === 'dark' ? '1px solid #333' : '1px solid #e0e0e0',
}));

const InputGroup = styled('div')(() => ({
  marginBottom: '1.25rem',
  textAlign: 'left',
}));

const Label = styled(Typography)(({ theme }) => ({
  fontSize: '0.85rem',
  fontWeight: 500,
  color: theme.palette.text.secondary,
  marginBottom: '0.5rem',
  marginLeft: '0.5rem',
}));

const Input = styled('input')(({ theme }) => ({
  width: '100%',
  padding: '0.875rem 1rem',
  borderRadius: '12px',
  border: `1px solid ${theme.palette.mode === 'dark' ? '#444' : '#ddd'}`,
  fontSize: '0.95rem',
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  transition: 'all 0.3s ease',

  '&:focus': {
    outline: 'none',
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 2px ${theme.palette.mode === 'dark' ? '#333' : '#eee'}`,
  },

  '&::placeholder': {
    color: theme.palette.mode === 'dark' ? theme.palette.grey[500] : theme.palette.grey[500],
    opacity: 1,
  },
}));

const Button = styled('button')(({ theme }) => ({
  width: '100%',
  padding: '0.875rem',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  border: 'none',
  borderRadius: '12px',
  cursor: 'pointer',
  fontSize: '1rem',
  fontWeight: 600,
  transition: 'all 0.3s ease',
  marginTop: '0.5rem',

  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    transform: 'translateY(-1px)',
  },

  '&:active': {
    transform: 'translateY(0)',
  },

  '&:disabled': {
    backgroundColor: theme.palette.grey[500],
    cursor: 'not-allowed',
  }
}));

const SecondaryButton = styled('button')(({ theme }) => ({
  width: '100%',
  padding: '0.75rem',
  background: 'none',
  border: 'none',
  color: theme.palette.primary.main,
  cursor: 'pointer',
  textAlign: 'center',
  marginTop: '1rem',
  fontWeight: 500,
  borderRadius: '8px',
  transition: 'all 0.2s ease',

  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
  },
}));

const Link = styled('a')(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
  fontWeight: 500,
  transition: 'color 0.2s ease',

  '&:hover': {
    color: theme.palette.primary.dark,
    textDecoration: 'underline',
  },
}));



export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [rawPhoneNumber, setRawPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  // Defina o título da página no client-side
  useEffect(() => {
    // Limpa cookies antigos de autenticação ao abrir a tela de login
    Cookies.remove('access_token', { path: '/' });
    Cookies.remove('userId', { path: '/' });

    document.title = "Login";

    // Carregar o tema dos cookies ao inicializar
    const savedTheme = Cookies.get('theme');
    setDarkMode(savedTheme === 'dark');
  }, []);

  // Atualizar o cookie quando o tema mudar
  const handleToggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    Cookies.set('theme', newMode ? 'dark' : 'light', {
      expires: 30, // Expira em 30 dias
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      path: '/',
    });
  };


  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#6d28d9', // Roxo mais vibrante
      },
      background: {
        default: darkMode ? '#121212' : '#f5f5f5',
        paper: darkMode ? '#1e1e1e' : '#ffffff',
      },
      error: {
        main: '#dc2626',
        dark: '#b91c1c',
      },
    },
    shape: {
      borderRadius: 12,
    },
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    Cookies.remove('access_token', { path: '/' });
    Cookies.remove('userId', { path: '/' });

    if (password.length < 6) {
      toast.error('A senha deve conter pelo menos 6 caracteres.', { position: "top-center" });
      return;
    }

    setIsLoading(true);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;

      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: rawPhoneNumber, // Envia apenas os números
          password
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message, { position: "top-center" });
        setIsLoading(false);
        return;
      }

      if (result.success && result.data) {
        const token = result.data;
        const decoded: DecodedToken = jwtDecode(token);

        const userId = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
        const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

        if (!userId || !role) {
          toast.error('Dados incompletos no token de autenticação.');
          setIsLoading(false);
          return;
        }

        Cookies.set('access_token', token, {
          expires: 1,
          secure: false,
          sameSite: 'Lax',
          path: '/',
        });

        Cookies.set('userId', userId, {
          expires: 1,
          secure: false,
          sameSite: 'Lax',
          path: '/',
        });

        toast.success(result.message, { position: "top-center" });

        setTimeout(() => {
          if (role === 'Admin') {
            router.push('/admin');
          } else if (role === 'Client') {
            router.push('/client');
          } else if (role === 'Barber') {
            const rawFirstAccess =
              (decoded as any).firstAccess

            const isFirstAccess = asBool(rawFirstAccess);

            if (isFirstAccess) {
              router.push('/first-access'); // <-- ajuste a rota que você usa
            } else {
              // acesso normal: envia para o dashboard do barbeiro
              router.push('/barber');
            }
          }
          else {
            router.push('/dashboard');
          }
        }, 2000);
      } else {
        toast.error(result.message);
        setIsLoading(false);
      }
    } catch (err) {
      console.error('Erro ao fazer login:', err);
      toast.error('Ocorreu um erro inesperado. Tente novamente mais tarde.');
      setIsLoading(false);
    }
  };
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Remove todos os caracteres não numéricos
    const rawValue = value.replace(/\D/g, '');
    setRawPhoneNumber(rawValue); // Armazena o valor sem formatação

    // Aplica a máscara
    let formattedValue = '';
    if (rawValue.length > 0) {
      if (rawValue.length <= 2) {
        formattedValue = `(${rawValue}`;
      } else if (rawValue.length <= 6) {
        formattedValue = `(${rawValue.slice(0, 2)}) ${rawValue.slice(2)}`;
      } else if (rawValue.length <= 10) {
        formattedValue = `(${rawValue.slice(0, 2)}) ${rawValue.slice(2, 6)}-${rawValue.slice(6)}`;
      } else {
        formattedValue = `(${rawValue.slice(0, 2)}) ${rawValue.slice(2, 7)}-${rawValue.slice(7, 11)}`;
      }
    }
    setPhoneNumber(formattedValue); // Armazena o valor formatado para exibição
  };

  return (


    <ThemeProvider theme={theme}>

      <LoginContainer>
        <FormContainer>
          <img
            src="/logo.jpeg" // Ou a url da foto
            alt="Logo da Empresa"
            style={{ width: 130, height: 130, margin: '0 auto 1.5rem', display: 'block', borderRadius: 16 }}
          />
          <div style={{ textAlign: 'right', marginBottom: '1rem' }}>
            <IconButton
              data-cy="login-toggle-button"
              onClick={handleToggleTheme}
              color="inherit"
              sx={{
                '&:hover': {
                  backgroundColor: darkMode ? '#333' : '#eee',
                }
              }}
            >
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </div>

          <Typography variant="h5" gutterBottom color="text.primary" sx={{ fontWeight: 600, mb: 2 }}>
            Acesse sua conta
          </Typography>

          <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 3 }}>
            Use sua chave pessoal
            para continuar
          </Typography>

          <form onSubmit={handleSubmit}>
            <InputGroup>
              <Label>Número de telefone:</Label>
              <Input
                type="text"
                id="phoneNumber"
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder="(11) 98765-4321"
                required
                disabled={isLoading}
                maxLength={15}
              />
            </InputGroup>

            <InputGroup style={{ flex: 1, position: "relative" }}>
              <Label>Senha:</Label>
              <Input
                placeholder="••••••••"
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                style={{ paddingRight: "4.5rem" }}
              />
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                size="small"
                sx={{
                  position: "absolute",
                  top: "70%",
                  transform: "translateY(-50%)",
                  right: "0.75rem",
                  padding: 0,
                  color: "#888",
                }}
                aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
                type="button"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </IconButton>
            </InputGroup>

            <Button
              data-cy="button-login"
              type="submit" disabled={isLoading}>
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          <SecondaryButton disabled={isLoading}>
            <MuiLink component={NextLink} href="../../resetpassword">
              Esqueceu sua senha?
            </MuiLink>
          </SecondaryButton>


          <Typography variant="body2" color="text.secondary" sx={{ mt: 3, fontSize: '0.75rem' }}>
            © {new Date().getFullYear()} {BRAND_TAGLINE}
          </Typography>
        </FormContainer>
      </LoginContainer>

      <ToastContainer />
    </ThemeProvider>
  );
}