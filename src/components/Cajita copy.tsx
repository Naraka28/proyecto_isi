//Cajita
//TODO:Cambiar los datos de la interfaz por los datos que se obtienen del servicio
interface datosCaja {
 
  item_name: string;
  tipo: string;
  cantidad: number;
  price: string;
  total: number;
}

 
 interface Props {
   datos: datosCaja; // Definimos que las props tendrán un objeto `datos` con la estructura de `datosCaja`
 }
 
 export const CajitaInventory: React.FC<Props> = ({ datos }) => {
  const { item_name,tipo,cantidad,price,total } = datos; // Extraemos las propiedades del objeto `datos`
 
  return (
    <div className="flex flex-col m-1 p-6 border bg-[#353535] border-gray-200 rounded-lg hover:bg-[#5b5b5b] shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out max-w-md min-h-[20rem]">
      {/* Contenedor dividido en dos secciones horizontales */}
      <div className="flex flex-row justify-between items-center">
        {/* Sección izquierda */}
        <div className="flex-1 text-left">
          <h2 className="mb-4 font-bold text-xl text-white">{item_name}</h2>
          <p className="text-gray-400 text-lg">Cantidad: {cantidad}</p>
        </div>
        {/* Sección derecha */}
        <div className="text-right">
          <p className="text-[#e969a9] font-bold text-xl">${price}</p>
          <p className="text-gray-400 text-lg">{tipo}</p>
        </div>
      </div>
    </div>
  );
  
  
 };
 