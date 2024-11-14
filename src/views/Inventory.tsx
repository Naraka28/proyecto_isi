import { BasicTable } from "../components/TableInventory";
import { Search } from "../components/Search";
import { ModalMaterial } from "../components/ModalMaterial"; // Cambié a ModalMaterial

export function Inventory() {
  const handleAddClick = () => {
    // Aquí se debería abrir el modal para crear un nuevo material
    // Deberás implementar la lógica de abrir el modal aquí
  };

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
        <Search onSearch={handleSearch} className="hidden sm:flex flex-1" />

        <div className="flex space-x-3">
          <button 
            onClick={handleAddClick} 
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Agregar Material
          </button>

          <ModalMaterial />  {/* Aquí se asume que el modal está diseñado para crear o editar materiales */}
        </div>
      </div>
      
      <BasicTable /> {/* Aquí debería mostrarse la tabla con los materiales del inventario */}
    </div>
  );
}
