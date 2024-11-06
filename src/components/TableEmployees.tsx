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
      <TableContainer className="flex w-full" component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Nombre</TableCell>
              <TableCell align="right">Apellido</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Teléfono</TableCell>
              <TableCell align="right">Rol</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.employees.map((employee, index) => (
              <TableRow
                key={employee.employee_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{employee.employee_id}</TableCell>
                <TableCell align="right">{employee.name}</TableCell>
                <TableCell align="right">{employee.last_name}</TableCell>
                <TableCell align="right">{employee.access_email}</TableCell>
                <TableCell align="right">{employee.phone_number}</TableCell>
                <TableCell align="right">{employee.role_id}</TableCell>
                <TableCell align="right">
                  {" "}
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEdit(employee)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleShow(employee)}
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
