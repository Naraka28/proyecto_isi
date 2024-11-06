import React from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "../components/DashButton";
import { Field } from "../components/Field";
import { useState } from "react";
import { user, userUpdateService } from "../services/userAddservice";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DialogueUpdateUser } from "./DialogueUpdateUser";
interface ModalUpdateProps {
  open: boolean;
  onClose: () => void;
  user: user;
}

export function ModalUpdateUser({ open, onClose, user }: ModalUpdateProps) {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = React.useState(false);

  const handleAddClick = () => {
    setShowModal(true);
  };

  const [access_email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [last_name, setApellido] = useState("");
  const [name, setNombre] = useState("");
  const [phone, setPhone] = useState("");
  const [dialogue, setDialogue] = useState(false);
  const [newUser, setnewUser] = useState<user>(user);

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

    onClose();
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
                    type={"password"}
                    onChange={(e) => setPassword(e.target.value)}
                  />
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
