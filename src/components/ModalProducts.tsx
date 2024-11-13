import React from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "../components/DashButton";
import { Field } from "../components/Field";
import { useState } from "react";
import {
  addProduct,
  Product,
  ProductCreate,
} from "../services/productsServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function ModalProducts() {
  return (
    // Provide the client to your App
    <ModalProductsForm />
  );
}

export function ModalProductsForm() {
  const [showModal, setShowModal] = React.useState(false);
  const queryClient = useQueryClient();
  const handleAddClick = () => {
    setShowModal(true);
  };

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const mutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["productInfo"] });
      setShowModal(false);
    },
  });
  const newProduct: ProductCreate = {
    name: name,
    quantity: parseInt(quantity),
    price: parseFloat(price),
  };

  return (
    <>
      <Button
        variant="contained"
        sx={{
          bgcolor: "#E90074",
          width: "9rem",
          height: "3.5rem",
          borderRadius: "1.7rem",
          textTransform: "none", // Desactiva el texto en mayúsculas
        }}
        onClick={() => handleAddClick()}
        className={`hover:bg-[#75003a] transition-colors ease-in-out duration-[400ms] `}>
        <FontAwesomeIcon
          icon={faPlus}
          style={{ margin: "0.5rem", width: "1rem", height: "1rem" }}
        />
        <h3 className="text-lg mr-3 capitalize">Agregar</h3>
      </Button>

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h2 className="text-3xl font-semibold">Añadir Producto</h2>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 m-6 flex-auto">
                  <h2>Formulario de Producto:</h2>
                  <Field
                    id={"nombre"}
                    type={"text"}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Field
                    id={"cantidad"}
                    type={"number"}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                  <Field
                    id={"precio"}
                    type={"number"}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-blue-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      if (!name || !price || !quantity) {
                        alert("Por favor, rellene todos los campos");
                      } else {
                        
                        const newProduct: ProductCreate = {
                          name: name,
                          quantity: parseInt(quantity),
                          price: parseFloat(price),
                        };
                        mutation.mutate(newProduct);
                        setName("");
                        setPrice("");
                        setQuantity("");
                      }
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
