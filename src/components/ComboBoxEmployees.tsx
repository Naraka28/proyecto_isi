interface ComboBoxProps {
  id: string;
  options: any[];
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string;
}

export function ComboBoxEmployees({
  id,
  options,
  onChange,
  value,
}: ComboBoxProps) {
  return (
    <div className="relative w-full mx-auto my-">
      <select
        defaultValue=""
        id={id}
        name={id}
        className="peer w-full h-full bg-white text-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-400 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 pt-5 pb-3 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
        onChange={onChange}
        required
        value={value}
      >
        <option value="" disabled hidden>
          Selecciona una opción
        </option>
        {options.map((option) => (
          <option key={option.employee_id} value={option.employee_id}>
            {option.name + " " + option.last_name}
          </option>
        ))}
      </select>
      <label
        htmlFor={id}
        className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-base text-lg peer-focus:text-lg before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900"
      >
        {id.charAt(0).toUpperCase() + id.slice(1)}
      </label>
    </div>
  );
}
