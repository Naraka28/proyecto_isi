import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { faPenToSquare, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
      <TableContainer sx={{ borderRadius: "1rem" }} component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
    <TableHead sx={{  border:"1",bgcolor: "#e3e3e3" }}>
    <TableRow sx={{ "& th": { borderBottom: "3px solid #db37ce",borderTop: "1px solid #ccc" } }}> 
              <TableCell sx={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'text.primary', width: "10%" }} align="justify">ID</TableCell>
              <TableCell sx={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'text.primary', width: "15%" }} align="justify">Nombre</TableCell>
              <TableCell sx={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'text.primary', width: "15%" }} align="justify">Cantidad</TableCell>
              <TableCell sx={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'text.primary', width: "15%" }} align="justify">Price</TableCell>
              <TableCell sx={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'text.primary', width: "10%" }} align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.products.map((product, index) => (
              <TableRow
                key={product.product_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } , }}
              >
                <TableCell sx={{ fontSize: '1.2rem' ,paddingBottom:"1.5rem",paddingTop:"1.5rem"}}>{product.product_id}</TableCell>
                <TableCell  sx={{ fontSize: '1.2rem' ,paddingBottom:"1.5rem",paddingTop:"1.5rem"}}>{product.name}</TableCell>
                <TableCell  sx={{ fontSize: '1.2rem' ,paddingBottom:"1.5rem",paddingTop:"1.5rem"}}>{product.quantity}</TableCell>
                <TableCell  sx={{ fontSize: '1.2rem' ,paddingBottom:"1.5rem",paddingTop:"1.5rem"}}>{product.price}</TableCell>
                <TableCell  sx={{ fontSize: '1.2rem' ,paddingBottom:"1.5rem",paddingTop:"1.5rem"}}>
                  
                  <div style={{ display: "flex", gap: "0.4rem", justifyContent:"center" }}>
                    <Button
                      variant="contained"
                      sx={{ bgcolor: "#db37ce", width: "5rem", height:"2rem" }}
                      onClick={() => handleEdit(product)}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} className="" /> 
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ bgcolor: "red", width: "5rem",height:"2rem" }}
                      onClick={() => handleShow(product)}
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
