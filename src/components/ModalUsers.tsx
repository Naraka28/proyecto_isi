import React from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "../components/DashButton";
import { Field } from "../components/Field";
import { ModalState } from "../components/ModalState";
import { useState } from "react";
import { userAddService } from "../services/userAddservice";
import EyeIcon from "../images/eyeOpened.svg";
import EyeOffIcon from "../images/eyeClosed.svg";

import {
  useMutation,
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from "@tanstack/react-query";
import { access } from "fs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";

export function ModalUsers() {
  return (
    // Provide the client to your App
    <ModalUsersForm />
  );
}

export function ModalUsersForm() {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = React.useState(false);

  const handleAddClick = () => {
    setShowModal(true);
  };

  const [access_email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [last_name, setApellido] = useState("");
  const [name, setNombre] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const mutation = useMutation({
    mutationFn: userAddService,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["userInfo"] });

      setShowModal(false);
      setEmail("");
      setPassword("");
      setPassword1("");
      setApellido("");
      setNombre("");
      setPhone("");
      alert("Usuario creado con éxito");
    },
  });
  const newUser = {
    name: name,
    last_name: last_name,
    access_email: access_email,
    password: password,
    role_id: 3,
    phone_number: phone,
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Función para validar el formato del correo electrónico
  const validateEmail = () => {
    let error;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!access_email) {
      error = "El correo es obligatorio";
      return false;
    } else if (!emailRegex.test(access_email)) {
      error = "Por favor, ingresa un correo válido";
      return false;
    }
    return true;
  };

  // Función para validar el formato del número de teléfono
  const validatePhoneNumber = () => {
    let error;
    // Regex para validar un número de teléfono con 10 dígitos
    const phoneRegex = /^[0-9]{10}$/;

    if (!phone) {
      error = "El número de teléfono es obligatorio";
      return false;
    } else if (!phoneRegex.test(phone)) {
      error = "Por favor, ingresa un número de teléfono válido (10 dígitos)";
      return false;
    }

    return true;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove any non-numeric characters
    let phoneValue = e.target.value.replace(/\D/g, "");

    // Limit the length to 10 characters
    if (phoneValue.length > 10) {
      phoneValue = phoneValue.slice(0, 10);
    }

    setPhone(phoneValue);
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
        className={`hover:bg-[#75003a] transition-colors ease-in-out duration-[400ms] `}
      >
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
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h2 className="text-3xl font-semibold">Añadir Usuario</h2>
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
                    id={"nombre"}
                    type={"text"}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                  <Field
                    id={"apellido"}
                    type={"text"}
                    onChange={(e) => setApellido(e.target.value)}
                  />
                  <Field
                    id={"email"}
                    type={"email"}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <Field
                    id={"password"}
                    type={passwordVisible ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    className="absolute right-6 top-[50%] transform -translate-y-1/2 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {passwordVisible ? (
                      <img
                        src={EyeIcon}
                        alt="Hide password"
                        className="h-5 w-5"
                      />
                    ) : (
                      <img
                        src={EyeOffIcon}
                        alt="Show password"
                        className="h-5 w-5"
                      />
                    )}
                  </span>
                  <Field
                    id={"phone"}
                    type={"tel"}
                    onChange={handlePhoneChange}
                    value={phone}
                  />
                  <Field
                    id={"confirm Password"}
                    type={passwordVisible ? "text" : "password"}
                    onChange={(e) => setPassword1(e.target.value)}
                  />
                  <span
                    className="absolute right-6 top-[83%] transform -translate-y-1/2 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {passwordVisible ? (
                      <img
                        src={EyeIcon}
                        alt="Hide password"
                        className="h-5 w-5"
                      />
                    ) : (
                      <img
                        src={EyeOffIcon}
                        alt="Show password"
                        className="h-5 w-5"
                      />
                    )}
                  </span>
                </div>
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
                      if (
                        access_email &&
                        password &&
                        password1 &&
                        last_name &&
                        name &&
                        phone
                      ) {
                        if (validateEmail() && validatePhoneNumber()) {
                          if (password.length < 8) {
                            alert(
                              "La contraseña debe tener al menos 8 caracteres"
                            );
                          } else {
                            if (password === password1) {
                              mutation.mutate(newUser);
                            } else {
                              alert("Las contraseñas no coinciden");
                            }
                          }
                        } else {
                          if (!validateEmail()) {
                            alert("Por favor, ingresa un correo válido");
                          } else if (!validatePhoneNumber()) {
                            alert(
                              "Por favor, ingresa un número de teléfono válido (10 dígitos)"
                            );
                          }
                        }
                      } else {
                        if (access_email === "") {
                          alert("El correo es obligatorio");
                        } else if (password === "") {
                          alert("La contraseña es obligatoria");
                        } else if (password1 === "") {
                          alert(
                            "La confirmación de la contraseña es obligatoria"
                          );
                        } else if (last_name === "") {
                          alert("El apellido es obligatorio");
                        } else if (name === "") {
                          alert("El nombre es obligatorio");
                        } else if (phone === "") {
                          alert("El número de teléfono es obligatorio");
                        }
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
