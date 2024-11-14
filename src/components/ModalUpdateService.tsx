import React from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "../components/DashButton";
import { Field } from "../components/Field";
import { ComboBox } from "../components/Combobox";
import { useState } from "react";
import {
  addService,
  Service,
  updateService,
} from "../services/serviciosServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DialogueUpdateService } from "./DialogueUpdateService";

interface ModalUpdateProps {
  open: boolean;
  onClose: () => void;
  service: Service;
}

export function ModalUpdateService({
  open,
  onClose,
  service,
}: ModalUpdateProps) {
  const queryClient = useQueryClient();
  const [name, setName] = useState(service.name);
  const [price, setPrice] = useState(service.price.toString());
  const [duration, setDuration] = useState(
    service.duration_in_minutes.toString()
  );
  const [catalogue, setCatalogue] = useState(service.catalogue_id);
  const [dialogue, setDialogue] = useState(false);
  const [newService, setNewService] = useState<Service>(service);

  const mutation = useMutation({
    mutationFn: updateService,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["serviceInfo"] });
    },
  });
  const showDialog = () => {
    if (name && price && duration && catalogue) {
      const updateService: Service = {
        service_id: service.service_id,
        name: name,
        catalogue_id: parseInt(catalogue.toString()),
        price: parseFloat(price),
        duration_in_minutes: parseInt(duration),
      };
      setNewService(updateService);
      setDialogue(true);
    } else {
      alert("Por favor, llene todos los campos");
    }
  };
  const cancelDialog = () => {
    setDialogue(false);
    setName(service.name);
    setPrice(service.price.toString());
    setDuration(service.duration_in_minutes.toString());
    onClose();
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
                  <h2 className="text-3xl font-semibold">Editar Servicio</h2>
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
                    id={"precio"}
                    type={"number"}
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                  />
                  <Field
                    id={"duración"}
                    type={"number"}
                    onChange={(e) => setDuration(e.target.value)}
                    value={duration}
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
      {dialogue ? (
        <DialogueUpdateService
          open={dialogue}
          onConfirm={() => {
            mutation.mutate(newService);
            onClose();
          }}
          onClose={cancelDialog}
          service={newService}
        />
      ) : null}
    </>
  );
}
