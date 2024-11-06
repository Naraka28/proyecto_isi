import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"; // Importa el ícono

interface ComboBoxProps {
    id: string;
    name: string;
    text: string;
    placeholder?: string;
    options: { value: string; label: string }[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function ComboBox({
    id,
    name,
    text,
    placeholder,
    options,
    onChange,
}: ComboBoxProps) {
    return (
        <div className="relative z-0 w-full mb-5 mt-2 group">
            <select
                name={name}
                id={id}
                className="block py-2 px-0 w-full text-md text-gray-600 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                onChange={onChange}
                required
            >
                {placeholder && (
                    <option value="" disabled hidden>
                        {placeholder}
                    </option>
                )}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <label
                htmlFor={name}
                className="absolute text-lg text-gray-800 duration-300 transform -translate-y-6 top-1 -z-10"
            >
                {text}
            </label>
            {/* Icono de flecha */}
            <FontAwesomeIcon
                icon={faChevronDown}
                className="absolute right-[2px] top-1/2 transform -translate-y-1/2 text-gray-600 pointer-events-none"
            />
        </div>
    );
}
