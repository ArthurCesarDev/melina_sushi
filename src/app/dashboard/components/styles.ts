'use client';
import { styled } from '@mui/system';

export const Container = styled('div')({
  display: 'flex',
  minHeight: '100vh',
});

export const Content = styled('main')(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  transition: 'all 0.3s ease-in-out',
}));
