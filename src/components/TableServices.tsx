// service_id?:number,
//     name:string,
//     catalogue_id:number,
//     price:number,
//     duration:number

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllServices,
  deleteService,
  Service,
} from "../services/serviciosServices.ts"; // Servicio para obtener los usuarios
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  Paper,
} from "@mui/material";
import { Button } from "@mui/material";
import { useState } from "react";
import { ModalDeleteServices } from "./ModalDeleteServices.tsx";
import { ModalUpdateService } from "./ModalUpdateService.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTractor,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

export function ServiceTable() {
  return <Test />;
}

function Test() {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [showUpdate, setshowUpdate] = useState(false);
  const [selectedService, setselectedService] = useState<Service | undefined>(
    undefined
  );

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["serviceInfo"],
    queryFn: getAllServices,
  });
  const deleteMutation = useMutation({
    mutationFn: deleteService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["serviceInfo"] });
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

  const handleShow = (service: Service) => {
    setselectedService(service);
    setShowModal(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedService) {
      deleteMutation.mutate(selectedService.service_id);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setselectedService(undefined);
  };
  const handleEdit = (service: Service) => {
    setselectedService(service);
    setshowUpdate(true);
  };

  return (
    <>
     <TableContainer sx={{ borderRadius: "1rem" }} component={Paper}>
  <Table sx={{ minWidth: 650 }} aria-label="simple table">
    <TableHead sx={{ border: "1", bgcolor: "#e3e3e3" }}>
      <TableRow
        sx={{
          "& th": {
            borderBottom: "3px solid #db37ce",
            borderTop: "1px solid #ccc",
          },
        }}
      >
        {/* Ajuste de ancho de las columnas */}
        <TableCell
          sx={{
            fontSize: "1.4rem",
            fontWeight: "bold",
            color: "text.primary",
            width: "10%", // Ajuste de ancho
          }}
        >
          ID
        </TableCell>
        <TableCell
          sx={{
            fontSize: "1.4rem",
            fontWeight: "bold",
            color: "text.primary",
            width: "25%", // Ajuste de ancho para una columna más larga
          }}
        >
          Nombre
        </TableCell>
        <TableCell
          sx={{
            fontSize: "1.4rem",
            fontWeight: "bold",
            color: "text.primary",
            width: "20%", // Ajuste de ancho
          }}
        >
          Catálogo ID
        </TableCell>
        <TableCell
          sx={{
            fontSize: "1.4rem",
            fontWeight: "bold",
            color: "text.primary",
            width: "15%", // Ajuste de ancho
          }}
        >
          Precio
        </TableCell>
        <TableCell
          sx={{
            fontSize: "1.4rem",
            fontWeight: "bold",
            color: "text.primary",
            width: "15%", // Ajuste de ancho
          }}
        >
          Duración
        </TableCell>
        <TableCell
          sx={{
            fontSize: "1.4rem",
            fontWeight: "bold",
            color: "text.primary",
            width: "15%", // Ajuste de ancho
          }} align="center"
        >
          Action
        </TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {data.services.map((service) => (
        <TableRow
          key={service.service_id}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableCell sx={{ fontSize: "1.1rem", width: "10%" }}>{service.service_id}</TableCell>
          <TableCell sx={{ fontSize: "1.1rem", width: "25%" }}>{service.name}</TableCell>
          <TableCell sx={{ fontSize: "1.1rem", textAlign: "right", paddingRight: "3rem", width: "20%" }}>
            {service.catalogue_id}
          </TableCell>
          <TableCell sx={{ fontSize: "1.1rem", textAlign: "right", paddingRight: "3rem", width: "15%" }}>
            {service.price}
          </TableCell>
          <TableCell sx={{ fontSize: "1.1rem", textAlign: "right", paddingRight: "3rem", width: "15%" }}>
            {service.duration_in_minutes} min
          </TableCell>
          <TableCell  sx={{ width: "15%", alignContent:"center" }}>
            <div style={{ display: "grid", gap: "0.4rem",  justifyContent:"center" }}>
              <Button
                variant="contained"
                sx={{ bgcolor: "#db37ce", width: "5rem" }}
                onClick={() => handleEdit(service)}
              >
                <FontAwesomeIcon icon={faPenToSquare} />
              </Button>
              <Button
                variant="contained"
                sx={{ bgcolor: "red", width: "5rem" }}
                onClick={() => handleShow(service)}
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

      {showModal && selectedService && (
        <ModalDeleteServices
          open={showModal}
          onClose={handleCloseModal}
          onConfirm={() => handleDeleteConfirm()}
          service={selectedService}
        />
      )}
      {showUpdate && selectedService && (
        <ModalUpdateService
          open={showUpdate}
          onClose={handleCloseModal}
          service={selectedService}
        />
      )}
    </>
  );
}
