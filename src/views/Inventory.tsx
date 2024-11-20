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
  function handleClearSearch() {
    setSearch("");
  }

  return (
    <div className="p-10 m-auto h-min">
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-semibold text-black">Materiales</h2>
      </div>
      <div className="flex flex-col md:flex-row  items-center space-y-4 md:space-y-0 mb-6 w-full">
        <Search
          onSearch={handleSearch}
          onChange={(e) => setSearch(e.target.value)}
          className="hidden sm:flex mr-5"
          value={search}
        />
        <RefreshButton
          queryK={["inventory"]}
          onClearSearch={handleClearSearch}
        />

        <div className=" w-full flex justify-end">
          <ModalMaterial />
        </div>
      </div>
      <BasicTable searchInput={search} />
      {/* Aquí debería mostrarse la tabla con los materiales del inventario */}
    </div>
  );
}
