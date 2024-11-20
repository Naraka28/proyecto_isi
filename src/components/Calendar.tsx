import { useQuery } from "@tanstack/react-query";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";

import Modal from "react-modal";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { es } from "date-fns/locale/es";
import {  getAppointmentsForCalendar } from "../services/appointmentServices.ts";
import React, { useState } from "react";

const locales = { es };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { locale: es }),
  getDay,
  locales,
});

const getBackgroundColorByCatalogue = (catalogo) => {
  switch (catalogo) {
    case "Cortes":
      return "#d4f7fc"; // Color de fondo para "Cortes"
    case "Tintes":
      return "#fff1db"; // Color de fondo para "Tintes"
    case "Peinados":
      return "#fdd3e1"; // Color de fondo para "Peinados"
    default:
      return "#f5f5f5"; // Color de fondo por defecto
  }
};

  const getColorByCatalogue = (catalogo) => {
    switch (catalogo) {
      case "Cortes":
        return "#64a1c4";
      case "Tintes":
        return "#cca85c";
      case "Peinados":
        return "#c22c15";
      default:
        return "#ffffff";
    }
  };

const MyCalendar = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["getAppointmentsForCalendar"],
    queryFn: getAppointmentsForCalendar,
    refetchInterval: 2000, // Refetch cada 5 segundos (puedes ajustar el tiempo)
    refetchOnWindowFocus: true, // Refetch al volver a enfocar la ventana
  });

  if (isLoading) return <span>Loading...</span>;
  if (isError) return <span>Error: {error.message}</span>;
  if (!data) return <span>No hay datos disponibles</span>;

  const events = data.appointments.map((appointment) => {
    const [day, month, year] = appointment.date.split("/");
    const formattedDate = `${year}-${month}-${day}`;
    const dateTimeString = `${formattedDate}T${appointment.hour}`;
    const startDate = new Date(dateTimeString);
    const endDate = new Date(startDate);
    endDate.setMinutes(startDate.getMinutes() + 30);

    return {
      nombre: appointment.name,
      start: new Date(startDate),
      end: new Date(endDate),
      cliente: `${appointment.name} ${appointment.last_name}`,
      empleado: `${appointment.em_name} ${appointment.em_last_name}`,
      servicio: appointment.servicio,
      costo: `$${appointment.total_price}`,
      catalogo: `${appointment.catalogue}`,
    };
  });

  const eventStyleGetter = (event) => {
    const getBackgroundColorByCatalogue = (catalogo) => {
      switch (catalogo) {
        case "Cortes":
          return "#d4f7fc"; // Color de fondo para "Cortes"
        case "Tintes":
          return "#fff1db"; // Color de fondo para "Tintes"
        case "Peinados":
          return "#fdd3e1"; // Color de fondo para "Peinados"
        default:
          return "#f5f5f5"; // Color de fondo por defecto
      }
    };
  
    const backgroundColor = getBackgroundColorByCatalogue(event.catalogo);
  
    return {
      style: {
        color: "#444242",
        backgroundColor: backgroundColor,
        borderRadius: "0.5rem",
        padding: "2px 8px",
        border: "1px solid #e2e1e3",
        borderBottom: "1px solid #ffffff",
      },
    };
  };
  
  const EventWrapper = (props) => {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        {props.children}
      </div>
    );
  };
  
  const EventComponent = ({ event }) => {
    const getColorByCatalogue = (catalogo) => {
      switch (catalogo) {
        case "Cortes":
          return "#64a1c4";
        case "Tintes":
          return "#cca85c";
        case "Peinados":
          return "#c22c15";
        default:
          return "#ffffff";
      }
    };

    const textColor = getColorByCatalogue(event.catalogo);

    return (
      <div
        className="flex  items-center justify-between gap-5"
        style={{
          paddingLeft: "0.5rem",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontWeight: "800",
            fontSize: "1.3rem",
            color: textColor,
            textTransform: "uppercase",

          }}
        >
          {event.catalogo}
        </p>

        <strong
          style={{
            fontStyle: "bold",
            color: "#353232 ",
            fontSize: "1rem",
            fontWeight: "700",
            textTransform: "capitalize",
          }}
        >
          {event.servicio}
        </strong>

        <p style={{ fontSize: "0.9rem", fontWeight: "700" }}>Cliente: {event.cliente}</p>
        <p style={{ fontSize: "0.9rem", fontWeight: "700" }}>Empleado: {event.empleado}</p>
        <p style={{ fontSize: "0.9rem", fontWeight: "700" }}>Precio: {event.costo}</p>
      </div>
    );
  };

  const dayPropGetter = (date) => {
    const isToday = new Date().toDateString() === date.toDateString();
    return {
      style: {
        backgroundColor: isToday ? "transparent" : undefined, // Fondo transparente si es hoy
      },
    };
  };

  
  

 const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedEvent(null);
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      maxWidth: "600px",
      width: "90%",
      borderRadius: "10px",
      padding: "20px",
      backgroundColor: "#f8f8f8",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  };

  return (
    <div className="overflow-y-scroll h-[90vh] ">
      <div
        className=""
        style={{
          width: "full",
          height: "200vh",
          paddingLeft: "3.8rem",
          paddingRight: "3.8rem",
        }}
      >
        <Calendar
          localizer={localizer}
          culture="es"
          events={events}
          min={new Date(1970, 1, 1, 8, 0, 0)} // Empieza a las 8:00
          max={new Date(1970, 1, 1, 21, 0, 0)} // Termina a las 20:00
          startAccessor="start"
          endAccessor="end"
          
          selected={selectedEvent}
          onSelectEvent={handleSelectEvent}
          defaultView="day"
          views={["day", "week"]}
          eventPropGetter={eventStyleGetter}
          step={30} // Intervalos de 30 minutos
          timeslots={2}
          dayPropGetter={dayPropGetter}
          components={{
            event: EventComponent,
            eventWrapper: EventWrapper, // Envuelve cada evento para ocultar duración

          }}
        />
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Detalles de la Cita"
        
      >
        {selectedEvent && (
      <div  className="z-40  shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#151414] ">
        Detalles de la Cita
      </h2>
      <div style={{backgroundColor:getBackgroundColorByCatalogue(selectedEvent.catalogo)}}>
          <p style={{color:getColorByCatalogue(selectedEvent.catalogo)}} className={` text-center font-bold m-5 text-3xl`}>{selectedEvent.catalogo}</p>
        </div>
      <div className="grid grid-cols-3 gap-6 text-lg">
      <div>
          <strong className="text-gray-700">Servicio:</strong>
          <p className="text-[#353232]">{selectedEvent.servicio}</p>
        </div>
        <div>
          <strong className="text-gray-700">Precio:</strong>
          <p className="text-[#353232]">{selectedEvent.costo}</p>
        </div>
        <div>
          <strong className="text-gray-700">Cliente:</strong>
          <p className="text-[#353232]">{selectedEvent.cliente}</p>
        </div>
        <div>
          <strong className="text-[#353232]">Empleado:</strong>
          <p className="text-[#353232]">{selectedEvent.empleado}</p>
        </div>
        <div>
          <strong className="text-gray-700">Hora:</strong>
          <p className="text-[#353232]">{selectedEvent.start.toLocaleTimeString()}</p>
        </div>
        
        <div>
          <strong className="text-gray-700">Fecha:</strong>
          <p className="text-gray-800">{selectedEvent.start.toLocaleDateString()}</p>
        </div>
        
      </div>
      <button
        onClick={closeModal}
        className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded mt-6 transition duration-200 w-full"
      >
        Cerrar
      </button>
    </div>
    
    
        )}
      </Modal>
    </div>
  );
};

export default MyCalendar;

