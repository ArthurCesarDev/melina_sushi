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
import { formatPhoneNumber } from '@/utils/formatPhoneNumber'
import {
  FormContainer,
  InputGroup,
  Label,
  Input,
  Button,
  SecondaryButton,
} from './styles';

export function LoginForm() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [rawPhoneNumber, setRawPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { darkMode, toggleTheme } = useTheme();

const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const rawValue = e.target.value;
  const formatted = formatPhoneNumber(rawValue);


  const digits = Array.from(rawValue).filter((c) => /\d/.test(c)).join('').slice(0, 11);

  setRawPhoneNumber(digits);
  setPhoneNumber(formatted);
};


  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Telefone:', rawPhoneNumber);
    console.log('Senha:', password);
  };

  return (
    <FormContainer>
      {/* Botão de alternar tema */}
      <div style={{ textAlign: 'right', marginBottom: '1rem' }}>
        <IconButton
          onClick={toggleTheme}
          color="inherit"
          sx={{
            '&:hover': {
              backgroundColor: darkMode ? '#333' : '#eee',
            },
          }}
        >
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </div>

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

      <Typography
        variant="h5"
        gutterBottom
        color="text.primary"
        sx={{ fontWeight: 600, mb: 2 }}
      >
        Acesse sua conta
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        gutterBottom
        sx={{ mb: 3 }}
      >
        Use sua chave pessoal para continuar
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
            maxLength={15}
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
            aria-label={showPassword ? 'Esconder senha' : 'Mostrar senha'}
            type="button"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </IconButton>
        </InputGroup>

        <Button type="submit">Entrar</Button>
      </form>

      <SecondaryButton>
        <MuiLink component={NextLink} href="/resetpassword">
          Esqueceu sua senha?
        </MuiLink>
      </SecondaryButton>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 3, fontSize: '0.75rem' }}
      >
        © {new Date().getFullYear()} Códice d’Eli – Para aqueles que cortam o tempo com precisão
      </Typography>
    </FormContainer>
  );
}
