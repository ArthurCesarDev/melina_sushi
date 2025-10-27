// app/login/LoginForm.tsx
'use client';

import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Eye, EyeOff } from 'lucide-react';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import NextLink from 'next/link';
import MuiLink from '@mui/material/Link';
import { useTheme } from '@/context/ThemeContext';
import { useRouter } from 'next/navigation';
import { loginAdmin } from '@/services/authAdmin';
import { useToast } from '@/context/ToastContext';
import {
  FormContainer,
  InputGroup,
  Label,
  Input,
  Button,
  SecondaryButton,
} from '@/styles/Styles';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { darkMode, toggleTheme } = useTheme();
  const router = useRouter();
  const { showToast } = useToast();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const result = await loginAdmin(email, password);
      showToast(result.message);
      router.push('/dashboard');
    } catch (err: any) {
      console.error('Erro no login:', err);
      showToast(err.message || 'Falha ao fazer login. Verifique suas credenciais.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      {/* Alternar tema */}
      <div style={{ textAlign: 'right', marginBottom: '1rem' }}>
        <IconButton
          onClick={toggleTheme}
          color="inherit"
          sx={{ '&:hover': { backgroundColor: darkMode ? '#333' : '#eee' } }}
        >
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </div>

      {/* Logo */}
      <img
        src="/logo.jpeg"
        alt="Logo da Empresa"
        style={{
          width: 130,
          height: 130,
          margin: '0 auto 1.5rem',
          display: 'block',
          borderRadius: 16,
        }}
      />

      {/* Títulos centralizados */}
      <Typography
        variant="h5"
        color="text.primary"
        align="center"
        sx={{ fontWeight: 600, mb: 1 }}
      >
        Acesse sua conta
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{ mb: 3 }}
      >
        Insira seu e-mail e senha para continuar
      </Typography>

      {/* Formulário */}
      <form onSubmit={handleSubmit}>
        <InputGroup>
          <Label>E-mail:</Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="exemplo@empresa.com"
            required
          />
        </InputGroup>

        <InputGroup style={{ flex: 1, position: 'relative' }}>
          <Label>Senha:</Label>
          <Input
            placeholder="••••••••"
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ paddingRight: '3rem' }}
          />
          <IconButton
            onClick={() => setShowPassword(!showPassword)}
            size="small"
            sx={{
              position: 'absolute',
              top: '70%',
              transform: 'translateY(-50%)',
              right: '0.75rem',
              padding: 0,
              color: '#888',
            }}
            type="button"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </IconButton>
        </InputGroup>

        <Button type="submit" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </Button>
      </form>

      <SecondaryButton>
        <MuiLink component={NextLink} href="/resetar-senha" underline="hover">
          Esqueceu sua senha?
        </MuiLink>
      </SecondaryButton>

      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{ mt: 3, fontSize: '0.75rem' }}
      >
        © {new Date().getFullYear()} Códice d’Eli – Para aqueles que cortam o tempo com precisão
      </Typography>
    </FormContainer>
  );
}
