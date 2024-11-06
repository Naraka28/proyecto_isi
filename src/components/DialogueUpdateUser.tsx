import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { user } from "../services/userAddservice";
interface ModalUpdateProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  user: user;
}

export function DialogueUpdateUser({
  open,
  onClose,
  onConfirm,
  user,
}: ModalUpdateProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Update</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to update {user.name + " " + user.last_name}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="secondary" autoFocus>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}
