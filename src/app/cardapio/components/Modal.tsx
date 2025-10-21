import { Dialog, DialogContent } from '@mui/material';

export function Modal({ open, onClose, children }: any) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
