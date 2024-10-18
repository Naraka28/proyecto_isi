import React from "react";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { IconButton } from '../components/DashButton';
import { Field } from "../components/Field";
import { ComboBox } from "../components/Combobox";
import { useState } from "react";

import {
  useMutation,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { employeeAddService, Employee } from "../services/employeeServices";


const queryClient = new QueryClient()

export function ModalEmployees() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <ModalEmployeesForm />
    </QueryClientProvider>
  )
}

export function ModalEmployeesForm() {
  
  const [showModal, setShowModal] = React.useState(false);
  
    const handleAddClick = () => {
        setShowModal(true);
    };

    const [access_email, setAccessEmail] = useState('');
    const [password, setPassword] = useState('');
    const [last_name, setApellido] = useState('');
    const [personal_email, setPersonalEmail] = useState('');
    const [name, setNombre] = useState('');
    const [phone, setPhone] = useState('');
    const [role_id, setRole]=useState('');
    const [error, setError] = useState('');


    const mutation = useMutation({
      mutationFn: employeeAddService,
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ['employeeInfo'] })
      },
    })
    const newEmployee:Employee = {
      name: name,
      last_name: last_name,
      access_email: access_email,
      personal_email: personal_email,
      password: password,
      phone_number: phone,
      role_id:parseInt(role_id)
    };


  return (
    <>

       <IconButton id={'añadirBtn'} text={'Añadir'} icon={faPlus} onClick={handleAddClick} />

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h2 className="text-3xl font-semibold">
                    Añadir Empleado
                  </h2>
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
                  <h2>
                    Formulario de Empleado:
                  </h2>
                  <Field id={'nombre'} type={'text'} onChange={(e) => setNombre(e.target.value)} />
                  <Field id={'apellido'} type={'text'} onChange={(e) => setApellido(e.target.value)} />
                  <Field id={'access email '} type={'email'} onChange={(e) => setAccessEmail(e.target.value)} />
                  <Field id={'personal email'} type={'email'} onChange={(e) => setPersonalEmail(e.target.value)} />
                  <Field id={'password'} type={'password'} onChange={(e) => setPassword(e.target.value)} />
                  <Field id={'phone'} type={'tel'} onChange={(e) => setPhone(e.target.value)} />
                  <ComboBox id="role_id" options={["1 Admin","2 Empleado"]} onChange={(e) => setRole(e.target.value)}/>
                  
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
                    onClick={() => { mutation.mutate(newEmployee);}}>
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