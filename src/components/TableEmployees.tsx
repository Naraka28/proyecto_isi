import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllEmployees,
  deleteEmployee,
  Employee,
} from "../services/employeeServices.ts"; // Servicio para obtener los usuarios
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
import { ModalDeleteEmployee } from "./ModalDeleteEmployees.tsx";
import { ModalUpdateEmployee } from "./ModalUpdateEmployee.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

export function EmployeeTable() {
  return <Test />;
}

function Test() {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setselectedEmployee] = useState<
    Employee | undefined
  >(undefined);
  const [showUpdate, setshowUpdate] = useState(false);
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["employeeInfo"],
    queryFn: getAllEmployees,
  });
  const deleteMutation = useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employeeInfo"] });
      setShowModal(false);
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
  const handleShow = (employee: Employee) => {
    setselectedEmployee(employee);
    setShowModal(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedEmployee) {
      deleteMutation.mutate(selectedEmployee.employee_id);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setselectedEmployee(undefined);
  };

  const handleEdit = (employee: Employee) => {
    setselectedEmployee(employee);
    setshowUpdate(true);
  };

  const handleCloseUpdateModal = () => {
    setshowUpdate(false);
    setselectedEmployee(undefined);
  };
  // Renderizamos la tabla

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
              <TableCell
                sx={{
                  fontSize: "1.4rem",
                  fontWeight: "bold",
                  color: "text.primary",
                  width: "5%",
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
              >
                Nombre
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "1.4rem",
                  fontWeight: "bold",
                  color: "text.primary",
                  width: "10%",
                }}
              >
                Apellido
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "1.4rem",
                  fontWeight: "bold",
                  color: "text.primary",
                  width: "10%",
                }}
              >
                Email
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "1.4rem",
                  fontWeight: "bold",
                  color: "text.primary",
                  width: "10%",
                }}
              >
                Teléfono
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "1.4rem",
                  fontWeight: "bold",
                  color: "text.primary",
                  width: "10%",
                }}
              >
                Rol
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "1.4rem",
                  fontWeight: "bold",
                  color: "text.primary",
                  width: "10%",
                }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.employees.map((employee, index) => (
              <TableRow
                key={employee.employee_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={{ fontSize: "1.1rem" }}>
                  {employee.employee_id}
                </TableCell>
                <TableCell sx={{ fontSize: "1.1rem" }}>
                  {employee.name}
                </TableCell>
                <TableCell sx={{ fontSize: "1.1rem" }}>
                  {employee.last_name}
                </TableCell>
                <TableCell sx={{ fontSize: "1.1rem" }}>
                  {employee.access_email}
                </TableCell>
                <TableCell sx={{ fontSize: "1.1rem" }}>
                  {employee.phone_number}
                </TableCell>
                <TableCell sx={{ fontSize: "1.1rem" }}>
                  {employee.role_id}
                </TableCell>
                <TableCell sx={{ fontSize: "1.1rem" }}>
                  {" "}
                  <div style={{ display: "grid", gap: "0.4rem" }}>
                    <Button
                      variant="contained"
                      sx={{ bgcolor: "#db37ce", width: "2rem" }}
                      onClick={() => handleEdit(employee)}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} className="" />
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ bgcolor: "red", width: "2rem" }}
                      onClick={() => handleShow(employee)}
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
      {showModal && selectedEmployee && (
        <ModalDeleteEmployee
          open={showModal}
          onClose={handleCloseModal}
          onConfirm={handleDeleteConfirm}
          employee={selectedEmployee} // Pass selected user to modal
        />
      )}
      {showUpdate && selectedEmployee && (
        <ModalUpdateEmployee
          open={showUpdate}
          onClose={handleCloseUpdateModal}
          employee={selectedEmployee} // Pass selected user to modal
        />
      )}
    </>
  );
}
