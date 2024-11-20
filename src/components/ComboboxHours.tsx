import { constructFromSymbol } from "date-fns/constants";
import React, { useState, useEffect } from "react";

interface ComboBoxPropsHours {
  id: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string;
  date: string;
}

export function FilteredHoursDropdown({
  id,
  onChange,
  value,
  date,
}: ComboBoxPropsHours) {
  const [filteredHours, setFilteredHours] = useState<string[]>([]);
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

  useEffect(() => {
    if (!date) return;

    // Fecha actual sin tiempo de zona
    const now = new Date();
    const selectedDay = new Date(date).toISOString().split("T")[0];
    const today = new Date().toISOString().split("T")[0]; // Hoy sin horas

    // Hora actual en minutos desde las 00:00
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentTotalMinutes = currentHour * 60 + currentMinutes;

    const updatedHours = hours.filter((hour) => {
      const [hourStr, minuteStr] = hour.split(":");
      const totalMinutes = parseInt(hourStr) * 60 + parseInt(minuteStr);

      // Si es hoy, filtrar horas pasadas
      if (selectedDay === today) {
        return totalMinutes >= currentTotalMinutes;
      }

      // Si no es hoy, mostrar todas las horas
      return hours;
    });

    setFilteredHours(updatedHours);
  }, [date]); // Ejecutar cuando cambia la fecha seleccionada

  return (
    <div className="relative w-full mx-auto my-1">
      <select
        defaultValue=""
        id={id}
        name={id}
        className="peer w-full h-full bg-white text-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-400 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 pt-5 pb-3 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
        onChange={onChange}
        value={value}
        required
      >
        <option value="" disabled hidden>
          Selecciona una opción
        </option>
        {filteredHours.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <label
        htmlFor={id}
        className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-base text-lg peer-focus:text-lg before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900"
      >
        {id.charAt(0).toUpperCase() + id.slice(1)}
      </label>
    </div>
  );
}
