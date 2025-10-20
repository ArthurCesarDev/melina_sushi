import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const LoginContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(2),
}));

export const FormContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: '2rem',
  borderRadius: '16px',
  boxShadow: theme.shadows[4],
  width: '100%',
  maxWidth: '450px',
  textAlign: 'center',
  border: `1px solid ${theme.palette.mode === 'dark' ? '#333' : '#e0e0e0'}`,
}));

export const InputGroup = styled('div')(() => ({
  marginBottom: '1.25rem',
  textAlign: 'left',
}));

export const Label = styled(Typography)(({ theme }) => ({
  fontSize: '0.85rem',
  fontWeight: 500,
  color: theme.palette.text.secondary,
  marginBottom: '0.5rem',
  marginLeft: '0.5rem',
}));

export const Input = styled('input')(({ theme }) => ({
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
    color: theme.palette.grey[500],
    opacity: 1,
  },
}));

export const Button = styled('button')(({ theme }) => ({
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
}));

export const SecondaryButton = styled('button')(({ theme }) => ({
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
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255,255,255,0.1)'
        : 'rgba(0,0,0,0.05)',
  },
}));
