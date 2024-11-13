
//Aca falta el servicio
// function cajaCita(info: Props) {
//   return (
//       <Cajita datos={info} />
//   )
// }


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

    <div className="m-1 p-4 border text-left text-lg bg-[#353535] border-gray-200 rounded-lg shadow hover:bg-[#5b5b5b]  ">
      <h2 className="mb-2  font-bold tracking-tight text-gray-900 dark:text-white">
      <span className=" font-[800]">Cliente: </span>{cliente_nombre} {cliente_apellido}
      </h2>
      <p className="mb-2  tracking-tight text-gray-900 dark:text-white">
        <span className=" font-[800]">{hora} {/* TODO: cambiar la forma en que se jala la fecha para que sea la pura hora */}</span>
        </p>
      <p className="mb-2  tracking-tight text-gray-900 dark:text-white">
        <span className='font-[800]'>Servicio: <br/></span>{proceso}
      </p>
      <p className="my-2  tracking-tight text-gray-900 dark:text-white">
      <span className='font-[800]'>Encargado:<br/> </span>{em_name} {em_last_name}
      </p>

      
    </div>
  );
};

