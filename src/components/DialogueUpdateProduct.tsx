import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { ProductCreate } from "../services/productsServices";
interface ModalUpdateProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  product: ProductCreate;
}

export function DialogueUpdateProduct({
  open,
  onClose,
  onConfirm,
  product,
}: ModalUpdateProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Update</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to update {product.name}?
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
