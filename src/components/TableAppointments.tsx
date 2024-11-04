import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  Paper,
} from "@mui/material";
import { getAllAppointments } from "../services/appointmentServices.ts";
import { Button } from "@mui/material";

export function AppointmentsTable() {
  return <Test />;
}

function handleEdit() {
  console.log("Edit from outside");
}

function handleDelete() {
  console.log("Delete outside");
}

function Test({}) {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["appointmentsInfo"],
    queryFn: getAllAppointments,
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
  // Renderizamos la tabla

  return (
    <TableContainer className="flex w-fill" component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">User Name</TableCell>
            <TableCell align="right">User Lastname</TableCell>
            <TableCell align="right">Material</TableCell>
            <TableCell align="right">Employee Name</TableCell>
            <TableCell align="right">Employee Lastname</TableCell>
            <TableCell align="right">Service</TableCell>
            <TableCell align="right">Total Price</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.appointments.map((appointment, index) => (
            <TableRow
              key={appointment.appointment_id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{appointment.appointment_id}</TableCell>
              <TableCell align="right">{appointment.date}</TableCell>
              <TableCell align="right">{appointment.name}</TableCell>
              <TableCell align="right">{appointment.last_name}</TableCell>
              <TableCell align="right">{appointment.material}</TableCell>
              <TableCell align="right">{appointment.em_name}</TableCell>
              <TableCell align="right">{appointment.em_last_name}</TableCell>
              <TableCell align="right">{appointment.servicio}</TableCell>
              <TableCell align="right">{appointment.total_price}</TableCell>
              <TableCell align="right">
                {" "}
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEdit()}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete()}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
