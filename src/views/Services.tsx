import { faPlus, faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from "../components/DashButton";
import { Search } from "../components/Search";
import { ModalServices } from "../components/ModalService";
import { ServiceTable } from "../components/TableServices";

export function Services() {
  const handleAddClick = () => {
    throw new Error("Function not implemented.");
  };

  function handleSearch(query: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <>
     <div className="p-10 m-auto h-min  ">
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-semibold text-white">Dashboard - Servicios</h2>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 mb-6">
        <Search onSearch={handleSearch} className="hidden sm:flex flex-1" />
        
        <div className="flex space-x-3">
          <ModalServices />
          
        </div>
      </div>
        <ServiceTable />
        
     
    </div>
    </>
  );
}
