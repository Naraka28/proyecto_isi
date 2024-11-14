import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { Material } from "../services/inventoryServices";


interface ModalUpdateInventoryProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  material: Material;
}

export function DialogueUpdateInventory({
  open,
  onClose,
  onConfirm,
  material,
}: ModalUpdateInventoryProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmar Actualización</DialogTitle>
      <DialogContent>
        <DialogContentText>
          ¿Estás seguro de que deseas actualizar {material.name}?
          
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={onConfirm} color="secondary" autoFocus>
          Actualizar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
