/*
import { Field } from "../components/Field";
import { useState } from "react";
import { user, userUpdateService } from "../services/userAddservice";
import EyeIcon from "../images/eyeOpened.svg";
import EyeOffIcon from "../images/eyeClosed.svg";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DialogueUpdateUser } from "./DialogueUpdateUser";
interface ModalUpdateProps {
  open: boolean;
  onClose: () => void;
  user: user;
}

export function ModalUpdateUser({ open, onClose, user }: ModalUpdateProps) {
  const queryClient = useQueryClient();

  const [access_email, setEmail] = useState(user.access_email);
  const [password, setPassword] = useState(user.password);
  const [password1, setPassword1] = useState("");
  const [last_name, setApellido] = useState(user.last_name);
  const [name, setNombre] = useState(user.name);
  const [phone, setPhone] = useState(user.phone_number);
  const [dialogue, setDialogue] = useState(false);
  const [newUser, setnewUser] = useState<user>(user);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const mutation = useMutation({
    mutationFn: userUpdateService,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["userInfo"] });
    },
  });
  const showDialog = () => {
    const updateuser: user = {
      user_id: user.user_id,
      name: name,
      last_name: last_name,
      access_email: access_email,
      password: password,
      phone_number: phone,
      role_id: user.role_id,
    };
    setnewUser(updateuser);
    setDialogue(true);
  };
  const cancelDialog = () => {
    setDialogue(false);
    setNombre(user.name);
    setApellido(user.last_name);
    setEmail(user.access_email);
    setPassword(user.password);
    setPhone(user.phone_number);
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
                  <h2 className="text-3xl font-semibold">Editar Usuario</h2>
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
                  <h2>Formulario de Usuario:</h2>
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
                    id={"email"}
                    type={"email"}
                    onChange={(e) => setEmail(e.target.value)}
                    value={access_email}
                  />
                  <Field
                    id={"password"}
                    type={passwordVisible ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    className="absolute right-9 top-[59%] transform -translate-y-1/2 cursor-pointer"
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
                    className="absolute right-9 top-[73%] transform -translate-y-1/2 cursor-pointer"
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
                    id="save"
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
        <DialogueUpdateUser
          open={dialogue}
          onConfirm={() => {
            if (password === password1) {
              mutation.mutate(newUser);
              onClose();
            } else if (password !== password1) {
              alert("Las contraseñas no coinciden");
              setDialogue(false);
            }
          }}
          onClose={cancelDialog}
          user={newUser}
        />
      ) : null}
    </>
  );
}
  */

import { Field } from "../components/Field";
import { useState } from "react";
import { user, userUpdateService } from "../services/userAddservice";
import EyeIcon from "../images/eyeOpened.svg";
import EyeOffIcon from "../images/eyeClosed.svg";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DialogueUpdateUser } from "./DialogueUpdateUser";

interface ModalUpdateProps {
  open: boolean;
  onClose: () => void;
  user: user;
}

export function ModalUpdateUser({ open, onClose, user }: ModalUpdateProps) {
  const queryClient = useQueryClient();

  const [access_email, setEmail] = useState(user.access_email);
  const [password, setPassword] = useState(user.password);
  const [password1, setPassword1] = useState("");
  const [last_name, setApellido] = useState(user.last_name);
  const [name, setNombre] = useState(user.name);
  const [phone, setPhone] = useState(user.phone_number);
  const [dialogue, setDialogue] = useState(false);
  const [newUser, setnewUser] = useState<user>(user);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const mutation = useMutation({
    mutationFn: userUpdateService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userInfo"] });
    },
  });

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!access_email) {
      alert("El correo es obligatorio");
      return false;
    } else if (!emailRegex.test(access_email)) {
      alert("Por favor, ingresa un correo válido");
      return false;
    }
    return true;
  };

  const validatePhoneNumber = () => {
    const phoneRegex = /^[0-9]{10}$/;
    if (!phone) {
      alert("El número de teléfono es obligatorio");
      return false;
    } else if (!phoneRegex.test(phone)) {
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

  const showDialog = () => {
    if (access_email && name && password && password1 && phone && last_name) {
      if (
        validateEmail() &&
        validatePhoneNumber() &&
        password === password1 &&
        password.length >= 8
      ) {
        const updateuser: user = {
          user_id: user.user_id,
          name: name,
          last_name: last_name,
          access_email: access_email,
          password: password,
          phone_number: phone,
          role_id: user.role_id,
        };
        setnewUser(updateuser);
        setDialogue(true);
      } else if (password !== password1) {
        alert("Las contraseñas no coinciden");
      } else if (password.length < 8) {
        alert("La contraseña debe tener al menos 8 caracteres");
      } else if (!validateEmail()) {
        alert("Por favor, ingresa un correo válido");
      } else if (!validatePhoneNumber()) {
        alert("Por favor, ingresa un número de teléfono válido (10 dígitos)");
      }
    } else {
      alert("Por favor, llena todos los campos");
    }
  };

  const cancelDialog = () => {
    setDialogue(false);
    setNombre(user.name);
    setApellido(user.last_name);
    setEmail(user.access_email);
    setPassword(user.password);
    setPhone(user.phone_number);
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
                  <h2 className="text-3xl font-semibold">Editar Usuario</h2>
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
                    id={"email"}
                    type={"email"}
                    onChange={(e) => setEmail(e.target.value)}
                    value={access_email}
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
                    onClick={onClose}
                  >
                    Close
                  </button>
                  <button
                    className="bg-blue-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    id="save"
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
        <DialogueUpdateUser
          open={dialogue}
          onConfirm={() => {
            mutation.mutate(newUser);
            onClose();
          }}
          onClose={cancelDialog}
          user={newUser}
        />
      ) : null}
    </>
  );
}
