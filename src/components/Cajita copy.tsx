//Cajita
//TODO:Cambiar los datos de la interfaz por los datos que se obtienen del servicio
interface datosCaja {
 
  material_id: number;
  name: string;
  quantity: number;
  price: number;
}

 
 interface Props {
   datos: datosCaja; // Definimos que las props tendrán un objeto `datos` con la estructura de `datosCaja`
 }
 
 export const CajitaInventory: React.FC<Props> = ({ datos }) => {
  const { name,quantity,price } = datos; // Extraemos las propiedades del objeto `datos`
 
   return (
     <div className="flex flex-col m-1 p-4 border bg-[#353535] border-gray-200 rounded-lg hover:bg-[#5b5b5b] shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
     {/* Sección de la Imagen (Parte superior) */}
     
 
     {/* Sección de la Información (Parte inferior) */}
     <div className="flex-1 px-2 text-left text-lg text-gray-900 dark:text-white">
     <p className="mb-2 tracking-tight text-center">
         <span className="font-[800] text-[#8c0046]"> {name}</span>
       </p>
       <h2 className="mb-2 font-bold tracking-tight text-center">
         <span className="font-[800]  ">{price} </span>
       </h2>
       
       <p className="mb-2 tracking-tight text-center">
         <span className="font-[800] "> $ {quantity}</span>
       </p>
     
     </div>
   </div>
   );
 };
 