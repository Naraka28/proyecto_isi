interface datosCaja {
  nombre: string;
  catalogo_id?: number;
  catalogo: string;
  precio: number;
  duracion: number;
}

interface Props {
  datos: datosCaja; // Definimos que las props tendrán un objeto `datos` con la estructura de `datosCaja`
}

export const Cajita: React.FC<Props> = ({ datos }) => {
  const { nombre, catalogo, precio, duracion } = datos; // Extraemos las propiedades del objeto `datos`

  // Determinar la imagen según el catálogo
  const getImageByCatalog = (catalogo: string) => {
    switch (catalogo) {
      case "Cortes":
        return "src/images/corte.jpg";
      case "Tintes":
        return "src/images/tintado.jpg";
      case "Peinados":
        return "src/images/peines.jpeg";
      default:
        return "src/images/default.jpeg"; // Imagen por defecto
    }
  };

  const catalogImage = getImageByCatalog(catalogo);

  return (
    <div className="relative flex flex-col m-1 p-4 border bg-[#353535] border-gray-200 rounded-lg hover:bg-[#5b5b5b] shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
      {/* Texto vertical en posición absoluta */}
      <span className="absolute translate-y-[15rem] vertical transform font-[800] text-[#e969a9] text-2xl tracking-tight uppercase">
        {catalogo}
      </span>

      {/* Sección de la Imagen (Parte superior) */}
      <div className="flex-1 mb-4">
        <img
          className="w-full h-48 rounded-md object-cover shadow-sm hover:shadow-lg hover:z-20 transition-shadow duration-300 ease-in-out"
          src={catalogImage}
          alt={`Imagen de ${catalogo}`}
        />
      </div>

      {/* Sección de la Información (Parte inferior) */}
      <div className="flex-1 px-2 text-left text-lg text-gray-900 dark:text-white">
        <h2 className="mb-2 font-bold tracking-tight text-right underline underline-offset-[7px]">
          <span className="font-[800]">{nombre}</span>
        </h2>

        <p className="mb-2 tracking-tight text-right">
          <span className="font-[800]">$ {precio}</span>
        </p>
        <p className="my-2 tracking-tight text-right">
          <span className="font-[800]">{duracion} min.</span>
        </p>
      </div>
    </div>
  );
};
