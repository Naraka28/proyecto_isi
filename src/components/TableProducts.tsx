import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllProducts,
  Product,
  deleteProduct,
} from "../services/productsServices.ts"; // Servicio para obtener los usuarios
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
import { ModalDeleteProduct } from "./ModalDeleteProduct.tsx";
import { ModalUpdateProduct } from "./ModalUpdateProduct.tsx";

export function ProductTable() {
  return <Test />;
}

function Test() {
  const [showModal, setShowModal] = useState(false);
  const [showUpdate, setshowUpdate] = useState(false);
  const [selectedProduct, setselectedProduct] = useState<Product | undefined>(
    undefined
  );
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["productInfo"],
    queryFn: getAllProducts,
  });
  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productInfo"] });
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
  const handleEdit = (product: Product) => {
    setselectedProduct(product);
    setshowUpdate(true);
  };

  const handleShow = (product: Product) => {
    setselectedProduct(product);
    setShowModal(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedProduct) {
      deleteMutation.mutate(selectedProduct.product_id);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setselectedProduct(undefined);
  };
  const handleCloseUpdateModal = () => {
    setshowUpdate(false);
    setselectedProduct(undefined);
  };
  // Renderizamos la tabla

  return (
    <>
      <TableContainer className="flex w-fill" component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Nombre</TableCell>
              <TableCell align="right">Cantidad</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.products.map((product, index) => (
              <TableRow
                key={product.product_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{product.product_id}</TableCell>
                <TableCell align="right">{product.name}</TableCell>
                <TableCell align="right">{product.quantity}</TableCell>
                <TableCell align="right">{product.price}</TableCell>
                <TableCell align="right">
                  {" "}
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleShow(product)}
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

      {showModal && selectedProduct && (
        <ModalDeleteProduct
          open={showModal}
          onClose={handleCloseModal}
          onConfirm={handleDeleteConfirm}
          product={selectedProduct}
        />
      )}
      {showUpdate && selectedProduct && (
        <ModalUpdateProduct
          open={showUpdate}
          onClose={handleCloseUpdateModal}
          product={selectedProduct}
        />
      )}
    </>
  );
}
