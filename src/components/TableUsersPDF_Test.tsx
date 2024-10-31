import React from 'react';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';

import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getAllUsers } from "../services/userAddservice.ts"; // Servicio para obtener los usuarios
import { Table, TableBody, TableContainer, TableHead, TableCell, TableRow, Paper, Button } from '@mui/material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { IconButton } from './DashButton.tsx';

const queryClient = new QueryClient();

export function BasicTable() {
  return (
    <QueryClientProvider client={queryClient}>
      <Test/>
    </QueryClientProvider>
  );
}

function Test() {
  const { isLoading, isError, data, error } = useQuery({ queryKey: ['userInfo'], queryFn: getAllUsers });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  if (!data) {
    return <span>No hay datos disponibles</span>;
  }

  // Función para exportar la tabla a PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Reporte de Usuarios", 10, 10);

    // Extraer los datos para la tabla
    const tableColumn = ["ID", "Nombre", "Apellido", "Email", "Teléfono"];
    const tableRows = data.users.map(user => [
      user.user_id,
      user.name,
      user.last_name,
      user.access_email,
      user.phone_number,
    ]);

    // Generar la tabla en el PDF
    (doc as any).autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    // Guardar el documento PDF
    doc.save("reporte_usuarios.pdf");
  };

  return (
    <div>
      <IconButton id={'PDF'} text={"Exportar PDF"} icon={faFilePdf} onClick={exportToPDF} />
        
        

      <TableContainer className="flex w-fill" component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Nombre</TableCell>
              <TableCell align="right">Apellido</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Teléfono</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.users.map((user) => (
              <TableRow
                key={user.user_id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{user.user_id}</TableCell>
                <TableCell align="right">{user.name}</TableCell>
                <TableCell align="right">{user.last_name}</TableCell>
                <TableCell align="right">{user.access_email}</TableCell>
                <TableCell align="right">{user.phone_number}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
