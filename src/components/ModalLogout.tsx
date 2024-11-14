import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
interface ModalLogoutProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function ModalLogout({
  open,
  onClose,
  onConfirm,
}: ModalLogoutProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Log Out</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Do you want to log out?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          No
        </Button>
        <Button onClick={onConfirm} color="secondary" autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
