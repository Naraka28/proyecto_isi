import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


interface dashBhutton{
    id:string;
    text:string;
    icon:IconProp;
    onClick:()=>void;
}


export function IconButton({id,text,icon,onClick}:dashBhutton){
    return(
        <button id={id} className="group flex items-center p-4 bg-gray-100 border-gray-200 rounded-lg shadow-xs hover:bg-gray-300 focus:bg-gray-300 transition-all hover:duration-500 focus:duration-0" onClick={onClick}>
        <div
        className="p-3 mr-4 bg-blue-100 rounded-full group-hover:bg-blue-400 group-focus:bg-blue-400 flex items-center justify-center transition-all hover:duration-500 focus:duration-0"
        style={{ width: '50px', height: '50px' }}
        >
        <FontAwesomeIcon  icon={icon} className="text-blue-500 group-hover:text-orange-100 group-focus:text-orange-100 transition-all hover:duration-500 focus:duration-0" />
        </div>

        <div>
        <p className="my-2 text-xl font-medium text-gray-600 group-hover:text-gray-400 group-focus:text-gray-400 transition-all hover:duration-500 focus:duration-0">
            {text}
        </p>
        </div>
        </button>
    );
}