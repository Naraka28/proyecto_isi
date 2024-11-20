import React from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "../components/DashButton";
import { Field } from "../components/Field";
import { useState } from "react";
import { materialAddService } from "../services/inventoryServices";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";

interface Props {
  className?: string;
  texto?: string;
}


export function ModalInventory({texto,className = ""}: Props) {
  return (
    <ModalInventoryForm className={className} texto={texto} />
  );
}

export function ModalInventoryForm({texto,className = ""}: Props) {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = React.useState(false);

  const handleAddClick = () => {
    setShowModal(true);
  };

  // Campos específicos para la tabla de inventario
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: materialAddService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventoryData"] });
      setShowModal(false);
      setName("");
      setQuantity("");
      setPrice("");
      alert("Material agregado al inventario con éxito");
    },
  });

  const newInventoryItem = {
    name: name,
    quantity: parseInt(quantity),
    price: parseFloat(price),
  };

  // Validaciones para cantidad y precio
  const validateQuantity = () => {
    if (!quantity) {
      setError("La cantidad es obligatoria");
      return false;
    } else if (!/^\d+$/.test(quantity)) {
      setError("La cantidad debe ser un número entero");
      return false;
    }
    return true;
  };

  const validatePrice = () => {
    if (!price) {
      setError("El precio es obligatorio");
      return false;
    } else if (!/^\d+(\.\d{1,2})?$/.test(price)) {
      setError("El precio debe ser un número con hasta dos decimales");
      return false;
    }
    return true;
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
        className={`hover:bg-[#75003a] ${className} transition-colors ease-in-out duration-[400ms]`}
      >
        <FontAwesomeIcon
          icon={faPlus}
          style={{ margin: "0.5rem", width: "1rem", height: "1rem" }}
        />
        <h3 className="text-lg mr-3 capitalize">{texto}</h3>
      </Button>

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h2 className="text-3xl font-semibold">Añadir Material</h2>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-3 m-3 grid grid-cols-2 gap-4">
                  <Field
                    id={"name"}
                    label="Nombre del Material"
                    type={"text"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Field
                    id={"quantity"}
                    label="Cantidad"
                    type={"number"}
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                  <Field
                    id={"price"}
                    label="Precio"
                    type={"text"}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                {error && (
                  <p className="text-red-500 text-sm px-4">{error}</p>
                )}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cerrar
                  </button>
                  <button
                    className="bg-blue-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    id="save"
                    onClick={() => {
                      if (name && quantity && price) {
                        if (validateQuantity() && validatePrice()) {
                          mutation.mutate(newInventoryItem);
                        }
                      } else {
                        setError("Todos los campos son obligatorios");
                      }
                    }}
                  >
                    Guardar Cambios
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
