import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { Employee } from "../services/employeeServices";
interface ModalUpdateProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  employee: Employee;
}

export function DialogueUpdateEmployee({
  open,
  onClose,
  onConfirm,
  employee,
}: ModalUpdateProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Update</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to update{" "}
          {employee.name + " " + employee.last_name}?
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
