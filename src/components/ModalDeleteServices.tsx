import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { Service } from "../services/serviciosServices";
interface ModalDeleteProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  service: Service;
}

export function ModalDeleteServices({
  open,
  onClose,
  onConfirm,
  service,
}: ModalDeleteProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete {service.name}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="secondary" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
