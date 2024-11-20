import { BasicTable } from "../components/TableInventory";
import { Search } from "../components/Search";
import { ModalMaterial } from "../components/ModalMaterial"; // Cambié a ModalMaterial
import { RefreshButton } from "../components/refreshButton";
import { useState } from "react";

export function Inventory() {
  const [search, setSearch] = useState("");
  function handleSearch(query: string): void {
    // Lógica para buscar en el inventario por nombre, cantidad o precio.
    // Puedes pasar el `query` a un API o hacer una búsqueda local.
    console.log("Buscando por:", query);
  }

  return (
    <div className="p-10 m-auto h-min">
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-semibold text-black">Inventario</h2>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 mb-6">
        <Search
          onSearch={handleSearch}
          onChange={(e) => setSearch(e.target.value)}
          className="hidden sm:flex flex-1"
        />
        <RefreshButton queryK={["inventory"]} />

        <div className="flex space-x-3">
          <ModalMaterial />{" "}
          {/* Aquí se asume que el modal está diseñado para crear o editar materiales */}
        </div>
      </div>
      <BasicTable />{" "}
      {/* Aquí debería mostrarse la tabla con los materiales del inventario */}
    </div>
  );
}
