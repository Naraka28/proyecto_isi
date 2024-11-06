import Slider from "react-slick";
import "../App.css";
import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from "../services/userAddservice.ts";
import { CajaCita } from "./CajitaClients.tsx";


export function ClientSlider() {
    const { data, isLoading, error } = useQuery({
        queryKey: ["clientesInfo"],
        queryFn: getAllUsers,
    });

    if (!data) {
        return <div>Loading...</div>;
    }


    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        swipeToSlide: true,
        vertical: false,
        verticalSwiping: false,
        arrows: false
    };

    return (
        <div className="slider-container">


            <Slider {...settings}>


                {data.users.map((cliente, index) => (
                    <CajaCita key={index} nombre={cliente.name} telefono={cliente.phone_number} apellido={cliente.last_name} />
                ))}

            </Slider>

        </div>
    );
}

