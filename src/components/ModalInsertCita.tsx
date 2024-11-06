import React from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "../components/IconButton";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Fields } from "../components/Fields";
import { RadioButton } from "../components/RadioButton.tsx";
import { Camera } from "../components/Camera.tsx";
import { ComboBox } from "../components/ComboBox copy";
import { useState, useEffect } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { searchUser } from "../services/appointmentServices.ts";

interface ModalInsertProps {
  closeModal: () => void;
}

export function ModalInsertCita({ closeModal }: ModalInsertProps) {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = React.useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [procedimiento, setProcedimiento] = useState("");
  const [num_dias, setNum_dias] = useState("");
  const [notas, setNotas] = useState("");
  const [mappingStyle, setMappingStyle] = useState("");
  const [tamaño, setTamaño] = useState("");
  const [curvatura, setCurvatura] = useState("");
  const [espessura, setEspessura] = useState("");

  const handleCloseModal = () => {
    setShowModal(false);

    setFirstName("");
    setLastName("");
    setPhone("");
    setDate("");
    setProcedimiento("");
    setNum_dias("");
    setNotas("");
    setMappingStyle("");
    setTamaño("");
    setCurvatura("");
    setEspessura("");
  };

  const debouncedPhone = useDebounce(phone, 500);
  const searchMutation = useMutation({
    mutationFn: searchUser,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["citasInfo"] });
    },
  });

  useEffect(() => {
    if (debouncedPhone) {
      searchMutation.mutate(debouncedPhone);
    }
  }, [debouncedPhone]);
  if (searchMutation.isSuccess) {
  }

  const handleClick = () => {
    setShowModal(true);
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShowModal(false);
    }
  };

  const saveData = () => { };

  return (
    <>
      <IconButton
        id="insert"
        icon={faPlus}
        onClick={handleClick}
        text="Añadir Cita"
      />
      {showModal ? (
        <>
          <div className=" items-center flex overflow-x-hidden  fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-screen mx-auto max-w-2xl">
              {/* Content */}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full max-h-[85vh] bg-white outline-none focus:outline-none overflow-scroll">
                {/* Header */}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Insertar Datos de la cita
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={handleCloseModal}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/* Body */}
                <div className="relative p-6 overflow-y-auto flex-auto">
                  <form className="max-w-xl mx-auto">
                    <div className="grid md:grid-cols-1 md:gap-12">
                      <Fields
                        id="phoneClient"
                        name="phoneClient"
                        type="search"
                        text="Teléfono del Cliente"
                        placeholder="Introduce el teléfono del cliente"
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <div className="grid md:gap-6">
                      <Fields
                        id="Fecha"
                        name="Fecha"
                        type="date"
                        text="Fecha de la Cita"
                        placeholder="Fecha de la cita"
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>
                    <div className="grid md:gap-6">
                      <ComboBox
                        id="encargado"
                        name="encargado"
                        text="Seleccione al encargado"
                        placeholder=" "
                        options={[
                          // TO- DO JALAR EMPLEADOS DE BD
                          { value: "primera_vez", label: "Primera Vez" },
                        ]}
                        onChange={(e) => setProcedimiento(e.target.value)}
                      />
                    </div>
                    <div className="relative grid  w-full overflow-wrap">
                      <ComboBox
                        id="procedimientos"
                        name="procedimientos"
                        text="Seleccione el tipo de procedimiento:"
                        placeholder=" "
                        options={[
                          { value: "primera_vez", label: "Primera Vez" },
                          { value: "retoque", label: "Retoque" },
                          { value: "retiro", label: "Retiro" },
                        ]}
                        onChange={(e) => setProcedimiento(e.target.value)}
                      />
                      <div
                        id="num_dias_field"
                        className={procedimiento === "retoque" ? "" : "hidden"}
                      >
                        <Fields
                          id="num_dias"
                          name="num_dias"
                          type="number"
                          text="¿Cuántos días?"
                          placeholder=""
                          onChange={(e) => setNum_dias(e.target.value)}
                        />
                      </div>
                      <div className="grid md:grid-cols-2 md:gap-6">
                        <Fields
                          id="mapping_estilo"
                          name="mapping_estilo"
                          type="text"
                          text="Estilo de Mapping"
                          placeholder="Seleccione el estilo de mapping"
                          onChange={(e) => setMappingStyle(e.target.value)}
                        />
                        <Fields
                          id="tamaño"
                          name="tamaño"
                          type="text"
                          text="Tamaño"
                          placeholder="Seleccione el tamaño"
                          onChange={(e) => setTamaño(e.target.value)}
                        />
                      </div>
                      <div className="grid md:grid-cols-2 md:gap-6">
                        <Fields
                          id="curvatura"
                          name="curvatura"
                          type="text"
                          text="Curvatura"
                          placeholder="Seleccione la curvatura"
                          onChange={(e) => setMappingStyle(e.target.value)}
                        />
                        <Fields
                          id="espessura"
                          name="espessura"
                          type="text"
                          text="Espessura"
                          placeholder="Seleccione la espessura"
                          onChange={(e) => setTamaño(e.target.value)}
                        />
                      </div>
                      <div className="grid md:gap-6">
                        <Fields
                          id="notas"
                          name="notas"
                          type="text"
                          text="Notas"
                          placeholder="Escriba las notas"
                          onChange={(e) => setNotas(e.target.value)}
                        />
                      </div>
                    </div>
                  </form>
                </div>
                {/* Footer */}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="background-transparent text-red-500 hover:bg-red-500 focus:bg-red-500 hover:text-white focus:text-white font-bold uppercase px-6 py-3 text-sm rounded mr-1 mb-1 transition-all hover:duration-500 focus:duration-0"
                    type="button"
                    onClick={handleCloseModal}
                  >
                    Cerrar
                  </button>
                  <button
                    className="bg-tertiaryYellow text-primaryBlack hover:bg-tertiaryBlack focus:bg-tertiaryBlack hover:text-tertiaryYellow focus:text-tertiaryYellow font-bold uppercase text-sm px-6 py-3 rounded mr-1 mb-1 transition-all hover:duration-500 focus:duration-0"
                    type="button"
                    onClick={handleCloseModal}
                  >
                    Guardar Cambios
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
          <script></script>
        </>
      ) : null}
    </>
  );
}
