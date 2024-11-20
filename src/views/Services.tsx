import { faPlus, faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from "../components/DashButton";
import { Search } from "../components/Search";
import { ModalServices } from "../components/ModalService";
import { ServiceTable } from "../components/TableServices";
import { useState } from "react";
import { RefreshButton } from "../components/refreshButton";

export function Services() {
  const [search, setSearch] = useState("");
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
          <h2 className="text-4xl font-semibold text-black">Servicios</h2>
        </div>

        <div className="flex flex-col md:flex-row  items-center space-y-4 md:space-y-0 mb-6 w-full">
          <Search
            onSearch={handleSearch}
            onChange={(e) => setSearch(e.target.value)}
            className="hidden sm:flex mr-5"
          />
          <RefreshButton queryK={["employeeInfo"]} />

          <div className=" w-full flex justify-end">
            <ModalServices />
          </div>
        </div>
        <ServiceTable searchInput={search} />
      </div>
    </>
  );
}
