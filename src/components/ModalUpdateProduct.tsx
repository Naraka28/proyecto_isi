import { Field } from "../components/Field";
import { useState } from "react";
import { Product, updateProduct } from "../services/productsServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DialogueUpdateProduct } from "./DialogueUpdateProduct";
interface ModalUpdateProps {
  open: boolean;
  onClose: () => void;
  product: Product;
}

export function ModalUpdateProduct({
  open,
  onClose,
  product,
}: ModalUpdateProps) {
  const queryClient = useQueryClient();
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price.toString());
  const [quantity, setQuantity] = useState(product.quantity.toString());
  const [dialog, setDialog] = useState(false);
  const [newProduct, setNewProduct] = useState<Product>(product);

  const updateMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productInfo"] });
      setDialog(false);
    },
  });
  const showDialog = () => {
    if (name === "" || price === "" || quantity === "") {
      alert("Por favor, rellene todos los campos");
      return;
    } else {
      const updateProduct: Product = {
        product_id: product.product_id,
        name: name,
        quantity: parseInt(quantity),
        price: parseFloat(price),
      };
      setNewProduct(updateProduct);
      setDialog(true);
    }
  };
  const cancelDialog = () => {
    setDialog(false);
    setName(product.name);
    setPrice(product.price.toString());
    setQuantity(product.quantity.toString());
  };

  return (
    <>
      {open ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h2 className="text-3xl font-semibold">Editar Producto</h2>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={onClose}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-3 m-3 grid grid-cols-1 gap-4">
                  <Field
                    id={"nombre"}
                    type={"text"}
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                  <Field
                    id={"cantidad"}
                    type={"number"}
                    onChange={(e) => setQuantity(e.target.value)}
                    value={quantity.toString()}
                  />
                  <Field
                    id={"precio"}
                    type={"number"}
                    onChange={(e) => setPrice(e.target.value)}
                    value={price.toString()}
                  />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={onClose}
                  >
                    Close
                  </button>
                  <button
                    className="bg-blue-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={showDialog}
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

      {dialog ? (
        <DialogueUpdateProduct
          open={dialog}
          onConfirm={() => {
            updateMutation.mutate(newProduct);
            onClose();
          }}
          onClose={cancelDialog}
          product={newProduct}
        />
      ) : null}
    </>
  );
}
