import React, { useState } from "react";
import { Button } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { materialAddService } from "../services/inventoryServices"; // Servicio para agregar material
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Field } from "../components/Field"; // Campo de entrada reutilizable
import { ModalState } from "../components/ModalState"; // Componente para mostrar el estado del modal

export function ModalMaterial() {
  return <ModalMaterialForm />;
}

export function ModalMaterialForm() {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: materialAddService,
    onSuccess: () => {
      // Invalidate and refetch materials data after adding a new material
      queryClient.invalidateQueries({ queryKey: ["materialsInfo"] });
      setShowModal(false);
      setName("");
      setQuantity("");
      setPrice("");
      alert("Material agregado con éxito");
    },
  });

  const newMaterial = {
    name: name,
    quantity: parseInt(quantity),
    price: parseFloat(price),
  };

  const handleAddClick = () => {
    setShowModal(true);
  };

  // Función de validación
  const validateInputs = () => {
    if (!name || !quantity || !price) {
      setError("Todos los campos son obligatorios");
      return false;
    }

    if (isNaN(parseInt(quantity)) || parseInt(quantity) <= 0) {
      setError("La cantidad debe ser un número mayor a 0");
      return false;
    }

    if (isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
      setError("El precio debe ser un número mayor a 0");
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
        className={`hover:bg-[#75003a] transition-colors ease-in-out duration-[400ms]`}
      >
        <FontAwesomeIcon
          icon={faPlus}
          style={{ margin: "0.5rem", width: "1rem", height: "1rem" }}
        />
        <h3 className="text-lg mr-3 capitalize">Agregar</h3>
      </Button>

      {showModal && (
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
                <div className="relative p-3 m-3 grid grid-cols-1 gap-4">
                  <Field
                    id={"nombre"}
                    type={"text"}
                    label={"Nombre del Material"}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Field
                    id={"cantidad"}
                    type={"number"}
                    label={"Cantidad"}
                    onChange={(e) => setQuantity(e.target.value)}
                    value={quantity}
                  />
                  <Field
                    id={"precio"}
                    type={"number"}
                    label={"Precio"}
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                  />
                </div>
                {error && <div className="text-red-500 text-sm">{error}</div>}
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
                    id="save"
                    onClick={() => {
                      if (validateInputs()) {
                        mutation.mutate(newMaterial);
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
      )}
    </>
  );
}
