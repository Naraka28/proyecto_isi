//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BasicTable } from "../components/TableUsers";
import { Search } from "../components/Search";
import { ModalUsers } from "../components/ModalUsers";

export function Users() {
  const handleAddClick = () => {
    throw new Error("Function not implemented.");
  };

  function handleSearch(query: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="p-10 m-auto h-min  ">
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-semibold text-black">Usuarios</h2>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 mb-6">
        <Search onSearch={handleSearch} className="hidden sm:flex flex-1" />
        
        <div className="flex space-x-3">
          <ModalUsers />
          
        </div>
      </div>
        <BasicTable />
        
     
    </div>
);

}
