import Slider from "react-slick";
import "../App.css";
import { Cajita } from "./Cajita.tsx";
import { useQuery } from '@tanstack/react-query';
import { getAllAppointments } from '../services/appointmentServices.ts';

export function MultipleItems() {
    const { data, error } = useQuery({ queryKey: ['citasInfo'], queryFn: getAllAppointments });

    if (!data) {
        return <div>Loading</div>
    }
    if (error) {
        return <div>Error</div>
    }


    const settings = {
        dots: true, // los dos son lo que mostraba "next"
        infinite: false, //fran quito el infinito nice
        speed: 200,
        slidesToShow: 3,
        slidesToScroll: 1 ,//no esta mal de euna en una, se siente bien en la ipad, pero si quieres muevele,, puedo quitar lo de next? e simon, a ver qp
        swipeToSlide: true,
        vertical: false,
        verticalSwiping: false,
        arrows: false
    };


    return (
        <div id="slider-citas" className="slider-container">


            <Slider  {...settings}>


                {data.appointments.map((citas, index) => {
                    const datosCaja = {
                        

                        cliente_nombre: citas.name,
                        cliente_apellido: citas.last_name,
                        hora: citas.date,
                        proceso: citas.servicio,
                        em_name: citas.em_name,
                        em_last_name: citas.em_last_name
                        
                    };
                    return <Cajita key={index} datos={datosCaja} />;
                })}

            </Slider>

        </div>
    );
}

