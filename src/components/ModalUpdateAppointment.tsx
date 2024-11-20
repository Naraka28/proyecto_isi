import { Field } from "../components/Field";
import { useState } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import {
  Appointment,
  updateAppointment,
} from "../services/appointmentServices";
import { FieldDate } from "./FieldDate";
import { getAllEmployees } from "../services/employeeServices";
import { ComboBoxServices } from "./ComboBoxServices";
import { ComboBoxEmployees } from "./ComboBoxEmployees";
import { getAllServices, Service } from "../services/serviciosServices";
import { DialogueUpdateAppointment } from "./DialogueUpdateAppointment";
import { FilteredHoursDropdown } from "./ComboboxHours";
import { set } from "date-fns";

interface ModalUpdateProps {
  open: boolean;
  onClose: () => void;
  appointment: Appointment;
}

export function ModalUpdateAppointment({
  open,
  onClose,
  appointment,
}: ModalUpdateProps) {
  const [day, month, year] = appointment.date.split("/");
  const formattedDate = `${year}-${month}-${day}`;
  const [dialogue, setDialogue] = useState(false);
  const queryClient = useQueryClient();
  const [date, setDate] = useState(formattedDate);
  const [user_id, setUserId] = useState(appointment.user_id.toString());
  const [hour, setHour] = useState(appointment.hour);
  const [employee_id, setEmployeeId] = useState(
    appointment.employee_id.toString()
  );
  const [inhabilitado, setInhabilitado] = useState(true);
  const [service_id, setServiceId] = useState(
    appointment.service_id.toString()
  );
  const [total_price, setTotalPrice] = useState(
    appointment.total_price.toString()
  );
  const [error, setError] = useState("");
  const [newAppointment, setNewAppointment] =
    useState<Appointment>(appointment);
  const [selectedService, setSelectedService] = useState<Service>();
  const [errorDialogue, setErrorDialogue] = useState(false);

  const employeesResult = useQuery({
    queryKey: ["employeesInfo"],
    queryFn: getAllEmployees,
  });
  const servicesResult = useQuery({
    queryKey: ["servicesInfo"],
    queryFn: getAllServices,
  });

  const updateMutation = useMutation({
    mutationFn: updateAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointmentsInfo"] });
      setDialogue(false);
      onClose();
    },
    onError: (error) => {
      setError(error.message);
      setErrorDialogue(true);
    },
  });
  const showDialog = () => {
    const updateAppointment: Appointment = {
      appointment_id: appointment.appointment_id,
      name: appointment.name,
      last_name: appointment.last_name,
      em_name: appointment.em_name,
      em_last_name: appointment.em_last_name,
      servicio: appointment.servicio,
      total_price: parseInt(total_price),
      date: date,
      user_id: parseInt(user_id),
      hour: hour,
      employee_id: parseInt(employee_id),
      service_id: parseInt(service_id),
    };
    setNewAppointment(updateAppointment);
    setDialogue(true);
  };
  const cancelDialog = () => {
    setDialogue(false);
    setHour(appointment.hour);
    setTotalPrice(appointment.total_price.toString());
  };

  const today = new Date().toISOString().split("T")[0];

  if (!employeesResult.isSuccess) {
    return <span>Loading...</span>;
  }
  if (!servicesResult.isSuccess) {
    return <span>Loading...</span>;
  }
  function closeError() {
    setErrorDialogue(false);
  }
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
                  <h2 className="text-3xl font-semibold">Editar Cita</h2>
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
                <div className="relative p-3 m-3 grid grid-cols-2 gap-4">
                  <ComboBoxEmployees
                    id={"Employees"}
                    options={employeesResult.data.employees}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    className={employeesResult.isSuccess ? "" : "disabled"}
                    value={employee_id}
                  />
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
                    value={service_id.toString()}
                  />
                  <FieldDate
                    id={"Date"}
                    type={"date"}
                    onChange={(e) => setDate(e.target.value)}
                    min={today}
                    value={date}
                  />
                  <FilteredHoursDropdown
                    id={"Choose a Time"}
                    date={date}
                    onChange={(e) => setHour(e.target.value)}
                    value={hour}
                  />
                  <Field
                    id={"Total Price"}
                    type={"number"}
                    onChange={() => {
                      selectedService
                        ? setTotalPrice(selectedService.price.toString())
                        : setTotalPrice("");
                    }}
                    value={
                      selectedService ? selectedService.price.toString() : ""
                    }
                    inhabilitado={inhabilitado}
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
                    className="bg-blue-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py- rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
        <DialogueUpdateAppointment
          open={dialogue}
          onConfirm={() => {
            updateMutation.mutate(newAppointment);
          }}
          onClose={cancelDialog}
          appointment={newAppointment}
          message={error}
          error={errorDialogue}
          onCloseError={closeError}
        />
      ) : null}
    </>
  );
}
