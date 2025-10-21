import { Box, styled, BoxProps } from '@mui/material';

export const UploadBox = styled(Box)<BoxProps>(({ theme }) => ({
  border: `2px dashed ${theme.palette.grey[400]}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(1),
  cursor: 'pointer',
  transition: 'border-color 0.3s ease',

  '&:hover': {
    borderColor: theme.palette.primary.main,
  },
}));


export const DayRow = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  padding: '0.5rem 0',
  borderBottom: `1px solid ${theme.palette.divider}`,
}));
