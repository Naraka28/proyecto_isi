import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

interface stateProps {
  success: boolean;
  messageTrue: string;
  messageFalse: string;
  color?: string;
  show: boolean;
  onClose: () => void; // Para manejar el cierre del modal desde el padre
}

export function ModalState(props: stateProps) {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      {props.show && <ModalStateForm {...props} />}{" "}
      {/* Renderizar el modal solo si show es true */}
    </QueryClientProvider>
  );
}

export function ModalStateForm({
  success,
  messageTrue,
  messageFalse,
  onClose,
}: stateProps) {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-full my-6 mx-auto max-w-xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h2 className="text-3xl font-semibold">Mensaje de Respuesta</h2>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={onClose}
              >
                <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 m-6 flex-auto">
              <h3 className="text-xl">
                {success ? messageTrue : messageFalse}
              </h3>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="bg-emerald-500 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none"
                type="button"
                onClick={onClose} // Cerrar modal
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
