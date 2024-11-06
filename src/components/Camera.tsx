import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

interface Camera {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Camera({ onChange }: Camera) {
  return (
    <>
      <div className="relative z-0 mb-5 group">
        <input
          type="file"
          name="camera"
          id="camera"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={onChange}
        />
        <label
          htmlFor="camera"
          className="block py-2.5 px-4 text-center rounded-lg cursor-pointer bg-tertiaryYellow text-primaryBlack hover:bg-tertiaryBlack focus:bg-tertiaryBlack hover:text-tertiaryYellow focus:text-tertiaryYellow transition-all hover:duration-500 focus:duration-0"
        >
          <FontAwesomeIcon icon={faCamera} className='text-xl' />
          <span className='pl-2'>Tomar Foto</span>
        </label>
      </div>
    </>
  );
}
