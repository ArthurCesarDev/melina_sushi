//  components/ResetPassowordForm.tsx
'use client';

import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MuiLink from '@mui/material/Link';
import NextLink from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { FormContainer, InputGroup, Label, Input, Button, SecondaryButton } from '@/styles/Styles';


export function ResetPasswordForm() {
  const { darkMode, toggleTheme } = useTheme();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Enviar instruções para:', email);
  };

  return (
    <FormContainer>
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

      <Typography variant="h5" color="text.primary" sx={{ fontWeight: 600, mb: 2 }}>
        Esqueci minha senha
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Digite seu e-mail para receber um link de redefinição.
      </Typography>

      <form onSubmit={handleSubmit}>
        <InputGroup>
          <Label>E-mail:</Label>
          <Input
            type="email"
            id="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </InputGroup>

        <Button type="submit">Enviar link de redefinição</Button>
      </form>

      <SecondaryButton>
        <MuiLink
          component={NextLink}
          href="/login"
          underline="hover"
          color="primary"
          sx={{ mt: 2 }}
        >
          Voltar para o Login
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
