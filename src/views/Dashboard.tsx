import {
  faPlus,
  faCloudArrowUp,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
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
import { ItemsInventory } from "../components/Slider copy";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ModalAppointments } from "../components/ModalAppointments";
import ChartComponent from "../components/Graphs";
import MyCalendar from "../components/Calendar";
import { ModalServices } from "../components/ModalService";

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
      <div className="grid grid-rows-[auto,auto,auto] gap-y-8 justify-center  mt-12">
        <div
          id="Calendar"
          className="bg-white row-span-1 w-full h- rounded-2xl py-12"
        >
          <div className="relative w-full px-10">
            <h2 className="text-5xl text-[#363636] font-semibold font-sans underline underline-offset-[3vh]">
              CALENDARIO
            </h2>
            <div className="flex relative">
              <ModalAppointments className="bottom-12" />
            </div>
            <div>
              <MyCalendar />
            </div>
          </div>
        </div>

        <div
          id="Inventario"
          className="bg-white row-span-1 h-[80vh] w-[87vw]  rounded-2xl py-12 "
        >
          <div className="relative w-full px-10">
            <h2 className="text-5xl text-[#363636] font-semibold font-sans underline underline-offset-[3vh]">
              INVENTARIO
            </h2>
            <div className="flex relative">
              <ModalServices className="bottom-12" />
            </div>
            <div>
              <MultipleItems />
            </div>
          </div>
        </div>


        <div
          id="Catalogo"
          className="bg-white row-span-1 h-[80vh] w-[87vw]  rounded-2xl py-12 "
        >
          <div className="relative w-full px-10">
            <h2 className="text-5xl text-[#363636] font-semibold font-sans underline underline-offset-[3vh]">
              CATÁLOGO
            </h2>
            <div className="flex relative">
              <ModalServices className="bottom-12" />
            </div>
            <div>
              <MultipleItems />
            </div>
          </div>
        </div>

        {/* <div
          id="Graficas"
          className="bg-white row-span-1 h-[70vh] w-full rounded-2xl py-12"
        >
          <div className="relative w-full px-10">
            <h2 className="text-5xl text-[#363636] font-semibold font-sans underline underline-offset-[3vh]">
              GRÁFICAS
            </h2>
            <div className="flex relative">
              <ModalAppointments className="bottom-12" />
            </div>
            <div>
              <ChartComponent />
            </div>
          </div>
        </div> */}
      </div>

      {/*
        <div className="relative  justify-center grid grid-cols-5 grid-rows-6 m-5 gap-5 w-screen h-screen">
          
         Sección de próximas citas 
           <div className="bg-white rounded-2xl col-span-2 row-span-3 w-full h-full my-auto gap-y-5 flex flex-col ">
            <div className="flex relative   justify-between">
              <ModalInsertCita closeModal={closeModal} />
              {isModalOpen && (
                <div
                className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
                onClick={handleOutsideClick}
              >
                  <ModalInsertCita closeModal={closeModal} />
                </div>
              )}
              <h1 className="text-xl m-3">Próximas Citas</h1>
              {/* <div className="w-[18vh] bg-primaryBlack text-yellow-50 m-3 p-2 rounded-xl text-lg">
                Ver todas las citas
              </div> 
              <div></div>
            </div>
            <div className="m-3">
              <MultipleItems />
            </div>
          </div>

           Sección de bienvenida y ModalInsert 
          <div className="flex relative flex-col justify-start bg-white rounded-2xl  row-span-3 col-span-2 w-full h-full my-auto pb-2">
            <span className="ml-5 mt-5 text-justify text-2xl">Clientes</span>
            <div className=" mt-10 flex justify-end">
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
             aca va lo otro 
            <div className="p-5">
              <ClientSlider />

            </div>
          </div>

         
        </div>
      */}
    </>
  );
}