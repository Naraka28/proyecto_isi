/*
import { Field } from "../components/Field";
import { ComboBox } from "../components/Combobox";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Employee, updateEmployee } from "../services/employeeServices";
import { DialogueUpdateEmployee } from "./DialogueUpdateEmployee";
import EyeIcon from "../images/eyeOpened.svg";
import EyeOffIcon from "../images/eyeClosed.svg";

interface ModalUpdateProps {
  open: boolean;
  onClose: () => void;
  employee: Employee;
}

export function ModalUpdateEmployee({
  open,
  onClose,
  employee,
}: ModalUpdateProps) {
  const [dialogue, setDialogue] = useState(false);
  const queryClient = useQueryClient();

  const [access_email, setAccessEmail] = useState(employee.access_email);
  const [password, setPassword] = useState(employee.password);
  const [password1, setPassword1] = useState("");

  const [last_name, setApellido] = useState(employee.last_name);
  const [personal_email, setPersonalEmail] = useState(employee.personal_email);
  const [name, setNombre] = useState(employee.name);
  const [phone, setPhone] = useState(employee.phone_number);
  const [newEmployee, setNewEmployee] = useState<Employee>(employee);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const mutation = useMutation({
    mutationFn: updateEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employeeInfo"] });
    },
  });
  const showDialog = () => {
    const updateEmployee: Employee = {
      employee_id: employee.employee_id,
      name: name,
      last_name: last_name,
      access_email: access_email,
      personal_email: personal_email,
      password: password,
      phone_number: phone,
      role_id: employee.role_id,
    };
    setNewEmployee(updateEmployee);
    setDialogue(true);
  };
  const cancelDialog = () => {
    setDialogue(false);
    setNombre(employee.name);
    setApellido(employee.last_name);
    setAccessEmail(employee.access_email);
    setPersonalEmail(employee.personal_email);
    setPassword(employee.password);
    setPhone(employee.phone_number);
    onClose();
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      {open ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h2 className="text-3xl font-semibold">Editar Empleado</h2>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={onClose}
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
                    value={name}
                  />
                  <Field
                    id={"apellido"}
                    type={"text"}
                    onChange={(e) => setApellido(e.target.value)}
                    value={last_name}
                  />
                  <Field
                    id={"access_email"}
                    type={"email"}
                    onChange={(e) => setAccessEmail(e.target.value)}
                    value={access_email}
                  />
                  <Field
                    id={"personal_email"}
                    type={"email"}
                    onChange={(e) => setPersonalEmail(e.target.value)}
                    value={personal_email}
                  />
                  <Field
                    id={"password"}
                    type={passwordVisible ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    className="absolute right-9 top-[64%] transform -translate-y-1/2 cursor-pointer"
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
                    className="absolute right-9 top-[76%] transform -translate-y-1/2 cursor-pointer"
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
                    value={phone}
                  />
                </div>
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
        <DialogueUpdateEmployee
          open={dialogue}
          onConfirm={() => {
            if (password === password1) {
              mutation.mutate(newEmployee);
              onClose();
            } else if (password !== password1) {
              alert("Las contraseñas no coinciden");
              setDialogue(false);
            }
          }}
          onClose={cancelDialog}
          employee={newEmployee}
        />
      ) : null}
    </>
  );
}

*/
import { Field } from "../components/Field";
import { ComboBox } from "../components/Combobox";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Employee, updateEmployee } from "../services/employeeServices";
import { DialogueUpdateEmployee } from "./DialogueUpdateEmployee";
import EyeIcon from "../images/eyeOpened.svg";
import EyeOffIcon from "../images/eyeClosed.svg";

interface ModalUpdateProps {
  open: boolean;
  onClose: () => void;
  employee: Employee;
}

export function ModalUpdateEmployee({
  open,
  onClose,
  employee,
}: ModalUpdateProps) {
  const [dialogue, setDialogue] = useState(false);
  const queryClient = useQueryClient();

  const [access_email, setAccessEmail] = useState(employee.access_email);
  const [password, setPassword] = useState(employee.password);
  const [password1, setPassword1] = useState("");
  const [last_name, setApellido] = useState(employee.last_name);
  const [personal_email, setPersonalEmail] = useState(employee.personal_email);
  const [name, setNombre] = useState(employee.name);
  const [phone, setPhone] = useState(employee.phone_number);
  const [newEmployee, setNewEmployee] = useState<Employee>(employee);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const mutation = useMutation({
    mutationFn: updateEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employeeInfo"] });
      setAccessEmail("");
      setPassword("");
      setPassword1("");
      setApellido("");
      setPersonalEmail("");
      setNombre("");
      setPhone("");
    },
  });

  const showDialog = () => {
    if (
      name &&
      last_name &&
      access_email &&
      personal_email &&
      password &&
      password1 &&
      phone
    ) {
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!emailRegex.test(access_email)) {
        alert("El correo de acceso no es válido.");
        return;
      }
      if (!emailRegex.test(personal_email)) {
        alert("El correo personal no es válido.");
        return;
      }
      if (password.length < 8) {
        alert("La contraseña debe tener al menos 8 caracteres.");
        return;
      }
      if (password !== password1) {
        alert("Las contraseñas no coinciden.");
        return;
      }
      if (phone.length !== 10) {
        alert("El número de teléfono debe ser de 10 dígitos");
        return;
      }

      const updateEmployee: Employee = {
        employee_id: employee.employee_id,
        name: name,
        last_name: last_name,
        access_email: access_email,
        personal_email: personal_email,
        password: password,
        phone_number: phone,
        role_id: employee.role_id,
      };
      setNewEmployee(updateEmployee);
      setDialogue(true);
    } else {
      if (!name) {
        alert("El campo nombre es obligatorio");
      } else if (!last_name) {
        alert("El campo apellido es obligatorio");
      } else if (!access_email) {
        alert("El campo correo de acceso es obligatorio");
      } else if (!personal_email) {
        alert("El campo correo personal es obligatorio");
      } else if (!password) {
        alert("El campo contraseña es obligatorio");
      } else if (!password1) {
        alert("El campo confirmar contraseña es obligatorio");
      } else if (!phone) {
        alert("El campo teléfono es obligatorio");
      }
    }
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

  const cancelDialog = () => {
    setDialogue(false);
    setNombre(employee.name);
    setApellido(employee.last_name);
    setAccessEmail(employee.access_email);
    setPersonalEmail(employee.personal_email);
    setPassword(employee.password);
    setPhone(employee.phone_number);
    onClose();
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      {open ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h2 className="text-3xl font-semibold">Editar Empleado</h2>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={onClose}
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
                    value={name}
                  />
                  <Field
                    id={"apellido"}
                    type={"text"}
                    onChange={(e) => setApellido(e.target.value)}
                    value={last_name}
                  />
                  <Field
                    id={"Access Email"}
                    type={"email"}
                    onChange={(e) => setAccessEmail(e.target.value)}
                    value={access_email}
                  />
                  <Field
                    id={"password"}
                    type={passwordVisible ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Field
                    id={"Personal Email"}
                    type={"email"}
                    onChange={(e) => setPersonalEmail(e.target.value)}
                    value={personal_email}
                  />

                  <span
                    className="absolute right-6 top-[38%] transform -translate-y-1/2 cursor-pointer"
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
                    className="absolute right-6 top-[63%] transform -translate-y-1/2 cursor-pointer"
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
                </div>
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
        <DialogueUpdateEmployee
          open={dialogue}
          onConfirm={() => {
            mutation.mutate(newEmployee);
            onClose();
          }}
          onClose={cancelDialog}
          employee={newEmployee}
        />
      ) : null}
    </>
  );
}
