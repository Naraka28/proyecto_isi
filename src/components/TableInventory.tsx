import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllInventoryItems,
  deleteInventoryItem,
} from "../services/inventoryServices"; // Asegúrate de que el archivo de servicio sea adecuado
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { useState } from "react";
import { ModalDeleteMaterial } from "./ModalDeleteMaterial"; // Actualiza este modal para manejar materiales
import { ModalUpdateMaterial } from "./ModalUpdateMaterial"; // Actualiza este modal para manejar materiales
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

export function BasicTable() {
  return <InventoryTable />;
}

function InventoryTable() {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [showUpdate, setshowUpdate] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<any | undefined>(undefined); // Track selected material

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["inventory"],
    queryFn: getAllMaterials,
  });
  const deleteMutation = useMutation({
    mutationFn: materialDeleteService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
      setShowModal(false); // Close modal after successful deletion
    },
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  if (!data) {
    return <span>No hay datos disponibles</span>;
  }

  const handleShow = (material: any) => {
    setSelectedMaterial(material);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMaterial(undefined);
  };
  const handleDeleteConfirm = () => {
    if (selectedMaterial) {
      deleteMutation.mutate(selectedMaterial.material_id);
    }
  };
  const handleEdit = (material: any) => {
    setSelectedMaterial(material);
    setshowUpdate(true);
  };

  const handleCloseUpdateModal = () => {
    setshowUpdate(false);
    setSelectedMaterial(undefined);
  };

  return (
    <>
      <TableContainer sx={{ borderRadius: "1rem" }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ border: "1", bgcolor: "#e3e3e3" }}>
            <TableRow
              sx={{
                "& th": {
                  borderBottom: "3px solid #757575",
                  borderTop: "1px solid #ccc",
                },
              }}
            >
              <TableCell
                sx={{
                  fontSize: "1.4rem",
                  fontWeight: "bold",
                  color: "text.primary",
                  width: "10%",
                  textAlign: "center",
                  paddingLeft: "0.4rem",
                }}
              >
                ID
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "1.4rem",
                  fontWeight: "bold",
                  color: "text.primary",
                  width: "15%",
                }}
                align="justify"
              >
                Nombre
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "1.4rem",
                  fontWeight: "bold",
                  color: "text.primary",
                  width: "15%",
                }}
                align="justify"
              >
                Cantidad
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "1.4rem",
                  fontWeight: "bold",
                  color: "text.primary",
                  width: "20%",
                }}
                align="justify"
              >
                Precio
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "1.4rem",
                  fontWeight: "bold",
                  color: "text.primary",
                  width: "10%",
                }}
                align="justify"
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.materials.map((material: any) => (
              <TableRow
                key={material.material_id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell
                  sx={{
                    fontSize: "1.1rem",
                    paddingBottom: "1.5rem",
                    paddingTop: "1.5rem",
                    textAlign: "center",
                    paddingLeft: "0.4rem",
                  }}
                >
                  {material.material_id}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "1.1rem",
                    paddingBottom: "1.5rem",
                    paddingTop: "1.5rem",
                  }}
                >
                  {material.name}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "1.1rem",
                    paddingBottom: "1.5rem",
                    paddingTop: "1.5rem",
                  }}
                >
                  {material.quantity}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "1.1rem",
                    width: "25%",
                    paddingBottom: "1.5rem",
                    paddingTop: "1.5rem",
                  }}
                >
                  ${material.price.toFixed(2)}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "1.1rem",
                    width: "10%",
                    paddingBottom: "1.5rem",
                    paddingTop: "1.5rem",
                  }}
                >
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <Button
                      variant="contained"
                      sx={{ bgcolor: "#4e68cf", width: "5rem" }}
                      onClick={() => {
                        handleEdit(material);
                      }}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ bgcolor: "#f04141", width: "5rem" }}
                      onClick={() => handleShow(material)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {showModal && selectedMaterial && (
        <ModalDeleteMaterial
          open={showModal}
          onClose={handleCloseModal}
          onConfirm={handleDeleteConfirm}
          material={selectedMaterial}
        />
      )}
      {showUpdate && selectedMaterial && (
        <ModalUpdateMaterial
          open={showUpdate}
          onClose={handleCloseUpdateModal}
          material={selectedMaterial}
        />
      )}
    </>
  );
}
