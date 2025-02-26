import "../App.css";//slider
import Slider from "react-slick";
import { useQuery } from '@tanstack/react-query';
import { faArrowAltCircleLeft, faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CajitaInventory } from "./Cajita copy.tsx";
import { getAllMaterials } from "../services/inventoryServices.ts";
import { getInventoryList } from "../services/reportsServices.ts";

// Componentes para los botones personalizados usando TailwindCSS
function NextArrow(props) {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="absolute top-1/2 right-[-20px] transform -translate-y-1/2 text-white bg-[#8c0046] bg-opacity-60 hover:bg-opacity-80 text-2xl rounded-full p-2 cursor-pointer transition-colors duration-300 z-10"
    >
            <FontAwesomeIcon icon={faArrowAltCircleRight} />

    </div>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="absolute top-1/2 left-[-20px]  transform -translate-y-1/2 text-white bg-[#8c0046] bg-opacity-60 hover:bg-opacity-80 text-2xl rounded-full p-2 cursor-pointer transition-colors duration-300 z-10"
    >
      <FontAwesomeIcon icon={faArrowAltCircleLeft} />
    </div>
  );
}

export function ItemsInventory() {
  const { data, error } = useQuery({ queryKey: ['inventoryInfo'], queryFn: getInventoryList });

  if (!data) {
    return <div>Loading</div>;
  }
  if (error) {
    return <div>Error</div>;
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 200,
    slidesToShow: 4,
    slidesToScroll: 4,
    centerMode: true, // Activa el modo de centrado
    centerPadding: "0", // Evita el padding adicional en los laterales
    swipeToSlide: true,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div id="slider-citas" className="slider-container">
      <Slider {...settings}>
        {data.inventory.map((inventario, index) => {
          const datosCaja = {
            item_name: inventario.item_name,
            tipo: inventario.tipo,
            cantidad: inventario.cantidad,
            price: inventario.price,
            total: inventario.total,  
           
          };
          return (
            <div
              key={index}
              className="transition-transform duration-300 transform hover:scale-105"
            >
              <CajitaInventory datos={datosCaja} className="bg-opacity-100 hover:bg-opacity-90" />
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
