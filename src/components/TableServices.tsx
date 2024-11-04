// service_id?:number,
//     name:string,
//     catalogue_id:number,
//     price:number,
//     duration:number

import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { getAllServices } from "../services/serviciosServices.ts"; // Servicio para obtener los usuarios
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

export function ServiceTable() {
  return <Test />;
}

function handleEdit() {
  console.log("Edit from outside");
}

function handleDelete() {
  console.log("Delete outside");
}

function Test() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["serviceInfo"],
    queryFn: getAllServices,
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
            <TableCell align="right">Nombre</TableCell>
            <TableCell align="right">Catálogo ID</TableCell>
            <TableCell align="right">Precio</TableCell>
            <TableCell align="right">Duración</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.services.map((service, index) => (
            <TableRow
              key={service.service_id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{service.service_id}</TableCell>
              <TableCell align="right">{service.name}</TableCell>
              <TableCell align="right">{service.catalogue_id}</TableCell>
              <TableCell align="right">{service.price}</TableCell>
              <TableCell align="right">{service.duration_in_minutes}</TableCell>
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
