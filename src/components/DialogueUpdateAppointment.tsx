import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { Appointment } from "../services/appointmentServices";
interface ModalUpdateProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  appointment: Appointment;
}

export function DialogueUpdateAppointment({
  open,
  onClose,
  onConfirm,
  appointment,
}: ModalUpdateProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Update</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to update appointment for{" "}
          {appointment.name + " " + appointment.last_name}?
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
