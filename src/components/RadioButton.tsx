interface radioProps {
  id: string;
  text: string;
  group: string;
  onChange: (value: boolean) => void; // Cambiamos el tipo a boolean
}

export function RadioButton({ id, text, group, onChange }: radioProps) {
  // Función para manejar el cambio y convertir el valor a booleano
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const booleanValue = e.target.value === "si";
    onChange(booleanValue);
  };

  return (
    <>
      <label
        htmlFor={id}
        className="flex absolute w-full text-gray-800 peer-focus:text-gray-800 -top-3 text-lg"
      >
        {text}
      </label>
      <div className="pt-1 pb-3">
        <ul className="items-center w-fit text-lg font-medium text-gray-900 bg-white rounded-lg sm:flex">
          <li className="w-fit">
            <div className="flex items-center ps-2 group pt-2">
              <input
                id={`${id}-si`} // Asegurarse de que los IDs sean únicos
                type="radio"
                value="si"
                name={group}
                className="w-6 h-6 text-blue-600 bg-gray-100 outline-none focus:ring-blue-500 focus:ring-2"
                onChange={handleChange}
              />
              <label
                htmlFor={`${id}-si`}
                className="w-fit py-2 pr-2 ms-2 text-lg font-medium text-gray-900"
              >
                Si
              </label>
            </div>
          </li>
          <li className="w-fit">
            <div className="flex items-center ps-2 pt-2">
              <input
                id={`${id}-no`}
                type="radio"
                value="no"
                name={group}
                className="w-6 h-6 text-blue-600 bg-gray-100 outline-none focus:ring-blue-500 focus:ring-2"
                onChange={handleChange}
              />
              <label
                htmlFor={`${id}-no`}
                className="w-fit py-2 pr-2 ms-2 text-lg font-medium text-gray-900"
              >
                No
              </label>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
