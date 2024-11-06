import { faPlus, faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from "../components/DashButton";
import { BasicTable } from "../components/TableUsers";
import { Search } from "../components/Search";
import { ModalUsers } from "../components/ModalUsers";
import { ModalView } from "../components/ModalView";
import { ModalInsert } from "../components/ModalInsert";
import { ClientSlider } from "../components/ClientSlider";
import { ModalInsertCita } from "../components/ModalInsertCita";
import { MultipleItems } from "../components/Slider";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function Dashboard() {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleClick = () => {
    navigate("/");
  };

  return (
      <>
      <div className="">
       
      </div>
      <div className="h-screen w-screen manrope-500">
        <div className="relative grid grid-cols-3 grid-rows-5 m-5 gap-3 h-[81vh]">
          <div className="grid grid-cols-1 grid-rows-2 bg-white rounded-lg row-span-5 w-full h-full">
            {/* Seccion de siguiente cita*/}
            <div className="relative">
              <div className="mr-5 mt-auto flex justify-end">
                <ModalView closeModal={closeModal} />
                {isModalOpen && (
                  <div
                    className="fixed bg-gray-800 bg-opacity-50 flex justify-center items-center"
                    onClick={handleOutsideClick}
                  >
                    <ModalView closeModal={closeModal} />
                  </div>
                )}
              </div>
              <h2 className="ml-5 mt-4 text-2xl">Siguiente cita</h2>
              <ul className="flex flex-col mt-8 ms-6 text-xl tracking-tight text-gray-900 font-[400]">
                <li>
                  <h3>Hora: </h3>
                </li>
                <li>
                  <h3>Cliente: </h3>
                </li>
                <li>
                  <h3>Procedimiento: </h3>
                </li>
              </ul>
            </div>
            {/* Seccion de cita anterior*/}
            <div className="relative">
              <div className="mr-5 mt-auto flex justify-end">
                <ModalView closeModal={closeModal} />
                {isModalOpen && (
                  <div
                    className="fixed bg-gray-800 bg-opacity-50 flex justify-center items-center"
                    onClick={handleOutsideClick}
                  >
                    <ModalView closeModal={closeModal} />
                  </div>
                )}
              </div>
              <h2 className="ml-5 mt-4 text-2xl">Ultima cita</h2>
              <ul className="flex flex-col mt-8 ms-6 text-xl tracking-tight text-gray-900 font-[400]">
                <li>
                  <h3>Hora: </h3>
                </li>
                <li>
                  <h3>Cliente: </h3>
                </li>
                <li>
                  <h3>Procedimiento: </h3>
                </li>
              </ul>
            </div>
          </div>
          {/* Sección de bienvenida y ModalInsert */}
          <div className="flex relative flex-col justify-start bg-white rounded-lg row-span-2 col-span-2 w-full h-full pb-2">
            <span className="ml-5 mt-5 text-2xl">Bienvenida</span>
            <div className="mr-5 mt-auto flex justify-end">
              <ModalInsert closeModal={closeModal} />
              {isModalOpen && (
                <div
                  className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
                  onClick={handleOutsideClick}
                >
                  <ModalInsert closeModal={closeModal} />
                </div> //este div no debeia estar en la linea de arriba?
              )}
            </div>
            {/* aca va lo otro */}
            <div className="mx-2">
              <ClientSlider />
            </div>
          </div>

          {/* Sección de próximas citas */}
          <div className="bg-white rounded-lg col-span-2 row-span-3 w-full h-full flex flex-col justify-around">
            <div className="flex relative justify-between">
              <ModalInsertCita closeModal={closeModal} />
              {isModalOpen && (
                <div
                  className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
                  onClick={handleOutsideClick}
                >
                  <ModalInsertCita closeModal={closeModal} />
                </div>
              )}
              <h1 className="text-2xl m-3">Próximas Citas</h1>
              {/* <div className="w-[18vh] bg-primaryBlack text-yellow-50 m-3 p-2 rounded-xl text-lg">
                Ver todas las citas
              </div> */}
              <div></div>
            </div>
            <div className="mt-2 mx-2">
              <MultipleItems />
            </div>
          </div>
        </div>
      </div>
    </>
      
  );
}
