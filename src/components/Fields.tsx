import React, { HTMLInputTypeAttribute } from "react";

interface Fields {
  id: string;
  name: string;
  text: string;
  placeholder: string;
  type?: HTMLInputTypeAttribute;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Fields({ id, name, text, placeholder, type, onChange }: Fields) {
  return (
    <>
      <div className="relative z-0 w-full mb-5 group pt-2">
        <input
          type={type}
          name={name}
          id={id}
          className="block py-2.5 px-0 w-full text-md text-gray-600 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder={placeholder}
          onChange={onChange}

          required
        />
        <label
          htmlFor={name}
          className="absolute text-lg text-gray-800 duration-300 transform -translate-y-6 top-3 -z-10"
        >
          {text}
        </label>
      </div>
    </>
  );
}
