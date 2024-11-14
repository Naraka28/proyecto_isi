import Slider from "react-slick";
import { Cajita } from "./Cajita.tsx";
import { useQuery } from '@tanstack/react-query';
import { getAllServices } from "../services/serviciosServices.ts";

// Componentes para los botones personalizados usando TailwindCSS
function NextArrow(props) {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="absolute top-1/2 right-[-50px] transform -translate-y-1/2 text-white bg-black bg-opacity-50 hover:bg-opacity-80 text-2xl rounded-full p-2 cursor-pointer transition-colors duration-300 z-10"
    >
      ➔
    </div>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="absolute top-1/2 left-[-50px] transform -translate-y-1/2 text-white bg-black bg-opacity-50 hover:bg-opacity-80 text-2xl rounded-full p-2 cursor-pointer transition-colors duration-300 z-10"
    >
      ⬅
    </div>
  );
}

export function MultipleItems() {
  const { data, error } = useQuery({ queryKey: ['serviceInfo'], queryFn: getAllServices });

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
    slidesToShow: 3,
    slidesToScroll: 1,
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
        {data.services.map((servicio, index) => {
          const datosCaja = {
            nombre: servicio.name,
            catalogue: servicio.catalogue,
            precio: servicio.price,
            duracion: servicio.duration_in_minutes
          };
          return (
            <div
              key={index}
              className="transition-transform duration-300 transform hover:scale-105"
            >
              <Cajita datos={datosCaja} className="bg-opacity-100 hover:bg-opacity-90" />
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
