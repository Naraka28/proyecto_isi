import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


interface dashBhutton {
    id: string;
    text?: string;
    icon?: IconProp;
    onClick: () => void;
}


export function IconButton({ id, text, icon, onClick }: dashBhutton) {
    return (
        <button id={id} className="group flex absolute top-4 right-4 px-4 bg-tertiaryYellow rounded-full h-12 items-center justify-center hover:bg-primaryBlack focus:bg-primaryBlack text-primaryBlack hover:text-tertiaryYellow focus:text-tertiaryYellow transition-all hover:duration-300 focus:duration-0" onClick={onClick}>
            <div
            >
                {icon && <FontAwesomeIcon icon={icon} className="" />}
            </div>

            <div>
                <p className="my-2 pl-2 text-xl font-medium">
                    {text}
                </p>
            </div>
        </button>
    );
}