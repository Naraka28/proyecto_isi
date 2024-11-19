import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

type SearchProps = {
  className?: string;
  onSearch: (query: string) => void; // Función para manejar la búsqueda
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function Search({ onSearch, className = "", onChange }: SearchProps) {
  const [query, setQuery] = useState("");

  const handleIconClick = () => {
    const search = document.getElementById("search") as HTMLInputElement;
    search.focus();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim() !== "") {
      onSearch(query); // Ejecutar la búsqueda al presionar enter si el query no está vacío
    }
  };

  return (
    <div className={`relative ${className}`}>
      <input
        id="search"
        type="text"
        onChange={onChange}
        onKeyDown={handleKeyDown}
        className={`text-xl border border-gray-300 rounded-full transition-all duration-500 ease-in-out w-96 pl-12 h-14 px-6 outline-none`}
        placeholder="Buscar..."
      />
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className={`absolute left-[17px] top-1/2 transform -translate-y-1/2 h-5 text-[#0F172A] cursor-pointer`}
        onClick={handleIconClick}
      />
    </div>
  );
}
