/*
import React from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "../components/DashButton";
import { Field } from "../components/Field";
import { ComboBox } from "../components/Combobox";
import { useState } from "react";
import EyeIcon from "../images/eyeOpened.svg";
import EyeOffIcon from "../images/eyeClosed.svg";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  employeeAddService,
  EmployeeCreate,
} from "../services/employeeServices";

export function ModalEmployees() {
  return (
    // Provide the client to your App
    <ModalEmployeesForm />
  );
}

export function ModalEmployeesForm() {
  const [showModal, setShowModal] = React.useState(false);
  const queryClient = useQueryClient();

  const [access_email, setAccessEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");

  const [last_name, setApellido] = useState("");
  const [personal_email, setPersonalEmail] = useState("");
  const [name, setNombre] = useState("");
  const [phone, setPhone] = useState("");
  const [role_id, setRole] = useState("");
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const mutation = useMutation({
    mutationFn: employeeAddService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employeeInfo"] });
    },
  });
  const handleAddClick = () => {
    setShowModal(true);
  };
  const newEmployee: EmployeeCreate = {
    name: name,
    last_name: last_name,
    access_email: access_email,
    personal_email: personal_email,
    password: password,
    phone_number: phone,
    role_id: parseInt(role_id),
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <IconButton
        id={"añadirBtn"}
        text={"Añadir"}
        icon={faPlus}
        onClick={handleAddClick}
      />

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h2 className="text-3xl font-semibold">Añadir Empleado</h2>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-6 m-6 flex-auto">
                  <h2>Formulario de Empleado:</h2>
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
                    id={"access_email"}
                    type={"email"}
                    onChange={(e) => setAccessEmail(e.target.value)}
                  />
                  <Field
                    id={"personal_email"}
                    type={"email"}
                    onChange={(e) => setPersonalEmail(e.target.value)}
                  />
                  <Field
                    id={"password"}
                    type={passwordVisible ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    className="absolute right-9 top-[57%] transform -translate-y-1/2 cursor-pointer"
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
                    id={"confirm Password"}
                    type={passwordVisible ? "text" : "password"}
                    onChange={(e) => setPassword1(e.target.value)}
                  />
                  <span
                    className="absolute right-9 top-[68%] transform -translate-y-1/2 cursor-pointer"
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
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <ComboBox
                    id="role_id"
                    options={["1 Admin", "2 Empleado"]}
                    onChange={(e) => setRole(e.target.value)}
                  />
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
                    onClick={() => {
                      if (password === password1) {
                        mutation.mutate(newEmployee);
                      } else if (password !== password1) {
                        alert("Las contraseñas no coinciden");
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

*/

import React, { useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "../components/DashButton";
import { Field } from "../components/Field";
import { ComboBox } from "../components/Combobox";
import EyeIcon from "../images/eyeOpened.svg";
import EyeOffIcon from "../images/eyeClosed.svg";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  employeeAddService,
  EmployeeCreate,
} from "../services/employeeServices";

export function ModalEmployees() {
  return <ModalEmployeesForm />;
}

export function ModalEmployeesForm() {
  const [showModal, setShowModal] = useState(false);
  const queryClient = useQueryClient();

  const [access_email, setAccessEmail] = useState("");
  const [personal_email, setPersonalEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");

  const [last_name, setApellido] = useState("");
  const [name, setNombre] = useState("");
  const [phone, setPhone] = useState("");
  const [role_id, setRole] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const mutation = useMutation({
    mutationFn: employeeAddService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employeeInfo"] });

        setShowModal(false);
        setNombre("");
        setApellido("");
        setAccessEmail("");
        setPersonalEmail("");
        setPassword("");
        setPassword1("");
        setPhone("");
        setRole("");
        alert("Empleado añadido correctamente");
    },
  });

  const handleAddClick = () => {
    setShowModal(true);
  };

  const newEmployee: EmployeeCreate = {
    name: name,
    last_name: last_name,
    access_email: access_email,
    personal_email: personal_email,
    password: password,
    phone_number: phone,
    role_id: parseInt(role_id),
  };

  const validateEmail = (email, type) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      alert(`El correo ${type} es obligatorio`);
      return false;
    } else if (!emailRegex.test(email)) {
      alert(`Por favor, ingresa un correo ${type} válido`);
      return false;
    }
    return true;
  };

  const validatePhoneNumber = () => {
    // Filter out non-digit characters to ensure only digits are present
    const cleanedPhone = phone.replace(/\D/g, "");

    const phoneRegex = /^[0-9]{10}$/;
    if (!cleanedPhone) {
      alert("El número de teléfono es obligatorio");
      return false;
    } else if (!phoneRegex.test(cleanedPhone)) {
      alert("Por favor, ingresa un número de teléfono válido (10 dígitos)");
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

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSave = () => {
    if(name && last_name &&access_email && personal_email && password && password1 && phone && role_id) {
      if (
        validateEmail(access_email, "de acceso") &&
        validateEmail(personal_email, "personal") &&
        validatePhoneNumber() &&
        password === password1 &&
        password.length >= 8 &&
        role_id !== ""
      ) {
        mutation.mutate(newEmployee);
      } else if (password !== password1) {
        alert("Las contraseñas no coinciden");
      } else if (password.length < 8) {
        alert("La contraseña debe tener al menos 8 caracteres");
      } else if (role_id === "") {
        alert("Por favor, selecciona un rol");
      } else if(!validateEmail(access_email, "de acceso")){
        alert("Por favor, ingresa un correo de acceso válido");
      } else if(!validateEmail(personal_email, "personal")){
        alert("Por favor, ingresa un correo personal válido");
      } else if(!validatePhoneNumber()){
        alert("Por favor, ingresa un número de teléfono válido");
      }
    }else{
      if(!name){
        alert("El nombre es obligatorio");
    } else if(!last_name){
        alert("El apellido es obligatorio");
    } else if(!access_email){
        alert("El correo de acceso es obligatorio");
    } else if(!personal_email){
        alert("El correo personal es obligatorio");
    } else if(!password){
        alert("La contraseña es obligatoria");
    } else if(!password1){
        alert("Por favor, confirma la contraseña");
    } else if(!phone){
        alert("El número de teléfono es obligatorio");
    } else if(!role_id){
        alert("Por favor, selecciona un rol");
    }
  };
};

  return (
    <>
      <IconButton
        id={"añadirBtn"}
        text={"Añadir"}
        icon={faPlus}
        onClick={handleAddClick}
      />

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h2 className="text-3xl font-semibold">Añadir Empleado</h2>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>

                <div className="relative p-6 m-6 flex-auto">
                  <h2>Formulario de Empleado:</h2>
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
                    id={"access_email"}
                    type={"email"}
                    onChange={(e) => setAccessEmail(e.target.value)}
                  />
                  <Field
                    id={"personal_email"}
                    type={"email"}
                    onChange={(e) => setPersonalEmail(e.target.value)}
                  />
                  <Field
                    id={"password"}
                    type={passwordVisible ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    className="absolute right-9 top-[57%] transform -translate-y-1/2 cursor-pointer"
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
                    id={"confirm Password"}
                    type={passwordVisible ? "text" : "password"}
                    onChange={(e) => setPassword1(e.target.value)}
                  />
                  <span
                    className="absolute right-9 top-[68%] transform -translate-y-1/2 cursor-pointer"
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
                  <ComboBox
                    id="role_id"
                    options={["1 Admin", "2 Empleado"]}
                    onChange={setRole}
                  />
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
                    onClick={handleSave}
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
