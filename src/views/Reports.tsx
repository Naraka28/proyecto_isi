import { faPlus, faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from "../components/DashButton";
import { Search } from "../components/Search";
import { ModalUsers } from "../components/ModalUsers";
import { BasicTable } from "../components/ReportsPDF";

export function Reports() {
  const handleAddClick = () => {
    throw new Error("Function not implemented.");
  };

  function handleSearch(query: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <div className="">
        <div className=" px-6 mx-auto grid">
          <h2 className="my-6 py-6 text-3xl font-bold text-black ">Reportes</h2>

          <div className="flex space-x-3 my-5">
            <IconButton
              id={"respaldoBtn"}
              text={"Respaldo"}
              icon={faCloudArrowUp}
              onClick={handleAddClick}
            />
          </div>
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "16px",
            }}
          >
            Descargar PDF
          </h2>
          <div className="bg-white rounded-xl">
            <BasicTable />
          </div>
        </div>
      </div>
    </>
  );
}
