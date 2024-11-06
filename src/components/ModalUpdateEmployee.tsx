import { Field } from "../components/Field";
import { ComboBox } from "../components/Combobox";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Employee, updateEmployee } from "../services/employeeServices";
import { DialogueUpdateEmployee } from "./DialogueUpdateEmployee";

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
  const [last_name, setApellido] = useState(employee.last_name);
  const [personal_email, setPersonalEmail] = useState(employee.personal_email);
  const [name, setNombre] = useState(employee.name);
  const [phone, setPhone] = useState(employee.phone_number);
  const [newEmployee, setNewEmployee] = useState<Employee>(employee);

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

  return (
    <>
      {open ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
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
                {/*body*/}
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
                    type={"password"}
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                  <Field
                    id={"phone"}
                    type={"tel"}
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                  />
                </div>
                {/*footer*/}
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
