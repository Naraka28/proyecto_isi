import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
interface ModalUpdateProps {
  open: boolean;
  message: string;
  onClose: () => void;
}

export function DialogueAppointmentError({
  open,
  message,
  onClose,
}: ModalUpdateProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Fallo al crear cita</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={onClose} autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}
