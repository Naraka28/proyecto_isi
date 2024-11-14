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
    const startDate = new Date(dateTimeString);
    const endDate = new Date(startDate);
    endDate.setMinutes(startDate.getMinutes() + 30); 

    return {
      nombre: appointment.name,
      
      start: new Date(startDate),
      end: new Date(endDate),
      cliente:`Cliente: ${appointment.name} ${appointment.last_name}`,
      empleado:`Empleado: ${appointment.em_name} ${appointment.em_last_name}`,
      servicio: appointment.servicio,
      costo: `Precio: ${appointment.total_price}`,
    };
  });

  const eventStyleGetter = (event) => {
    let backgroundColor = "#353232";

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
    <span className="flex gap-5">
      <strong className="px-5 text-[#ff65b2]">{event.servicio}</strong>
      <p>{event.cliente}</p>
      <p>{event.empleado}</p>
      <p>{event.costo}</p>
    </span>
  );
  const WeekEventComponent = ({ event }) => (
    <span className="flex gap-5">
      <strong>{event.servicio}</strong>
      
    </span>
  );


  return (
    <div style={{ height: "350vh" }}>
      <Calendar
        localizer={localizer}
        culture="es"
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="day"
        views={["day", "week", "agenda"]}
        eventPropGetter={eventStyleGetter}
        components={{
          event: EventComponent,
          week: {
            event: WeekEventComponent,
          },
        }}
      />
    </div>
  );
};

export default MyCalendar;
