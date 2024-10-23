import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Table, TableBody, TableContainer, TableHead, TableCell, TableRow, Paper } from '@mui/material';
import { getAllAppointments } from '../services/appointmentServices.ts';

const queryClient = new QueryClient();

export function AppointmentsTable() {
  return (
    <QueryClientProvider client={queryClient}>
      <Test/>
    </QueryClientProvider>
  );
}




function Test({}) {
  const { isLoading, isError, data, error } = useQuery({ queryKey: ['appointmentsInfo'], queryFn: getAllAppointments });


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
                <TableCell>ID</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">User Name</TableCell>
                <TableCell align="right">User Lastname</TableCell>
                <TableCell align="right">Material</TableCell>
                <TableCell align="right">Employee Name</TableCell>
                <TableCell align="right">Employee Lastname</TableCell>
                <TableCell align="right">Service</TableCell>
                <TableCell align="right">Total Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.appointments.map((appointment, index) => (
              <TableRow
                key={appointment.appointment_id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </TableContainer>
  );
}




