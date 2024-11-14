import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { es } from "date-fns/locale/es";
import { getAllAppointments } from "../services/appointmentServices.ts";

// Configuración de localización en español
const locales = {
  es,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { locale: es }),
  getDay,
  locales,
});

const MyCalendar = () => {
    const { isLoading, isError, data, error } = useQuery({
      queryKey: ["appointmentsInfo"],
      queryFn: getAllAppointments,
    });
  
    if (isLoading) return <span>Loading...</span>;
    if (isError) return <span>Error: {error.message}</span>;
    if (!data) return <span>No hay datos disponibles</span>;
  
    const events = data.appointments.map((appointment) => ({
      title: `${appointment.servicio} - ${appointment.name} ${appointment.last_name}`,
      start: new Date(appointment.date),
      end: new Date(appointment.date),
      // Añade cualquier información extra que necesites para el estilo
      servicio: appointment.servicio,
    }));
  
    // Propiedad para estilizar los eventos
    const eventStyleGetter = (event) => {
      let backgroundColor = "#353535"; // Color base
  
      // Cambia el color según el tipo de servicio
      if (event.servicio === "Cortes") {
        backgroundColor = "#4CAF50"; // Verde
      } else if (event.servicio === "Tintes") {
        backgroundColor = "#FF9800"; // Naranja
      } else if (event.servicio === "Peinados") {
        backgroundColor = "#252525"; 
      }
  
      return {
        style: {
          backgroundColor,
          color: "white",
          borderRadius: "5px",
          padding: "2px 5px",
            border: "1px solid ",
        },
      };
    };
  
    return (
      <div style={{ height: "80vh" }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, margin: "50px" }}
          defaultView="week" // Cambia la vista por defecto a semanal
          views={["day", "week","agenda"]}
          eventPropGetter={eventStyleGetter} // Aplica el estilo personalizado
          selectable
          onSelectEvent={(event) => alert(`Evento: ${event.title}`)}
          onSelectSlot={(slotInfo) =>
            alert(`Seleccionaste desde ${slotInfo.start} hasta ${slotInfo.end}`)
          }
        />
      </div>
    );
  };
  

export default MyCalendar;
