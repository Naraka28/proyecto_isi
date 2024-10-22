import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getAllProducts } from "../services/productsServices.ts"; // Servicio para obtener los usuarios
import { Table, TableBody, TableContainer, TableHead, TableCell, TableRow, Paper } from '@mui/material';

const queryClient = new QueryClient();

export function ProductTable() {
  return (
    <QueryClientProvider client={queryClient}>
      <Test/>
    </QueryClientProvider>
  );
}




function Test() {
  const { isLoading, isError, data, error } = useQuery({ queryKey: ['productInfo'], queryFn: getAllProducts });


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
              <TableCell align="right">Cantidad</TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.products.map((product, index) => (
              <TableRow
                key={product.product_id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{product.product_id}</TableCell>
                <TableCell align="right">{product.name}</TableCell>
                <TableCell align="right">{product.quantity}</TableCell>
                <TableCell align="right">{product.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </TableContainer>
  );
}




