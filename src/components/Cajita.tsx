
//Aca falta el servicio
// function cajaCita(info: Props) {
//   return (
//       <Cajita datos={info} />
//   )
// }

import { emit } from "process";

//TODO:Cambiar los datos de la interfaz por los datos que se obtienen del servicio
interface datosCaja {
  cliente_nombre: string;
  cliente_apellido: string;
  hora: string;
  proceso: string;
  em_name: string;
  em_last_name: string;
 
}

interface Props {
  datos: datosCaja; // Definimos que las props tendrán un objeto `datos` con la estructura de `datosCaja`
}

export const Cajita: React.FC<Props> = ({ datos }) => {

  const { cliente_nombre, cliente_apellido, hora, proceso,em_name,em_last_name } = datos; // Extraemos las propiedades del objeto `datos`

  return (

    <div className="m-1 p-4 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-[#3B3F46] dark:border-gray-700 dark:hover:bg-[#5b616c] ">
      <h2 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
        {cliente_nombre} {cliente_apellido}
      </h2>
      <p className="mb-2 text-sm tracking-tight text-gray-900 dark:text-white">
        <span className=" font-[800]">Fecha: </span>{hora}
      </p>
      <p className="mb-2 text-sm tracking-tight text-gray-900 dark:text-white">
        <span className='font-[800]'>Servicio: </span>{proceso}
      </p>
      <p className="mb-2 text-sm tracking-tight text-gray-900 dark:text-white">
      <span className='font-[800]'>Encargado: </span>{em_name} {em_last_name}

      </p>
    </div>
  );
};

