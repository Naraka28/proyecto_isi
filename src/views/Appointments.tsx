import { faPlus, faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from "../components/DashButton";
import { BasicTable } from "../components/Table";
import { Search } from "../components/Search";
import { ModalUsers } from "../components/ModalUsers";
import { AppointmentsTable } from "../components/TableAppointments";
import { ModalAppointments } from "../components/ModalAppointments";
import { useState } from "react";
import { RefreshButton } from "../components/refreshButton";

export function Appointments() {
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
        <div className="pb-20 text-center">
          <span className="text-4xl font-semibold text-black ">Citas</span>

          <div className="flex flex-col md:flex-row  items-center space-y-4 md:space-y-0 mb-6 w-full">
            <Search
              onSearch={handleSearch}
              onChange={(e) => setSearch(e.target.value)}
              className="hidden sm:flex mr-5"
            />
            <RefreshButton queryK={["appointmentsInfo"]} />

            <div className=" w-full flex justify-end">
              <ModalAppointments />
            </div>
          </div>
          <AppointmentsTable searchInput={search} />
        </div>
      </div>
    </>
  );
}
