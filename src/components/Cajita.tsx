//Cajita
//TODO:Cambiar los datos de la interfaz por los datos que se obtienen del servicio
interface datosCaja {
  nombre: string;
  catalogo_id: number;
  catalogo: string;
  precio: number;
  duracion: number;
 }
 
 interface Props {
   datos: datosCaja; // Definimos que las props tendrán un objeto `datos` con la estructura de `datosCaja`
 }
 
 export const Cajita: React.FC<Props> = ({ datos }) => {
  const { nombre,catalogo,precio,duracion } = datos; // Extraemos las propiedades del objeto `datos`
 
   return (
     <div className="flex flex-col m-1 p-4 border bg-[#353535] border-gray-200 rounded-lg hover:bg-[#5b5b5b] shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
     {/* Sección de la Imagen (Parte superior) */}
     <div className="flex-1 mb-4">
       <img className="w-full h-48 rounded-md object-cover shadow-sm hover:shadow-lg hover:z-20 transition-shadow duration-300 ease-in-out" src="src\images\peines.jpeg" alt="Imagen del cliente" />
     </div>
 
     {/* Sección de la Información (Parte inferior) */}
     <div className="flex-1 px-2 text-left text-lg text-gray-900 dark:text-white">
     <p className="mb-2 tracking-tight text-center">
         <span className="font-[800] text-[#8c0046]"> {catalogo}</span>
       </p>
       <h2 className="mb-2 font-bold tracking-tight text-center">
         <span className="font-[800]  ">{nombre} </span>
       </h2>
       
       <p className="mb-2 tracking-tight text-center">
         <span className="font-[800] "> $ {precio}</span>
       </p>
       <p className="my-2 tracking-tight text-center">
         <span className="font-[800] ">{duracion} min. </span>
       </p>
     </div>
   </div>
   );
 };
 