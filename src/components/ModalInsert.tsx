import React from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "../components/IconButton";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Fields } from "../components/Fields";
import { RadioButton } from "../components/RadioButton.tsx";
import { Camera } from "../components/Camera.tsx";
import { useRef } from "react";
import { useEffect } from "react";
import { useState, ChangeEvent } from 'react';

interface ModalInsertProps {
  closeModal: () => void;
}

export function ModalInsert({ closeModal }: ModalInsertProps) {
  const [showModal, setShowModal] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [birth, setBirth] = useState("");
  const [picture, setPicture] = useState("");
  const [hasAllergies, setHasAllergies] = useState(false);
  const [allergies, setAllergies] = useState("");
  const [hasMeds, setHasMeds] = useState(false);
  const [meds, setMeds] = useState("");
  const [hasSensibility, setHasSensibility] = useState(false);
  const [sensibility, setSensibility] = useState("");
  const [hasDermatitis, setHasDermatitis] = useState(false);
  const [hasEyeInfection, setHasEyeInfection] = useState(false);
  const [hasEyePain, setHasEyePain] = useState(false);
  const [hasLatex, setHasLatex] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
    setAddress("");
    setBirth("");
    setPicture("");
    setHasMeds(false);
    setMeds("");
    setHasAllergies(false);
    setAllergies("");
    setHasSensibility(false);
    setSensibility("");
    setHasDermatitis(false);
    setHasEyeInfection(false);
    setHasEyePain(false);
    setHasLatex(false);
  };


 
    

   

 

  const handleClick = () => {
    setShowModal(true);
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      { handleCloseModal }
    }
  };




  return (
    <>
      <IconButton id="insert" icon={faPlus} onClick={handleClick} text="Añadir Cliente" />
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden  fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-screen my-6 mx-auto max-w-2xl">
              {/* Content */}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full max-h-[85vh] bg-white outline-none focus:outline-none overflow-scroll">
                {/* Header */}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Insertar Datos del Cliente
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
                  <form className="max-w-xl  mx-auto">
                    <div className="grid md:grid-cols-2 md:gap-6">
                      <Fields
                        id="name"
                        name="name"
                        type="text"
                        text="Nombre"
                        placeholder="Introduce tu nombre"
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                      <Fields
                        id="lastname"
                        name="lastname"
                        type="text"
                        text="Apellido"
                        placeholder="Introduce tu apellido"
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-y-5 md:gap-6">

                      <Fields
                        id="email"
                        name="email"
                        type="email"
                        text="Correo"
                        placeholder="Introduce tu correo"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <Fields
                        id="phone"
                        name="phone"
                        type="tel"
                        text="Teléfono"
                        placeholder="Introduce tu teléfono"
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 md:gap-6">
                      <Fields
                        id="birth"
                        name="birth"
                        type="date"
                        text="Fecha de nacimiento"
                        placeholder=""
                        onChange={(e) => setBirth(e.target.value)}
                      />

                      <Fields
                        id="address"
                        name="address"
                        type="text"
                        text="Dirección"
                        placeholder="Introduce tu dirección"
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>

                    <div className="relative grid grid-cols-2 w-full overflow-wrap">
                      <RadioButton
                        id="meds"
                        group="meds"
                        text="¿Se encuentra tomando algún medicamento?"
                        onChange={(value) => setHasMeds(value)} />

                      <div id="meds_field" className={hasMeds ? "" : "hidden"}>
                        <Fields
                          id="meds_text"
                          name="meds_text"
                          type="text"
                          placeholder="¿Cuáles?"
                          text=""
                          onChange={(e) => setMeds(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="relative grid grid-cols-2 w-full overflow-wrap">
                      <RadioButton
                        id="allergies"
                        group="allergies"
                        text="¿Cuenta con alergias?"
                        onChange={(value) => setHasAllergies(value)}
                      />

                      <div id="allergies_field" className={hasAllergies ? "" : "hidden"}>
                        <Fields
                          id="allergies_text"
                          name="allergies_text"
                          type="text"
                          text=""
                          placeholder="¿Cuáles?"
                          onChange={(e) => setAllergies(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="relative grid grid-cols-2 w-full overflow-wrap">
                      <RadioButton
                        id="sensibility"
                        group="sensibility"
                        text="¿Cuenta con sensibilidad a algún producto?"
                        onChange={(value) => setHasSensibility(value)}

                      />

                      <div id="sensibility_field" className={hasSensibility ? "" : "hidden"}>
                        <Fields
                          id="sensibility_text"
                          name="sensibility_text"
                          type="text"
                          placeholder="¿Cuáles?"
                          text=""
                          onChange={(e) => setSensibility(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="relative w-full">
                      <RadioButton
                        id="dermatitis"
                        group="dermatitis"
                        text="¿Padece dermatitis?"
                        onChange={(value) => setHasDermatitis(value)}
                      />
                    </div>

                    <div className="relative w-full">
                      <RadioButton
                        id="eye_infection"
                        group="eye_infection"
                        text="¿Padece alguna infección en los ojos?"
                        onChange={(value) => setHasEyeInfection(value)}
                      />
                    </div>

                    <div className="relative w-full">
                      <RadioButton
                        id="eye_pain"
                        group="eye_pain"
                        text="¿Padece alguna dolencia o inflamación en los ojos?"
                        onChange={(value) => setHasEyePain(value)}
                      />
                    </div>

                    <div className="relative w-full">
                      <RadioButton
                        id="latex"
                        group="latex"
                        text="¿Tiene alergia al látex?"
                        onChange={(value) => setHasLatex(value)}
                      />
                    </div>

                    <div className="w-full pt-2">
                      <Camera onChange={(e) => setPicture(e.target.value)} />
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
          </div >
          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
          <script></script>
        </>
      ) : null
      }
    </>
  );
}
