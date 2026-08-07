'use client';

import { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { LogOut } from 'lucide-react';

type LogoutDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
};

export default function LogoutDialog({ open, onClose, onConfirm }: LogoutDialogProps) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await onConfirm();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={loading ? undefined : onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={1}>
          <LogOut size={22} color="#FF7A00" />
          <Typography variant="h6" fontWeight={600}>Sair da conta</Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" sx={{ mb: 1.5 }}>Tem certeza que deseja encerrar sua sessão?</Typography>
        <Typography variant="body2" color="text.secondary">
          Você precisará fazer login novamente para acessar o painel.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} color="inherit" disabled={loading}>Cancelar</Button>
        <Button variant="contained" onClick={handleConfirm} disabled={loading}>
          {loading ? 'Saindo...' : 'Sair'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
