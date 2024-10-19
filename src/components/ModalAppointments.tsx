import React from "react";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { IconButton } from '../components/DashButton';
import { Field } from "../components/Field";
import { useState } from "react";
import {
  useMutation,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { appointmentAddService, Appointment } from "../services/appointmentServices";


const queryClient = new QueryClient()

export function ModalAppointments() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <ModalAppointmentsForm />
    </QueryClientProvider>
  )
}

export function ModalAppointmentsForm() {
  
  const [showModal, setShowModal] = React.useState(false);
  
    const handleAddClick = () => {
        setShowModal(true);
    };
    
    const [date, setDate] = useState('');         
    const [user_id, setUserId] = useState('');       
    const [material_id, setMaterialId] = useState(''); 
    const [ticket_id, setTicketId] = useState('');   
    const [employee_id, setEmployeeId] = useState(''); 
    const [service_id, setServiceId] = useState('');  
    const [total_price, setTotalPrice] = useState('');
    const [error, setError] = useState('');           
    


    const mutation = useMutation({
      mutationFn: appointmentAddService,
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ['appointmentInfo'] })
      },
    })
    const newAppointment:Appointment = {
      date: date,
      user_id: parseInt(user_id),
      material_id: parseInt(material_id),
      ticket_id: parseInt(ticket_id),
      employee_id: parseInt(employee_id),
      service_id: parseInt(service_id),
      total_price: parseFloat(total_price)
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
                    Añadir Cita
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
                    Formulario de Cita:
                    </h2>
                    <Field id={'date'} type={'date'} onChange={(e) => setDate(e.target.value)} />
                    <Field id={'user_id'} type={'text'} onChange={(e) => setUserId(e.target.value)} />
                    <Field id={'material_id'} type={'text'} onChange={(e) => setMaterialId(e.target.value)} />
                    <Field id={'ticket_id'} type={'text'} onChange={(e) => setTicketId(e.target.value)} />
                    <Field id={'employee_id'} type={'text'} onChange={(e) => setEmployeeId(e.target.value)} />
                    <Field id={'service_id'} type={'text'} onChange={(e) => setServiceId(e.target.value)} />
                    <Field id={'total_price'} type={'number'} onChange={(e) => setTotalPrice(e.target.value)} />
                    {error && <p className="text-red-500">{error}</p>}
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
                    onClick={() => { mutation.mutate(newAppointment);}}>
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