
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

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
    <TableContainer sx={{ borderRadius: "1rem" }} component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
    <TableHead sx={{  border:"1",bgcolor: "#e3e3e3" }}>
    <TableRow sx={{ "& th": { borderBottom: "3px solid #db37ce",borderTop: "1px solid #ccc" } }}> {/* Aplica un borde a cada celda del encabezado */}       
       <TableCell sx={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'text.primary' , width: "10%"}}>ID</TableCell>
        <TableCell sx={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'text.primary', width: "15%" }} align="justify">Nombre</TableCell>
        <TableCell sx={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'text.primary', width: "15%" }} align="justify">Apellido</TableCell>
        <TableCell sx={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'text.primary', width: "20%" }} align="justify">Email</TableCell>
        <TableCell sx={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'text.primary', width: "20%" }} align="justify">Teléfono</TableCell>
        <TableCell sx={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'text.primary', width: "10%" }} align="justify">Action</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {data.users.map((user) => (
        <TableRow key={user.user_id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
          <TableCell sx={{ fontSize: '1.1rem' }}>{user.user_id}</TableCell>
          <TableCell sx={{ fontSize: '1.1rem' }}>{user.name}</TableCell>
          <TableCell sx={{ fontSize: '1.1rem' }}>{user.last_name}</TableCell>
          <TableCell sx={{ fontSize: '1.1rem', width: "25%" }}>{user.access_email}</TableCell>
          <TableCell sx={{ fontSize: '1.1rem', width: "20%" }}>{user.phone_number}</TableCell>
          <TableCell sx={{ fontSize: '1.1rem', width: "10%" }}>
            <div style={{ display: "grid", gap: "0.4rem" }}>
              <Button
                variant="contained"
                sx={{ bgcolor: "#db37ce", width: "5rem" }}
                onClick={() => {
                  handleEdit(user);
                }}
              >
                <FontAwesomeIcon icon={faPenToSquare} />
              </Button>
              <Button
                variant="contained"
                sx={{ bgcolor: "red", width: "5rem" }}
                onClick={() => handleShow(user)}
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


      {showModal && selectedUser && (
        <ModalDeleteUser
          open={showModal}
          onClose={handleCloseModal}
          onConfirm={handleDeleteConfirm}
          user={selectedUser}
        />
      )}
      {showUpdate && selectedUser && (
        <ModalUpdateUser
          open={showUpdate}
          onClose={handleCloseUpdateModal}
          user={selectedUser}
        />
      )}
    </>
  );
}
