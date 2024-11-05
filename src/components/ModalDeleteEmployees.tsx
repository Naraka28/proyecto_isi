import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { Employee } from "../services/employeeServices";
interface ModalDeleteProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  employee: Employee;
}

export function ModalDeleteEmployee({
  open,
  onClose,
  onConfirm,
  employee,
}: ModalDeleteProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete {employee.name}?
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
