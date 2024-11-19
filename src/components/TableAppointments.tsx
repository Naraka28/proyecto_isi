import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  Paper,
} from "@mui/material";
import {
  Appointment,
  deleteAppointment,
  getAllAppointments,
  searchAppointment,
} from "../services/appointmentServices.ts";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { ModalDeleteAppointment } from "./ModalDeleteAppointment.tsx";
import { ModalUpdateAppointment } from "./ModalUpdateAppointment.tsx";
import { TableSearchProps } from "./TableProducts.tsx";
import { useDebounce } from "@uidotdev/usehooks";

export function AppointmentsTable({ searchInput }: TableSearchProps) {
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["appointmentsInfo"],
    queryFn: getAllAppointments,
  });
  const [showModal, setShowModal] = useState(false);
  const [showUpdate, setshowUpdate] = useState(false);
  const [selectedAppointment, setselectedAppointment] = useState<
    Appointment | undefined
  >(undefined);
  const debouncedSearchTerm = useDebounce(searchInput, 500);

  const deleteMutation = useMutation({
    mutationFn: deleteAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointmentsInfo"] });
      setShowModal(false); // Close modal after successful deletion
    },
  });
  const searchMutation = useMutation({
    mutationFn: searchAppointment,
    onSuccess: (data) => {
      queryClient.setQueryData(["appointmentsInfo"], data);
    },
  });
  useEffect(() => {
    if (debouncedSearchTerm) {
      searchMutation.mutate(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  if (!data) {
    return <span>No hay datos disponibles</span>;
  }

  const handleEdit = (appointment: Appointment) => {
    setselectedAppointment(appointment);
    setshowUpdate(true);
  };

  const handleShow = (appointment: Appointment) => {
    setselectedAppointment(appointment);
    setShowModal(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedAppointment) {
      deleteMutation.mutate(selectedAppointment.appointment_id);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setselectedAppointment(undefined);
  };
  const handleCloseUpdateModal = () => {
    setshowUpdate(false);
    setselectedAppointment(undefined);
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
                  width: "5%",
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
                  width: "10%",
                }}
                align="justify"
              >
                Date
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "1.4rem",
                  fontWeight: "bold",
                  color: "text.primary",
                  width: "10%",
                }}
                align="justify"
              >
                Hour
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "1.4rem",
                  fontWeight: "bold",
                  color: "text.primary",
                  width: "10%",
                }}
                align="justify"
              >
                User Name
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "1.4rem",
                  fontWeight: "bold",
                  color: "text.primary",
                  width: "10%",
                }}
                align="justify"
              >
                Employee Name
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "1.4rem",
                  fontWeight: "bold",
                  color: "text.primary",
                  width: "10%",
                }}
                align="justify"
              >
                Service
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "1.4rem",
                  fontWeight: "bold",
                  color: "text.primary",
                  width: "10%",
                }}
                align="center"
              >
                Total Price
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "1.4rem",
                  fontWeight: "bold",
                  color: "text.primary",
                  width: "5%",
                }}
                align="justify"
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.appointments.map((appointment, index) => (
              <TableRow
                key={appointment.appointment_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  sx={{
                    fontSize: "1.1rem",
                    width: "3%",
                    paddingBottom: "1.5rem",
                    paddingTop: "1.5rem",
                    textAlign: "center",
                    paddingLeft: "0.4rem",
                  }}
                >
                  {appointment.appointment_id}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "1.1rem",
                    width: "5%",
                    paddingBottom: "1.5rem",
                    paddingTop: "1.5rem",
                  }}
                >
                  {appointment.date}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "1.1rem",
                    width: "10%",
                    paddingBottom: "1.5rem",
                    paddingTop: "1.5rem",
                  }}
                >
                  {appointment.hour}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "1.1rem",
                    width: "10%",
                    paddingBottom: "1.5rem",
                    paddingTop: "1.5rem",
                  }}
                >
                  {appointment.name} {appointment.last_name}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "1.1rem",
                    width: "10%",
                    paddingBottom: "1.5rem",
                    paddingTop: "1.5rem",
                  }}
                >
                  {appointment.em_name} {appointment.em_last_name}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "1.1rem",
                    width: "10%",
                    paddingBottom: "1.5rem",
                    paddingTop: "1.5rem",
                  }}
                >
                  {appointment.servicio}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "1.1rem",
                    width: "10%",
                    paddingBottom: "1.5rem",
                    paddingTop: "1.5rem",
                    textAlign: "center",
                  }}
                >
                  {appointment.total_price}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "1.1rem",
                    width: "5%",
                    textAlign: "center",
                    paddingLeft: "1rem",
                  }}
                >
                  {" "}
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <Button
                      variant="contained"
                      sx={{ bgcolor: "#4e68cf", width: "2rem" }}
                      onClick={() => handleEdit(appointment)}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} className="" />
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ bgcolor: "#f04141 ", width: "2rem" }}
                      onClick={() => handleShow(appointment)}
                    >
                      <FontAwesomeIcon icon={faTrash} className="" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {showModal && selectedAppointment && (
        <ModalDeleteAppointment
          open={showModal}
          onClose={handleCloseModal}
          onConfirm={handleDeleteConfirm}
          appointment={selectedAppointment}
        />
      )}
      {showUpdate && selectedAppointment && (
        <ModalUpdateAppointment
          open={showUpdate}
          onClose={handleCloseUpdateModal}
          appointment={selectedAppointment}
        />
      )}
    </>
  );
}
