import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { es } from "date-fns/locale/es";
import { getAllAppointments } from "../services/appointmentServices.ts";

const locales = { es };

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

  const events = data.appointments.map((appointment) => {
    const [day, month, year] = appointment.date.split("/");
    const formattedDate = `${year}-${month}-${day}`;
    const dateTimeString = `${formattedDate}T${appointment.hour}`;

    return {
      nombre: appointment.name,
      title: `${appointment.servicio} - ${appointment.name} ${appointment.last_name}`,
      start: new Date(dateTimeString),
      end: new Date(dateTimeString),
      servicio: appointment.servicio,
    };
  });

  const eventStyleGetter = (event) => {
    let backgroundColor = "#353535";

    if (event.catalogo === "Cortes") {
      backgroundColor = "#4CAF50";
    } else if (event.catalogo === "Tintes") {
      backgroundColor = "#FF9800";
    } else if (event.catalogo === "Peinados") {
      backgroundColor = "#252525";
    }

    return {
      style: {
        backgroundColor,
        color: "white",
        borderRadius: "1px",
        innerWidth: "",
        height: "5rem",
        padding: "2px 5px",
        border: "1px solid",
      },
    };
  };

  const EventComponent = ({ event }) => (
    <span>
      <strong>{event.title}</strong>
    </span>
  );

  return (
    <div style={{ height: "80vh" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        views={["day", "week", "agenda"]}
        eventPropGetter={eventStyleGetter}
        components={{
          event: EventComponent, // Usando el componente personalizado
        }}

      />
      
    </div>
  );
};

export default MyCalendar;
