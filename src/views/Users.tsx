import { faPlus, faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from "../components/DashButton";
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
    <>
      <div className="">
        <div className="container px-6 mx-auto grid">
          <h2 className="my-6 text-3xl font-semibold text-black ">
            Dashboard - Usuarios
          </h2>

          <Search onSearch={handleSearch} className="hidden sm:flex" />
          <div className="flex space-x-3 my-5">
            <ModalUsers />

            <IconButton
              id={"respaldoBtn"}
              text={"Respaldo"}
              icon={faCloudArrowUp}
              onClick={handleAddClick}
            />
          </div>
          <div className="">
            <BasicTable />
          </div>
        </div>
      </div>
    </>
  );
}
