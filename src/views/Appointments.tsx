import { faPlus, faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from "../components/DashButton";
import { BasicTable } from "../components/Table";
import { Search } from "../components/Search";
import { ModalUsers } from "../components/ModalUsers";
import { AppointmentsTable } from "../components/TableAppointments";
import { ModalAppointments } from "../components/ModalAppointments";

export function Appointments() {
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
          <span className="text-4xl font-semibold text-black ">
            Citas
            </span>

          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 mb-6">
            <Search onSearch={handleSearch} className="hidden sm:flex flex-1" />

            <div className="flex space-x-3">
              <ModalAppointments />
              
            </div>
          </div>
          <AppointmentsTable />
        </div>
      </div>
    </>
  );
}
