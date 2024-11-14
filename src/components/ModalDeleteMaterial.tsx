import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { Material } from "../services/inventoryServices";



interface ModalDeleteInventoryProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  material: Material;
}

export function ModalDeleteInventory({
  open,
  onClose,
  onConfirm,
  material,
}: ModalDeleteInventoryProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmar Eliminación</DialogTitle>
      <DialogContent>
        <DialogContentText>
          ¿Estás seguro de que deseas eliminar el material {material.name}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={onConfirm} color="secondary" autoFocus>
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
