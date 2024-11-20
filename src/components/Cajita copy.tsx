import React from "react";

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
  const { item_name, tipo, cantidad, price } = datos;

  const getCantidadColor = (cantidad: number) => {
    if (cantidad < 10) {
      return "text-[#eb5454]";//rojo
    } else if (cantidad >= 10 && cantidad < 20) {
      return "text-[#ebed5f]";//amarillo
    } else{
      return "text-[#535151]";//verde
    }
      
    };
  
    const getBackgroundColorCantidad = (cantidad: number) => {
      if (cantidad < 10) {
        return "bg-[#eb5454]";//rojo
      } else if (cantidad >= 10 && cantidad < 20) {
        return "bg-[#c0c25f]";//amarillo
      } else{
        return "bg-[#6bc25f]";//verde
      }
        
      };
    

  // Obtener la imagen según el tipo
  const getImageByCatalog = (tipo: string) => {
    switch (tipo) {
      case "Material":
        return "src/images/materiales.jpg";
      case "Producto":
        return "src/images/productos.jpg";
      default:
        return "src/images/default.jpeg"; // Imagen por defecto
    }
  };

  const tipoImg = getImageByCatalog(tipo);
  //const cantidadColor = getCantidadColor(cantidad);
  const bgColor= getBackgroundColorCantidad(cantidad);
  return (
    <div className="relative flex flex-col max-w-md min-h-[22rem] m-2 p-4 border bg-[#353535] border-gray-200 rounded-lg shadow-lg hover:shadow-xl hover:bg-[#5b5b5b] transition-shadow duration-300 ease-in-out">
      {/* Imagen basada en el tipo */}
      <div className="flex justify-center mb-4">
        <img
          className="w-full h-36 rounded-md object-cover shadow-md"
          src={tipoImg}
          alt={`Imagen de ${tipo}`}
        />
      </div>

      {/* Contenedor del contenido */}
      <div className="flex flex-col justify-between text-white">
        {/* Nombre del item */}
        <h2 className="text-2xl font-bold mb-2 text-center text-white capitalize tracking-wide">
          {item_name}
        </h2>

        {/* Cantidad (resaltada) */}
        <p className={`text-lg font-semibold text-center ${bgColor} py-2 rounded-md shadow-inner`}>
          Cantidad: <span className="text-white">{cantidad}</span>
        </p>

        {/* Precio y tipo */}
        <div className="mt-4 flex justify-between items-center">
          <p className="text-xl font-bold text-[#e969a9]">${price}</p>
          <p className="text-gray-300 text-lg font-medium">{tipo}</p>
        </div>
      </div>
    </div>
  );
};
