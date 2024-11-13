import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { es } from "date-fns/locale/es"; // Importa el idioma español

// Configuración de `date-fns` para `react-big-calendar` con español
const locales = {
  es, // Asigna `es` al idioma español
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { locale: es }), // Iniciar semana en lunes
  getDay,
  locales,
});

const MyCalendar = () => {
  const [myEvents, setMyEvents] = useState([]);

  // useEffect para cargar eventos desde el backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("https://tu-api-url.com/api/events");
        if (response.ok) {
          const data = await response.json();
          
          // Asumiendo que data es un array de objetos con las propiedades title, start y end
          const events = data.map((event) => ({
            title: event.title,
            start: new Date(event.start), // Asegúrate de que la fecha esté en formato Date
            end: new Date(event.end),
          }));
          
          setMyEvents(events);
        } else {
          console.error("Error al obtener eventos");
        }
      } catch (error) {
        console.error("Error en la solicitud de eventos:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div style={{ height: "80vh" }}>
      <Calendar
        localizer={localizer}
        events={myEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
        defaultView="month"
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
