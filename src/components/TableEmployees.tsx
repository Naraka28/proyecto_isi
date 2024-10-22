import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getAllEmployees } from "../services/employeeServices.ts"; // Servicio para obtener los usuarios
import { Table, TableBody, TableContainer, TableHead, TableCell, TableRow, Paper } from '@mui/material';

const queryClient = new QueryClient();

export function EmployeeTable() {
  return (
    <QueryClientProvider client={queryClient}>
      <Test/>
    </QueryClientProvider>
  );
}




function Test() {
  const { isLoading, isError, data, error } = useQuery({ queryKey: ['employeeInfo'], queryFn: getAllEmployees });


  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  if(!data){
    return <span>No hay datos disponibles</span>
  }
  // Renderizamos la tabla


  return (
    <TableContainer className='flex w-fill' component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell >ID</TableCell>
              <TableCell align="right">Nombre</TableCell>
              <TableCell align="right">Apellido</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Teléfono</TableCell>
              <TableCell align="right">Rol</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.employees.map((employee, index) => (
              <TableRow
                key={employee.employee_id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{employee.employee_id}</TableCell>
                <TableCell align="right">{employee.name}</TableCell>
                <TableCell align="right">{employee.last_name}</TableCell>
                <TableCell align="right">{employee.access_email}</TableCell>
                <TableCell align="right">{employee.phone_number}</TableCell>
                <TableCell align="right">{employee.role_id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </TableContainer>
  );
}




