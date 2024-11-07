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
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
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
                {/*body*/}
                <div className="relative p-6 m-6 flex-auto">
                  <h2>Formulario de Usuario:</h2>
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
                    className="absolute right-9 top-[69%] transform -translate-y-1/2 cursor-pointer"
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
                  {/*
                  <Field
                    id={"password1"}
                    type={passwordVisible ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
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
                  */}

                  <Field
                    id={"phone"}
                    type={"tel"}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                {/*footer*/}
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
                      mutation.mutate(newUser);
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
