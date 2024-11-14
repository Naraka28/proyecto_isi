import React, { ChangeEvent, useEffect } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "../components/DashButton";
import { Field } from "../components/Field";
import { useState } from "react";
import {
  useMutation,
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from "@tanstack/react-query";
import {
  appointmentAddService,
  AppointmentCreate,
  searchUser,
} from "../services/appointmentServices";
import { ComboBox } from "./Combobox";
import { ComboBoxPhone } from "./ComboboxPhone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";

interface Props {
  className?: string;
}

export function ModalAppointments({ className = "" }: Props) {
  return (
    // Provide the client to your App
    <ModalAppointmentsForm className={className} />
  );
}

export function ModalAppointmentsForm({ className = "" }: Props) {
  const [showModal, setShowModal] = React.useState(false);
  const queryClient = useQueryClient();

  const handleAddClick = () => {
    setShowModal(true);
  };

  const [date, setDate] = useState("");
  const [user_id, setUserId] = useState("");
  const [searchItem, setSearchItem] = React.useState("");
  const [material_id, setMaterialId] = useState("");
  const [ticket_id, setTicketId] = useState("");
  const [employee_id, setEmployeeId] = useState("");
  const [service_id, setServiceId] = useState("");
  const [total_price, setTotalPrice] = useState("");
  const [error, setError] = useState("");

  const debouncedSearchTerm = useDebounce(searchItem, 500);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchItem(e.target.value.trim());
  };

  const mutation = useMutation({
    mutationFn: appointmentAddService,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["appointmentInfo"] });
    },
  });
  const searchMutation = useMutation({
    mutationFn: searchUser,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["appointmentInfo"] });
    },
  });
  useEffect(() => {
    if (debouncedSearchTerm) {
      searchMutation.mutate(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  const newAppointment: AppointmentCreate = {
    date: date,
    user_id: parseInt(user_id),
    material_id: parseInt(material_id),
    ticket_id: parseInt(ticket_id),
    employee_id: parseInt(employee_id),
    service_id: parseInt(service_id),
    total_price: parseFloat(total_price),
  };

  if (searchMutation.isSuccess) {
    console.log(searchMutation.data);
  }

  if (searchMutation.isError) {
    setError(searchMutation.error.message);
  }

  /*

                */

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
        className={`hover:bg-[#75003a] transition-colors ease-in-out duration-[400ms] ${className}`}
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
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h2 className="text-3xl font-semibold">Añadir Cita</h2>
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
                <div className="relative p-3 m-3 grid grid-cols-2 gap-4">
                  <Field
                    id={"Search User"}
                    type={"text"}
                    onChange={handleChange}
                  />
                  <ComboBoxPhone
                    id={"Users"}
                    options={
                      searchMutation.isSuccess ? searchMutation.data.users : []
                    }
                    onChange={(e) => setUserId(e.target.value)}
                    className={searchMutation.isSuccess ? "" : "disabled"}
                  />
                  <Field
                    id={"Search Employee"}
                    type={"text"}
                    onChange={handleChange}
                  />
                  {/* <Field id={'user_id'} type={'text'} onChange={(e) => setUserId(e.target.value)} /> */}

                  <ComboBoxPhone
                    id={"Employees"}
                    options={
                      searchMutation.isSuccess ? searchMutation.data.users : []
                    }
                    onChange={(e) => setEmployeeId(e.target.value)}
                    className={searchMutation.isSuccess ? "" : "disabled"}
                  />

                  <Field
                    id={"Date"}
                    type={"date"}
                    onChange={(e) => setDate(e.target.value)}
                  />
                  <Field
                    id={"Choose a Time"}
                    type={"text"}
                    onChange={handleChange}
                  />

                  <Field
                    id={"Service"}
                    type={"text"}
                    onChange={(e) => setServiceId(e.target.value)}
                  />
                  <Field
                    id={"Total Price"}
                    type={"number"}
                    onChange={(e) => setTotalPrice(e.target.value)}
                  />
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
                    className="bg-blue-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py- rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      mutation.mutate(newAppointment);
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
