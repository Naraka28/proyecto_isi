import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllUsers,
  user,
  userDeleteService,
} from "../services/userAddservice.ts";
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
import { ModalDeleteUser } from "./ModalDeleteUser.tsx";
import { ModalUpdateUser } from "./ModalUpdateUser.tsx";

export function BasicTable() {
  return <Test />;
}

function Test() {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [showUpdate, setshowUpdate] = useState(false);
  const [selectedUser, setSelectedUser] = useState<user | undefined>(undefined); // Track selected user

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getAllUsers,
  });
  const deleteMutation = useMutation({
    mutationFn: userDeleteService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userInfo"] });
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

  const handleShow = (user: user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(undefined);
  };
  const handleDeleteConfirm = () => {
    if (selectedUser) {
      deleteMutation.mutate(selectedUser.user_id);
    }
  };
  const handleEdit = (user: user) => {
    setSelectedUser(user);
    setshowUpdate(true);
  };

  const handleCloseUpdateModal = () => {
    setshowUpdate(false);
    setSelectedUser(undefined);
  };

  return (
    <>
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
            {data.users.map((user) => (
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
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        handleEdit(user);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleShow(user)}
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

      {showModal && selectedUser && (
        <ModalDeleteUser
          open={showModal}
          onClose={handleCloseModal}
          onConfirm={handleDeleteConfirm}
          user={selectedUser} // Pass selected user to modal
        />
      )}
      {showModal && selectedUser && (
        <ModalUpdateUser
          open={showModal}
          onClose={handleCloseUpdateModal}
          user={selectedUser} // Pass selected user to modal
        />
      )}
    </>
  );
}
