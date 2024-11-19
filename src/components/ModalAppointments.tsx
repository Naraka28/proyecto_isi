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
  useQuery,
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
import { FieldDate } from "./FieldDate";
import { getAllEmployees } from "../services/employeeServices";
import { ComboBoxServices } from "./ComboBoxServices";
import { ComboBoxEmployees } from "./ComboBoxEmployees";
import { getAllServices, Service } from "../services/serviciosServices";
import { set } from "date-fns";

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

  const [date, setDate] = useState("");
  const [user_id, setUserId] = useState("");
  const [searchItem, setSearchItem] = React.useState("");
  const [hour, setHour] = useState("");
  const [searchService, setSearchService] = useState("");
  const [employee_id, setEmployeeId] = useState("");
  const [service_id, setServiceId] = useState("");
  const [total_price, setTotalPrice] = useState("");
  const [error, setError] = useState("");
  const [selectedService, setSelectedService] = useState<Service | undefined>();
  const [inhabilitado, setInhabilitado] = useState(true);

  const debouncedSearchTerm = useDebounce(searchItem, 500);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchItem(e.target.value.trim());
  };

  const employeesResult = useQuery({
    queryKey: ["employees"],
    queryFn: getAllEmployees,
  });
  const servicesResult = useQuery({
    queryKey: ["services"],
    queryFn: getAllServices,
  });

  const mutation = useMutation({
    mutationFn: appointmentAddService,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["appointmentInfo"] });
      setShowModal(false);
      setDate("");
      setUserId("");
      setHour("");
      setEmployeeId("");
      setServiceId("");
      setTotalPrice("");
      setSearchItem("");
      setSearchService("");
      setSelectedService(undefined);
    },
  });

  const handleSave = () => {
    if (date && user_id && hour && employee_id && service_id) {
      mutation.mutate(newAppointment);
    } else {
      alert("Por favor llene todos los campos");
    }
  };

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

  const today = new Date().toISOString().split("T")[0];
  const handleAddClick = () => {
    setShowModal(true);
  };
  // Establecer el valor mínimo del input de fecha

  const newAppointment: AppointmentCreate = {
    date: date,
    user_id: parseInt(user_id),
    hour: hour,
    employee_id: parseInt(employee_id),
    service_id: parseInt(service_id),
  };

  if (searchMutation.isSuccess) {
    console.log(searchMutation.data);
  }

  if (searchMutation.isError) {
    setError(searchMutation.error.message);
  }
  if (!employeesResult.isSuccess) {
    return <span>Loading...</span>;
  }
  if (!servicesResult.isSuccess) {
    return <span>Loading...</span>;
  }
  const hours = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
  ];

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
                  <ComboBoxEmployees
                    id={"Employees"}
                    options={employeesResult.data.employees}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    className={employeesResult.isSuccess ? "" : "disabled"}
                  />
                  {/* <Field id={'user_id'} type={'text'} onChange={(e) => setUserId(e.target.value)} /> */}

                  <ComboBoxServices
                    id={"services"}
                    options={servicesResult.data.services}
                    onChange={(e) => {
                      setServiceId(e.target.value);
                      setSelectedService(
                        servicesResult.data.services.filter(
                          (service) =>
                            service.service_id === parseInt(e.target.value)
                        )[0]
                      );
                    }}
                    className={servicesResult.isSuccess ? "" : "disabled"}
                  />

                  <FieldDate
                    id={"Date"}
                    type={"date"}
                    onChange={(e) => setDate(e.target.value)}
                    min={today}
                  />

                  <ComboBox
                    id={"Choose a Time"}
                    options={hours}
                    onChange={(e) => setHour(e.target.value)}
                  />

                  <Field
                    id={"Total Price"}
                    type={"number"}
                    onChange={(e) => setTotalPrice(e.target.value)}
                    value={
                      selectedService ? selectedService.price.toString() : ""
                    }
                    inhabilitado={inhabilitado}
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
