//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { EmployeeTable } from "../components/TableEmployees";
import { Search } from "../components/Search";
import { ModalEmployees } from "../components/ModalEmployees";
import { useState } from "react";
import { RefreshButton } from "../components/refreshButton";

export function Employees() {
  const [search, setSearch] = useState("");
  function handleSearch(query: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <div className="p-10 m-auto h-min  ">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-semibold text-black">Empleados</h2>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 mb-6">
          <Search
            onSearch={handleSearch}
            onChange={(e) => setSearch(e.target.value)}
            className="hidden sm:flex flex-1"
          />
          <RefreshButton queryK={["employeeInfo"]} />

          <div className="flex space-x-3">
            <ModalEmployees />
          </div>
        </div>
        <EmployeeTable searchInput={search} />
      </div>
    </>
  );
}
