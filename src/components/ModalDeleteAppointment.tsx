import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { Appointment } from "../services/appointmentServices";
interface ModalDeleteProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  appointment: Appointment;
}

export function ModalDeleteAppointment({
  open,
  onClose,
  onConfirm,
  appointment,
}: ModalDeleteProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete appointment for{" "}
          {appointment.name + " " + appointment.last_name}?
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
