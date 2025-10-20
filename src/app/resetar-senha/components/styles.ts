'use client';
import { styled } from '@mui/system';

export const ResetContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
});

export const FormContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: '2rem',
  borderRadius: 16,
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 4px 15px rgba(0,0,0,0.6)'
      : '0 4px 15px rgba(0,0,0,0.1)',
  width: '100%',
  maxWidth: 380,
  textAlign: 'center',
}));

export const InputGroup = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'left',
  marginBottom: '1.5rem',
});

export const Label = styled('label')(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.85rem',
  marginBottom: '0.3rem',
}));

export const Input = styled('input')(({ theme }) => ({
  padding: '0.7rem 0.9rem',
  borderRadius: 8,
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  outline: 'none',
  '&:focus': {
    borderColor: theme.palette.primary.main,
  },
}));

export const Button = styled('button')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: '0.8rem',
  borderRadius: 10,
  border: 'none',
  cursor: 'pointer',
  width: '100%',
  fontWeight: 600,
  fontSize: '1rem',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
    transform: 'translateY(-2px)',
  },
}));

export const SecondaryButton = styled('div')({
  marginTop: '1.2rem',
});
