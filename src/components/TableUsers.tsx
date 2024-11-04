import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { getAllUsers } from "../services/userAddservice.ts"; // Servicio para obtener los usuarios
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  Paper,
} from "@mui/material";
import { useState } from "react";
import { Button } from "@mui/material";
import { ModalState } from "../components/ModalState"; /////////////////

const queryClient = new QueryClient();

export function BasicTable() {
  return (
    <QueryClientProvider client={queryClient}>
      <Test />
    </QueryClientProvider>
  );
}

function handleEdit() {
  console.log("Edit from outside");
}

function handleDelete() {
  console.log("Delete outside");
}

function Test() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getAllUsers,
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
            <TableCell align="right">Apellido</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Teléfono</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.users.map((user, index) => (
            <TableRow
              key={user.user_id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{user.user_id}</TableCell>
              <TableCell align="right">{user.name}</TableCell>
              <TableCell align="right">{user.last_name}</TableCell>
              <TableCell align="right">{user.access_email}</TableCell>
              <TableCell align="right">{user.phone_number}</TableCell>
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

function UserInfo() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getAllUsers,
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  // Verificamos que 'data' sea un array antes de usar 'map'
  return (
    <div>
      <h1>Mensajes del Backend:</h1>
      {Array.isArray(data) ? (
        data.map((user) => (
          <div key={user.user_id}>
            <p>ID: {user.user_id}</p>
            <p className="text-2xl text-blue-500">Nombre: {user.name}</p>
            <p>Apellido: {user.last_name}</p>
            <p>Email: {user.access_email}</p>
            <p>Teléfono: {user.phone_number}</p>
          </div>
        ))
      ) : (
        <p>No hay datos disponibles.</p>
      )}

      {/* Mostramos el error si es que existe */}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
