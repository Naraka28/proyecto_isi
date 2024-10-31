/*
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface dashButton {
  id: string;
  text: string;
  icon: IconProp;
  onClick: () => void;
  disabled?: boolean;
}

export function IconButton({ id, text, icon, onClick, disabled }: dashButton) {
  return (
    <button
      id={id}
      onClick={onClick}
      disabled={disabled}
      style={{
        display: "flex",
        alignItems: "center",
        padding: "12px",
        backgroundColor: disabled ? "#ddd" : "#f0f4ff",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "all 0.5s ease",
        width: "100%",
        marginBottom: "16px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "50px",
          height: "50px",
          backgroundColor: disabled ? "#bbb" : "#cfe2ff",
          borderRadius: "50%",
          marginRight: "16px",
          transition: "background-color 0.5s ease",
        }}
      >
        <FontAwesomeIcon
          icon={icon}
          style={{
            color: disabled ? "#777" : "#3b82f6",
            transition: "color 0.5s ease",
          }}
        />
      </div>

      <div>
        <p
          style={{
            fontSize: "1.25rem",
            fontWeight: "500",
            color: disabled ? "#888" : "#333",
            transition: "color 0.5s ease",
          }}
        >
          {text}
        </p>
      </div>
    </button>
  );
}
 */

import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface dashButton {
  id: string;
  text: string;
  icon: IconProp;
  onClick: () => void;
}

export function IconButton({ id, text, icon, onClick }: dashButton) {
  return (
    <button
      id={id}
      className="group flex items-center p-4 bg-gray-100 border-gray-200 rounded-lg shadow-xs hover:bg-gray-300 focus:bg-gray-300 transition-all hover:duration-500 focus:duration-0"
      onClick={onClick}
    >
      <div
        className="p-3 mr-4 bg-blue-100 rounded-full group-hover:bg-blue-400 group-focus:bg-blue-400 flex items-center justify-center transition-all hover:duration-500 focus:duration-0"
        style={{ width: "50px", height: "50px" }}
      >
        <FontAwesomeIcon
          icon={icon}
          className="text-blue-500 group-hover:text-orange-100 group-focus:text-orange-100 transition-all hover:duration-500 focus:duration-0"
        />
      </div>

      <div>
        <p className="my-2 text-xl font-medium text-gray-600 group-hover:text-gray-400 group-focus:text-gray-400 transition-all hover:duration-500 focus:duration-0">
          {text}
        </p>
      </div>
    </button>
  );
}
