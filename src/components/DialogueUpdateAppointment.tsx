import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { Appointment } from "../services/appointmentServices";
import { DialogueAppointmentError } from "./DialogueAppointmentError";
interface ModalUpdateProps {
  open: boolean;
  onClose: () => void;
  onCloseError: () => void;
  onConfirm: () => void;
  error: boolean;
  message: string;
  appointment: Appointment;
}

export function DialogueUpdateAppointment({
  open,
  error,
  onClose,
  onCloseError,
  message,
  onConfirm,
  appointment,
}: ModalUpdateProps) {
  return (
    <>
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
      {error ? (
        <DialogueAppointmentError
          open={error}
          onClose={onCloseError}
          message={message}
        />
      ) : null}
    </>
  );
}
