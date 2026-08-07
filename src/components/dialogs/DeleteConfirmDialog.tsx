'use client';

import { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { Trash2 } from 'lucide-react';

type DeleteConfirmDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  title?: string;
  message?: string;
};

export default function DeleteConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = 'Excluir item',
  message = 'Tem certeza que deseja excluir este item? Essa ação não pode ser desfeita.',
}: DeleteConfirmDialogProps) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await onConfirm();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={loading ? undefined : onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={1}>
          <Trash2 size={22} color="#D32F2F" />
          <Typography variant="h6" fontWeight={600}>{title}</Typography>
        </Box>
      </DialogTitle>
      <DialogContent><Typography variant="body1">{message}</Typography></DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} color="inherit" disabled={loading}>Cancelar</Button>
        <Button variant="contained" color="error" onClick={handleConfirm} disabled={loading}>
          {loading ? 'Excluindo...' : 'Excluir'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
