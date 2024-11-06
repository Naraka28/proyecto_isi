
interface datosCajaClient {
  nombre: string;
  apellido: string;
  telefono: string;
}
//npm install --save signature_pad
export function CajaCita({ nombre, telefono, apellido }: datosCajaClient) {  // Cambia a recibir directamente las propiedades
  return (
    <Cajita nombre={nombre} telefono={telefono} apellido={apellido} />
  );
}

const Cajita: React.FC<datosCajaClient> = ({ nombre, apellido, telefono }) => {  // Recibe directamente las propiedades
  return (
    <div className="text-left m-1 p-4 border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">
      <h2 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
        <span className="font-[800]"></span>
        {nombre} {apellido}
      </h2>
      <p className="mb-2 text-lg tracking-tight text-gray-900 dark:text-white">
        <span className="font-[600]">Teléfono: <br/></span>{telefono}
      </p>
    </div>
  );
};
