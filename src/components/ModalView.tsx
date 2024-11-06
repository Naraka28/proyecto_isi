import React, { useState, useRef, useEffect } from "react";
import { IconButton } from "../components/IconButton.tsx";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Fields2 } from "../components/Fields2.tsx";

interface ModalInsertProps {
    closeModal: () => void;
}

export function ModalView({ closeModal }: ModalInsertProps) {
    const [showModal, setShowModal] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [birth, setBirth] = useState("");

    const handleClick = () => {
        setShowModal(true);
    };

    const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            setShowModal(false);
        }
    };

    return (
        <>
            <IconButton
                id="insert"
                icon={faEye}
                onClick={handleClick}
                text="Ver Cita"
            />
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/* Content */}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full max-h-[85vh] bg-white outline-none focus:outline-none overflow-scroll">
                                {/* Header */}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Todos los datos de la cita
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/* Body */}
                                <div className="relative p-6 flex-auto overflow-scroll">
                                    <div className="flex flex-col md:flex-row md:items-center md:gap-6">
                                        <div className="flex justify-center items-center">
                                            <img
                                                src="src/images/BigASSnGAa1.png"
                                                alt="Foto de perfil"
                                                className="w-24 h-24 rounded-full object-cover"
                                            />
                                        </div>

                                        <Fields2
                                            label="Cliente"
                                            value="Juan Luis Lagunas Rosales"
                                        />

                                        <Fields2 label="Fecha de la Cita" value="2021-08-12" />
                                    </div>

                                    <div className="flex justify-center items-center pt-4">
                                        <Fields2
                                            label="Procedimiento"
                                            value="Extensiones de Pestañas"
                                        />
                                    </div>

                                    <div className="grid md:grid-cols-3 md:gap-12 justify-center items-center">
                                        <Fields2
                                            label="Estilo de Mapping"
                                            value="Clásico"
                                        />
                                        <Fields2
                                            label="Tamaño de Mapping"
                                            value="Mediano"
                                        />
                                    </div>

                                    <div className="grid md:grid-cols-3 md:gap-12 justify-center items-center">
                                        <Fields2
                                            label="Curvatura"
                                            value="C"
                                        />
                                        <Fields2
                                            label="Espesura"
                                            value="0.15"
                                        />
                                    </div>

                                    <div className="flex justify-center items-center pt-4">
                                        <Fields2
                                            label="Notas"
                                            value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididun, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                                        />
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="background-transparent text-red-500 hover:bg-red-500 hover:text-white font-bold uppercase px-6 py-3 text-sm rounded transition-all"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cerrar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}
