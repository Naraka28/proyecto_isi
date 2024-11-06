import React from "react";

interface Fields2Props {
  label: string;
  value: string;
  className?: string;
}


export function Fields2({ label, value }: Fields2Props) {
  return (
    <div className="relative z-0 w-full mb-5 group ">
      <label className="text-md text-gray-600">{label}</label>
      <p className="text-xl font-bold text-gray-800 mt-1">{value}</p>
    </div>
  );
}
