import { Field } from "../components/Field";
import { useState } from "react";
import { materialUpdateService } from "../services/inventoryServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DialogueUpdateInventory } from "./DialogueUpdateMaterial";

interface ModalUpdateInventoryProps {
  open: boolean;
  onClose: () => void;
  material: {
    material_id: number;
    name: string;
    quantity: number;
    price: number;
  };
}

export function ModalUpdateInventory({
  open,
  onClose,
  material,
}: ModalUpdateInventoryProps) {
  const queryClient = useQueryClient();

  // Estados para los campos de inventario
  const [name, setName] = useState(material.name);
  const [quantity, setQuantity] = useState(material.quantity);
  const [price, setPrice] = useState(material.price);
  const [dialogue, setDialogue] = useState(false);
  const [updatedMaterial, setUpdatedMaterial] = useState(material);

  const mutation = useMutation({
    mutationFn: materialUpdateService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventoryData"] });
    },
  });

  const validateQuantity = () => {
    if (!quantity) {
      alert("La cantidad es obligatoria");
      return false;
    } else if (!Number.isInteger(quantity)) {
      alert("La cantidad debe ser un número entero");
      return false;
    }
    return true;
  };

  const validatePrice = () => {
    if (!price) {
      alert("El precio es obligatorio");
      return false;
    } else if (isNaN(price) || price <= 0) {
      alert("El precio debe ser un número positivo");
      return false;
    }
    return true;
  };

  const showDialog = () => {
    if (name && quantity && price) {
      if (validateQuantity() && validatePrice()) {
        const updatedMaterial = {
          material_id: material.material_id,
          name: name,
          quantity: quantity,
          price: price,
        };
        setUpdatedMaterial(updatedMaterial);
        setDialogue(true);
      }
    } else {
      alert("Por favor, llena todos los campos");
    }
  };

  const cancelDialog = () => {
    setDialogue(false);
    setName(material.name);
    setQuantity(material.quantity);
    setPrice(material.price);
    onClose();
  };

  return (
    <>
      {open ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h2 className="text-3xl font-semibold">Editar Material</h2>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={onClose}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>

                <div className="relative p-3 m-3 grid grid-cols-1 gap-4">
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
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                  />
                  <Field
                    id={"price"}
                    label="Precio"
                    type={"number"}
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(parseFloat(e.target.value))}
                  />
                </div>

                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={onClose}
                  >
                    Cerrar
                  </button>
                  <button
                    className="bg-blue-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    id="save"
                    onClick={showDialog}
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
      {dialogue ? (
        <DialogueUpdateInventory
          open={dialogue}
          onConfirm={() => {
            mutation.mutate(updatedMaterial);
            onClose();
          }}
          onClose={cancelDialog}
          material={updatedMaterial}
        />
      ) : null}
    </>
  );
}
